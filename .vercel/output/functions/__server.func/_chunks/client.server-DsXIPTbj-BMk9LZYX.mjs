import { t as createClient } from "./_libs/@supabase/supabase-js-DWxg1mqX.mjs";
import { t as supabase } from "./client-D9sCsIHo-nM_kbN6V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client.server-DsXIPTbj.js
function createSupabaseAdminClient() {
	const SUPABASE_URL = process.env.SUPABASE_URL;
	const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
		console.warn("[Supabase Admin] Missing process.env.SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Falling back to the local database mock client.");
		return supabase;
	}
	return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var _supabaseAdmin;
var supabaseAdmin = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
	return Reflect.get(_supabaseAdmin, prop, receiver);
} });
//#endregion
export { supabaseAdmin };
