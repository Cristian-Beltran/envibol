import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// Exporta la configuración
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Configura el alias @
    },
  },
});
