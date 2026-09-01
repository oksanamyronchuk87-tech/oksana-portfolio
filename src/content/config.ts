import { defineCollection, z } from 'astro:content';

// The six fixed portfolio categories. Keep this list in sync with
// src/lib/categories.ts (labels + index numbers live there).
const categorySlug = z.enum([
  'product-photography',
  'lifestyle-campaigns',
  'fashion',
  'ai-video',
  'ugc-avatars',
  'cgi-video',
]);

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: categorySlug,
    year: z.union([z.string(), z.number()]).optional(),

    // Media
    coverImage: z.string(),
    coverOrientation: z
      .enum(['landscape', 'portrait', 'square', 'wide'])
      .default('portrait'),
    gallery: z
      .array(
        z.union([
          z.string(),
          z.object({
            image: z.string(),
            title: z.string().optional(),
          }),
        ])
       )
      .default([]),
    video: z
      .object({
        sourceType: z.enum(['upload', 'external']).default('external'),
        file: z.string().optional(),
        externalUrl: z.string().optional(),
        poster: z.string().optional(),
      })
      .optional(),

    // Editorial / ordering controls
    order: z.number().default(99),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
  }),
});

const homepage = defineCollection({
  type: 'data',
  schema: z.object({
    heroEyebrow: z.string(),
    heroSubtitle: z.string(),
    heroShowreel: z.object({
      enabled: z.boolean().default(false),
      video: z.string().optional(),
      poster: z.string().optional(),
    }),
    selectedWorkHeading: z.string(),
    selectedWorkNote: z.string(),
    categoryHeading: z.string(),
    categoryNote: z.string(),
    servicesEyebrow: z.string(),
    servicesIntro: z.string(),
    services: z.array(z.string()),
    ctaHeading: z.string(),
    ctaSubtitle: z.string(),
  }),
});

const about = defineCollection({
  type: 'data',
  schema: z.object({
    eyebrow: z.string(),
    lede: z.string(),
    body: z.string(),
    portraitImage: z.string(),
  }),
});

const settings = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    professionalTitle: z.string(),
    instagramUrl: z.string(),
    email: z.string(),
    upworkUrl: z.string(),
    footerYear: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    socialImage: z.string().optional(),
  }),
});

export const collections = { projects, homepage, about, settings };
