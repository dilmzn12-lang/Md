import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

const MASTER_PASSWORD = "md1122@Aa";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — MD Restorant & Cafe" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    if (password === MASTER_PASSWORD) {
      try {
        localStorage.setItem("md_admin_bypass", "1");
      } catch {}
      toast.success("Admin dashboard unlocked.");
      navigate({ to: "/admin", replace: true });
      return;
    }
    setBusy(false);
    const message = "Incorrect master password.";
    setErr(message);
    toast.error(message);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl"
      >
        <h1 className="text-2xl font-display font-bold text-foreground">Admin Sign In</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          MD Restorant & Cafe — enter the master password
        </p>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Master Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />

        {err && <p className="mt-3 text-xs text-destructive">{err}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "..." : "Unlock Dashboard"}
        </button>

        <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            ← Back to menu
          </a>
        </p>
      </form>
    </div>
  );
}
