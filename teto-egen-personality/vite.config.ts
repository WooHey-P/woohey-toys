import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@shared": "/shared",
    },
  },
  base: "/teto-egen/",  // 이 라인 추가
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
