import { contact } from '../data/content'
import { Eyebrow, Slot } from '../components/primitives'

/** "contact:" — how to reach the artist. */
export function ContactWindow() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] leading-relaxed text-ink/75">{contact.blurb}</p>

      <ul className="flex flex-col gap-2">
        {contact.lines.map((line) => (
          <li key={line.label}>
            <Slot className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-3">
              <Eyebrow>{line.label}</Eyebrow>
              {line.href ? (
                <a
                  href={line.href}
                  className="text-[12px] font-bold text-ink underline decoration-ink/40 underline-offset-2 hover:decoration-ink"
                >
                  {line.value}
                </a>
              ) : (
                <span className="text-[12px] font-bold text-ink/80">{line.value}</span>
              )}
            </Slot>
          </li>
        ))}
      </ul>

      <p className="rounded-[6px] border border-ink/25 bg-blush-cream p-3 text-[11px] leading-relaxed text-ink/70">
        {contact.note}
      </p>
    </div>
  )
}
