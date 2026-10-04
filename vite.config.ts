import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    ...(process.env.VERCEL ? { preset: "vercel" } : {}),
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
