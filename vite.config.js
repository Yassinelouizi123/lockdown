import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base './' = works on GitHub Pages under any repository name.
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] });
