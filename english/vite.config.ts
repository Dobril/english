import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// base './' so the built index.html works from any path (claude.ai Artifact)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  // Everything (JS, CSS) is inlined into dist/index.html; the only external resource is Google Fonts.
  build: {
    target: 'es2020',
  },
});
