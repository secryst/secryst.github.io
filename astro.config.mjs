// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.secryst.org',
  trailingSlash: 'always',
  // Collapse whitespace to a single space (pre-7 behavior) instead of
  // JSX-style removal, which glues text to adjacent elements.
  compressHTML: true,
  integrations: [vue(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
