import { r as createServerFn } from "./server-CwgRcQHQ.mjs";
import { a as stringType, i as objectType, n as booleanType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-VE192koc.mjs";
import { t as supabase } from "./client-C3nePkEI.mjs";
import { n as pickImageUrl } from "./menu-images-DWa5oqgz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu.functions-DKb1HWOq.js
var MASTER_PASSWORD = "md1122@Aa";
function assertMaster(master) {
	if (master !== MASTER_PASSWORD) throw new Error("Unauthorized: invalid master password");
}
async function getAdmin() {
	const { supabaseAdmin } = await import("./client.server-VcgB17SN.mjs");
	return supabaseAdmin;
}
var getMenu_createServerFn_handler = createServerRpc({
	id: "1c04d822b98b11d5be2c383fbd127f3a75656f0d804dd7d343a3243513a015be",
	name: "getMenu",
	filename: "src/lib/menu.functions.ts"
}, (opts) => getMenu.__executeServer(opts));
var getMenu = createServerFn({ method: "GET" }).handler(getMenu_createServerFn_handler, async () => {
	const [cats, items] = await Promise.all([supabase.from("menu_categories").select("*").order("sort_order"), supabase.from("menu_items").select("*").order("sort_order")]);
	if (cats.error) throw new Error(cats.error.message);
	if (items.error) throw new Error(items.error.message);
	return {
		categories: cats.data ?? [],
		items: (items.data ?? []).map((i) => ({
			...i,
			price: Number(i.price)
		}))
	};
});
var checkIsAdmin_createServerFn_handler = createServerRpc({
	id: "9adaa779d70b77cadd8e8c1fe634765b7cebb25687608b7892228aa4a7b82030",
	name: "checkIsAdmin",
	filename: "src/lib/menu.functions.ts"
}, (opts) => checkIsAdmin.__executeServer(opts));
var checkIsAdmin = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ master: stringType() }).parse(input)).handler(checkIsAdmin_createServerFn_handler, async ({ data }) => ({ isAdmin: data.master === MASTER_PASSWORD }));
var itemInput = objectType({
	master: stringType(),
	id: stringType().uuid().optional(),
	category_id: stringType().uuid(),
	sort_order: numberType().int().min(0).default(0),
	name_ar: stringType().min(1).max(200),
	name_en: stringType().min(1).max(200),
	name_ku: stringType().max(200).nullable().optional(),
	desc_ar: stringType().max(2e3).nullable().optional(),
	desc_en: stringType().max(2e3).nullable().optional(),
	desc_ku: stringType().max(2e3).nullable().optional(),
	price: numberType().min(0).max(1e5),
	available: booleanType().default(true),
	tags: arrayType(stringType().max(40)).max(10).default([]),
	image_url: stringType().max(500).nullable().optional()
});
var upsertItem_createServerFn_handler = createServerRpc({
	id: "ecf86e130cda2e26d1e53b5c00854a1fc8c82a8bf8a30700885da474421d1aa5",
	name: "upsertItem",
	filename: "src/lib/menu.functions.ts"
}, (opts) => upsertItem.__executeServer(opts));
var upsertItem = createServerFn({ method: "POST" }).inputValidator((input) => itemInput.parse(input)).handler(upsertItem_createServerFn_handler, async ({ data }) => {
	assertMaster(data.master);
	const admin = await getAdmin();
	const { master, ...payload } = data;
	const trimmed = (payload.image_url ?? "").toString().trim();
	if (!trimmed) {
		const { data: cat } = await admin.from("menu_categories").select("slug").eq("id", payload.category_id).maybeSingle();
		payload.image_url = pickImageUrl({
			name_en: payload.name_en,
			name_ar: payload.name_ar,
			category_slug: cat?.slug ?? null
		});
	} else payload.image_url = trimmed;
	if (payload.id) {
		const { id, ...rest } = payload;
		const { error } = await admin.from("menu_items").update(rest).eq("id", id);
		if (error) throw new Error(error.message);
		return { id };
	}
	const { data: row, error } = await admin.from("menu_items").insert(payload).select("id").single();
	if (error) throw new Error(error.message);
	return { id: row.id };
});
var deleteItem_createServerFn_handler = createServerRpc({
	id: "7c04ace82ad7082809ba6120b828a6fbd0b616d7d1af218e1f1bf4bba9590471",
	name: "deleteItem",
	filename: "src/lib/menu.functions.ts"
}, (opts) => deleteItem.__executeServer(opts));
var deleteItem = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	master: stringType(),
	id: stringType().uuid()
}).parse(input)).handler(deleteItem_createServerFn_handler, async ({ data }) => {
	assertMaster(data.master);
	const { error } = await (await getAdmin()).from("menu_items").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var toggleItemAvailable_createServerFn_handler = createServerRpc({
	id: "2d00a47cc443891b5a91593aa3c9ec9843e31cf8cc8fc07f80ec99bc6c82bf64",
	name: "toggleItemAvailable",
	filename: "src/lib/menu.functions.ts"
}, (opts) => toggleItemAvailable.__executeServer(opts));
var toggleItemAvailable = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	master: stringType(),
	id: stringType().uuid(),
	available: booleanType()
}).parse(input)).handler(toggleItemAvailable_createServerFn_handler, async ({ data }) => {
	assertMaster(data.master);
	const { error } = await (await getAdmin()).from("menu_items").update({ available: data.available }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var categoryInput = objectType({
	master: stringType(),
	id: stringType().uuid().optional(),
	slug: stringType().min(1).max(60).regex(/^[a-z0-9_-]+$/),
	sort_order: numberType().int().min(0).default(0),
	emoji: stringType().max(8).nullable().optional(),
	name_ar: stringType().min(1).max(120),
	name_en: stringType().min(1).max(120),
	name_ku: stringType().max(120).nullable().optional()
});
var upsertCategory_createServerFn_handler = createServerRpc({
	id: "adfb5ddedd7279409c008ecdc21c47210a053ccdf5a7004bedda686f32181111",
	name: "upsertCategory",
	filename: "src/lib/menu.functions.ts"
}, (opts) => upsertCategory.__executeServer(opts));
var upsertCategory = createServerFn({ method: "POST" }).inputValidator((input) => categoryInput.parse(input)).handler(upsertCategory_createServerFn_handler, async ({ data }) => {
	assertMaster(data.master);
	const admin = await getAdmin();
	const { master, ...payload } = data;
	if (payload.id) {
		const { id, ...rest } = payload;
		const { error } = await admin.from("menu_categories").update(rest).eq("id", id);
		if (error) throw new Error(error.message);
		return { id };
	}
	const { data: row, error } = await admin.from("menu_categories").insert(payload).select("id").single();
	if (error) throw new Error(error.message);
	return { id: row.id };
});
var deleteCategory_createServerFn_handler = createServerRpc({
	id: "06a60c9fcc67c57b4599a3cefc353d450e90f9466bf2ebc91031bf957b7373c4",
	name: "deleteCategory",
	filename: "src/lib/menu.functions.ts"
}, (opts) => deleteCategory.__executeServer(opts));
var deleteCategory = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	master: stringType(),
	id: stringType().uuid()
}).parse(input)).handler(deleteCategory_createServerFn_handler, async ({ data }) => {
	assertMaster(data.master);
	const { error } = await (await getAdmin()).from("menu_categories").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { checkIsAdmin_createServerFn_handler, deleteCategory_createServerFn_handler, deleteItem_createServerFn_handler, getMenu_createServerFn_handler, toggleItemAvailable_createServerFn_handler, upsertCategory_createServerFn_handler, upsertItem_createServerFn_handler };
