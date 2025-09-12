import { defineCollection, z } from 'astro:content';
import { slugify } from '../utils/urls';

const songs = defineCollection({
  schema: z
    .object({
      lang: z.enum(['es', 'en']).default('es'),
      title: z.string(),
      key: z.string().optional(),
      bpm: z.number().optional(),
      artist: z.string().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      pdf: z.string().optional(),
      seoKeywords: z.array(z.string()).optional(),
    })
    .passthrough(),
  slug: ({ data }) => slugify((data as any).slug ?? data.title),
});

export const collections = { songs };
