import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fhhomeimprovements.com',
  // Outputs blog-post/<slug>.html so URLs match the old Webflow site exactly (/blog-post/<slug>)
  build: { format: 'file' },
  trailingSlash: 'never',
});
