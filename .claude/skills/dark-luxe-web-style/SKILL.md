---
name: dark-luxe-web-style
description: Build websites in the "Dark Luxe" style of the user's resume site (d2dmh/my-first-site) — near-black background with crimson and champagne-gold accents, serif display titles, a WebGL flowing-line background, cursor-tracking glowing card borders, shimmering section titles, a ruler-style side nav, oversized faint section numerals and scroll reveal, as a React + Vite page that can also ship as one double-clickable HTML file. Use this skill whenever the user wants to make a new website, landing page, personal homepage, portfolio, resume/CV site, event or product page and says it should look like / borrow from / reuse the style of their existing site, mentions "我之前那个网站", "那个简历网站的风格", "黑红金", dark luxury / premium / editorial / high-end aesthetics, or asks for the LineWaves, BorderGlow, ShinyText or LineSidebar effects — even if they don't name this skill.
---

# Dark Luxe web style

This skill packages the design system and interaction layer of the user's resume site
(郑慧茹个人简历, `d2dmh/my-first-site`) so new sites can reuse it. The site reads like a
premium editorial brand page rather than a template: restrained black, a little crimson heat,
gold light, big serif type, and motion that rewards the cursor without getting in the way of
the content.

## What's in the box

| Path | Use |
|---|---|
| `assets/theme.css` | Distilled stylesheet: tokens, layout, hero, section titles, cards, lists, metrics, tags, portrait frame, contact block, reveal, responsive rules |
| `assets/components/` | `LineWaves`, `BorderGlow`, `ShinyText`, `LineSidebar` (+ their CSS) |
| `assets/usePageEffects.js` | Scroll reveal, cursor-glow variables, hover state, active-section tracking |
| `assets/App.example.jsx` | Working starter page that wires everything together |
| `assets/scripts/sync-file-preview.mjs` | Inlines the Vite build into a single root `index.html` |
| `references/components.md` | Props, tuned values and re-skinning guide for the four components. Read it before changing any effect parameters. |

## Building a new site

1. **Scaffold** a React + Vite project (or use the existing one). Dependencies:
   `react react-dom vite @vitejs/plugin-react ogl motion`.
2. **Copy** `assets/components/`, `assets/usePageEffects.js` and `assets/theme.css` into `src/`,
   and start `src/App.jsx` from `assets/App.example.jsx`. Import `theme.css` once in `main.jsx`.
3. **Fill in content first, then decorate.** Get the user's real text, sections and images in
   place before tuning effects; the style is designed to frame content, not replace it.
4. **Keep the signature elements** unless the user asks otherwise:
   - Hero: gold letter-spaced kicker, then a huge serif name where the last part is a gold
     *outline* (`.hero-title span:last-child`), a light-weight summary, a crimson primary
     button and a gold-line secondary button, small dot-separated meta tags, and a portrait
     in the clipped-corner frame with the rule-of-thirds gold grid.
   - Every section: a big gold serif index (`01`) beside a ShinyText `<h2>`, an intro line,
     a fading gold rule underneath, and the same number repeated as an enormous faint
     crimson numeral behind the section (`<section class="section" data-index="01">`).
   - Ambient layers: LineWaves behind everything at low brightness, the cursor glow, the
     80px gold grid and film grain on `body`.
   - BorderGlow on repeated cards (projects, experience, skills), with `animated` on the first.
   - LineSidebar fixed on the left on wide screens, highlighting the current section.
5. **Re-skin if asked** for different colours: follow "Re-skinning" in `references/components.md`.
   Change every colour in one pass so the palette stays coherent.
6. **Verify visually** at roughly 390px, 1024px and 1440px wide (Playwright screenshots work).
   Check that no text is clipped, nothing overlaps the sidebar, and section numbers run in order.

## Lessons learned from the original site

These were real problems found when reviewing the first version. They explain why the defaults
here differ from what you might write from scratch.

- **Never hide key content behind hover.** The original showed experience details only when
  a card was hovered, and only the first 2 of 5 bullet points. Recruiters skim and phones can't
  hover, so the strongest material went unseen. Hover should *enhance* (glow, lift), not *reveal*.
- **Don't truncate text with line-clamp in content cards.** A clamped "…" reads as a bug. Let
  cards grow, or write shorter copy.
- **Section numbers must match DOM order**, and so must the `sectionIds` passed to
  `usePageEffects`. The original had 03 rendered before 02, which also broke the sidebar highlight.
- **Put the most relevant experience first** (reverse-chronological), not the oldest.
- **No Google Fonts for Chinese audiences.** `fonts.googleapis.com` is slow or blocked in
  mainland China. Use the system font stacks in `theme.css`. If a specific webfont is a must,
  self-host a subset.
- **Multi-column card rows need a mobile fallback.** The original's five skill cards stayed in
  5 columns on phones, which put one or two characters on each line. `theme.css` stacks to one
  column at ≤820px.
- **Centre floating cues** (like "向下浏览"). Left-aligned ones slide under the fixed sidebar.
- **Grow one clean stylesheet.** The original reached ~4200 lines because every redesign was
  appended as overrides on top of the last (a light theme, then a dark theme on top of it). When
  changing the look, edit the rule in place instead of adding a new override block at the end.
- **Mind personal data.** Phone numbers and emails in a public repo or site can be scraped.
  Ask the user before publishing them.

## Shipping

- **Hosting:** the user deploys with Cloudflare Pages connected to GitHub. Pushing to `main`
  auto-deploys production, and other branches get preview URLs (`<branch>.<project>.pages.dev`).
- **Single-file preview:** to produce an `index.html` that opens by double-click with no server
  (handy as an email attachment), set this in `vite.config.js`:
  ```js
  export default defineConfig({
    base: './',
    plugins: [react()],
    build: {
      assetsInlineLimit: 600_000, // inline the portrait photo
      rollupOptions: { input: resolve(projectRoot, 'app.html') },
    },
  })
  ```
  Keep the Vite entry as `app.html`, copy `assets/scripts/sync-file-preview.mjs` to `scripts/`,
  and make the build script `"vite build && node scripts/sync-file-preview.mjs"`. The script
  inlines the built CSS/JS into the root `index.html`. Keep images small: a ~370KB photo
  pushes the file to about 950KB.

## Accessibility and performance

The style is motion-heavy, so keep these in place:
- `prefers-reduced-motion` disables transitions and shows `.reveal` content immediately (in `theme.css`).
- The cursor glow is hidden on touch devices (`hover: none`) and small screens.
- Decorative layers get `aria-hidden="true"` and `pointer-events: none`.
- LineWaves caps DPR at 1.5. Use only one LineWaves per page.
- Text contrast: body copy is `--ink-soft` (#b5c0c4) on near-black. Don't go dimmer than
  `--muted` for anything people need to read.
