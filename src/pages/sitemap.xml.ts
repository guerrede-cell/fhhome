import type { APIRoute } from 'astro';
import { getPosts } from '../lib/posts';
import categories from '../data/categories.json';

// The non-blog pages are plain HTML files in /public — list them here.
const staticPages = [
  '/',
  '/about-us',
  '/testimonial',
  '/contact-us',
  '/kitchen-remodel-new-jersey',
  '/bathroom-renovation-new-jersey',
  '/carpentry-new-jersey',
  '/home-remodel-new-jersey',
  '/interior-painting-summit-nj',
  '/blog',
];

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const url = (path: string, lastmod?: Date) =>
    `<url><loc>${new URL(path, site).href}</loc>${lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`;
  const body = [
    ...staticPages.map((p) => url(p)),
    ...Object.keys(categories).map((c) => url(`/category/${c}`)),
    ...posts.map((p) => url(`/blog-post/${p.id}`, p.data.updatedDate || p.data.pubDate)),
  ].join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
