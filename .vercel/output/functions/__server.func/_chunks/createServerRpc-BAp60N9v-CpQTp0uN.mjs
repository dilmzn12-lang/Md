import { i as TSS_SERVER_FUNCTION } from "./server-WJMo2uwj-BlZJcsvx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createServerRpc-BAp60N9v.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { createServerRpc as t };
