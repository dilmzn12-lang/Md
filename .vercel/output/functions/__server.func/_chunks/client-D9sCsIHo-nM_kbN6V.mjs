import { r as createServerFn } from "./server-WJMo2uwj-BlZJcsvx.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DAomel5P-CuJYgHMQ.mjs";
import { t as createClient } from "./_libs/@supabase/supabase-js-DWxg1mqX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-D9sCsIHo.js
createServerFn({ method: "POST" }).inputValidator((input) => input).handler(createSsrRpc("3e84187ae861101d6bf7e103a63c495698c0f272e7dd1427d3d61f542531a7e2"));
function createSupabaseClient() {
	return createClient("https://tbqowydqqlidqxvunzxb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRicW93eWRxcWxpZHF4dnVuenhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODA4MTcsImV4cCI6MjA5Njc1NjgxN30.WOz0kiQwVY7nsJEJVxuEkJTRS5QU_XlBGE7MDlWzHCk", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
