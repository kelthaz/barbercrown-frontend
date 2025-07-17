// vite.config.js o vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Si usas React

export default defineConfig({
  plugins: [react()],
  base: '/', // deja esto si tu app va en raíz, o ajusta si va en subruta
  build: {
    outDir: 'build', // Asegúrate de que esté así
  },
});
