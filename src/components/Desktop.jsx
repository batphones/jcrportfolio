import { artworks, featured, reminders, site } from '../data/content'
import { Chibi } from './Chibi'
import { CursorSparkles } from './CursorSparkles'
import { DesktopBackground } from './DesktopBackground'
import { DesktopIcon } from './DesktopIcon'
import { Dock } from './Dock'
import { MenuBar } from './MenuBar'
import { Eyebrow } from './primitives'
import { ConstructionBadge, HitCounter, Ticker } from './Y2kWidgets'
import { useWindows } from '../windows/WindowContext'

/**
 * Desktop icons. `pos` is only used on the ≥lg "real desktop" layout — below
 * that breakpoint the same list is rendered as a plain grid, because a literal
 * scattered-icon layout doesn't survive a phone screen.
 */
const ICONS = [
  {
    id: 'about',
    label: 'about me',
    kind: 'about',
    variant: 'folder',
    pos: 'left-[3%] top-[11%]',
  },
  {
    id: 'jpeg1',
    label: 'blue_dress.jpeg',
    kind: 'gallery',
    variant: 'art',
    src: '/art/blue-dress.jpeg',
    title: 'Blue dress — open the gallery',
    pos: 'left-[13.5%] top-[5%]',
  },
  { id: 'faq', label: 'faq', kind: 'faq', variant: 'folder', pos: 'left-[1.5%] top-[53%]' },
  {
    id: 'gallery',
    label: 'gallery',
    kind: 'gallery',
    variant: 'folder',
    pos: 'right-[16%] top-[34%]',
  },
  {
    id: 'jpeg2',
    label: 'annelis.jpeg',
    kind: 'gallery',
    variant: 'art',
    src: '/art/annelis-nurse.jpeg',
    title: 'Annelis — open the gallery',
    pos: 'right-[5%] top-[33%]',
  },
  {
    id: 'comms',
    label: 'comms',
    kind: 'comms',
    variant: 'folder',
    title: 'Socials & apps',
    pos: 'right-[2%] bottom-[4%]',
  },
]

const DOCK_ITEMS = [
  { id: 'contact', label: 'contact', kind: 'contact' },
  { id: 'creds', label: 'creds', kind: 'creds', title: 'Credits' },
]

function Title() {
  return (
    <div className="text-center">
      <p className="font-display text-xl italic text-ink [text-shadow:0_1px_0_rgba(239,240,228,0.55)] sm:text-2xl lg:text-[26px]">
        {site.handle}
      </p>
      <h1 className="text-[38px] leading-none font-bold tracking-tight text-ink [text-shadow:0_2px_0_rgba(239,240,228,0.45)] sm:text-5xl lg:text-6xl">
        {site.title}
      </h1>
    </div>
  )
}

/** The "reminders!" notification banner. */
function RemindersBanner({ onOpen, className = '' }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`no-tap-flash bevel-out group flex items-center justify-center rounded-[6px] border-2 border-ink/55 bg-slot/85 px-4 py-3 text-center backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-slot ${className}`}
    >
      <span className="text-[12px] font-medium text-ink sm:text-[13px]">{reminders.banner}</span>
      <span className="ml-2 grid size-4 shrink-0 place-items-center rounded-full bg-rosewood text-[9px] font-bold text-ink">
        {reminders.items.length}
      </span>
    </button>
  )
}

/** The big pinned/featured block in the middle of the desktop. */
function FeaturedBlock({ onOpen, className = '' }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      title={featured.blurb}
      className={`no-tap-flash bevel-out group flex w-full flex-col items-center justify-center gap-1 rounded-[6px] border-2 border-ink/55 bg-slot px-4 text-center transition hover:-translate-y-0.5 hover:bg-slot-soft ${className}`}
    >
      <Eyebrow className="opacity-70">{featured.eyebrow}</Eyebrow>
      <span className="text-[13px] font-medium text-ink sm:text-sm">{featured.label}</span>
    </button>
  )
}

/** Scanlines + vignette, sat over the desktop but under the windows. */
function CrtOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-40" aria-hidden="true">
      <div className="crt absolute inset-0" />
      <div className="crt-vignette absolute inset-0" />
    </div>
  )
}

export function Desktop() {
  const { open } = useWindows()

  const openFeatured = () => {
    const art = artworks.find((piece) => piece.id === featured.artworkId) ?? artworks[0]
    open('artwork', { artwork: art })
  }

  return (
    <div className="min-h-dvh bg-olive-900 bg-dotgrid p-0 lg:h-dvh lg:overflow-hidden lg:p-5">
      {/* the "screen" */}
      <div className="relative flex min-h-dvh flex-col overflow-hidden border-ink/60 bg-olive-300 lg:h-full lg:min-h-0 lg:rounded-[10px] lg:border-2 lg:shadow-window">
        <DesktopBackground />

        <MenuBar onOpen={open} />

        {/* ============================ ≥ lg: real desktop ==================== */}
        <main className="relative z-10 hidden flex-1 lg:block">
          {/* Free-floating chibis go first, so icons and badges paint in front
              of them. The two that perch *on top of* something are rendered
              after their panel instead — see below.

              These two sit in the side lanes beside the featured block, which
              is sized in vw: below 1280px wide (or on a short screen) there is
              no lane left for them, so they're hidden rather than overlapped. */}
          <Chibi
            name="kick"
            bob={7.5}
            fitHeight
            className="top-[56%] right-[12%] h-[30%] max-xl:hidden [@media(max-height:760px)]:hidden"
          />
          <Chibi
            name="crouch"
            bob={6}
            fitHeight
            className="top-[54%] left-[14%] h-[28%] max-xl:hidden [@media(max-height:760px)]:hidden"
          />

          {/* Centred under the featured block, sitting on the announcement bar:
              bottom-0 is <main>'s floor, and the ticker starts immediately
              below it. */}
          <Chibi name="closeup" fitHeight className="bottom-0 left-1/2 h-[22%] -translate-x-1/2" />

          {/* The banner sits lower than the wireframe's so the chibi leaning on
              it has somewhere to go without colliding with the menu bar. */}
          <div className="absolute top-[16%] right-[3%] w-[32%] max-w-[380px]">
            <RemindersBanner onOpen={() => open('reminders')} className="relative w-full" />
            {/* rendered after the banner, so he rests on top of it */}
            <Chibi name="peek" width={118} className="-left-[2%] bottom-[calc(100%-34px)]" />
          </div>

          {ICONS.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              variant={icon.variant}
              tall={icon.tall}
              src={icon.src}
              title={icon.title}
              onClick={() => open(icon.kind)}
              className={`absolute ${icon.pos}`}
            />
          ))}

          {/* centre column: title + featured block */}
          <div className="absolute top-[45%] left-1/2 flex w-[40vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-24">
            <Title />

            {/* She comes *after* the block, so she sits on top of it — perched
                on the panel's top edge rather than tucked behind it. */}
            <div className="relative w-full">
              <FeaturedBlock onOpen={openFeatured} className="relative h-[140px] xl:h-[165px]" />
              <Chibi name="sit" width={148} bob={6.5} className="left-[6%] bottom-[calc(100%-44px)]" />
            </div>
          </div>

          {/* Y2K trinkets, tucked into the empty corners */}
          <ConstructionBadge className="absolute top-[6%] left-[27%]" />
          <HitCounter className="absolute bottom-[6%] left-[4%]" />
        </main>

        {/* ====================== < lg: simplified stacked layout ============= */}
        <main className="relative z-10 flex flex-1 flex-col gap-6 px-4 py-8 lg:hidden">
          <Title />

          {/* Chibis alternate sides down the column — left, right, left, right,
              then centred at the bottom — so the scroll doesn't stack them all
              against one edge. The mt on each perched wrapper is the headroom
              that chibi needs; without it they ride up over the block above. */}
          <div className="relative mt-10 w-full">
            <RemindersBanner onOpen={() => open('reminders')} className="relative w-full" />
            <Chibi name="peek" width={84} className="bottom-[calc(100%-38px)] left-[5%]" />
          </div>

          <div className="relative mt-8 w-full">
            <FeaturedBlock onOpen={openFeatured} className="relative h-[110px]" />
            <Chibi name="sit" width={100} bob={6.5} className="right-[5%] bottom-[calc(100%-38px)]" />
          </div>

          <div className="grid grid-cols-3 justify-items-center gap-y-5 sm:grid-cols-4">
            {ICONS.map((icon) => (
              <DesktopIcon
                key={icon.id}
                label={icon.label}
                variant={icon.variant}
                tall={false}
                src={icon.src}
                title={icon.title}
                onClick={() => open(icon.kind)}
              />
            ))}
          </div>

          <div className="relative h-[120px]">
            <Chibi name="crouch" width={104} bob={6} className="bottom-0 left-[5%]" />
          </div>

          <div className="relative h-[124px]">
            <Chibi name="kick" width={112} bob={7.5} className="right-[5%] bottom-0" />
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <ConstructionBadge />
            <HitCounter />
          </div>

          {/* Same idea as the desktop: she peeks up from behind the ticker. */}
          {/* centred, and the ticker sits directly under <main> */}
          <div className="relative mt-6 h-[150px]">
            <Chibi name="closeup" width={160} className="bottom-0 left-1/2 -translate-x-1/2" />
          </div>
        </main>

        <Ticker className="relative z-10 mx-3 mb-2 sm:mx-5" />

        <Dock items={DOCK_ITEMS} onOpen={open} />

        <CrtOverlay />
      </div>

      <CursorSparkles />
    </div>
  )
}
