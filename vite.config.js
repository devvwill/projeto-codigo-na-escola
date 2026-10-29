import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: { host: '127.0.0.1', fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.data/**'] } },
  plugins: [react(), tailwindcss()],
})
