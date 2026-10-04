import { t as FALLBACK_SECTIONS } from "./menu-data-D0eK3kH3.mjs";
import * as fs from "fs";
import * as path from "path";
//#region node_modules/.nitro/vite/services/ssr/assets/local-db-CFlSiZE5.js
function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0;
		return (c === "x" ? r : r & 3 | 8).toString(16);
	});
}
var STORE_FILE = path.join(process.cwd(), "menu_store.json");
function seedDatabase() {
	const categories = [];
	const items = [];
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
			created_at: (/* @__PURE__ */ new Date()).toISOString()
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
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			});
		});
	});
	const initialDB = {
		categories,
		items
	};
	fs.writeFileSync(STORE_FILE, JSON.stringify(initialDB, null, 2), "utf8");
	return initialDB;
}
function readDB() {
	try {
		if (!fs.existsSync(STORE_FILE)) return seedDatabase();
		const data = fs.readFileSync(STORE_FILE, "utf8");
		if (!data.includes("\"name_ku\": \"بەرگەری کلاسیک گۆشت\"") && !data.includes("\"name_ku\":\"بەرگەری کلاسیک گۆشت\"")) {
			console.warn("[Local DB] Existing database does not have full Kurdish translations. Force re-seeding...");
			return seedDatabase();
		}
		return JSON.parse(data);
	} catch (err) {
		console.error("Failed to read JSON DB, re-seeding:", err);
		return seedDatabase();
	}
}
function writeDB(db) {
	try {
		fs.writeFileSync(STORE_FILE, JSON.stringify(db, null, 2), "utf8");
	} catch (err) {
		console.error("Failed to write JSON DB:", err);
	}
}
function getCategories() {
	return readDB().categories.sort((a, b) => a.sort_order - b.sort_order);
}
function getItems() {
	return readDB().items.sort((a, b) => a.sort_order - b.sort_order);
}
function upsertCategory(cat) {
	const db = readDB();
	const id = cat.id || generateUUID();
	const existingIndex = db.categories.findIndex((c) => c.id === id);
	const payload = {
		id,
		slug: cat.slug || "uncategorized",
		sort_order: typeof cat.sort_order === "number" ? cat.sort_order : db.categories.length,
		emoji: cat.emoji || null,
		name_ar: cat.name_ar || "",
		name_en: cat.name_en || "",
		name_ku: cat.name_ku || null,
		created_at: cat.created_at || (/* @__PURE__ */ new Date()).toISOString()
	};
	if (existingIndex > -1) db.categories[existingIndex] = payload;
	else db.categories.push(payload);
	writeDB(db);
	return payload;
}
function deleteCategory(id) {
	const db = readDB();
	db.categories = db.categories.filter((c) => c.id !== id);
	db.items = db.items.filter((i) => i.category_id !== id);
	writeDB(db);
	return { ok: true };
}
function upsertItem(item) {
	const db = readDB();
	const id = item.id || generateUUID();
	const existingIndex = db.items.findIndex((i) => i.id === id);
	const payload = {
		id,
		category_id: item.category_id,
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
		created_at: item.created_at || (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (existingIndex > -1) db.items[existingIndex] = payload;
	else db.items.push(payload);
	writeDB(db);
	return payload;
}
function deleteItem(id) {
	const db = readDB();
	db.items = db.items.filter((i) => i.id !== id);
	writeDB(db);
	return { ok: true };
}
//#endregion
export { deleteCategory, deleteItem, getCategories, getItems, upsertCategory, upsertItem };
