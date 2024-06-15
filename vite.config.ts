import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker";
import * as dns from "dns";

const hash = Math.floor(Math.random() * 90000) + 10000;
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: "src/main.ts",
      preserveEntrySignatures: "exports-only",
      output: {
        format: "system",
        entryFileNames: `[name]-${hash}.js`,
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  base: "http://127.0.0.1/",
  server: {
    port: 9003,
  },
  plugins: [
    checker({
      typescript: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: "/src",
        },
      },
    }),
  ],
});
