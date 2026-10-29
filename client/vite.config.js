import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const API_TARGET = 'http://localhost:5000';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: { '/api': API_TARGET } },
});
