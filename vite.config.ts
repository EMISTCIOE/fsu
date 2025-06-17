import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  // Define environment variables for better IntelliSense
  define: {
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || "http://localhost:5000"),
  },
})