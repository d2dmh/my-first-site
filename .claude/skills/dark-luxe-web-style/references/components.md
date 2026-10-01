# Interactive components

The four effect components in `assets/components/`. They appear to come from the React Bits
collection (reactbits.dev), re-tuned for the crimson/gold palette. Every value listed under
"Tuned values" is what the original site shipped with. They are a known-good starting point,
so change several together rather than one at a time.

Dependencies: `react`, `react-dom`, `ogl` (LineWaves), `motion` (ShinyText).

## Contents
- LineWaves: WebGL flowing-line background
- BorderGlow: cursor-tracking edge light on cards
- ShinyText: sweeping highlight across a title
- LineSidebar: ruler-style section navigation
- Re-skinning to another palette

---

## LineWaves — WebGL flowing-line background

A full-screen fragment shader that draws fine diagonal lines. The lines are warped by layered
sine noise, and the cursor pushes them aside, with the mouse position eased 5% per frame so
the motion stays soft. Mount it inside a `position: fixed` wrapper (`.ambient-waves`) behind
everything, with the wrapper's `opacity` at about 0.5.

| Prop | Tuned | Effect |
|---|---|---|
| speed | 0.22 | Overall animation speed; above ~0.4 starts to feel busy |
| innerLineCount / outerLineCount | 34 / 42 | Line density in the centre band vs the edges |
| warpIntensity | 0.34 | How wavy; 1.0 is the default and much more liquid |
| rotation | -32 | Line angle in degrees |
| edgeFadeWidth | 0.08 | Fade at the top/bottom of the band |
| colorCycleSpeed | 0.32 | How fast the three colours drift |
| brightness | 0.16 | Keep low so the background never competes with text |
| color1 / color2 / color3 | #991921 / #d0aa62 / #310408 | Crimson, gold, deep wine |
| enableMouseInteraction / mouseInfluence | true / 1.15 | Cursor warp strength |

Notes: device pixel ratio is capped at 1.5 for performance. The cleanup calls
`WEBGL_lose_context`, so re-mounting doesn't leak GPU contexts.

## BorderGlow — cursor-tracking edge light

A wrapper that measures where the pointer is relative to the card centre (angle plus
edge proximity) and writes them to CSS variables. A conic-gradient mask then lights up only
the stretch of border nearest the cursor, with a soft multi-colour mesh fill bleeding in.
With `animated`, the card runs a one-time sweep around its border when it mounts. Use it on the
first card of a group to show visitors the cards are interactive.

```jsx
<BorderGlow {...glowCardProps} animated={index === 0} className="reveal">
  <article className="glow-card-body">…</article>
</BorderGlow>
```

| Prop | Tuned | Effect |
|---|---|---|
| edgeSensitivity | 18 | Lower lets the glow appear further from the edge |
| glowColor | '42 68 62' | HSL triple (no commas) of the edge light, here gold |
| backgroundColor | #0d0607 | Card fill |
| borderRadius | 12 | px |
| glowRadius | 34 | px, how far the outer glow spreads |
| glowIntensity | 0.85 | Multiplies the glow opacities |
| coneSpread | 22 | Width of the lit arc (percent of the circle) |
| colors | ['#8f151d', '#d2ad65', '#3d090d'] | Mesh-gradient colours for the border and fill |
| fillOpacity | 0.34 | Strength of the soft-light fill inside the card |

Put padding on the child (`.glow-card-body`), not on the wrapper. The wrapper is a grid whose
inner div clips with `overflow: hidden`.

## ShinyText — sweeping highlight

Animates `background-position` on a text-clipped gradient (via `motion`'s `useAnimationFrame`)
so a gold band slides across the letters. Used on every section `<h2>`.

| Prop | Tuned | Effect |
|---|---|---|
| speed | 3.4 | Seconds per pass |
| delay | 0.7 | Pause between passes |
| color / shineColor | #efe3d1 / #d8b45f | Base ivory, gold highlight |
| spread | 124 | Gradient angle |
| yoyo | true | Sweep back and forth instead of restarting |
| pauseOnHover | true | Freeze while hovered |

## LineSidebar — ruler-style section nav

A fixed vertical list with a tick mark per item. Items near the cursor brighten to the accent
colour and shift right, with a smoothstep falloff over `proximityRadius`. The active section
stays lit. The rAF loop only runs while values are still settling.

Wire it to `usePageEffects`:

```jsx
const { activeSection, scrollToSection } = usePageEffects(ids)
<LineSidebar items={labels} activeIndex={activeSection} onItemClick={scrollToSection} … />
```

| Prop | Tuned |
|---|---|
| accentColor / textColor / markerColor | #d8b45f / #b9aba0 / #6d3b36 |
| proximityRadius | 118 |
| maxShift | 8 |
| markerLength / markerGap / tickScale | 32 / 0 / 0.42 |
| itemGap / fontSize | 17 / 0.9 (rem) |
| smoothing | 130 (ms) |
| indices | ['00', '01', …] for zero-based numbering matching the section titles |

Hide it below ~1180px; there is no room for it, and touch users can't hover anyway.
`theme.css` already does this.

---

## Re-skinning to another palette

The look depends on one dark base, one warm "heat" colour, and one metallic "light" colour.
To change palette, update these together:

1. `theme.css` `:root` tokens: `--paper`, `--crimson*`, `--accent*`, `--line*`.
2. The hard-coded rgba() values in `theme.css` that use crimson `159, 24, 33` and gold
   `202, 168, 95`. Search and replace both.
3. LineWaves `color1..3`, BorderGlow `colors` + `glowColor` (as HSL), ShinyText
   `shineColor`, LineSidebar `accentColor` / `markerColor`.

Example pairings that keep the same mood: deep navy + teal + silver; forest black + moss + brass;
charcoal + electric violet + pale lilac.
