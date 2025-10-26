import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: { exclude: ["lucide-react"] },
  define: {
    __API_URL__: JSON.stringify(
      process.env.VITE_API_URL || "http://localhost:5001"
    ),
  },
  publicDir: "public",
  server: {
    host: true,
    port: 3005,
    strictPort: true,
    allowedHosts: true,
    origin: "http://fsu.tcioe.edu.np",
    hmr: false,
  },
  build: { rollupOptions: { external: [] } },
});
