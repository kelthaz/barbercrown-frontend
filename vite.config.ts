import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // deja esto si tu app va en raíz, o ajusta si va en subruta
  build: {
    outDir: 'dist',
  },
});
