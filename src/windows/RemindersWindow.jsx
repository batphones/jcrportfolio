import { reminders } from '../data/content'
import { Eyebrow, Slot } from '../components/primitives'

/** "reminders:" — the notification banner's expanded view. */
export function RemindersWindow() {
  return (
    <ul className="flex flex-col gap-2">
      {reminders.items.map((item) => (
        <li key={item.id}>
          <Slot className="p-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[12px] leading-snug font-bold text-ink">{item.title}</p>
              <Eyebrow className="shrink-0">{item.when}</Eyebrow>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-ink/70">{item.body}</p>
          </Slot>
        </li>
      ))}
    </ul>
  )
}
