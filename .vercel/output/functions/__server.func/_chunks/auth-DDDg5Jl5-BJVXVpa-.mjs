import { i as __toESM } from "./rolldown-runtime-B4iAMlE-.mjs";
import { o as require_react } from "./_libs/@tanstack/react-query-CB0bWH69.mjs";
import { x as useNavigate } from "./_libs/@tanstack/react-router-38W8PPIM.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BWP_pAhQ.mjs";
import { n as toast } from "./_libs/sonner-B3GK1eza.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DDDg5Jl5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/auth.tsx?tsr-split=component";
var MASTER_PASSWORD = "md1122@Aa";
function AuthPage() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = (e) => {
		e.preventDefault();
		setBusy(true);
		setErr(null);
		if (password === MASTER_PASSWORD) {
			try {
				localStorage.setItem("md_admin_bypass", "1");
			} catch {}
			toast.success("Admin dashboard unlocked.");
			navigate({
				to: "/admin",
				replace: true
			});
			return;
		}
		setBusy(false);
		const message = "Incorrect master password.";
		setErr(message);
		toast.error(message);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background flex items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: submit,
			className: "w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-2xl font-display font-bold text-foreground",
					children: "Admin Sign In"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "MD Restorant & Cafe — enter the master password"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "mt-6 block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: "Master Password"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					type: "password",
					required: true,
					value: password,
					onChange: (e) => setPassword(e.target.value),
					autoFocus: true,
					className: "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 40,
					columnNumber: 9
				}, this),
				err && /* @__PURE__ */ (void 0)("p", {
					className: "mt-3 text-xs text-destructive",
					children: err
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "submit",
					disabled: busy,
					className: "mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:opacity-60",
					children: busy ? "..." : "Unlock Dashboard"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-6 text-center text-[10px] uppercase tracking-widest text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "hover:text-foreground",
						children: "← Back to menu"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 31,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthPage as component };
