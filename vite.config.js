import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import pluginPurgeCSS from "vite-plugin-purge";
import { VitePluginPrefetchModule } from "vite-plugin-prefetch-module";

export default defineConfig({
  plugins: [
    react(),
    VitePluginPrefetchModule({ concurrent: 10 }),
    compression({
      ext: ".br",
      algorithm: "brotliCompress",
      compressionOptions: {
        level: 11,
      },
    }),
    compression({
      ext: ".gz",
      algorithm: "gzip",
      compressionOptions: {
        level: 9,
      },
    }),
    compression({
      ext: ".zz",
      algorithm: "deflate",
      compressionOptions: {
        level: 9,
      },
    }),
    pluginPurgeCSS({
      content: ["**/*.html", "**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      keyframes: true,
      variables: true,
      fontFace: true,
    }),
  ],
  optimizeDeps: {
    force: true,
  },
  server: {
    host: "0.0.0.0",
    watch: false,
  },
  build: {
    gzipSize: true,
    brotliSize: true,
    modulePreload: true,
    minify: true,
    ssrManifest: true,
  },
});
