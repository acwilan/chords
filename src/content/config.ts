import { defineCollection, z } from 'astro:content';

const songs = defineCollection({
  schema: z.object({
    slug: z.string(),
    lang: z.enum(['es', 'en']).default('es'),
    title: z.string(),
    key: z.string().optional(),
    bpm: z.number().optional(),
    capo: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pdf: z.string().optional(),
  }),
});

export const collections = { songs };
