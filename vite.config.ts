import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the site works at flosch62.github.io/me/ today
// and at flosch.me once the custom domain is set up.
export default defineConfig({
  base: './',
  plugins: [react()],
})
