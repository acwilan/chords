import { defineCollection, z } from 'astro:content';

const examples = defineCollection({
  schema: z.object({
    title: z.string()
  })
});

export const collections = { examples };
