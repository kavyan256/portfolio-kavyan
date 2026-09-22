---
name: neon-portfolio-design
description: Kavyan's portfolio design language — deep warm-dark ground, beige/cream hints, one neon "tube" trim per project, sharp 2px corners, conventions broken on purpose. Use whenever designing, restyling or adding any UI in this portfolio (project cards, project pages, new sections, diagrams), or when asked to make something "match the portfolio", "use the same styling as before", or feel unified with the homepage.
---

# Neon portfolio design

The brief this grew from, in the owner's words: make the projects feel
synchronous and unified with the homepage; minimalist, deep dark colour
palette with beige hints; a neon bright element as a *trim*; card edges
not too rounded; take everything known about design conventions and break
them — aesthetically.

Load the `frontendSkills` skill alongside this one for general craft
(plan → critique → build → critique). This file pins the decisions that
are already made, so every new piece extends the same system instead of
re-inventing it.

## The idea in one line

The home hero is a black room with neon tubes chasing the cursor through
a cream name. Everything else is that room, seen from closer: warm black
ground, cream type, and a single neon line that *draws itself* through
the content like the hero's tube.

## Tokens (never hard-code new colors)

Source of truth: `src/theme/palette.js`, mirrored in `tailwind.config.js`.

| Token | Hex | Tailwind | Role |
|---|---|---|---|
| VOID | `#0b0a09` | `bg-void` | page ground (warm, not pure black) |
| CARBON | `#151311` | `bg-carbon`, `bg-carbon-hi` `#1c1a17` | surfaces, cards, panels |
| PAPER | `#fffce1` | `text-paper` | headings, primary type — the hero's cream |
| BONE | `#b9af95` | `text-bone` | body copy (the "beige hint") |
| DUST | `#8b8371` | `text-dust` | eyebrows, metadata, arrows |
| NEON | magenta `#f967fb`, lime `#83f36e`, cyan `#60aed5`, ember `#fe8a2e` | via `--neon` CSS var | trim only |

Homepage-only: the cream sheet `#fcfaf0` behind "Discover my latest works".
Dark UI may sit *on* it as an inset slab; never recolor the sheet itself.

Rules:
- **One neon per project**, assigned in `src/data/projectIndex.js`
  (Redix magenta, BMOS lime, KaOS cyan, Slate ember). A new project gets
  a neon from the hero's `TubesCursor` light list, never an invented one.
- A group of projects (a category) is the **gradient of its members'
  neons**, in listing order. The group has no neon of its own.
- Neon is light, not paint: 1px lines, dots, glows (`shadow-[0_0_14px_var(--neon)]`),
  hover text color. Never a neon fill behind body text, never a neon button slab.
- Data/diagram colors (GREEN/AMBER/RED/VIOLET in palette.js) are muted on
  purpose so they never compete with a page's neon.

## Type

- **Display:** `font-display` (Amidone Grotesk — the hero's face). Huge,
  tight leading (`leading-[0.86]`–`[0.9]`), slight negative tracking.
  Used for names and titles only, with restraint.
- **Body:** `font-inter`, `text-bone`, `leading-7`, measure ≤ 64ch.
- **Utility:** `font-code` (JetBrains Mono), 11px, uppercase,
  `tracking-[0.18em]`–`[0.22em]`, `text-dust`. For eyebrows, stacks,
  counts, breadcrumbs — anything that is metadata.
- Stacks are written `Go · RESP · AOF` in mono, not as pill tags.

## Shape and structure

- Corners: `rounded-[2px]` on the project pages. On the **homepage**,
  dark surfaces (project cards, marquee tiles) use `rounded-[18px]` — the
  owner found 2px slabs "cut off from the whole website" there. Never
  back to the old `2rem` pill-ish cards. No pill tags anywhere.
- Dark on cream: a void panel on the cream sheet needs a soft shadow
  (`shadow-[0_40px_80px_-48px_rgba(11,10,9,0.6)]`) so it sits on the
  page rather than being punched through it, and must repeat elsewhere
  on the page (marquee tiles) so it isn't a lone island.
- Borders: `border-paper/10`, `/20` on hover. Hairlines, never heavy.
- Rows over grids of boxes: listings are full-width rows divided by
  `border-t border-paper/10`, like a spec sheet, not a card grid.
- Structure must encode truth: a count shows the real number of entries;
  no 01/02/03 numbering unless order means something.
- Real content only. Pull names, summaries and stacks from
  `projectIndex.js`; don't write filler like "Ideas that come to life".
  No stock photos or device mockups — the work itself (names, stacks,
  diagrams, live links) is the visual.

## The signature: neon trim

Reuse, don't reinvent — these live in `src/components/project/ProjectKit.jsx`:

- `NeonTube` — the self-drawing tube through display type (the page's
  one "loud" moment). `colors` = project neon or category gradient.
- Row trim — 1px top line that `scale-x`es in from the left on hover,
  focus and `open` (see `RowTrim` in `CategoryIndex.jsx`).
- `CardTrim` — 1px left edge that grows top-down on hover.
- Hover: display type slides `translate-x-3` and takes the neon color;
  arrows (`→`) nudge `translate-x-1`.

Homepage neon (the owner wants *more* of it there):
- `NeonMark` (`src/components/effects/NeonMark.jsx`) — glowing 3px
  underline for key phrases on cream. On cream use magenta, cyan or
  ember; lime is too faint.
- Nav and contact links: hover draws a neon underline (nav uses the
  full four-neon gradient; each contact link has its own neon).
- Marquee icons cycle through the four neons with a soft drop-shadow
  glow on dark tiles.
- Homepage project cards are summaries only: category title + one-line
  description + tube + arrow. No project lists, stacks or counts there —
  the owner found it too much. Detail lives on the category page.

Spend the boldness once per view: one tube, everything else quiet.

## Breaking conventions (the aesthetic risks already taken)

Keep these; add at most one new one per piece and justify it.
- Display type is oversized and allowed to crowd its container.
- Neon is a line of light, not an accent color.
- No imagery; the tube is the image.
- Warm black instead of #000; cream instead of white.
- Listing pages are indexes (rows), not portfolios (card grids).

## Motion rules (learned the hard way)

- GSAP for entrances: `fromTo` with `yPercent`/opacity, `power3.out`,
  small staggers. Always inside `gsap.context(..., ref)` and **revert on
  unmount**: `return () => ctx.revert()`.
- **Every ScrollTrigger must be killed on unmount.** A leftover trigger on
  the homepage crashed project pages to a blank screen after navigation,
  because `PageShell` calls `ScrollTrigger.refresh()`.
- The homepage scrolls inside `.hide-scrollbar`, not `window`. For "in
  view" on the homepage use `IntersectionObserver`, not a window-based
  ScrollTrigger.
- Always respect `prefers-reduced-motion` (see `reducedMotion()` helpers).

## Layout rules

- Page column: `max-w-6xl`, gutters `px-4 sm:px-10 lg:px-16`.
- Anything that is a horizontal flow of boxes must stack below `sm`, and
  must not be squeezed into half a column: give each box `min-w-0 flex-1
  basis-0` and the flow the full width (the Slate data-model diagram
  overflowed when two flows shared a row).
- Quality floor: works at 390px wide, visible `FOCUS` ring (neon outline),
  keyboard reachable, reduced motion honored.

## Process

1. Name what the piece is and its one job; pull its real content.
2. Sketch it in ASCII using only the tokens above; decide where the one
   neon moment is.
3. Critique: does any part look like a generic template (image-top card,
   pill tags, gradient CTA, cream+serif)? Replace it with the system's
   answer (rows, mono stacks, trim).
4. Build with existing ProjectKit pieces first.
5. Screenshot at 1440px and 390px (headless Chrome via playwright-core
   works in this environment — Chrome is `/usr/bin/google-chrome`),
   including the hover state, then remove one accessory.
6. Run `npx vite build` before calling it done.
