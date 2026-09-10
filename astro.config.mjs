import { defineConfig } from 'astro/config';

// Static output — plain HTML/CSS/JS, no server required.
// This is what Netlify + CloudCannon expect.
export default defineConfig({
  output: 'static',
  site: 'https://majestic-jelly-b31fdb.netlify.app',
  trailingSlash: 'always',
});
