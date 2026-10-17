# FH Home Improvements — fhhomeimprovements.com

Astro site, deployed on Vercel from GitHub.

- Main pages (Home, About, Services, Contact…) are the Webflow export, as plain HTML in `public/`.
- The blog is built by Astro from Markdown files in `src/content/blog/`.
- URLs match the old Webflow site: `/blog`, `/blog-post/<slug>`, `/category/<slug>`.

## Writing a new blog post

1. Put the cover image in `public/media/` (e.g. `public/media/kitchen-island.jpg`).
2. Create a new file in `src/content/blog/`. The file name becomes the URL, so
   `kitchen-island-ideas-summit-nj.md` → `/blog-post/kitchen-island-ideas-summit-nj`.
   Use lowercase words separated by dashes.
3. Start it with this block, then write the post below it in Markdown:

```markdown
---
title: Kitchen Island Ideas for Summit, NJ Homes
description: Short summary shown on the blog page.
pubDate: 2026-10-20
cover: /media/kitchen-island.jpg
readTime: 5
metaTitle: Kitchen Island Ideas | Summit, NJ | FH Home Improvements
metaDescription: The text Google shows under the title (about 150 characters).
category: kitchen-remodel
---

## First heading

Your paragraph text...

- bullet point
- another bullet

[Get a free quote](/contact-us)
```

4. Commit and push to GitHub. Vercel publishes it in about a minute.

Optional fields: `readTime`, `metaTitle`, `metaDescription`, `category`
(`kitchen-remodel`, `bathroom-remodel` or `interior-painting`), `featured: true`,
`draft: true` (hides the post until you remove it).

## Commands

| Command          | What it does                                          |
| ---------------- | ----------------------------------------------------- |
| `npm install`    | Install once after downloading the project            |
| `npm run dev`    | Preview the site at http://localhost:4321             |
| `npm run build`  | Build the site (Vercel runs this for you)             |
| `npm run images` | One-time: copy all images off Webflow's CDN into `public/media/` |

## Adding a category

Add it to `src/data/categories.json` (`"slug": "Name"`), then use the slug in a post's `category`.
