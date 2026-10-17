// One-time script: downloads every image still hosted on Webflow's CDN
// into public/media/ and rewrites the posts and pages to use the local copies.
// Run it once on your computer with:  npm run images
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const MEDIA = path.join(ROOT, 'public', 'media');
const PATTERN = /https:\/\/cdn\.prod\.website-files\.com\/[^\s"'()<>]+/g;

const files = [
  ...(await readdir(path.join(ROOT, 'src/content/blog'))).filter((f) => f.endsWith('.md')).map((f) => path.join(ROOT, 'src/content/blog', f)),
  ...(await readdir(path.join(ROOT, 'public'))).filter((f) => f.endsWith('.html')).map((f) => path.join(ROOT, 'public', f)),
];

await mkdir(MEDIA, { recursive: true });

const localName = (url) => {
  const base = decodeURIComponent(url.split('?')[0].split('/').pop());
  return base.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/-+/g, '-');
};

const done = new Map();
let failed = 0;

for (const file of files) {
  let text = await readFile(file, 'utf8');
  const urls = [...new Set(text.match(PATTERN) || [])];
  if (!urls.length) continue;
  for (const url of urls) {
    if (!done.has(url)) {
      const name = localName(url);
      const dest = path.join(MEDIA, name);
      try {
        await access(dest);
      } catch {
        const res = await fetch(url);
        if (!res.ok) {
          console.warn(`  ! could not download (${res.status}): ${url}`);
          failed++;
          continue;
        }
        await writeFile(dest, Buffer.from(await res.arrayBuffer()));
        console.log(`  ✓ ${name}`);
      }
      done.set(url, `/media/${name}`);
    }
    text = text.split(url).join(done.get(url));
  }
  await writeFile(file, text);
}

console.log(`\nDone: ${done.size} images saved to public/media${failed ? `, ${failed} failed (left pointing at Webflow)` : ''}.`);
