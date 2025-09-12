import { defineCollection, z } from 'astro:content';

const songs = defineCollection({
  schema: z.object({
    lang: z.enum(['es', 'en']).default('es'),
    title: z.string(),
    slug: z.string().optional(),
    key: z.string().optional(),
    bpm: z.number().optional(),
    artist: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pdf: z.string().optional(),
    seoKeywords: z.array(z.string()).optional(),
  }),
});

export const collections = { songs };
