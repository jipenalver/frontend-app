import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        register: resolve(__dirname, 'src/register.html'),
        dashboard: resolve(__dirname, 'src/dashboard.html'),
      }
    }
  },
});
