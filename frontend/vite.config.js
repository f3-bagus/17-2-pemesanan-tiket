import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
 plugins: [react()],
 root: ".", // Tetapkan root ke direktori proyek Anda
 build: {
  rollupOptions: {
   input: {
    admin: path.resolve(__dirname, "src/admin/index.html"),
    user: path.resolve(__dirname, "src/user/index.html"),
   },
   output: {
    entryFileNames: (chunkInfo) => {
     return chunkInfo.facadeModuleId.includes("admin")
      ? "admin/assets/[name].js"
      : "user/assets/[name].js";
    },
    chunkFileNames: (chunkInfo) => {
     return chunkInfo.facadeModuleId.includes("admin")
      ? "admin/assets/[name].js"
      : "user/assets/[name].js";
    },
    assetFileNames: (assetInfo) => {
     return assetInfo.name.includes("admin")
      ? "admin/assets/[name].[ext]"
      : "user/assets/[name].[ext]";
    },
   },
  },
 },
});
