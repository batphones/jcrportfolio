import { artworks, featured, reminders, site } from '../data/content'
import { DesktopIcon } from './DesktopIcon'
import { Dock } from './Dock'
import { Eyebrow } from './primitives'
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

/** Decorative macOS traffic lights. */
function ChromeBar() {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-ink/20 bg-blush-cream/80 px-3 py-2">
      <span className="size-3 rounded-full border border-ink/20 bg-[#ED6A5E]" aria-hidden="true" />
      <span className="size-3 rounded-full border border-ink/20 bg-[#F5BF4F]" aria-hidden="true" />
      <span className="size-3 rounded-full border border-ink/20 bg-[#61C554]" aria-hidden="true" />
      <span className="ml-2 truncate text-[10px] tracking-wider text-ink/45">
        jinglecatrock — portfolio
      </span>
    </div>
  )
}

function Title() {
  return (
    <div className="text-center">
      <p className="font-display text-xl italic sm:text-2xl lg:text-[26px]">{site.handle}</p>
      <h1 className="text-[38px] leading-none font-bold tracking-tight sm:text-5xl lg:text-6xl">
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
      className={`no-tap-flash group flex items-center justify-center rounded-[8px] border border-ink/40 bg-slot/85 px-4 py-3 text-center transition hover:-translate-y-0.5 hover:bg-slot ${className}`}
    >
      <span className="text-[12px] font-medium text-ink sm:text-[13px]">{reminders.banner}</span>
      <span className="ml-2 grid size-4 shrink-0 place-items-center rounded-full bg-rosewood text-[9px] font-bold text-cream">
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
      className={`no-tap-flash group flex w-full flex-col items-center justify-center gap-1 rounded-[8px] border border-ink/40 bg-slot/85 px-4 text-center transition hover:-translate-y-0.5 hover:bg-slot ${className}`}
    >
      <Eyebrow className="opacity-70">{featured.eyebrow}</Eyebrow>
      <span className="text-[13px] font-medium text-ink sm:text-sm">{featured.label}</span>
    </button>
  )
}

export function Desktop() {
  const { open } = useWindows()

  const openFeatured = () => {
    const art = artworks.find((piece) => piece.id === featured.artworkId) ?? artworks[0]
    open('artwork', { artwork: art })
  }

  return (
    <div className="min-h-dvh bg-taupe/35 bg-dotgrid p-0 lg:h-dvh lg:overflow-hidden lg:p-5">
      {/* the "screen" */}
      <div className="flex min-h-dvh flex-col overflow-hidden border-ink/40 bg-sand-white bg-grain lg:h-full lg:min-h-0 lg:rounded-[10px] lg:border lg:shadow-window">
        <ChromeBar />

        {/* ============================ ≥ lg: real desktop ==================== */}
        <main className="relative hidden flex-1 lg:block">
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
          <div className="absolute top-[45%] left-1/2 flex w-[44vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-10">
            <Title />
            <FeaturedBlock onOpen={openFeatured} className="h-[140px] xl:h-[165px]" />
          </div>
        </main>

        {/* ====================== < lg: simplified stacked layout ============= */}
        <main className="flex flex-1 flex-col gap-6 px-4 py-8 lg:hidden">
          <Title />

          <RemindersBanner onOpen={() => open('reminders')} className="w-full" />

          <FeaturedBlock onOpen={openFeatured} className="h-[110px]" />

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
        </main>

        <Dock items={DOCK_ITEMS} onOpen={open} />
      </div>
    </div>
  )
}
