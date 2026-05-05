import { cloudflare } from "@cloudflare/vite-plugin"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { defineConfig } from "vite"
import agents from "agents/vite"

export default defineConfig({
  plugins: [react(), cloudflare({ remoteBindings: false }), tailwindcss(), agents()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
