import { i as __toESM } from "../_runtime.mjs";
import { i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react_tanstack__react-query.mjs";
import { G as isRedirect, S as useRouter, x as useNavigate } from "../_libs/@tanstack/react-router_more.mjs";
import { r as createServerFn } from "./server-c_r2_ycx.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BUUR9oCj.mjs";
import { a as stringType, i as objectType, n as booleanType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-foBnVJ5J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var getMenu = createServerFn({ method: "GET" }).handler(createSsrRpc("1c04d822b98b11d5be2c383fbd127f3a75656f0d804dd7d343a3243513a015be"));
createServerFn({ method: "POST" }).inputValidator((input) => objectType({ master: stringType() }).parse(input)).handler(createSsrRpc("9adaa779d70b77cadd8e8c1fe634765b7cebb25687608b7892228aa4a7b82030"));
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
var upsertItem = createServerFn({ method: "POST" }).inputValidator((input) => itemInput.parse(input)).handler(createSsrRpc("ecf86e130cda2e26d1e53b5c00854a1fc8c82a8bf8a30700885da474421d1aa5"));
var deleteItem = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	master: stringType(),
	id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("7c04ace82ad7082809ba6120b828a6fbd0b616d7d1af218e1f1bf4bba9590471"));
var toggleItemAvailable = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	master: stringType(),
	id: stringType().uuid(),
	available: booleanType()
}).parse(input)).handler(createSsrRpc("2d00a47cc443891b5a91593aa3c9ec9843e31cf8cc8fc07f80ec99bc6c82bf64"));
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
var upsertCategory = createServerFn({ method: "POST" }).inputValidator((input) => categoryInput.parse(input)).handler(createSsrRpc("adfb5ddedd7279409c008ecdc21c47210a053ccdf5a7004bedda686f32181111"));
var deleteCategory = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	master: stringType(),
	id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("06a60c9fcc67c57b4599a3cefc353d450e90f9466bf2ebc91031bf957b7373c4"));
var _jsxFileName = "/app/applet/src/routes/admin.tsx?tsr-split=component";
var MASTER_PASSWORD = "md1122@Aa";
function AdminPage() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [authChecked, setAuthChecked] = (0, import_react.useState)(false);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [authError, setAuthError] = (0, import_react.useState)(null);
	const fetchMenu = useServerFn(getMenu);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (localStorage.getItem("md_admin_bypass") === "1") setIsAdmin(true);
		else navigate({
			to: "/auth",
			replace: true
		});
		setAuthChecked(true);
	}, [navigate]);
	const menuQ = useQuery({
		queryKey: ["admin-menu"],
		queryFn: () => fetchMenu(),
		enabled: isAdmin
	});
	const fnUpsertItem = useServerFn(upsertItem);
	const fnDeleteItem = useServerFn(deleteItem);
	const fnToggle = useServerFn(toggleItemAvailable);
	const fnUpsertCat = useServerFn(upsertCategory);
	const fnDeleteCat = useServerFn(deleteCategory);
	const withMaster = (payload) => ({
		...payload,
		master: MASTER_PASSWORD
	});
	const mUpsertItem = useMutation({
		mutationFn: (vars) => fnUpsertItem({ data: withMaster(vars.data) }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] })
	});
	const mDeleteItem = useMutation({
		mutationFn: (vars) => fnDeleteItem({ data: withMaster(vars.data) }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] })
	});
	const mToggle = useMutation({
		mutationFn: (vars) => fnToggle({ data: withMaster(vars.data) }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] })
	});
	const mUpsertCat = useMutation({
		mutationFn: (vars) => fnUpsertCat({ data: withMaster(vars.data) }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] })
	});
	const mDeleteCat = useMutation({
		mutationFn: (vars) => fnDeleteCat({ data: withMaster(vars.data) }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] })
	});
	const [activeCat, setActiveCat] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [editingCat, setEditingCat] = (0, import_react.useState)(null);
	const cats = menuQ.data?.categories ?? [];
	const items = menuQ.data?.items ?? [];
	const current = (0, import_react.useMemo)(() => activeCat ?? cats[0]?.id ?? null, [activeCat, cats]);
	const visibleItems = items.filter((i) => i.category_id === current);
	const currentCat = cats.find((c) => c.id === current);
	if (!authChecked) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen grid place-items-center text-muted-foreground",
		children: "Checking admin session…"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 106,
		columnNumber: 12
	}, this);
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen grid place-items-center bg-background p-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-display font-bold text-foreground",
					children: "Admin access required"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 113,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: authError ?? "Unable to verify admin access."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => window.location.reload(),
						className: "flex-1 rounded-full border border-border px-3 py-2 text-xs hover:bg-muted",
						children: "Try Again"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							try {
								localStorage.removeItem("md_admin_bypass");
							} catch {}
							navigate({
								to: "/auth",
								replace: true
							});
						},
						className: "flex-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground",
						children: "Sign In"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 117,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 112,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 111,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "border-b border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-xl font-display font-bold text-foreground",
						children: "Admin Dashboard"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "MD Restorant & Cafe — لوحة التحكم"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 141,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 139,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "/",
							className: "rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted",
							children: "View Menu"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => {
								try {
									localStorage.removeItem("md_admin_bypass");
								} catch {}
								navigate({ to: "/auth" });
							},
							className: "rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted",
							children: "Sign Out"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 147,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 143,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 138,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 137,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto grid max-w-6xl gap-6 px-6 py-6 md:grid-cols-[260px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-sm font-semibold",
							children: "Categories"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setEditingCat({
								slug: "",
								sort_order: cats.length,
								emoji: "🍽️",
								name_ar: "",
								name_en: "",
								name_ku: ""
							}),
							className: "text-xs rounded-full bg-primary px-2.5 py-1 text-primary-foreground",
							children: "+ Add"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 166,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-3 space-y-1",
						children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setActiveCat(c.id),
							className: `flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${current === c.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								c.emoji,
								" ",
								c.name_en
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] opacity-70",
								children: items.filter((i) => i.category_id === c.id).length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 179,
							columnNumber: 17
						}, this) }, c.id, false, {
							fileName: _jsxFileName,
							lineNumber: 178,
							columnNumber: 28
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 177,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [currentCat && /* @__PURE__ */ (void 0)("div", {
						className: "mb-4 flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-lg font-semibold",
							children: [
								currentCat.emoji,
								" ",
								currentCat.name_en
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							dir: "rtl",
							children: currentCat.name_ar
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => setEditingCat(currentCat),
									className: "rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted",
									children: "Edit category"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => {
										if (confirm(`Delete category "${currentCat.name_en}" and ALL its items?`)) {
											mDeleteCat.mutate({ data: { id: currentCat.id } });
											setActiveCat(null);
										}
									},
									className: "rounded-full border border-destructive/50 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10",
									children: "Delete"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 206,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => setEditing({
										category_id: currentCat.id,
										sort_order: visibleItems.length,
										name_ar: "",
										name_en: "",
										name_ku: "",
										desc_ar: "",
										desc_en: "",
										desc_ku: "",
										price: 0,
										available: true,
										tags: []
									}),
									className: "rounded-full bg-primary px-3 py-1.5 text-xs text-primary-foreground",
									children: "+ Add item"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 218,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 202,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 193,
						columnNumber: 26
					}, this), menuQ.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading…"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 30
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "divide-y divide-border",
						children: [visibleItems.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex items-center gap-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-medium",
												children: item.name_en
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 240,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs text-muted-foreground",
												dir: "rtl",
												children: item.name_ar
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 241,
												columnNumber: 23
											}, this),
											!item.available && /* @__PURE__ */ (void 0)("span", {
												className: "rounded bg-destructive/15 px-1.5 py-0.5 text-[10px] font-bold text-destructive",
												children: "OUT"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 244,
												columnNumber: 43
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 239,
										columnNumber: 21
									}, this), item.desc_en && /* @__PURE__ */ (void 0)("p", {
										className: "mt-0.5 truncate text-xs text-muted-foreground",
										children: item.desc_en
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 248,
										columnNumber: 38
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "tabular-nums text-sm font-semibold",
									children: [
										Number(item.price).toFixed(3),
										" ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] text-muted-foreground",
											children: "IQD"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 254,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "flex items-center gap-1 text-[11px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "checkbox",
										checked: item.available,
										onChange: (e) => mToggle.mutate({ data: {
											id: item.id,
											available: e.target.checked
										} })
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 257,
										columnNumber: 21
									}, this), "avail."]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 256,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setEditing(item),
									className: "rounded-full border border-border px-2.5 py-1 text-xs hover:bg-muted",
									children: "Edit"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 265,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => {
										if (confirm(`Delete "${item.name_en}"?`)) mDeleteItem.mutate({ data: { id: item.id } });
									},
									className: "rounded-full border border-destructive/50 px-2.5 py-1 text-xs text-destructive hover:bg-destructive/10",
									children: "Delete"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 268,
									columnNumber: 19
								}, this)
							]
						}, item.id, true, {
							fileName: _jsxFileName,
							lineNumber: 237,
							columnNumber: 41
						}, this)), visibleItems.length === 0 && currentCat && /* @__PURE__ */ (void 0)("li", {
							className: "py-6 text-center text-sm text-muted-foreground",
							children: "No items yet. Click \"+ Add item\" to create one."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 278,
							columnNumber: 59
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 90
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 161,
				columnNumber: 7
			}, this),
			editing && /* @__PURE__ */ (void 0)(ItemEditor, {
				initial: editing,
				onCancel: () => setEditing(null),
				onSave: async (payload) => {
					await mUpsertItem.mutateAsync({ data: payload });
					setEditing(null);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 285,
				columnNumber: 19
			}, this),
			editingCat && /* @__PURE__ */ (void 0)(CategoryEditor, {
				initial: editingCat,
				onCancel: () => setEditingCat(null),
				onSave: async (payload) => {
					await mUpsertCat.mutateAsync({ data: payload });
					setEditingCat(null);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 291,
				columnNumber: 22
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 136,
		columnNumber: 10
	}, this);
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 307,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-1",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 310,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 306,
		columnNumber: 10
	}, this);
}
function ItemEditor({ initial, onSave, onCancel }) {
	const [v, setV] = (0, import_react.useState)({
		id: initial.id,
		category_id: initial.category_id,
		sort_order: initial.sort_order ?? 0,
		name_ar: initial.name_ar ?? "",
		name_en: initial.name_en ?? "",
		name_ku: initial.name_ku ?? "",
		desc_ar: initial.desc_ar ?? "",
		desc_en: initial.desc_en ?? "",
		desc_ku: initial.desc_ku ?? "",
		price: Number(initial.price ?? 0),
		available: initial.available ?? true,
		tags: (initial.tags ?? []).join(", "),
		image_url: initial.image_url ?? ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
		onClick: onCancel,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-lg font-semibold",
					children: initial.id ? "Edit item" : "New item"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 341,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Name (English)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: "input",
								value: v.name_en,
								onChange: (e) => setV({
									...v,
									name_en: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 343,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Name (العربية)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								dir: "rtl",
								className: "input",
								value: v.name_ar,
								onChange: (e) => setV({
									...v,
									name_ar: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 350,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 349,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Name (کوردی)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								dir: "rtl",
								className: "input",
								value: v.name_ku,
								onChange: (e) => setV({
									...v,
									name_ku: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 356,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 355,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Price (IQD, thousands)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								step: "0.001",
								className: "input",
								value: v.price,
								onChange: (e) => setV({
									...v,
									price: parseFloat(e.target.value) || 0
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 362,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 361,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Description (English)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								rows: 2,
								className: "input",
								value: v.desc_en,
								onChange: (e) => setV({
									...v,
									desc_en: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 368,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 367,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Description (العربية)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								rows: 2,
								dir: "rtl",
								className: "input",
								value: v.desc_ar,
								onChange: (e) => setV({
									...v,
									desc_ar: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 374,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 373,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Description (کوردی)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								rows: 2,
								dir: "rtl",
								className: "input",
								value: v.desc_ku,
								onChange: (e) => setV({
									...v,
									desc_ku: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 380,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 379,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Tags (comma separated, e.g. MD, حار)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: "input",
								value: v.tags,
								onChange: (e) => setV({
									...v,
									tags: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 386,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 385,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Image URL (leave empty to auto-generate from Unsplash)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: "input",
								placeholder: "https://… or leave blank",
								value: v.image_url,
								onChange: (e) => setV({
									...v,
									image_url: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 392,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 391,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Sort order",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								className: "input",
								value: v.sort_order,
								onChange: (e) => setV({
									...v,
									sort_order: parseInt(e.target.value) || 0
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 398,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 397,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Available",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "checkbox",
										checked: v.available,
										onChange: (e) => setV({
											...v,
											available: e.target.checked
										})
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 405,
										columnNumber: 15
									}, this),
									" ",
									"In stock"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 404,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 403,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 342,
					columnNumber: 9
				}, this),
				err && /* @__PURE__ */ (void 0)("p", {
					className: "mt-3 text-xs text-destructive",
					children: err
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 413,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: onCancel,
						className: "rounded-full border border-border px-4 py-2 text-sm",
						children: "Cancel"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 415,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						disabled: busy,
						onClick: async () => {
							setBusy(true);
							setErr(null);
							try {
								await onSave({
									...v,
									name_ku: v.name_ku || null,
									desc_ar: v.desc_ar || null,
									desc_en: v.desc_en || null,
									desc_ku: v.desc_ku || null,
									tags: v.tags.split(",").map((t) => t.trim()).filter(Boolean),
									image_url: v.image_url?.trim() || null
								});
							} catch (e) {
								setErr(e.message ?? "Save failed");
							} finally {
								setBusy(false);
							}
						},
						className: "rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: busy ? "Saving…" : "Save"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 418,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 414,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", { children: `.input{width:100%;border:1px solid var(--border);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px;outline:none}.input:focus{border-color:var(--primary)}` }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 440,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 340,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 339,
		columnNumber: 10
	}, this);
}
function CategoryEditor({ initial, onSave, onCancel }) {
	const [v, setV] = (0, import_react.useState)({
		id: initial.id,
		slug: initial.slug ?? "",
		sort_order: initial.sort_order ?? 0,
		emoji: initial.emoji ?? "🍽️",
		name_ar: initial.name_ar ?? "",
		name_en: initial.name_en ?? "",
		name_ku: initial.name_ku ?? ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
		onClick: onCancel,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-lg font-semibold",
					children: initial.id ? "Edit category" : "New category"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 466,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Slug (e.g. burgers — lowercase, no spaces)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: "input",
								value: v.slug,
								onChange: (e) => setV({
									...v,
									slug: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 469,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 468,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Emoji",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: "input",
								value: v.emoji ?? "",
								onChange: (e) => setV({
									...v,
									emoji: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 475,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 474,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Name (English)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: "input",
								value: v.name_en,
								onChange: (e) => setV({
									...v,
									name_en: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 481,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 480,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Name (العربية)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								dir: "rtl",
								className: "input",
								value: v.name_ar,
								onChange: (e) => setV({
									...v,
									name_ar: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 487,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 486,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Name (کوردی)",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								dir: "rtl",
								className: "input",
								value: v.name_ku ?? "",
								onChange: (e) => setV({
									...v,
									name_ku: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 493,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 492,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Sort order",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								className: "input",
								value: v.sort_order,
								onChange: (e) => setV({
									...v,
									sort_order: parseInt(e.target.value) || 0
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 499,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 498,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 467,
					columnNumber: 9
				}, this),
				err && /* @__PURE__ */ (void 0)("p", {
					className: "mt-3 text-xs text-destructive",
					children: err
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 505,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: onCancel,
						className: "rounded-full border border-border px-4 py-2 text-sm",
						children: "Cancel"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 507,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						disabled: busy,
						onClick: async () => {
							setBusy(true);
							setErr(null);
							try {
								await onSave({
									...v,
									name_ku: v.name_ku || null,
									emoji: v.emoji || null
								});
							} catch (e) {
								setErr(e.message ?? "Save failed");
							} finally {
								setBusy(false);
							}
						},
						className: "rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: busy ? "Saving…" : "Save"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 510,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 506,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", { children: `.input{width:100%;border:1px solid var(--border);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px;outline:none}.input:focus{border-color:var(--primary)}` }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 528,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 465,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 464,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPage as component };
