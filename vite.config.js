import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { ROUTES } from "./src/data/routes.js";

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * Writes a real HTML file for every page address (courses/index.html, …),
 * each with its own title and description. Links that are shared or opened
 * directly therefore work on any static host, with no server rewrite rules.
 */
function staticRoutes() {
  return {
    name: "static-routes",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const index = bundle["index.html"];
      if (!index) return;
      const base = String(index.source);

      for (const route of ROUTES) {
        const depth = route.path.split("/").filter(Boolean).length;
        const up = depth ? "../".repeat(depth) : "./";
        const title = escape(route.title);
        const description = escape(route.description);

        const html = base
          .replace(/(src|href)="\.\//g, `$1="${up}`)
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
          .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
          .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`);

        if (depth === 0) index.source = html;
        else this.emitFile({ type: "asset", fileName: `${route.path.slice(1)}index.html`, source: html });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticRoutes()],
  // Relative asset paths so the build works from any folder or sub-path.
  base: "./",
  build: {
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        // Libraries in their own file: browsers keep it cached when only site content changes.
        codeSplitting: { groups: [{ name: "vendor", test: /node_modules/ }] },
      },
    },
  },
});
