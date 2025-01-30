import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
   base: "/budget-planner",

  plugins: [vue(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src/'),
    },
  },
});