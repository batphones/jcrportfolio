import { faq } from '../data/content'
import { Slot } from '../components/primitives'

/** "faq:" — plain Q&A list in the shared window chrome. */
export function FaqWindow() {
  return (
    <ul className="flex flex-col gap-2.5">
      {faq.map((entry, index) => (
        <li key={entry.q}>
          <Slot className="p-3.5">
            <p className="text-[12px] leading-snug font-bold text-ink sm:text-[13px]">
              <span className="text-ink/55">{String(index + 1).padStart(2, '0')} · </span>
              {entry.q}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink/70 sm:text-[12px]">
              {entry.a}
            </p>
          </Slot>
        </li>
      ))}
    </ul>
  )
}
