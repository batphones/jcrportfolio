import { useEffect, useState } from 'react'

import { menuBar } from '../data/content'

const pad = (n) => String(n).padStart(2, '0')

/**
 * Classic-OS menu bar: traffic lights, working shortcuts to the main windows,
 * a blinking activity LED and a live clock.
 *
 * The menu items are real navigation rather than decoration — they open the
 * same windows the desktop icons do, so the bar earns its space.
 */
export function MenuBar({ onOpen }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const clock = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

  return (
    <div className="bevel-out relative z-10 flex shrink-0 items-center gap-1 border-b-2 border-ink/60 bg-linear-to-b from-olive-100 to-olive-200 px-2 py-1.5 sm:gap-2 sm:px-3">
      {/* traffic lights */}
      <span className="flex shrink-0 items-center gap-1.5 pr-1 sm:pr-2">
        <span className="size-3 rounded-full border border-ink/40 bg-[#C9A08F]" aria-hidden="true" />
        <span className="size-3 rounded-full border border-ink/40 bg-[#C9C17A]" aria-hidden="true" />
        <span className="size-3 rounded-full border border-ink/40 bg-[#8C9169]" aria-hidden="true" />
      </span>

      <span className="hidden shrink-0 text-[11px] font-bold text-ink/70 sm:inline" aria-hidden="true">
        ◆
      </span>

      {/* window shortcuts */}
      <nav className="flex min-w-0 items-center gap-0.5 sm:gap-1" aria-label="Shortcuts">
        {menuBar.map((item) => (
          <button
            key={item.kind}
            type="button"
            onClick={() => onOpen(item.kind)}
            className="no-tap-flash rounded-[3px] px-1.5 py-0.5 text-[10px] font-medium text-ink/80 transition hover:bg-ink hover:text-olive-50 sm:px-2 sm:text-[11px]"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* right side: activity LED + clock */}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <span className="animate-blink size-2 rounded-full bg-olive-600" aria-hidden="true" />
        <span
          className="bevel-in rounded-[3px] border border-ink/35 bg-olive-50/80 px-1.5 py-0.5 text-[10px] tabular-nums text-ink/80 sm:text-[11px]"
          aria-label={`Clock, ${clock}`}
        >
          {clock}
        </span>
      </div>
    </div>
  )
}
