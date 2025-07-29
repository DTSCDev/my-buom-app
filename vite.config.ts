import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-buom-app/my-buom-app/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    fs: {
      // Restrict file serving to the project directory
      strict: true,
      allow: ['.']
    }
  },
  optimizeDeps: {
    // Only scan dependencies, not random HTML files
    entries: ['index.html', 'src/**/*.{js,ts,jsx,tsx}']
  }
})
