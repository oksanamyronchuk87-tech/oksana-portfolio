# Technical audit — Oksana Portfolio

## Issues found in the Claude-generated project

1. `gallery` existed in the Astro content schema and CloudCannon form but was never rendered anywhere in the frontend.
2. Project `video` data existed in the schema/CMS but was never rendered anywhere in the frontend.
3. Project cards were not links and there was no individual project-detail route.
4. Upload configuration mixed older `uploads_dir` input options with a root `paths` configuration. This allowed files to end up outside Astro's `public/` tree in practice.
5. `public/uploads/*` directories in the original ZIP were empty. Git does not retain empty directories, so they disappeared when the project was uploaded to GitHub.
6. Project placeholder cover paths deliberately pointed to files that did not exist. This was documented in the README, but it made initial cards fall back to placeholders.
7. Category rows link correctly, and category pages correctly filter/publish/order projects.
8. Selected Work correctly filters by `featured`, respects `order`, and limits to six.
9. Hero showreel, About portrait, Site Settings, and contact links are wired into the frontend.
10. CloudCannon's visual editor itself is not fully configured with Astro editable-region attributes; the Data Editor/CMS fields work, but live inline visual editing would require additional CloudCannon integration.

## Fixes in this package

- Uses a consistent CloudCannon upload/static path strategy for project, hero, about, and social assets.
- Correctly configures `gallery` as an array whose entries are image inputs.
- Adds individual project pages at `/project/<slug>/`.
- Makes project cards clickable.
- Renders project gallery images.
- Renders uploaded project video and external video links/posters.
- Adds responsive project-detail styling without changing the approved homepage visual system.
- Removes the placeholder note from Selected Work.

## Media folder rule

All site-served uploads belong under `public/uploads/...` in the repository. Astro copies `public/` into the final static build unchanged.
