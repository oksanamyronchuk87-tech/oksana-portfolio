// Single source of truth for the six portfolio categories.
// Keep in sync with the categorySlug enum in src/content/config.ts.

export const CATEGORIES = [
  { slug: 'product-photography', index: '01', name: 'AI Product Photography', tone: 'dark' },
  { slug: 'lifestyle-campaigns', index: '02', name: 'Lifestyle & Campaigns', tone: 'ivory' },
  { slug: 'fashion', index: '03', name: 'Fashion', tone: 'dark' },
  { slug: 'ai-video', index: '04', name: 'AI Video', tone: 'ivory' },
  { slug: 'ugc-avatars', index: '05', name: 'UGC & AI Avatars', tone: 'dark' },
  { slug: 'cgi-video', index: '06', name: '3D / CGI Video', tone: 'ivory' },
] as const;

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}
