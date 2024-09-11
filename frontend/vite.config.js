import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    host: '127.0.0.1',
    port: 5501
  },
  plugins: [react()],
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot'],
});
