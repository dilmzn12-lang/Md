import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase as publicSupabase } from "@/integrations/supabase/client";
import { pickImageUrl } from "@/lib/menu-images";

const MASTER_PASSWORD = "md1122@Aa";

function assertMaster(master: string) {
  if (master !== MASTER_PASSWORD) {
    throw new Error("Unauthorized: invalid master password");
  }
}

async function getAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export type CategoryRow = {
  id: string;
  slug: string;
  sort_order: number;
  emoji: string | null;
  name_ar: string;
  name_en: string;
  name_ku: string | null;
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
  image_url?: string | null;
};

export type MenuPayload = {
  categories: CategoryRow[];
  items: ItemRow[];
};

export const getMenu = createServerFn({ method: "GET" }).handler(async () => {
  const [cats, items] = await Promise.all([
    publicSupabase.from("menu_categories").select("*").order("sort_order"),
    publicSupabase.from("menu_items").select("*").order("sort_order"),
  ]);
  if (cats.error) throw new Error(cats.error.message);
  if (items.error) throw new Error(items.error.message);
  return {
    categories: (cats.data ?? []) as CategoryRow[],
    items: (items.data ?? []).map((i: any) => ({ ...i, price: Number(i.price) })) as ItemRow[],
  } as MenuPayload;
});

export const checkIsAdmin = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ master: z.string() }).parse(input))
  .handler(async ({ data }) => ({ isAdmin: data.master === MASTER_PASSWORD }));

const itemInput = z.object({
  master: z.string(),
  id: z.string().uuid().optional(),
  category_id: z.string().uuid(),
  sort_order: z.number().int().min(0).default(0),
  name_ar: z.string().min(1).max(200),
  name_en: z.string().min(1).max(200),
  name_ku: z.string().max(200).nullable().optional(),
  desc_ar: z.string().max(2000).nullable().optional(),
  desc_en: z.string().max(2000).nullable().optional(),
  desc_ku: z.string().max(2000).nullable().optional(),
  price: z.number().min(0).max(100000),
  available: z.boolean().default(true),
  tags: z.array(z.string().max(40)).max(10).default([]),
  image_url: z.string().max(500).nullable().optional(),
});

export const upsertItem = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => itemInput.parse(input))
  .handler(async ({ data }) => {
    assertMaster(data.master);
    const admin = await getAdmin();
    const { master, ...payload } = data;
    // Auto-generate a reliable image URL when admin leaves the field empty.
    const trimmed = (payload.image_url ?? "").toString().trim();
    if (!trimmed) {
      // Look up the category slug so we can fall back to a curated photo.
      const { data: cat } = await admin
        .from("menu_categories")
        .select("slug")
        .eq("id", payload.category_id)
        .maybeSingle();
      (payload as any).image_url = pickImageUrl({
        name_en: payload.name_en,
        name_ar: payload.name_ar,
        category_slug: cat?.slug ?? null,
      });
    } else {
      (payload as any).image_url = trimmed;
    }
    if (payload.id) {
      const { id, ...rest } = payload;
      const { error } = await admin.from("menu_items").update(rest).eq("id", id);
      if (error) throw new Error(error.message);
      return { id };
    }
    const { data: row, error } = await admin
      .from("menu_items")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row!.id as string };
  });

export const deleteItem = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ master: z.string(), id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    assertMaster(data.master);
    const admin = await getAdmin();
    const { error } = await admin.from("menu_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const toggleItemAvailable = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ master: z.string(), id: z.string().uuid(), available: z.boolean() }).parse(input),
  )
  .handler(async ({ data }) => {
    assertMaster(data.master);
    const admin = await getAdmin();
    const { error } = await admin
      .from("menu_items")
      .update({ available: data.available })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const categoryInput = z.object({
  master: z.string(),
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .min(1)
    .max(60)
    .regex(/^[a-z0-9_-]+$/),
  sort_order: z.number().int().min(0).default(0),
  emoji: z.string().max(8).nullable().optional(),
  name_ar: z.string().min(1).max(120),
  name_en: z.string().min(1).max(120),
  name_ku: z.string().max(120).nullable().optional(),
});

export const upsertCategory = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => categoryInput.parse(input))
  .handler(async ({ data }) => {
    assertMaster(data.master);
    const admin = await getAdmin();
    const { master, ...payload } = data;
    if (payload.id) {
      const { id, ...rest } = payload;
      const { error } = await admin.from("menu_categories").update(rest).eq("id", id);
      if (error) throw new Error(error.message);
      return { id };
    }
    const { data: row, error } = await admin
      .from("menu_categories")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row!.id as string };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ master: z.string(), id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    assertMaster(data.master);
    const admin = await getAdmin();
    const { error } = await admin.from("menu_categories").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
