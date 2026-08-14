import { credits } from '../data/content'
import { Eyebrow } from '../components/primitives'

/** "creds:" — credits and attributions. */
export function CredsWindow() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] leading-relaxed text-ink/75">{credits.intro}</p>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {credits.groups.map((group) => (
          <div
            key={group.heading}
            className="rounded-[6px] border border-ink/45 bg-blush-cream p-3"
          >
            <Eyebrow>{group.heading}</Eyebrow>
            <ul className="mt-1.5 flex flex-col gap-1">
              {group.items.map((item) => (
                <li key={item} className="text-[11px] leading-snug text-ink/75">
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] text-ink/55">{credits.footer}</p>
    </div>
  )
}
