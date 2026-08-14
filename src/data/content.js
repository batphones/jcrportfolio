/**
 * ---------------------------------------------------------------------------
 * ALL SITE COPY + ARTWORK LIVES HERE.
 *
 * Everything below is a clearly-marked placeholder. To ship real content you
 * should only ever need to edit this one file — no component changes required.
 *
 * To add a real image anywhere a placeholder appears:
 *   1. drop the file in  /public/art/  (e.g. /public/art/my-piece.png)
 *   2. set  src: '/art/my-piece.png'  on the matching entry below
 * Any entry with `src: null` renders the coloured placeholder block instead.
 * ---------------------------------------------------------------------------
 */

export const site = {
  handle: "jinglecatrock's", // small script line above the title
  title: 'PORTFOLIO.', // big bold title
}

/** Menu-bar shortcuts, left to right. Each one opens its window. */
export const menuBar = [
  { label: 'about', kind: 'about' },
  { label: 'gallery', kind: 'gallery' },
  { label: 'faq', kind: 'faq' },
  { label: 'comms', kind: 'comms' },
]

/** Scrolling marquee above the dock — pure Y2K status strip. */
export const ticker = [
  'PLACEHOLDER — welcome to my corner of the web',
  'commissions: OPEN / CLOSED',
  'new pieces in the gallery',
  'thanks for visiting !!',
  'best viewed with your speakers on',
]

/** Y2K desktop trinkets. Decorative — change the copy or drop them entirely. */
export const trinkets = {
  visitorCount: 131072, // fake hit counter seed
  visitorLabel: 'visitors',
  construction: 'under construction',
}

/**
 * Chibi artwork scattered around the desktop.
 *
 * The PNGs in /public/chibi/ are the original drawings with only the white
 * background flood-filled to transparent and the empty margin cropped — no
 * scaling, recolouring or redrawing. Every size below is applied in CSS at
 * display time, so the files themselves stay untouched.
 *
 * `w` is the rendered width; `pos` places it on the ≥lg desktop.
 */
export const chibis = {
  peek: {
    src: '/chibi/chibi-1-peek.png',
    alt: 'Chibi of a dark-haired elf boy in armour, resting his chin on his hand',
  },
  kick: {
    src: '/chibi/chibi-2-kick.png',
    alt: 'Chibi of a winking girl with a spotted leopard tail, mid-kick',
  },
  sit: {
    src: '/chibi/chibi-3-sit.png',
    alt: 'Chibi of a flustered girl sitting down, steam and hearts around her',
  },
  crouch: {
    src: '/chibi/chibi-4-crouch.png',
    alt: 'Chibi of a startled girl crouching, with an exclamation mark above her',
  },
  closeup: {
    src: '/chibi/chibi-5-closeup.png',
    alt: 'Close-up chibi of a delighted girl with sparkling star-shaped eyes',
  },
  beach: {
    src: '/chibi/chibi-6-beach.png',
    alt: 'Chibi of a girl in a sunhat sitting on a beach, daydreaming about friends',
  },
}

/** The "reminders!" notification banner on the desktop. */
export const reminders = {
  banner: 'reminders!',
  items: [
    {
      id: 'r1',
      title: 'PLACEHOLDER — commissions status',
      body: 'Commissions are currently OPEN / CLOSED. Swap this line for the real status.',
      when: 'pinned',
    },
    {
      id: 'r2',
      title: 'PLACEHOLDER — latest upload',
      body: 'New piece added to the gallery. Link or describe it here.',
      when: '2 days ago',
    },
    {
      id: 'r3',
      title: 'PLACEHOLDER — announcement',
      body: 'Con appearance, shop restock, zine launch — whatever needs shouting about.',
      when: 'last week',
    },
  ],
}

/** "about me" window. */
export const about = {
  /* Profile photo / illustration. Set `src` to show a real image. */
  portrait: { src: null, alt: 'PLACEHOLDER — profile photo or self-illustration' },
  facts: [
    { label: 'Name', value: 'PLACEHOLDER — your name / alias' },
    { label: 'Apps Used', value: 'PLACEHOLDER — Procreate, CSP, Blender…' },
    { label: 'Short Description', value: 'PLACEHOLDER — one line on what you make' },
    { label: 'Based in', value: 'PLACEHOLDER — city, country' },
    { label: 'Experience', value: 'PLACEHOLDER — X years / notable clients' },
  ],
}

/**
 * Gallery tiles. `span` drives the masonry height (1 = short, 2 = tall) so the
 * grid keeps the uneven rhythm from the wireframe.
 */
export const artworks = [
  { id: 'a1', title: 'PLACEHOLDER — piece 01', year: '2025', medium: 'digital illustration', span: 2, src: null },
  { id: 'a2', title: 'PLACEHOLDER — piece 02', year: '2025', medium: 'character design', span: 1, src: null },
  { id: 'a3', title: 'PLACEHOLDER — piece 03', year: '2025', medium: 'digital illustration', span: 1, src: null },
  { id: 'a4', title: 'PLACEHOLDER — piece 04', year: '2024', medium: 'cover art', span: 2, src: null },
  { id: 'a5', title: 'PLACEHOLDER — piece 05', year: '2024', medium: 'sketch', span: 1, src: null },
  { id: 'a6', title: 'PLACEHOLDER — piece 06', year: '2024', medium: 'digital painting', span: 2, src: null },
  { id: 'a7', title: 'PLACEHOLDER — piece 07', year: '2024', medium: 'character design', span: 1, src: null },
  { id: 'a8', title: 'PLACEHOLDER — piece 08', year: '2023', medium: 'illustration', span: 1, src: null },
  { id: 'a9', title: 'PLACEHOLDER — piece 09', year: '2023', medium: 'study', span: 2, src: null },
  { id: 'a10', title: 'PLACEHOLDER — piece 10', year: '2023', medium: 'illustration', span: 1, src: null },
  { id: 'a11', title: 'PLACEHOLDER — piece 11', year: '2023', medium: 'sketch', span: 1, src: null },
  { id: 'a12', title: 'PLACEHOLDER — piece 12', year: '2022', medium: 'illustration', span: 1, src: null },
]


/** The featured / pinned block in the middle of the desktop. */
export const featured = {
  label: 'placeholder.',
  eyebrow: 'featured',
  blurb: 'PLACEHOLDER — pin a favourite piece or a short intro blurb here.',
  artworkId: 'a1', // clicking the block opens this artwork
}

/** "faq" window. */
export const faq = [
  {
    q: 'PLACEHOLDER — Are commissions open?',
    a: 'Replace with the real answer. Mention turnaround time and how to enquire.',
  },
  {
    q: 'PLACEHOLDER — What do you charge?',
    a: 'Replace with pricing, or point at a price sheet.',
  },
  {
    q: 'PLACEHOLDER — Can I use your art?',
    a: 'Replace with your usage / repost / AI-training policy.',
  },
  {
    q: 'PLACEHOLDER — What programs do you use?',
    a: 'Replace with your tools and hardware.',
  },
  {
    q: 'PLACEHOLDER — Do you do NSFW / refunds / rush jobs?',
    a: 'Replace with the terms you actually want to state up front.',
  },
]

/**
 * "comms" window — apps-as-folders. `href: null` renders a disabled tile so
 * nothing links to a dead page before you fill the real URL in.
 */
export const socials = [
  { id: 's1', name: 'Instagram', handle: '@placeholder', href: null, hue: 'rosewood' },
  { id: 's2', name: 'Twitter / X', handle: '@placeholder', href: null, hue: 'olive' },
  { id: 's3', name: 'Bluesky', handle: '@placeholder', href: null, hue: 'cream' },
  { id: 's4', name: 'Tumblr', handle: '@placeholder', href: null, hue: 'khaki' },
  { id: 's5', name: 'Ko-fi', handle: '@placeholder', href: null, hue: 'blush' },
  { id: 's6', name: 'Discord', handle: 'placeholder#0000', href: null, hue: 'taupe' },
]

/** "contact" window. */
export const contact = {
  blurb: 'PLACEHOLDER — best way to reach you, and how fast you usually reply.',
  lines: [
    { label: 'Email', value: 'PLACEHOLDER — you@example.com', href: null },
    { label: 'Commissions', value: 'PLACEHOLDER — form or email', href: null },
    { label: 'Business', value: 'PLACEHOLDER — agent / work enquiries', href: null },
  ],
  note: 'PLACEHOLDER — e.g. "please read the FAQ before sending a commission request."',
}

/** "creds" window. */
export const credits = {
  intro: 'PLACEHOLDER — credits + attributions.',
  groups: [
    {
      heading: 'Type',
      items: ['System monospace stack — UI + labels', 'System serif stack — display title'],
    },
    {
      heading: 'Built with',
      items: ['React + Vite', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      heading: 'Design',
      items: [
        'Layout + art direction — PLACEHOLDER',
        'Palette — "Earthy Tones" / "Soft Sand" moodboard',
      ],
    },
    {
      heading: 'Thanks',
      items: ['PLACEHOLDER — anyone you want to shout out'],
    },
  ],
  footer: 'PLACEHOLDER — © year, all artwork belongs to its creator.',
}
