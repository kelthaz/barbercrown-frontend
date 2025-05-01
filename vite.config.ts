import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'build', // La carpeta de salida de Vite
    rollupOptions: {
      input: './src/main.tsx', // O tu archivo de entrada principal
    },
  },
});