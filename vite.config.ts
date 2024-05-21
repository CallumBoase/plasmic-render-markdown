import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["lib"] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react", 
        "react/jsx-runtime", 
        "@plasmicapp/host",
        "react-markdown",
        "rehype-highlight",
        "rehype-raw",
        "rehype-slug",
        "remark-gfm",
        "remark-toc",
        "unist-util-visit"
      ],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
