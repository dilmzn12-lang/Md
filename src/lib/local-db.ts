import * as fs from "fs";
import * as path from "path";

// Simple helper to generate a UUID-like string if needed
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export type CategoryRow = {
  id: string;
  slug: string;
  sort_order: number;
  emoji: string | null;
  name_ar: string;
  name_en: string;
  name_ku: string | null;
  created_at?: string;
};

export type ItemRow = {
  id: string;
  category_id: string;
  sort_order: number;
  name_ar: string;
  name_en: string;
  name_ku: string | null;
  desc_ar: string | null;
  desc_en: string | null;
  desc_ku: string | null;
  price: number;
  available: boolean;
  tags: string[];
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
};

interface DBStore {
  categories: CategoryRow[];
  items: ItemRow[];
}

const STORE_FILE = path.join(process.cwd(), "menu_store.json");

import { FALLBACK_SECTIONS } from "./menu-data";

// Global cache to persist in-memory if disk is read-only (e.g. on Vercel serverless)
let memoryStore: DBStore | null = null;

// Helper to seed database
function seedDatabase(): DBStore {
  const categories: CategoryRow[] = [];
  const items: ItemRow[] = [];

  FALLBACK_SECTIONS.forEach((section, index) => {
    const categoryId = generateUUID();
    categories.push({
      id: categoryId,
      slug: section.id,
      sort_order: index * 10,
      emoji: section.emoji,
      name_ar: section.ar,
      name_en: section.en,
      name_ku: section.ku || null,
      created_at: new Date().toISOString(),
    });

    section.items.forEach((item, itemIndex) => {
      items.push({
        id: generateUUID(),
        category_id: categoryId,
        sort_order: itemIndex * 10,
        name_ar: item.ar,
        name_en: item.en,
        name_ku: item.ku || null,
        desc_ar: item.descAr || null,
        desc_en: item.descEn || null,
        desc_ku: item.descKu || null,
        price: item.price,
        available: true,
        tags: item.tags || [],
        image_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });
  });

  const initialDB = { categories, items };
  memoryStore = initialDB;
  
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(initialDB, null, 2), "utf8");
  } catch (err) {
    console.warn("[Local DB] Write failed during seed (likely read-only Vercel FS). Falling back to in-memory store.", err);
  }
  
  return initialDB;
}

// Overwrite logic if Kurdish names are missing (force re-seed)
export function readDB(): DBStore {
  if (memoryStore) {
    return memoryStore;
  }

  try {
    if (!fs.existsSync(STORE_FILE)) {
      return seedDatabase();
    }
    const data = fs.readFileSync(STORE_FILE, "utf8");
    // Check if the current database file has Kurdish translations fully integrated
    if (
      !data.includes('"name_ku": "بەرگەری کلاسیک گۆشت"') &&
      !data.includes('"name_ku":"بەرگەری کلاسیک گۆشت"')
    ) {
      console.warn(
        "[Local DB] Existing database does not have full Kurdish translations. Force re-seeding...",
      );
      return seedDatabase();
    }
    const parsed = JSON.parse(data);
    memoryStore = parsed;
    return parsed;
  } catch (err) {
    console.error("Failed to read JSON DB, re-seeding:", err);
    return seedDatabase();
  }
}

export function writeDB(db: DBStore) {
  memoryStore = db;
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch (err) {
    console.error("[Local DB] Failed to write JSON DB (likely read-only Vercel FS):", err);
  }
}

export function getCategories() {
  return readDB().categories.sort((a, b) => a.sort_order - b.sort_order);
}

export function getItems() {
  return readDB().items.sort((a, b) => a.sort_order - b.sort_order);
}

export function upsertCategory(cat: Partial<CategoryRow>) {
  const db = readDB();
  const id = cat.id || generateUUID();
  const existingIndex = db.categories.findIndex((c) => c.id === id);

  const payload: CategoryRow = {
    id,
    slug: cat.slug || "uncategorized",
    sort_order: typeof cat.sort_order === "number" ? cat.sort_order : db.categories.length,
    emoji: cat.emoji || null,
    name_ar: cat.name_ar || "",
    name_en: cat.name_en || "",
    name_ku: cat.name_ku || null,
    created_at: cat.created_at || new Date().toISOString(),
  };

  if (existingIndex > -1) {
    db.categories[existingIndex] = payload;
  } else {
    db.categories.push(payload);
  }

  writeDB(db);
  return payload;
}

export function deleteCategory(id: string) {
  const db = readDB();
  db.categories = db.categories.filter((c) => c.id !== id);
  db.items = db.items.filter((i) => i.category_id !== id);
  writeDB(db);
  return { ok: true };
}

export function upsertItem(item: Partial<ItemRow>) {
  const db = readDB();
  const id = item.id || generateUUID();
  const existingIndex = db.items.findIndex((i) => i.id === id);

  const payload: ItemRow = {
    id,
    category_id: item.category_id!,
    sort_order: typeof item.sort_order === "number" ? item.sort_order : db.items.length,
    name_ar: item.name_ar || "",
    name_en: item.name_en || "",
    name_ku: item.name_ku || null,
    desc_ar: item.desc_ar || null,
    desc_en: item.desc_en || null,
    desc_ku: item.desc_ku || null,
    price: typeof item.price === "number" ? item.price : 0,
    available: item.available !== false,
    tags: item.tags || [],
    image_url: item.image_url || null,
    created_at: item.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (existingIndex > -1) {
    db.items[existingIndex] = payload;
  } else {
    db.items.push(payload);
  }

  writeDB(db);
  return payload;
}

export function deleteItem(id: string) {
  const db = readDB();
  db.items = db.items.filter((i) => i.id !== id);
  writeDB(db);
  return { ok: true };
}

export function toggleItemAvailable(id: string, available: boolean) {
  const db = readDB();
  const item = db.items.find((i) => i.id === id);
  if (item) {
    item.available = available;
    item.updated_at = new Date().toISOString();
    writeDB(db);
  }
  return { ok: true };
}
