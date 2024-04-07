import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => {
  return {
    root: process.cwd(),
    plugins: [
      react({
        jsxRuntime: "classic",
      }),
    ],
    build: {
      target: "es2015",
      lib: {
        // 库不能使用 HTML 作为入口，需要指定入口 JS 文件
        entry: path.resolve(__dirname, "lib/index.tsx"),
        // 指定输出格式 formats: ('es' | 'cjs' | 'umd' | 'iife')[]
        formats: ["es", "cjs"],
        // 是输出的包文件名
        fileName: "index",
      },
      rollupOptions: {
        // 排除 React 避免打包到库资源中，由外部去提供
        external: ["react", "react-dom"],
        input: path.resolve(__dirname, "lib/index.tsx"),
        output: {
          banner: 'import "./style.css"',
        },
      },
    },
    server: {
      port: 5000,
    },
  };
});
