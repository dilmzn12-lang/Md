import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMenu,
  upsertItem,
  deleteItem,
  toggleItemAvailable,
  upsertCategory,
  deleteCategory,
  type CategoryRow,
  type ItemRow,
} from "@/lib/menu.functions";

const MASTER_PASSWORD = "md1122@Aa";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — MD Restorant & Cafe" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const fetchMenu = useServerFn(getMenu);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("md_admin_bypass") === "1") {
      setIsAdmin(true);
    } else {
      navigate({ to: "/auth", replace: true });
    }
    setAuthChecked(true);
  }, [navigate]);

  const menuQ = useQuery({
    queryKey: ["admin-menu"],
    queryFn: () => fetchMenu(),
    enabled: isAdmin,
  });

  const fnUpsertItem = useServerFn(upsertItem);
  const fnDeleteItem = useServerFn(deleteItem);
  const fnToggle = useServerFn(toggleItemAvailable);
  const fnUpsertCat = useServerFn(upsertCategory);
  const fnDeleteCat = useServerFn(deleteCategory);

  const withMaster = <T,>(payload: T) => ({ ...(payload as any), master: MASTER_PASSWORD });

  const mUpsertItem = useMutation({
    mutationFn: (vars: { data: any }) => fnUpsertItem({ data: withMaster(vars.data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] }),
  });
  const mDeleteItem = useMutation({
    mutationFn: (vars: { data: { id: string } }) => fnDeleteItem({ data: withMaster(vars.data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] }),
  });
  const mToggle = useMutation({
    mutationFn: (vars: { data: { id: string; available: boolean } }) =>
      fnToggle({ data: withMaster(vars.data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] }),
  });
  const mUpsertCat = useMutation({
    mutationFn: (vars: { data: any }) => fnUpsertCat({ data: withMaster(vars.data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] }),
  });
  const mDeleteCat = useMutation({
    mutationFn: (vars: { data: { id: string } }) => fnDeleteCat({ data: withMaster(vars.data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-menu"] }),
  });

  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<ItemRow> | null>(null);
  const [editingCat, setEditingCat] = useState<Partial<CategoryRow> | null>(null);

  const cats = menuQ.data?.categories ?? [];
  const items = menuQ.data?.items ?? [];
  const current = useMemo(() => activeCat ?? cats[0]?.id ?? null, [activeCat, cats]);
  const visibleItems = items.filter((i) => i.category_id === current);
  const currentCat = cats.find((c) => c.id === current);

  if (!authChecked) {
    return (
      <div className="min-h-screen grid place-items-center text-muted-foreground">
        Checking admin session…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-background p-6">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-xl">
          <h1 className="text-xl font-display font-bold text-foreground">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {authError ?? "Unable to verify admin access."}
          </p>
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 rounded-full border border-border px-3 py-2 text-xs hover:bg-muted"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                try {
                  localStorage.removeItem("md_admin_bypass");
                } catch {}
                navigate({ to: "/auth", replace: true });
              }}
              className="flex-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">MD Restorant & Cafe — لوحة التحكم</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted"
            >
              View Menu
            </a>
            <button
              onClick={() => {
                try {
                  localStorage.removeItem("md_admin_bypass");
                } catch {}
                navigate({ to: "/auth" });
              }}
              className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-6 md:grid-cols-[260px_1fr]">
        {/* Categories sidebar */}
        <aside className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Categories</h2>
            <button
              onClick={() =>
                setEditingCat({
                  slug: "",
                  sort_order: cats.length,
                  emoji: "🍽️",
                  name_ar: "",
                  name_en: "",
                  name_ku: "",
                })
              }
              className="text-xs rounded-full bg-primary px-2.5 py-1 text-primary-foreground"
            >
              + Add
            </button>
          </div>
          <ul className="mt-3 space-y-1">
            {cats.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveCat(c.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                    current === c.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <span>
                    {c.emoji} {c.name_en}
                  </span>
                  <span className="text-[10px] opacity-70">
                    {items.filter((i) => i.category_id === c.id).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Items area */}
        <main className="rounded-2xl border border-border bg-card p-4">
          {currentCat && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold">
                  {currentCat.emoji} {currentCat.name_en}
                </h2>
                <p className="text-xs text-muted-foreground" dir="rtl">
                  {currentCat.name_ar}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingCat(currentCat)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted"
                >
                  Edit category
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete category "${currentCat.name_en}" and ALL its items?`)) {
                      mDeleteCat.mutate({ data: { id: currentCat.id } });
                      setActiveCat(null);
                    }
                  }}
                  className="rounded-full border border-destructive/50 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    setEditing({
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
                      tags: [],
                    })
                  }
                  className="rounded-full bg-primary px-3 py-1.5 text-xs text-primary-foreground"
                >
                  + Add item
                </button>
              </div>
            </div>
          )}

          {menuQ.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <ul className="divide-y divide-border">
              {visibleItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name_en}</span>
                      <span className="text-xs text-muted-foreground" dir="rtl">
                        {item.name_ar}
                      </span>
                      {!item.available && (
                        <span className="rounded bg-destructive/15 px-1.5 py-0.5 text-[10px] font-bold text-destructive">
                          OUT
                        </span>
                      )}
                    </div>
                    {item.desc_en && (
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {item.desc_en}
                      </p>
                    )}
                  </div>
                  <span className="tabular-nums text-sm font-semibold">
                    {Number(item.price).toFixed(3)}{" "}
                    <span className="text-[10px] text-muted-foreground">IQD</span>
                  </span>
                  <label className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={(e) =>
                        mToggle.mutate({ data: { id: item.id, available: e.target.checked } })
                      }
                    />
                    avail.
                  </label>
                  <button
                    onClick={() => setEditing(item)}
                    className="rounded-full border border-border px-2.5 py-1 text-xs hover:bg-muted"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${item.name_en}"?`))
                        mDeleteItem.mutate({ data: { id: item.id } });
                    }}
                    className="rounded-full border border-destructive/50 px-2.5 py-1 text-xs text-destructive hover:bg-destructive/10"
                  >
                    Delete
                  </button>
                </li>
              ))}
              {visibleItems.length === 0 && currentCat && (
                <li className="py-6 text-center text-sm text-muted-foreground">
                  No items yet. Click "+ Add item" to create one.
                </li>
              )}
            </ul>
          )}
        </main>
      </div>

      {editing && (
        <ItemEditor
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={async (payload) => {
            await mUpsertItem.mutateAsync({ data: payload });
            setEditing(null);
          }}
        />
      )}
      {editingCat && (
        <CategoryEditor
          initial={editingCat}
          onCancel={() => setEditingCat(null)}
          onSave={async (payload) => {
            await mUpsertCat.mutateAsync({ data: payload });
            setEditingCat(null);
          }}
        />
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function ItemEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial: Partial<ItemRow>;
  onSave: (p: any) => Promise<void>;
  onCancel: () => void;
}) {
  const [v, setV] = useState({
    id: initial.id,
    category_id: initial.category_id!,
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
    image_url: (initial as any).image_url ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold">{initial.id ? "Edit item" : "New item"}</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Field label="Name (English)">
            <input
              className="input"
              value={v.name_en}
              onChange={(e) => setV({ ...v, name_en: e.target.value })}
            />
          </Field>
          <Field label="Name (العربية)">
            <input
              dir="rtl"
              className="input"
              value={v.name_ar}
              onChange={(e) => setV({ ...v, name_ar: e.target.value })}
            />
          </Field>
          <Field label="Name (کوردی)">
            <input
              dir="rtl"
              className="input"
              value={v.name_ku}
              onChange={(e) => setV({ ...v, name_ku: e.target.value })}
            />
          </Field>
          <Field label="Price (IQD, thousands)">
            <input
              type="number"
              step="0.001"
              className="input"
              value={v.price}
              onChange={(e) => setV({ ...v, price: parseFloat(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Description (English)">
            <textarea
              rows={2}
              className="input"
              value={v.desc_en}
              onChange={(e) => setV({ ...v, desc_en: e.target.value })}
            />
          </Field>
          <Field label="Description (العربية)">
            <textarea
              rows={2}
              dir="rtl"
              className="input"
              value={v.desc_ar}
              onChange={(e) => setV({ ...v, desc_ar: e.target.value })}
            />
          </Field>
          <Field label="Description (کوردی)">
            <textarea
              rows={2}
              dir="rtl"
              className="input"
              value={v.desc_ku}
              onChange={(e) => setV({ ...v, desc_ku: e.target.value })}
            />
          </Field>
          <Field label="Tags (comma separated, e.g. MD, حار)">
            <input
              className="input"
              value={v.tags}
              onChange={(e) => setV({ ...v, tags: e.target.value })}
            />
          </Field>
          <Field label="Image URL (leave empty to auto-generate from Unsplash)">
            <input
              className="input"
              placeholder="https://… or leave blank"
              value={v.image_url}
              onChange={(e) => setV({ ...v, image_url: e.target.value })}
            />
          </Field>
          <Field label="Sort order">
            <input
              type="number"
              className="input"
              value={v.sort_order}
              onChange={(e) => setV({ ...v, sort_order: parseInt(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Available">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={v.available}
                onChange={(e) => setV({ ...v, available: e.target.checked })}
              />{" "}
              In stock
            </label>
          </Field>
        </div>
        {err && <p className="mt-3 text-xs text-destructive">{err}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-full border border-border px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setErr(null);
              try {
                await onSave({
                  ...v,
                  name_ku: v.name_ku || null,
                  desc_ar: v.desc_ar || null,
                  desc_en: v.desc_en || null,
                  desc_ku: v.desc_ku || null,
                  tags: v.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                  image_url: v.image_url?.trim() || null,
                });
              } catch (e: any) {
                setErr(e.message ?? "Save failed");
              } finally {
                setBusy(false);
              }
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
        <style>{`.input{width:100%;border:1px solid var(--border);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px;outline:none}.input:focus{border-color:var(--primary)}`}</style>
      </div>
    </div>
  );
}

function CategoryEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial: Partial<CategoryRow>;
  onSave: (p: any) => Promise<void>;
  onCancel: () => void;
}) {
  const [v, setV] = useState({
    id: initial.id,
    slug: initial.slug ?? "",
    sort_order: initial.sort_order ?? 0,
    emoji: initial.emoji ?? "🍽️",
    name_ar: initial.name_ar ?? "",
    name_en: initial.name_en ?? "",
    name_ku: initial.name_ku ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold">{initial.id ? "Edit category" : "New category"}</h3>
        <div className="mt-4 grid gap-3">
          <Field label="Slug (e.g. burgers — lowercase, no spaces)">
            <input
              className="input"
              value={v.slug}
              onChange={(e) => setV({ ...v, slug: e.target.value })}
            />
          </Field>
          <Field label="Emoji">
            <input
              className="input"
              value={v.emoji ?? ""}
              onChange={(e) => setV({ ...v, emoji: e.target.value })}
            />
          </Field>
          <Field label="Name (English)">
            <input
              className="input"
              value={v.name_en}
              onChange={(e) => setV({ ...v, name_en: e.target.value })}
            />
          </Field>
          <Field label="Name (العربية)">
            <input
              dir="rtl"
              className="input"
              value={v.name_ar}
              onChange={(e) => setV({ ...v, name_ar: e.target.value })}
            />
          </Field>
          <Field label="Name (کوردی)">
            <input
              dir="rtl"
              className="input"
              value={v.name_ku ?? ""}
              onChange={(e) => setV({ ...v, name_ku: e.target.value })}
            />
          </Field>
          <Field label="Sort order">
            <input
              type="number"
              className="input"
              value={v.sort_order}
              onChange={(e) => setV({ ...v, sort_order: parseInt(e.target.value) || 0 })}
            />
          </Field>
        </div>
        {err && <p className="mt-3 text-xs text-destructive">{err}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-full border border-border px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setErr(null);
              try {
                await onSave({ ...v, name_ku: v.name_ku || null, emoji: v.emoji || null });
              } catch (e: any) {
                setErr(e.message ?? "Save failed");
              } finally {
                setBusy(false);
              }
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
        <style>{`.input{width:100%;border:1px solid var(--border);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px;outline:none}.input:focus{border-color:var(--primary)}`}</style>
      </div>
    </div>
  );
}
