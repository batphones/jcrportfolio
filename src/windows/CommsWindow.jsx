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
 * wireframe).
 *
 * A tile with an `href` is a link out; one without is a plain tile, because
 * some handles (a Discord username) aren't a URL you can visit. Both are real
 * content, so neither is dimmed.
 */
export function CommsWindow() {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>find me elsewhere</Eyebrow>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
                <span className="block truncate text-[12px] font-bold text-ink">{social.name}</span>
                <span className="block truncate text-[11px] text-ink/65">{social.handle}</span>
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
            <div key={social.id} className={base}>
              {tile}
            </div>
          )
        })}
      </div>
    </div>
  )
}
