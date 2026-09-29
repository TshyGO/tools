import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://19991107.xyz',
  output: 'static',
  // 线上由 public/_redirects 返回 301；这里负责本地开发，并为不读 _redirects 的环境生成跳转页
  redirects: {
    '/tools/resume-pro': '/tools/wangshen-kuaitian/',
    '/tools/resume-pro/faq': '/tools/wangshen-kuaitian/faq/',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/tools/resume-pro/'),
    }),
  ],
});
