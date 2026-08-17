# Oksana — AI Creative Portfolio

Astro + CloudCannon + Netlify rebuild of the approved portfolio design.
**Visual design is unchanged** — this is a technical conversion only. The CSS
in `src/styles/global.css` is copied byte-for-byte from the approved static
HTML (only one small addition at the bottom, for the new category pages —
see below).

## What changed vs. the single HTML file

- The one HTML file is now an Astro project: reusable components +
  content collections that CloudCannon can edit visually.
- Six new pages exist — one per category (`/work/<category>/`) — so
  "Explore by Category" now links somewhere real instead of `#`.
  These new pages reuse the exact same colors, type, and card/plate
  system as the rest of the site; nothing on the existing sections
  changed.
- Two homepage headings ("Selected Work", "Explore by Category") and
  the final CTA heading ("Have a project in mind?") are now stored as
  CMS text with an embedded line break, instead of a hard-coded `<br>`,
  so they stay editable without breaking the two-line title styling.

## File structure

```
src/
  content/                 ← EVERYTHING EDITABLE LIVES HERE
    projects/*.md           6 example projects (placeholders)
    homepage/homepage.yml    hero text, section headings, services list, CTA
    about/about.yml          About section text + portrait image
    settings/settings.yml    name, title, Instagram/email/Upwork, SEO, footer year
    config.ts                the schema — defines which fields exist (code)

  components/*.astro        page sections (design/markup — not content)
  layouts/BaseLayout.astro  <head>, fonts, global script (design — not content)
  styles/global.css         all CSS, unchanged from the approved design
  pages/
    index.astro              homepage — assembles the sections
    work/[category].astro    generates the 6 category pages automatically
  lib/categories.ts          the fixed list of 6 categories (slug + label)

public/uploads/             where CloudCannon-uploaded images/video land
cloudcannon.config.yml      CMS field labels, dropdowns, image pickers
netlify.toml                build command + publish folder for Netlify
astro.config.mjs, package.json, tsconfig.json
```

## Which files you'll actually edit (via CloudCannon — never directly)

| What you want to change | CloudCannon section | File |
|---|---|---|
| Add/edit/hide a portfolio project | **Projects** | `src/content/projects/*.md` |
| Which projects show in Selected Work, and their order | **Projects** → Show in Selected Work + Display Order | same |
| Hero subtitle, section headings, services list, CTA text | **Homepage** | `src/content/homepage/homepage.yml` |
| Hero showreel video/poster/on-off | **Homepage** | same |
| About text + portrait photo | **About** | `src/content/about/about.yml` |
| Instagram / Email / Upwork links | **Site Settings** | `src/content/settings/settings.yml` |
| SEO title/description, social share image, footer year | **Site Settings** | same |

Note: **Contact section links and Site Settings links are the same
field** — I made Site Settings the single source of truth for Instagram/
Email/Upwork so you only ever update it in one place, and the Contact
section and footer both read from it automatically. You won't see a
separate "Contact" entry in CloudCannon for this reason — go to Site
Settings.

## How Selected Work and category pages work

- Selected Work is a **fixed 6-slot layout** (the asymmetric grid you
  approved). It's filled by whichever projects have **Show in Selected
  Work** switched on, in **Display Order**, up to 6. It looks best with
  exactly 6 — fewer than 6 will leave the later slots empty rather than
  reflowing the grid (reflowing would change the approved composition).
- Every project also automatically appears on its category page
  (`/work/<category>/`) as long as **Published** is on — you never
  edit a category page directly.
- Turning **Published** off hides a project everywhere without
  deleting it.

## Images & video before you upload real content

Each placeholder project points at an image path that doesn't exist yet
(e.g. `/uploads/projects/placeholder-01-cover.jpg`). Until you upload a
real image through CloudCannon, the card gracefully falls back to the
same grain-textured placeholder plate used in the original design — it
won't show a broken image icon.

For video: each project has a `sourceType` of `upload` or `external`.
Use `external` for a YouTube/Vimeo/Cloudinary-hosted link (recommended
for large files — better performance, no repo bloat), or `upload` to
host the file directly through CloudCannon.

## Performance choices made

- Portfolio images use `loading="lazy"` (everything except the hero).
- The hero showreel is the only media that isn't lazy-loaded.
- Videos use a poster image and aren't auto-embedded from external
  platforms unless you enable them — no iframes loading in the background.

## What still needs to be connected manually

I can't create accounts or connect services on your behalf — here's
exactly what's left, in order:

1. **GitHub** — create a new repository and push this project to it
   (`git init`, `git remote add origin ...`, `git push`).
2. **Netlify** — create a Netlify site from that GitHub repo. Build
   command and publish directory are already set via `netlify.toml`
   (`npm run build` → `dist`), so Netlify should detect them
   automatically; just confirm on the site setup screen.
3. **CloudCannon** — connect the same GitHub repo as a new CloudCannon
   site. CloudCannon should auto-detect `cloudcannon.config.yml`. Open
   the CloudCannon dashboard afterward and confirm the four sections
   (Projects, Homepage, About, Site Settings) look right — CMS config
   syntax occasionally needs a small tweak once it's running against a
   real CloudCannon account, since I built this offline against the
   documented schema and couldn't test it live.
4. **Custom domain** (optional) — point your domain at Netlify once
   you're happy with the Netlify-generated preview URL.
5. **Real content** — replace the six placeholder projects with your
   actual work, and swap in the About portrait, hero showreel, and
   contact links, all through CloudCannon.

## About the preview

I don't have the ability to run `npm install` / a live Astro dev server
in this environment (no network access here). Because the visual
design is byte-identical to the approved static HTML, that HTML file
is still an accurate visual preview of the homepage — the six new
category pages use the same design system but weren't part of that
file, so their exact appearance will be visible once this project is
running (locally with `npm install && npm run dev`, or on Netlify's
first deploy).
