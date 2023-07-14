import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";
import typescript2 from "rollup-plugin-typescript2";
import dts from "vite-plugin-dts";
import * as path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true
    }),
    vueJsx(),
    svgLoader(),
    viteStaticCopy({
      targets: [
        { src: "src/assets/vue-pretty-box.scss", dest: "" },
        { src: "src/assets/scss", dest: "" }
      ]
    }),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true
        }
      },
      exclude: ["vite.config.ts"]
    })
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: "./src/components/index.ts",
      formats: ["es", "umd"],
      name: "VuePrettyBox",
      fileName: (format) => `vue-pretty-box.${format}.js`
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/components/main.ts")
      },
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "main.css") return "vue-pretty-box.css";
          return assetInfo.name;
        },
        exports: "named",
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  server: {
    open: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/routes": path.resolve(__dirname, "src/routes"),
      "@/examples": path.resolve(__dirname, "src/examples"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/views": path.resolve(__dirname, "src/views"),
      "@/layouts": path.resolve(__dirname, "src/layouts")
    }
  }
});
