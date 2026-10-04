import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as supabase } from "./client-C3nePkEI.mjs";
import { t as FALLBACK_SECTIONS } from "./menu-data-D0eK3kH3.mjs";
import { n as pickImageUrl, t as categoryFallbackImage } from "./menu-images-DWa5oqgz.mjs";
import { a as Search, c as Languages, i as Star, l as Instagram, n as Wifi, o as MessageCircle, r as UtensilsCrossed, s as MapPin, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BdEIC3XG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var md_logo_jpg_asset_default = {
	version: 1,
	asset_id: "e58f668a-e378-404f-b2ca-c5af7cf7d9f4",
	project_id: "017a41dc-1e2b-442f-978d-ed51ed122c11",
	url: "/src/assets/images/md_logo_1791134715732.jpg",
	r2_key: "a/v1/017a41dc-1e2b-442f-978d-ed51ed122c11/e58f668a-e378-404f-b2ca-c5af7cf7d9f4/md-logo-v3.jpg",
	original_filename: "md-logo-v3.jpg",
	size: 262762,
	content_type: "image/jpeg",
	created_at: "2026-06-13T09:44:33Z"
};
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
var fmt = (n) => n.toFixed(3);
var T = {
	en: {
		name: "MD Restorant & Cafe",
		subtitle: "Specialty Coffee & Kitchen",
		rating: "4.9 · Top rated",
		address: "Kirkuk — Cultural Center",
		wifi: "Wi-Fi",
		wifiToast: "Wi-Fi password: MDCAFFE2026",
		search: "Search the menu…",
		currency: "IQD",
		none: "No items match your search.",
		description: "Description",
		tags: "Tags",
		close: "Close",
		items: "items",
		whatsapp: "WhatsApp"
	},
	ar: {
		name: "MD Restorant & Cafe",
		subtitle: "قهوة مختصة ومطبخ",
		rating: "٤٫٩ · الأعلى تقييماً",
		address: "كركوك — المركز الثقافي",
		wifi: "واي فاي",
		wifiToast: "كلمة سر الواي فاي: MDCAFFE2026",
		search: "ابحث في القائمة…",
		currency: "د.ع",
		none: "لا توجد أصناف مطابقة لبحثك.",
		description: "الوصف",
		tags: "العلامات",
		close: "إغلاق",
		items: "صنف",
		whatsapp: "واتساب"
	},
	ku: {
		name: "MD Restorant & Cafe",
		subtitle: "قاوەی تایبەت و چێشتخانە",
		rating: "٤٫٩ · باشترین هەڵسەنگاندن",
		address: "کەرکووک — سەنتەری ڕۆشنبیری",
		wifi: "Wi-Fi",
		wifiToast: "وشەی نهێنی Wi-Fi: MDCAFFE2026",
		search: "گەڕان لە مێنیو…",
		currency: "د.ع",
		none: "هیچ بڕگەیەک نەدۆزرایەوە.",
		description: "وەسف",
		tags: "تاگەکان",
		close: "داخستن",
		items: "بڕگە",
		whatsapp: "واتساپ"
	}
};
var KU_CATEGORIES = {
	burgers: "بەرگەر",
	pizza: "پیتزا",
	sandwiches: "ساندویچ",
	western: "خواردنی ڕۆژئاوایی",
	pasta: "پاستا",
	salads: "زەڵاتە",
	crepes: "کرێپ و وەفڵ",
	fruits: "میوە",
	coffee: "قاوەی ئیتاڵی",
	hot: "خواردنەوەی گەرم",
	shakes: "میلک شەیک",
	cold: "خواردنەوەی سارد",
	soft: "خواردنەوەی گازدار",
	fresh: "شەربەتی سروشتی",
	kentucky: "کەنتەکی",
	crispy: "کرێسپی ستریپس",
	rizzo: "ڕیزۆ",
	saj: "ساجی",
	fakhar: "فەخارەکان",
	hookah: "نەرگیلەکان",
	hookah_vip: "نەرگیلەی VIP",
	hookah_fresh: "نەرگیلەی فرێش",
	shisha: "نەرگیلەکان"
};
var pickName = (obj, lang) => {
	if (lang === "en") return obj.en || obj.ar;
	if (lang === "ku") return obj.ku || obj.id && KU_CATEGORIES[obj.id] || obj.ar || obj.en;
	return obj.ar || obj.en;
};
function Index() {
	const [lang, setLang] = (0, import_react.useState)("ar");
	const [showSplash, setShowSplash] = (0, import_react.useState)(true);
	const [query, setQuery] = (0, import_react.useState)("");
	const [sections, setSections] = (0, import_react.useState)(FALLBACK_SECTIONS);
	const [active, setActive] = (0, import_react.useState)(FALLBACK_SECTIONS[0].id);
	const [open, setOpen] = (0, import_react.useState)(null);
	const [toast, setToast] = (0, import_react.useState)(null);
	const sectionRefs = (0, import_react.useRef)({});
	const navRefs = (0, import_react.useRef)({});
	const t = T[lang];
	const isRtl = lang === "ar" || lang === "ku";
	const secondaryLang = lang === "en" ? "ar" : "en";
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem("md_lang");
			if (saved === "ar" || saved === "en" || saved === "ku") {
				setLang(saved);
				setShowSplash(false);
			}
		} catch (e) {
			console.warn("Storage read failed", e);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const load = async () => {
			const [cats, items] = await Promise.all([supabase.from("menu_categories").select("*").order("sort_order"), supabase.from("menu_items").select("*").eq("available", true).order("sort_order")]);
			if (cancelled || cats.error || items.error || !cats.data) return;
			const next = cats.data.map((c) => ({
				id: c.slug,
				ar: c.name_ar,
				en: c.name_en,
				ku: c.name_ku ?? void 0,
				emoji: c.emoji ?? "🍽️",
				items: (items.data ?? []).filter((i) => i.category_id === c.id).map((i) => ({
					id: i.id,
					ar: i.name_ar,
					en: i.name_en,
					ku: i.name_ku ?? void 0,
					price: Number(i.price),
					descAr: i.desc_ar ?? void 0,
					descEn: i.desc_en ?? void 0,
					descKu: i.desc_ku ?? void 0,
					tags: i.tags ?? [],
					imageUrl: i.image_url ?? null
				}))
			})).filter((s) => s.items.length > 0);
			if (next.length > 0) {
				setSections(next);
				setActive((prev) => next.some((s) => s.id === prev) ? prev : next[0].id);
			}
		};
		load();
		const ch = supabase.channel("menu-live").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "menu_items"
		}, load).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "menu_categories"
		}, load).subscribe();
		return () => {
			cancelled = true;
			supabase.removeChannel(ch);
		};
	}, []);
	const pickLang = (l) => {
		setLang(l);
		try {
			localStorage.setItem("md_lang", l);
		} catch (e) {
			console.warn("Storage write failed", e);
		}
		setShowSplash(false);
	};
	const cycleLang = () => {
		const order = [
			"ar",
			"ku",
			"en"
		];
		const next = order[(order.indexOf(lang) + 1) % order.length];
		pickLang(next);
	};
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return sections;
		return sections.map((s) => ({
			...s,
			items: s.items.filter((i) => i.ar.toLowerCase().includes(q) || i.en.toLowerCase().includes(q) || (i.ku ?? "").toLowerCase().includes(q) || (i.descAr ?? "").toLowerCase().includes(q) || (i.descEn ?? "").toLowerCase().includes(q))
		})).filter((s) => s.items.length > 0);
	}, [query, sections]);
	(0, import_react.useEffect)(() => {
		const obs = new IntersectionObserver((entries) => {
			const v = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (v) setActive(v.target.id);
		}, {
			rootMargin: "-35% 0px -55% 0px",
			threshold: [
				0,
				.2,
				.5,
				1
			]
		});
		Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
		return () => obs.disconnect();
	}, [filtered]);
	(0, import_react.useEffect)(() => {
		const btn = navRefs.current[active];
		const container = btn?.parentElement;
		if (!btn || !container) return;
		const target = btn.offsetLeft - container.clientWidth / 2 + btn.clientWidth / 2;
		container.scrollTo({
			left: target,
			behavior: "smooth"
		});
	}, [active]);
	const scrollTo = (id) => {
		const el = sectionRefs.current[id];
		if (!el) return;
		const top = el.getBoundingClientRect().top + window.scrollY - 170;
		window.scrollTo({
			top,
			behavior: "smooth"
		});
	};
	const showToast = (msg) => {
		setToast(msg);
		setTimeout(() => setToast(null), 2600);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		dir: isRtl ? "rtl" : "ltr",
		className: "min-h-screen overflow-x-hidden bg-background text-foreground antialiased",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10 mx-auto max-w-xl px-4 pb-16 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
						className: "relative -mx-4 overflow-hidden rounded-b-3xl px-4 pb-8 pt-6 text-center",
						style: { background: "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--accent) 18%, transparent) 0%, transparent 55%), linear-gradient(160deg, oklch(0.32 0.05 130) 0%, oklch(0.24 0.045 130) 100%)" },
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pointer-events-none absolute inset-0 opacity-[0.08]",
								style: {
									backgroundImage: "radial-gradient(circle at 1px 1px, oklch(0.85 0.13 85) 1px, transparent 0)",
									backgroundSize: "18px 18px"
								}
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 292,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative mx-auto",
								style: {
									width: 120,
									height: 120,
									aspectRatio: "1 / 1"
								},
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 rounded-full bg-accent/30 blur-2xl" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 301,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative overflow-hidden rounded-full ring-4 ring-accent shadow-2xl",
									style: {
										width: 120,
										height: 120,
										aspectRatio: "1 / 1",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										padding: 0
									},
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: md_logo_jpg_asset_default.url,
										alt: "MD Restorant & Cafe",
										style: {
											display: "block",
											width: "100%",
											height: "100%",
											aspectRatio: "1 / 1",
											objectFit: "cover",
											objectPosition: "50% 50%",
											padding: 0,
											margin: 0,
											border: 0,
											transform: "scale(1.0)",
											transformOrigin: "50% 50%"
										}
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 312,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 302,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 296,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-4 text-2xl font-display font-bold tracking-tight text-white sm:text-3xl drop-shadow",
								children: "MD RESTORANT & CAFE"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1.5 text-[11px] uppercase tracking-[0.35em] text-accent font-semibold",
								children: t.subtitle
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 330,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-white/85",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-3.5 w-3.5 fill-accent text-accent" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 336,
											columnNumber: 15
										}, this),
										" ",
										t.rating
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 335,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: `inline-flex items-center gap-1.5 leading-relaxed ${isRtl ? "font-arabic" : ""}`,
									dir: isRtl ? "rtl" : "ltr",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 339,
											columnNumber: 15
										}, this),
										" ",
										t.address
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 338,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 334,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-5 flex flex-wrap justify-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => showToast(t.wifiToast),
										className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm transition hover:bg-muted hover:shadow-md",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wifi, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 345,
												columnNumber: 15
											}, this),
											" ",
											t.wifi
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 344,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: cycleLang,
										className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm transition hover:bg-muted hover:shadow-md",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Languages, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 348,
											columnNumber: 15
										}, this), lang === "ar" ? "ع" : lang === "ku" ? "ک" : "EN"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 347,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: "https://www.instagram.com/md_restorant?igsh=MWI1eXZiZW9mdW1rYQ==",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#F77737] px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:shadow-lg hover:brightness-110",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Instagram, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 352,
											columnNumber: 15
										}, this), " Instagram"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 351,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: `https://wa.me/9647709781986?text=${encodeURIComponent("Hello MD Restorant & Cafe...")}`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#1ebe57] hover:shadow-lg",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 355,
												columnNumber: 15
											}, this),
											" ",
											t.whatsapp
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 354,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 343,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 289,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "sticky top-0 z-30 -mx-4 mt-6 border-b border-border bg-background/90 px-4 pb-2 pt-3 backdrop-blur-xl",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 363,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: t.search,
								className: "w-full rounded-full border border-border bg-card py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 ps-11 pe-4"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 364,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 362,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "-mx-4 mt-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-3",
								children: filtered.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									ref: (el) => {
										navRefs.current[s.id] = el;
									},
									onClick: () => scrollTo(s.id),
									className: `shrink-0 rounded-full border px-5 py-3 text-base font-semibold transition shadow-sm ${active === s.id ? "border-primary bg-primary text-primary-foreground shadow-md" : "border-border bg-card text-foreground/70 hover:border-foreground/40 hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "me-2 text-lg",
										children: s.emoji
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 371,
										columnNumber: 19
									}, this), pickName(s, lang)]
								}, s.id, true, {
									fileName: _jsxFileName,
									lineNumber: 368,
									columnNumber: 45
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 367,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 366,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 361,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2",
						children: [
							filtered.length === 0 && /* @__PURE__ */ (void 0)("div", {
								className: "mt-16 text-center text-sm text-muted-foreground",
								children: t.none
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 380,
								columnNumber: 37
							}, this),
							filtered.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								id: s.id,
								ref: (el) => {
									sectionRefs.current[s.id] = el;
								},
								className: "scroll-mt-40 pt-8",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-3 flex items-baseline justify-between px-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "text-lg font-display font-semibold tracking-tight text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "me-2",
											children: s.emoji
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 387,
											columnNumber: 19
										}, this), pickName(s, lang)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 386,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] text-muted-foreground",
										children: [
											s.items.length,
											" ",
											t.items
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 390,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 385,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "grid grid-cols-2 gap-3",
									children: s.items.map((item) => {
										const categoryImg = categoryFallbackImage(s.id);
										const imgSrc = item.imageUrl && item.imageUrl.trim().length > 0 ? item.imageUrl : pickImageUrl({
											name_en: item.en,
											name_ar: item.ar,
											category_slug: s.id
										});
										return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											onClick: () => setOpen({
												item,
												section: s
											}),
											className: "group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-start shadow-sm transition hover:shadow-md active:scale-[0.99]",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "relative aspect-[4/3] w-full overflow-hidden bg-secondary",
												style: { backgroundImage: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 12%, var(--secondary)) 0%, var(--secondary) 100%)" },
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UtensilsCrossed, {
													"aria-hidden": true,
													className: "absolute inset-0 m-auto h-10 w-10 text-primary/30"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 411,
													columnNumber: 27
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
													src: imgSrc,
													alt: pickName(item, lang),
													loading: "lazy",
													referrerPolicy: "no-referrer",
													className: "relative h-full w-full object-cover transition group-hover:scale-[1.03]",
													onError: (e) => {
														const el = e.currentTarget;
														if (!el.dataset.fallback) {
															el.dataset.fallback = "1";
															el.src = categoryImg;
														} else el.style.display = "none";
													}
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 412,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 408,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex min-w-0 flex-1 flex-col px-3 py-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "flex items-center gap-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
																className: `truncate text-[15px] font-semibold leading-snug text-foreground ${isRtl ? "font-arabic" : ""}`,
																children: pickName(item, lang)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 424,
																columnNumber: 29
															}, this),
															item.tags?.includes("MD") && /* @__PURE__ */ (void 0)("span", {
																className: "rounded bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-accent",
																children: "MD"
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 427,
																columnNumber: 59
															}, this),
															item.tags?.includes("VIP") && /* @__PURE__ */ (void 0)("span", {
																className: "rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-primary-foreground",
																children: "VIP"
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 430,
																columnNumber: 60
															}, this),
															(item.tags?.includes("حار") || item.tags?.includes("Spicy")) && /* @__PURE__ */ (void 0)("span", {
																title: "Spicy",
																className: "text-xs",
																children: "🌶️"
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 433,
																columnNumber: 94
															}, this),
															(item.tags?.includes("نباتي") || item.tags?.includes("Veg")) && /* @__PURE__ */ (void 0)("span", {
																title: "Veg",
																className: "text-xs",
																children: "🌱"
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 436,
																columnNumber: 94
															}, this),
															(item.tags?.includes("مكسرات") || item.tags?.includes("Nuts")) && /* @__PURE__ */ (void 0)("span", {
																title: "Nuts",
																className: "text-xs",
																children: "🥜"
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 439,
																columnNumber: 96
															}, this)
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 423,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
														className: `mt-1 truncate text-[11px] text-muted-foreground ${secondaryLang === "ar" ? "font-arabic" : ""}`,
														children: pickName(item, secondaryLang)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 443,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "mt-2 flex items-baseline gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "text-base font-semibold tabular-nums text-foreground",
															children: fmt(item.price)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 447,
															columnNumber: 29
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "text-[10px] uppercase tracking-wider text-muted-foreground ms-1",
															children: t.currency
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 450,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 446,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 422,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 404,
											columnNumber: 23
										}, this) }, item.id, false, {
											fileName: _jsxFileName,
											lineNumber: 403,
											columnNumber: 22
										}, this);
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 395,
									columnNumber: 15
								}, this)]
							}, s.id, true, {
								fileName: _jsxFileName,
								lineNumber: 382,
								columnNumber: 41
							}, this)),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-12 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "gold-divider mx-auto max-w-[200px]" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 462,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
										children: "Bon Appétit · بالعافية"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 463,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: `https://wa.me/9647735148735?text=${encodeURIComponent("Hi Dilman — from MD Restorant & Cafe site")}`,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "mt-2 inline-block text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 transition hover:text-accent",
										children: "Powered by Dilman"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 466,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 461,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 379,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 287,
				columnNumber: 7
			}, this),
			toast && /* @__PURE__ */ (void 0)("div", {
				className: "fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground shadow-lg",
				children: toast
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 474,
				columnNumber: 17
			}, this),
			!showSplash && /* @__PURE__ */ (void 0)("a", {
				href: `https://wa.me/9647709781986?text=${encodeURIComponent("Hello MD Restorant & Cafe...")}`,
				target: "_blank",
				rel: "noopener noreferrer",
				"aria-label": "WhatsApp",
				className: "fixed bottom-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-white/60 transition hover:scale-105 hover:bg-[#1ebe57] end-6",
				children: /* @__PURE__ */ (void 0)(MessageCircle, {
					className: "h-7 w-7",
					strokeWidth: 2.2
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 480,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 479,
				columnNumber: 23
			}, this),
			open && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center",
				onClick: () => setOpen(null),
				children: /* @__PURE__ */ (void 0)("div", {
					dir: isRtl ? "rtl" : "ltr",
					onClick: (e) => e.stopPropagation(),
					className: "w-full max-w-lg overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl animate-in slide-in-from-bottom duration-300",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "relative p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (void 0)("button", {
								onClick: () => setOpen(null),
								"aria-label": t.close,
								className: "absolute top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted end-4",
								children: /* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 488,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 487,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
								children: [/* @__PURE__ */ (void 0)("span", { children: open.section.emoji }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 492,
									columnNumber: 17
								}, this), pickName(open.section, lang)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 491,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("h3", {
								className: "text-2xl font-display font-semibold leading-tight text-foreground",
								children: pickName(open.item, lang)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 496,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: pickName(open.item, secondaryLang)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 499,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-4 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-3xl font-bold tabular-nums text-foreground",
									children: fmt(open.item.price)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 504,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: t.currency
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 507,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 503,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { className: "gold-divider my-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 512,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("h4", {
								className: "text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground",
								children: t.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 514,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-sm leading-relaxed text-foreground/85",
								children: (lang === "en" ? open.item.descEn : lang === "ku" ? open.item.descKu ?? open.item.descAr : open.item.descAr) ?? (lang === "en" ? "A signature item from our kitchen, prepared fresh to order with the finest ingredients." : lang === "ku" ? "بڕگەیەکی تایبەت لە مێنیوەکەمان، بە باشترین پێکهاتە تازە ئامادە دەکرێت." : "صنف مميز من قائمتنا، يُحضّر طازجاً عند الطلب بأجود المكونات.")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 517,
								columnNumber: 15
							}, this),
							open.item.tags && open.item.tags.length > 0 && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground",
								children: t.tags
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 522,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "mt-2 flex flex-wrap gap-1.5",
								children: open.item.tags.map((tag) => /* @__PURE__ */ (void 0)("span", {
									className: "rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground",
									children: tag
								}, tag, false, {
									fileName: _jsxFileName,
									lineNumber: 526,
									columnNumber: 48
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 525,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 521,
								columnNumber: 63
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								onClick: () => setOpen(null),
								className: "mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:opacity-90",
								children: t.close
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 532,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 486,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 485,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 484,
				columnNumber: 16
			}, this),
			showSplash && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300",
				style: { background: "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--accent) 22%, transparent) 0%, transparent 60%), linear-gradient(160deg, oklch(0.32 0.05 130) 0%, oklch(0.22 0.045 130) 100%)" },
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.10]",
					style: {
						backgroundImage: "radial-gradient(circle at 1px 1px, oklch(0.85 0.13 85) 1px, transparent 0)",
						backgroundSize: "18px 18px"
					}
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 543,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "relative w-full max-w-sm text-center",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "relative mx-auto",
							style: {
								width: 132,
								height: 132,
								aspectRatio: "1 / 1"
							},
							children: [/* @__PURE__ */ (void 0)("div", { className: "absolute inset-0 rounded-full bg-accent/30 blur-2xl" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 553,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "relative overflow-hidden rounded-full ring-4 ring-accent shadow-2xl",
								style: {
									width: 132,
									height: 132,
									aspectRatio: "1 / 1",
									borderRadius: "50%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									padding: 0
								},
								children: /* @__PURE__ */ (void 0)("img", {
									src: md_logo_jpg_asset_default.url,
									alt: "MD Restorant & Cafe",
									style: {
										display: "block",
										width: "100%",
										height: "100%",
										aspectRatio: "1 / 1",
										objectFit: "cover",
										objectPosition: "50% 50%",
										padding: 0,
										margin: 0,
										border: 0,
										transform: "scale(1.0)",
										transformOrigin: "50% 50%"
									}
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 564,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 554,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 548,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("h2", {
							className: "mt-5 text-2xl font-display font-bold tracking-tight text-white drop-shadow",
							children: "MD RESTORANT & CAFE"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 579,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-[11px] uppercase tracking-[0.35em] text-accent font-semibold",
							children: "Choose Language · اختر اللغة"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 582,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-8 space-y-3",
							children: [
								{
									code: "ar",
									label: "العربية",
									dir: "rtl"
								},
								{
									code: "ku",
									label: "کوردی سۆرانی",
									dir: "rtl"
								},
								{
									code: "en",
									label: "English",
									dir: "ltr"
								}
							].map((o) => /* @__PURE__ */ (void 0)("button", {
								onClick: () => pickLang(o.code),
								dir: o.dir,
								className: `group flex w-full items-center justify-between rounded-full border-2 border-accent/60 bg-white/5 px-6 py-4 text-base font-semibold leading-relaxed text-white shadow-lg backdrop-blur transition hover:bg-accent hover:text-primary hover:border-accent active:scale-[0.98] ${o.dir === "rtl" ? "font-arabic" : ""}`,
								children: [/* @__PURE__ */ (void 0)("span", { children: o.label }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 599,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-xs uppercase tracking-wider text-accent group-hover:text-primary",
									children: o.code
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 600,
									columnNumber: 19
								}, this)]
							}, o.code, true, {
								fileName: _jsxFileName,
								lineNumber: 598,
								columnNumber: 23
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 585,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 547,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 540,
				columnNumber: 22
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 286,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
