import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import pluginPurgeCSS from "vite-plugin-purge";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
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
