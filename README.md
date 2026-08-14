# jinglecatrock's PORTFOLIO.

A single-page art portfolio styled as a macOS-style desktop. Icons and folders
sit on a simulated screen; clicking one opens a draggable pop-up window, and
windows stack on top of each other the way real ones do.

## Running it

```bash
npm install
```

```bash
npm run dev
```

`npm run build` produces a static bundle in `dist/` — deployable to Netlify,
Vercel, GitHub Pages or any static host. No backend, no API keys.

## Look

The palette is the "Earthy Tones" + "Soft Sand" moodboard, declared as tokens in
`src/index.css`. Everything on screen — window chrome, dock, badges — is drawn
from it; there are no off-palette colours left.

The wallpaper is a single-hue **olive ramp** (`--color-olive-50` … `-900`) that
walks from pale sage at the top down to deep olive at the bottom, with four
faint drifting blobs and a twinkling star field over it. The blob opacities are
deliberately low: turn them up and they wash the ramp out into flat sage.

On top of that sits a Y2K layer — a menu bar with a live clock, a scrolling
marquee, an odometer hit counter, stickers, CRT scanlines and a sparkle cursor
trail. All of it is decorative except the menu bar, whose items are real
shortcuts to the windows.

## The chibi artwork

`public/chibi/` holds six chibi drawings placed around the desktop, plus one in
the About window. They are the **original files**, altered only by:

1. flood-filling the white background to transparent, starting from the image
   border — so whites *inside* the drawing (shirts, skin, the thought bubble)
   are never touched, and
2. cropping away the resulting empty margin.

No scaling, mirroring, recolouring or redrawing. Every size on screen is applied
in CSS at display time. `src/components/Chibi.jsx` deliberately has no flip or
filter option so that stays true.

Placement lives in `src/components/Desktop.jsx`. Chibis render *first* inside
`<main>` so icons and badges always sit in front of them, and every one is
`pointer-events-none` so it can never swallow a click meant for an icon.

> **Note on page weight:** the six PNGs total ~3.7 MB, because they're kept at
> full resolution. They are the heaviest thing on the page by far. If load time
> matters more than keeping the pixels byte-identical, generate downscaled or
> WebP copies for display — the originals live in your Downloads folder.

## Stack

- **React 19 + Vite** — app and dev server
- **Tailwind CSS v4** — styling, with the palette declared as design tokens in
  `src/index.css`
- **Framer Motion** — the open/close "pop" animation on windows

## Adding your real content

**All copy and artwork lives in [`src/data/content.js`](src/data/content.js).**
Everything currently reads `PLACEHOLDER — …` so it's obvious what still needs
replacing. You should not need to touch a component to fill the site in.

To use real images:

1. Drop the file into `public/art/` (e.g. `public/art/my-piece.png`)
2. Set `src: '/art/my-piece.png'` on the matching entry in `content.js`

Any entry left as `src: null` renders the coloured placeholder block instead, so
the layout never breaks while it's half-filled.

The gallery's `span` field controls tile height in the masonry — `1` for a short
tile, `2` for a tall one. The grid is dense-packed, so short tiles backfill the
gaps tall ones leave. The current spans total 16, which fills exactly four rows
at the desktop width; if you add or remove pieces, keeping the total a multiple
of four will keep the last row flush.

## Structure

```
src/
  data/content.js        all copy + artwork — the only file you need to edit
  components/
    Desktop.jsx          the screen: icon layout, title, dock, responsive split
    DesktopIcon.jsx      one file/folder icon (folder glyph or art thumbnail)
    Dock.jsx             bottom dock bar
    Window.jsx           reusable window shell — header, close button, drag
    primitives.jsx       shared Slot / ArtBlock / Eyebrow pieces
  windows/
    WindowManager.jsx    owns the open-window stack, cascade, scrim, Escape
    WindowContext.js     useWindows() — open / close / focus, callable anywhere
    registry.js          maps a window kind to its title, width and component
    AboutWindow.jsx      one component per window's content
    GalleryWindow.jsx
    ArtworkWindow.jsx
    FaqWindow.jsx
    CommsWindow.jsx
    ContactWindow.jsx
    CredsWindow.jsx
    RemindersWindow.jsx
  lib/useMediaQuery.js   drives the desktop/mobile split
```

### Adding a new window

1. Write the body component in `src/windows/`
2. Register it in `src/windows/registry.js` with a title and width
3. Open it from anywhere with `const { open } = useWindows(); open('yourKind')`

## Behaviour notes

- **Stacking** — opening a window from inside another (a gallery tile) pushes a
  new window on top, cascaded slightly; the one underneath stays open. A close
  button only closes its own window. Clicking a buried window raises it.
- **Escape** closes the front-most window only.
- **Dragging** — windows are dragged by their header bar on desktop, and are
  clamped so they can never be dropped fully off-screen. Disabled below 1024px,
  where windows render as centred sheets instead.
- **Responsive** — below 1024px the scattered-icon desktop is replaced by a
  simple stacked layout with an icon grid, since a literal desktop doesn't
  translate to a phone.
- **Reduced motion** — every ambient loop (drifting blobs, twinkling stars,
  marquee, blinking) is switched off rather than snapped to a frozen mid-frame,
  and the cursor trail doesn't render at all.
- **Cursor sparkles** are skipped on coarse/touch pointers, throttled to ~14 a
  second, capped at 18 on screen, and each one clears its own timer on unmount.
- **Stacking** — the window layer is `position: fixed`, which makes it its own
  stacking context. Its `z-50` is what lifts windows above the desktop; the
  per-window z-indexes inside are local to that layer.
