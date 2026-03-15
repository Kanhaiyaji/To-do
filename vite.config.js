import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/To-do/',
  build: {
    sourcemap: false,
  },
  plugins: [react()],
})
