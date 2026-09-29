// Single source of truth for the six portfolio categories.
// Keep in sync with the categorySlug enum in src/content/config.ts.

export type Subcategory = { slug: string; name: string };

export type Category = {
  slug: string;
  index: string;
  name: string;
  tone: 'dark' | 'ivory';
  // Optional filter tabs shown on the category page. A project picks one
  // with its `subcategory` field; projects without one appear under "All".
  // Keep slugs in sync with the subcategory dropdown in cloudcannon.config.yml.
  subcategories?: readonly Subcategory[];
};

export const CATEGORIES: readonly Category[] = [
  { slug: 'product-photography', index: '01', name: 'AI Product Photography', tone: 'dark' },
  { slug: 'lifestyle-campaigns', index: '02', name: 'Lifestyle & Campaigns', tone: 'ivory' },
  {
    slug: 'fashion',
    index: '03',
    name: 'Fashion',
    tone: 'dark',
    subcategories: [
      { slug: 'photo', name: 'Photo Campaigns' },
      { slug: 'video', name: 'Video' },
    ],
  },
  {
    slug: 'ai-video',
    index: '04',
    name: 'AI Video',
    tone: 'ivory',
    subcategories: [
      { slug: 'interior', name: 'Interior & Real Estate' },
      { slug: 'animation', name: 'Animation' },
      { slug: 'commercial', name: 'Commercial & Product' },
    ],
  },
  { slug: 'ugc-avatars', index: '05', name: 'UGC & AI Avatars', tone: 'dark' },
  { slug: 'cgi-video', index: '06', name: '3D / CGI Video', tone: 'ivory' },
];

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}
