import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProduction = process.env.NODE_ENV  === 'production';

console.log('isProduction : ', process.env.NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  esbuild: isProduction
    ? {
        drop: ['console', 'debugger']
      }
    : {}
});
