import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  optimizeDeps: {
    exclude: ["@fortawesome/fontawesome-svg-core"],
  },
  plugins: [react()],
});
