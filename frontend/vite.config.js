import { defineConfig } from 'vite'
import daisyui from 'daisyui'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),daisyui],
  server: {
    port: 3002,
  },
})
