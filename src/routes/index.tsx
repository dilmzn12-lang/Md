import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  X,
  Languages,
  Wifi,
  MapPin,
  Star,
  Instagram,
  MessageCircle,
  UtensilsCrossed,
} from "lucide-react";
import mdLogo from "@/assets/md-logo.jpg.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { pickImageUrl, categoryFallbackImage } from "@/lib/menu-images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MD Restorant & Cafe — Digital Menu" },
      {
        name: "description",
        content: "MD Restorant & Cafe — كركوك، المركز الثقافي. قائمة الطعام والمشروبات الرقمية.",
      },
      { property: "og:title", content: "MD Restorant & Cafe — Digital Menu" },
      {
        property: "og:description",
        content: "MD Restorant & Cafe — Kirkuk Cultural Center. Full digital food & drinks menu.",
      },
    ],
  }),
  component: Index,
});

type Item = {
  id: string;
  ar: string;
  en: string;
  ku?: string;
  price: number; // in thousands
  descAr?: string;
  descEn?: string;
  descKu?: string;
  tags?: string[];
  available?: boolean;
  imageUrl?: string | null;
};
type Section = { id: string; ar: string; en: string; ku?: string; emoji: string; items: Item[] };

const fmt = (n: number) => n.toFixed(3);

import { FALLBACK_SECTIONS } from "@/lib/menu-data";

type Lang = "ar" | "en" | "ku";

const T: Record<
  Lang,
  {
    name: string;
    subtitle: string;
    rating: string;
    address: string;
    wifi: string;
    wifiToast: string;
    search: string;
    currency: string;
    none: string;
    description: string;
    tags: string;
    close: string;
    items: string;
    whatsapp: string;
  }
> = {
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
    whatsapp: "WhatsApp",
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
    whatsapp: "واتساب",
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
    whatsapp: "واتساپ",
  },
};

// Kurdish Sorani overrides for known category slugs (used when DB has no name_ku)
const KU_CATEGORIES: Record<string, string> = {
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
  shisha: "نەرگیلەکان",
};

const pickName = (obj: { ar: string; en: string; ku?: string; id?: string }, lang: Lang) => {
  if (lang === "en") return obj.en || obj.ar;
  if (lang === "ku") return obj.ku || (obj.id && KU_CATEGORIES[obj.id]) || obj.ar || obj.en;
  return obj.ar || obj.en;
};

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  const [showSplash, setShowSplash] = useState(true);
  const [query, setQuery] = useState("");
  const [sections, setSections] = useState<Section[]>(FALLBACK_SECTIONS);
  const [active, setActive] = useState(FALLBACK_SECTIONS[0].id);
  const [open, setOpen] = useState<{ item: Item; section: Section } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const t = T[lang];
  const isRtl = lang === "ar" || lang === "ku";
  const secondaryLang: Lang = lang === "en" ? "ar" : "en";

  useEffect(() => {
    try {
      const saved = localStorage.getItem("md_lang") as Lang | null;
      if (saved === "ar" || saved === "en" || saved === "ku") {
        setLang(saved);
        setShowSplash(false);
      }
    } catch (e) {
      console.warn("Storage read failed", e);
    }
  }, []);

  // Live menu from database
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [cats, items] = await Promise.all([
        supabase.from("menu_categories").select("*").order("sort_order"),
        supabase.from("menu_items").select("*").eq("available", true).order("sort_order"),
      ]);
      if (cancelled || cats.error || items.error || !cats.data) return;

      interface DbCategory {
        id: string;
        slug: string;
        sort_order: number;
        emoji: string | null;
        name_ar: string;
        name_en: string;
        name_ku: string | null;
      }
      interface DbItem {
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
      }

      const next: Section[] = (cats.data as unknown as DbCategory[])
        .map((c) => ({
          id: c.slug,
          ar: c.name_ar,
          en: c.name_en,
          ku: c.name_ku ?? undefined,
          emoji: c.emoji ?? "🍽️",
          items: ((items.data as unknown as DbItem[]) ?? [])
            .filter((i) => i.category_id === c.id)
            .map((i) => ({
              id: i.id,
              ar: i.name_ar,
              en: i.name_en,
              ku: i.name_ku ?? undefined,
              price: Number(i.price),
              descAr: i.desc_ar ?? undefined,
              descEn: i.desc_en ?? undefined,
              descKu: i.desc_ku ?? undefined,
              tags: i.tags ?? [],
              imageUrl: i.image_url ?? null,
            })),
        }))
        .filter((s) => s.items.length > 0);
      if (next.length > 0) {
        setSections(next);
        setActive((prev) => (next.some((s) => s.id === prev) ? prev : next[0].id));
      }
    };
    load();
    const ch = supabase
      .channel("menu-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_categories" }, load)
      .subscribe();
    return () => {
      cancelled = true;
      supabase.removeChannel(ch);
    };
  }, []);

  const pickLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("md_lang", l);
    } catch (e) {
      console.warn("Storage write failed", e);
    }
    setShowSplash(false);
  };

  const cycleLang = () => {
    const order: Lang[] = ["ar", "ku", "en"];
    const next = order[(order.indexOf(lang) + 1) % order.length];
    pickLang(next);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((s: Section) => ({
        ...s,
        items: s.items.filter(
          (i: Item) =>
            i.ar.toLowerCase().includes(q) ||
            i.en.toLowerCase().includes(q) ||
            (i.ku ?? "").toLowerCase().includes(q) ||
            (i.descAr ?? "").toLowerCase().includes(q) ||
            (i.descEn ?? "").toLowerCase().includes(q),
        ),
      }))
      .filter((s: Section) => s.items.length > 0);
  }, [query, sections]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  useEffect(() => {
    const btn = navRefs.current[active];
    const container = btn?.parentElement;
    if (!btn || !container) return;
    // Only scroll the horizontal nav container — never the window/document.
    const target = btn.offsetLeft - container.clientWidth / 2 + btn.clientWidth / 2;
    container.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 170;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased"
    >
      <div className="relative z-10 mx-auto max-w-xl px-4 pb-16 pt-8">
        {/* Premium olive header */}
        <header
          className="relative -mx-4 overflow-hidden rounded-b-3xl px-4 pb-8 pt-6 text-center"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--accent) 18%, transparent) 0%, transparent 55%), linear-gradient(160deg, oklch(0.32 0.05 130) 0%, oklch(0.24 0.045 130) 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, oklch(0.85 0.13 85) 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
          <div
            className="relative mx-auto"
            style={{ width: 120, height: 120, aspectRatio: "1 / 1" }}
          >
            <div className="absolute inset-0 rounded-full bg-accent/30 blur-2xl" />
            <div
              className="relative overflow-hidden rounded-full ring-4 ring-accent shadow-2xl"
              style={{
                width: 120,
                height: 120,
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <img
                src={mdLogo.url}
                alt="MD Restorant & Cafe"
                style={{
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
                  transformOrigin: "50% 50%",
                }}
              />
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-display font-bold tracking-tight text-white sm:text-3xl drop-shadow">
            MD RESTORANT & CAFE
          </h1>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.35em] text-accent font-semibold">
            {t.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {t.rating}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 leading-relaxed ${isRtl ? "font-arabic" : ""}`}
              dir={isRtl ? "rtl" : "ltr"}
            >
              <MapPin className="h-3.5 w-3.5" /> {t.address}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => showToast(t.wifiToast)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm transition hover:bg-muted hover:shadow-md"
            >
              <Wifi className="h-3.5 w-3.5" /> {t.wifi}
            </button>
            <button
              onClick={cycleLang}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm transition hover:bg-muted hover:shadow-md"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "ar" ? "ع" : lang === "ku" ? "ک" : "EN"}
            </button>
            <a
              href="https://www.instagram.com/md_restorant?igsh=MWI1eXZiZW9mdW1rYQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#F77737] px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:shadow-lg hover:brightness-110"
            >
              <Instagram className="h-3.5 w-3.5" /> Instagram
            </a>
            <a
              href={`https://wa.me/9647709781986?text=${encodeURIComponent("Hello MD Restorant & Cafe...")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#1ebe57] hover:shadow-lg"
            >
              <MessageCircle className="h-3.5 w-3.5" /> {t.whatsapp}
            </a>
          </div>
        </header>

        {/* Sticky search + categories */}
        <div className="sticky top-0 z-30 -mx-4 mt-6 border-b border-border bg-background/90 px-4 pb-2 pt-3 backdrop-blur-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="w-full rounded-full border border-border bg-card py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 ps-11 pe-4"
            />
          </div>
          <div className="-mx-4 mt-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3">
              {filtered.map((s: Section) => (
                <button
                  key={s.id}
                  ref={(el) => {
                    navRefs.current[s.id] = el;
                  }}
                  onClick={() => scrollTo(s.id)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-base font-semibold transition shadow-sm ${
                    active === s.id
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-card text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <span className="me-2 text-lg">{s.emoji}</span>
                  {pickName(s, lang)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-2">
          {filtered.length === 0 && (
            <div className="mt-16 text-center text-sm text-muted-foreground">{t.none}</div>
          )}

          {filtered.map((s: Section) => (
            <section
              key={s.id}
              id={s.id}
              ref={(el) => {
                sectionRefs.current[s.id] = el;
              }}
              className="scroll-mt-40 pt-8"
            >
              <div className="mb-3 flex items-baseline justify-between px-1">
                <h2 className="text-lg font-display font-semibold tracking-tight text-foreground">
                  <span className="me-2">{s.emoji}</span>
                  {pickName(s, lang)}
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  {s.items.length} {t.items}
                </span>
              </div>

              <ul className="grid grid-cols-2 gap-3">
                {s.items.map((item: Item) => {
                  const categoryImg = categoryFallbackImage(s.id);
                  const imgSrc =
                    item.imageUrl && item.imageUrl.trim().length > 0
                      ? item.imageUrl
                      : pickImageUrl({ name_en: item.en, name_ar: item.ar, category_slug: s.id });
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setOpen({ item, section: s })}
                        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-start shadow-sm transition hover:shadow-md active:scale-[0.99]"
                      >
                        <div
                          className="relative aspect-[4/3] w-full overflow-hidden bg-secondary"
                          style={{
                            backgroundImage:
                              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 12%, var(--secondary)) 0%, var(--secondary) 100%)",
                          }}
                        >
                          <UtensilsCrossed
                            aria-hidden
                            className="absolute inset-0 m-auto h-10 w-10 text-primary/30"
                          />
                          <img
                            src={imgSrc}
                            alt={pickName(item, lang)}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="relative h-full w-full object-cover transition group-hover:scale-[1.03]"
                            onError={(e) => {
                              const el = e.currentTarget as HTMLImageElement;
                              if (!el.dataset.fallback) {
                                el.dataset.fallback = "1";
                                el.src = categoryImg;
                              } else {
                                el.style.display = "none";
                              }
                            }}
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col px-3 py-3">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`truncate text-[15px] font-semibold leading-snug text-foreground ${isRtl ? "font-arabic" : ""}`}
                            >
                              {pickName(item, lang)}
                            </h3>
                            {item.tags?.includes("MD") && (
                              <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-accent">
                                MD
                              </span>
                            )}
                            {item.tags?.includes("VIP") && (
                              <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-primary-foreground">
                                VIP
                              </span>
                            )}
                            {(item.tags?.includes("حار") || item.tags?.includes("Spicy")) && (
                              <span title="Spicy" className="text-xs">
                                🌶️
                              </span>
                            )}
                            {(item.tags?.includes("نباتي") || item.tags?.includes("Veg")) && (
                              <span title="Veg" className="text-xs">
                                🌱
                              </span>
                            )}
                            {(item.tags?.includes("مكسرات") || item.tags?.includes("Nuts")) && (
                              <span title="Nuts" className="text-xs">
                                🥜
                              </span>
                            )}
                          </div>
                          <p
                            className={`mt-1 truncate text-[11px] text-muted-foreground ${secondaryLang === "ar" ? "font-arabic" : ""}`}
                          >
                            {pickName(item, secondaryLang)}
                          </p>
                          <div className="mt-2 flex items-baseline gap-1">
                            <span className="text-base font-semibold tabular-nums text-foreground">
                              {fmt(item.price)}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground ms-1">
                              {t.currency}
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <div className="mt-12 text-center">
            <div className="gold-divider mx-auto max-w-[200px]" />
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Bon Appétit · بالعافية
            </p>
            <a
              href={`https://wa.me/9647735148735?text=${encodeURIComponent("Hi Dilman — from MD Restorant & Cafe site")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 transition hover:text-accent"
            >
              Powered by Dilman
            </a>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground shadow-lg">
          {toast}
        </div>
      )}

      {/* Floating WhatsApp button */}
      {!showSplash && (
        <a
          href={`https://wa.me/9647709781986?text=${encodeURIComponent("Hello MD Restorant & Cafe...")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="fixed bottom-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-white/60 transition hover:scale-105 hover:bg-[#1ebe57] end-6"
        >
          <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
        </a>
      )}

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
          onClick={() => setOpen(null)}
        >
          <div
            dir={isRtl ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl animate-in slide-in-from-bottom duration-300"
          >
            <div className="relative p-6 sm:p-8">
              <button
                onClick={() => setOpen(null)}
                aria-label={t.close}
                className="absolute top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted end-4"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <span>{open.section.emoji}</span>
                {pickName(open.section, lang)}
              </div>

              <h3 className="text-2xl font-display font-semibold leading-tight text-foreground">
                {pickName(open.item, lang)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {pickName(open.item, secondaryLang)}
              </p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold tabular-nums text-foreground">
                  {fmt(open.item.price)}
                </span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t.currency}
                </span>
              </div>

              <div className="gold-divider my-5" />

              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                {t.description}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                {(lang === "en"
                  ? open.item.descEn
                  : lang === "ku"
                    ? (open.item.descKu ?? open.item.descAr)
                    : open.item.descAr) ??
                  (lang === "en"
                    ? "A signature item from our kitchen, prepared fresh to order with the finest ingredients."
                    : lang === "ku"
                      ? "بڕگەیەکی تایبەت لە مێنیوەکەمان، بە باشترین پێکهاتە تازە ئامادە دەکرێت."
                      : "صنف مميز من قائمتنا، يُحضّر طازجاً عند الطلب بأجود المكونات.")}
              </p>

              {open.item.tags && open.item.tags.length > 0 && (
                <>
                  <h4 className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                    {t.tags}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {open.item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={() => setOpen(null)}
                className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language splash */}
      {showSplash && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--accent) 22%, transparent) 0%, transparent 60%), linear-gradient(160deg, oklch(0.32 0.05 130) 0%, oklch(0.22 0.045 130) 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, oklch(0.85 0.13 85) 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative w-full max-w-sm text-center">
            <div
              className="relative mx-auto"
              style={{ width: 132, height: 132, aspectRatio: "1 / 1" }}
            >
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-2xl" />
              <div
                className="relative overflow-hidden rounded-full ring-4 ring-accent shadow-2xl"
                style={{
                  width: 132,
                  height: 132,
                  aspectRatio: "1 / 1",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                <img
                  src={mdLogo.url}
                  alt="MD Restorant & Cafe"
                  style={{
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
                    transformOrigin: "50% 50%",
                  }}
                />
              </div>
            </div>
            <h2 className="mt-5 text-2xl font-display font-bold tracking-tight text-white drop-shadow">
              MD RESTORANT & CAFE
            </h2>
            <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-accent font-semibold">
              Choose Language · اختر اللغة
            </p>
            <div className="mt-8 space-y-3">
              {[
                { code: "ar" as Lang, label: "العربية", dir: "rtl" },
                { code: "ku" as Lang, label: "کوردی سۆرانی", dir: "rtl" },
                { code: "en" as Lang, label: "English", dir: "ltr" },
              ].map((o) => (
                <button
                  key={o.code}
                  onClick={() => pickLang(o.code)}
                  dir={o.dir}
                  className={`group flex w-full items-center justify-between rounded-full border-2 border-accent/60 bg-white/5 px-6 py-4 text-base font-semibold leading-relaxed text-white shadow-lg backdrop-blur transition hover:bg-accent hover:text-primary hover:border-accent active:scale-[0.98] ${o.dir === "rtl" ? "font-arabic" : ""}`}
                >
                  <span>{o.label}</span>
                  <span className="text-xs uppercase tracking-wider text-accent group-hover:text-primary">
                    {o.code}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
