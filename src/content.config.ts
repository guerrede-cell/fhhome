import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    thumbnail: z.string().optional(),
    featured: z.boolean().default(false),
    readTime: z.number().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
