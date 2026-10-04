import { r as createServerFn } from "./server-c_r2_ycx.mjs";
import { t as createServerRpc } from "./createServerRpc-D9DzUzCs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-C7uEfIqF.js
var handleMockQuery_createServerFn_handler = createServerRpc({
	id: "3e84187ae861101d6bf7e103a63c495698c0f272e7dd1427d3d61f542531a7e2",
	name: "handleMockQuery",
	filename: "src/integrations/supabase/client.ts"
}, (opts) => handleMockQuery.__executeServer(opts));
var handleMockQuery = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(handleMockQuery_createServerFn_handler, async ({ data }) => {
	try {
		const { getCategories, getItems, upsertCategory, deleteCategory, upsertItem, deleteItem, toggleItemAvailable } = await import("./local-db-CvQAcsOj.mjs");
		const { action, table, payload, eq } = data;
		if (action === "select") {
			if (table === "menu_categories") return {
				data: getCategories(),
				error: null
			};
			else if (table === "menu_items") {
				let items = getItems();
				if (eq) {
					if (eq.field === "available") items = items.filter((i) => i.available === eq.value);
					if (eq.field === "category_id") items = items.filter((i) => i.category_id === eq.value);
					if (eq.field === "id") items = items.filter((i) => i.id === eq.value);
				}
				return {
					data: items,
					error: null
				};
			}
			return {
				data: [],
				error: null
			};
		}
		if (action === "insert") {
			if (table === "menu_categories") return {
				data: upsertCategory(payload),
				error: null
			};
			else if (table === "menu_items") return {
				data: upsertItem(payload),
				error: null
			};
		}
		if (action === "update") {
			if (table === "menu_categories") return {
				data: upsertCategory({
					...payload,
					id: eq?.value
				}),
				error: null
			};
			else if (table === "menu_items") return {
				data: upsertItem({
					...payload,
					id: eq?.value
				}),
				error: null
			};
		}
		if (action === "delete") {
			if (table === "menu_categories") return {
				data: deleteCategory(eq?.value),
				error: null
			};
			else if (table === "menu_items") return {
				data: deleteItem(eq?.value),
				error: null
			};
		}
		return {
			data: null,
			error: { message: `Unsupported mock action: ${action}` }
		};
	} catch (err) {
		console.error("Mock query error:", err);
		return {
			data: null,
			error: { message: err.message || "Mock DB error" }
		};
	}
});
//#endregion
export { handleMockQuery_createServerFn_handler };
