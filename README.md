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

The gallery's `span` field controls tile height in the masonry grid — `1` for a
short tile, `2` for a tall one. The current spans total a whole number of rows
at the desktop width; if you add or remove pieces you may want to re-balance
them so the last row fills.

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
- **Reduced motion** — animations are cut for users who ask for it.
