// vite.config.js o vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Si usas React

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Asegúrate de que esté así
  },
});