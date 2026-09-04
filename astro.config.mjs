import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://19991107.xyz',
  output: 'static',
  integrations: [sitemap()],
});
