import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Force redeploy
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
