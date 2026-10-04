import fs from "fs";
import path from "path";

const targetPath = path.join(process.cwd(), "node_modules", "nitro", "dist", "_build", "common.mjs");

if (fs.existsSync(targetPath)) {
  let content = fs.readFileSync(targetPath, "utf8");
  let modified = false;

  if (content.includes('.sort().join("+")')) {
    content = content.replace('.sort().join("+")', '.sort().join("_")');
    modified = true;
    console.log("[patch-nitro] Replaced .sort().join('+') with .sort().join('_')");
  }

  if (content.includes("${chunk.name}+[...].mjs")) {
    content = content.replace("${chunk.name}+[...].mjs", "${chunk.name}_more.mjs");
    modified = true;
    console.log("[patch-nitro] Replaced ${chunk.name}+[...].mjs with ${chunk.name}_more.mjs");
  }

  if (modified) {
    fs.writeFileSync(targetPath, content, "utf8");
    console.log("[patch-nitro] Successfully patched Nitro for Vercel compatibility.");
  } else {
    console.log("[patch-nitro] Nitro is already patched.");
  }
} else {
  console.log("[patch-nitro] Target file not found, skipping patch.");
}
