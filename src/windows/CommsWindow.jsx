import { socials } from '../data/content'
import { Eyebrow } from '../components/primitives'

/* Static class strings — Tailwind can't see dynamically-built class names. */
const HUES = {
  rosewood: 'bg-rosewood',
  olive: 'bg-olive',
  cream: 'bg-cream',
  khaki: 'bg-khaki',
  blush: 'bg-blush',
  taupe: 'bg-taupe',
}

/**
 * "comms:" — socials laid out as app tiles ("apps as folders" in the
 * wireframe). Entries with no href yet render as disabled tiles rather than
 * linking somewhere broken.
 */
export function CommsWindow() {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>find me elsewhere</Eyebrow>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {socials.map((social) => {
          const tile = (
            <>
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-[10px] border border-ink/45 text-[15px] font-bold text-ink/75 ${
                  HUES[social.hue] ?? 'bg-taupe'
                }`}
                aria-hidden="true"
              >
                {social.name.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-bold text-ink">
                  {social.name}
                </span>
                <span className="block truncate text-[10px] text-ink/60">{social.handle}</span>
              </span>
            </>
          )

          const base =
            'flex items-center gap-2.5 rounded-[6px] border border-ink/45 bg-blush-cream p-2.5 text-left'

          return social.href ? (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className={`${base} no-tap-flash transition hover:-translate-y-0.5 hover:bg-white`}
            >
              {tile}
            </a>
          ) : (
            <div
              key={social.id}
              className={`${base} opacity-60`}
              title="PLACEHOLDER — add a URL in src/data/content.js"
            >
              {tile}
            </div>
          )
        })}
      </div>

      <p className="text-[10px] leading-relaxed text-ink/55">
        PLACEHOLDER — tiles without a URL are shown faded. Add <code>href</code> values in{' '}
        <code>src/data/content.js</code> to activate them.
      </p>
    </div>
  )
}
