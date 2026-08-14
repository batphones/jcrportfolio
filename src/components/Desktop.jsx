import { artworks, featured, reminders, site } from '../data/content'
import { Chibi } from './Chibi'
import { CursorSparkles } from './CursorSparkles'
import { DesktopBackground } from './DesktopBackground'
import { DesktopIcon } from './DesktopIcon'
import { Dock } from './Dock'
import { MenuBar } from './MenuBar'
import { Eyebrow } from './primitives'
import { BestViewedBadge, ConstructionBadge, HitCounter, Ticker } from './Y2kWidgets'
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
    label: 'jpeg1',
    kind: 'gallery',
    variant: 'art',
    tall: true,
    title: 'Open the gallery',
    pos: 'left-[13.5%] top-[5%]',
  },
  { id: 'faq', label: 'faq', kind: 'faq', variant: 'folder', pos: 'left-[1.5%] top-[53%]' },
  {
    id: 'gallery',
    label: 'gallery',
    kind: 'gallery',
    variant: 'folder',
    pos: 'right-[14%] top-[13%]',
  },
  {
    id: 'jpeg2',
    label: 'jpeg2',
    kind: 'gallery',
    variant: 'art',
    tall: true,
    title: 'Open the gallery',
    pos: 'right-[7.5%] top-[34%]',
  },
  {
    id: 'comms',
    label: 'comms',
    kind: 'comms',
    variant: 'folder',
    title: 'Socials & apps',
    pos: 'right-[5.5%] top-[70%]',
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
          {/* Chibis go first: later siblings (icons, banners, trinkets) then
              paint in front of them, and each one is click-through anyway. */}
          <Chibi name="peek" width={130} className="right-[26%] bottom-0 translate-y-[26%]" />
          <Chibi name="kick" width={190} bob={7.5} className="top-[52%] right-[13%]" />
          <Chibi name="crouch" width={148} bob={6} className="top-[68%] left-[16%]" />
          {/* Bottom of the screen, looking up. The ticker and dock are later
              siblings of <main>, so they crop her as she rises past them. */}
          <Chibi name="closeup" width={230} className="bottom-0 left-[26%] translate-y-[32%]" />

          <RemindersBanner
            onOpen={() => open('reminders')}
            className="absolute top-[4%] right-[3%] w-[32%] max-w-[380px]"
          />

          {ICONS.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              variant={icon.variant}
              tall={icon.tall}
              title={icon.title}
              onClick={() => open(icon.kind)}
              className={`absolute ${icon.pos}`}
            />
          ))}

          {/* centre column: title + featured block */}
          <div className="absolute top-[45%] left-1/2 flex w-[44vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-14">
            <Title />

            {/* The chibi is a sibling *before* the block and the block is
                `relative`, so plain DOM order layers her behind it — she reads
                as sitting behind the panel, leaning on its top edge. */}
            <div className="relative w-full">
              <Chibi name="sit" width={172} bob={6.5} className="-left-[12%] bottom-[calc(100%-62px)]" />
              <FeaturedBlock onOpen={openFeatured} className="relative h-[140px] xl:h-[165px]" />
            </div>
          </div>

          {/* Y2K trinkets, tucked into the empty corners */}
          <ConstructionBadge className="absolute top-[6%] left-[27%]" />
          <HitCounter className="absolute bottom-[6%] left-[4%]" />
          <BestViewedBadge className="absolute right-[4%] bottom-[7%]" />
        </main>

        {/* ====================== < lg: simplified stacked layout ============= */}
        <main className="relative z-10 flex flex-1 flex-col gap-6 px-4 py-8 lg:hidden">
          <Title />

          <RemindersBanner onOpen={() => open('reminders')} className="w-full" />

          <div className="relative mt-8 w-full">
            <Chibi name="sit" width={118} bob={6.5} className="bottom-[calc(100%-58px)] left-[4%]" />
            <FeaturedBlock onOpen={openFeatured} className="relative h-[110px]" />
          </div>

          <div className="grid grid-cols-3 justify-items-center gap-y-5 sm:grid-cols-4">
            {ICONS.map((icon) => (
              <DesktopIcon
                key={icon.id}
                label={icon.label}
                variant={icon.variant}
                tall={false}
                title={icon.title}
                onClick={() => open(icon.kind)}
              />
            ))}
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <ConstructionBadge />
            <HitCounter />
            <BestViewedBadge />
          </div>

          {/* Same idea as the desktop: she peeks up from behind the ticker. */}
          <div className="relative mt-6 h-[140px]">
            <Chibi name="closeup" width={150} className="bottom-0 left-1/2 -translate-x-1/2" />
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
