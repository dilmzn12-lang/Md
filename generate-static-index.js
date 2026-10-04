import fs from "fs";
import path from "path";

const distClientDir = path.join(process.cwd(), "dist", "client");
const distDir = path.join(process.cwd(), "dist");

if (!fs.existsSync(distClientDir)) {
  console.error("[Static Index Generator] dist/client directory does not exist!");
  process.exit(1);
}

const assetsDir = path.join(distClientDir, "assets");
if (!fs.existsSync(assetsDir)) {
  console.error("[Static Index Generator] dist/client/assets directory does not exist!");
  process.exit(1);
}

// Find files
const files = fs.readdirSync(assetsDir);
const jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));
const cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));

if (!jsFile) {
  console.error("[Static Index Generator] Could not find compiled index-*.js file!");
  process.exit(1);
}

const cssLink = cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : "";

const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MD Restorant & Cafe</title>
    ${cssLink}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>`;

// Write to dist/client/index.html
fs.writeFileSync(path.join(distClientDir, "index.html"), htmlContent, "utf8");
console.log(`[Static Index Generator] Successfully wrote dist/client/index.html`);

// Write to dist/index.html
fs.writeFileSync(path.join(distDir, "index.html"), htmlContent, "utf8");
console.log(`[Static Index Generator] Successfully wrote dist/index.html`);

// Also copy the assets directory to dist/assets so that if host serves dist directly, it finds the assets!
const distAssetsDir = path.join(distDir, "assets");
if (!fs.existsSync(distAssetsDir)) {
  fs.mkdirSync(distAssetsDir, { recursive: true });
}
files.forEach((file) => {
  fs.copyFileSync(path.join(assetsDir, file), path.join(distAssetsDir, file));
});
console.log("[Static Index Generator] Successfully copied assets to dist/assets");
