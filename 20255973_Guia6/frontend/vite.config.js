import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Redirige /api al backend Flask para evitar problemas de CORS en desarrollo
    proxy: {
      "/api": "http://127.0.0.1:5000",
    },
  },
});
