// vite.config.js
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  server: { port: 3000 },
  plugins: [injectHTML()],
});