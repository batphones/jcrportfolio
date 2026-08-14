import { ticker, trinkets } from '../data/content'

/**
 * Y2K desktop furniture — a scrolling status strip, an odometer hit counter,
 * and a couple of stickers. All decorative and all driven from `trinkets` /
 * `ticker` in content.js, so the copy can change without touching markup.
 */

/** Scrolling marquee. The list is rendered twice so the loop is seamless. */
export function Ticker({ className = '' }) {
  const line = ticker.join('   ★   ')

  return (
    <div
      className={`bevel-in overflow-hidden rounded-[4px] border-2 border-ink/50 bg-olive-800/85 py-1 ${className}`}
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="px-4 text-[10px] font-medium tracking-wide whitespace-nowrap text-olive-50 uppercase sm:text-[11px]"
          >
            {line}   ★
          </span>
        ))}
      </div>
    </div>
  )
}

/** Odometer-style visitor counter, one beveled cell per digit. */
export function HitCounter({ className = '' }) {
  const digits = String(trinkets.visitorCount).padStart(7, '0').split('')

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div className="bevel-in flex gap-0.5 rounded-[4px] border-2 border-ink/55 bg-ink/80 p-1">
        {digits.map((digit, index) => (
          <span
            key={`${index}-${digit}`}
            className="grid size-4 place-items-center rounded-[2px] bg-olive-900 text-[10px] font-bold text-olive-100 tabular-nums"
          >
            {digit}
          </span>
        ))}
      </div>
      <span className="text-[9px] tracking-[0.16em] text-ink/60 uppercase">
        {trinkets.visitorLabel}
      </span>
    </div>
  )
}

/** Blinking "under construction" sticker, tilted like a sticker should be. */
export function ConstructionBadge({ className = '' }) {
  return (
    <div
      className={`bevel-out -rotate-6 rounded-[4px] border-2 border-ink/60 bg-khaki px-2.5 py-1 ${className}`}
      aria-hidden="true"
    >
      <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] text-ink uppercase">
        <span className="animate-blink">▲</span>
        {trinkets.construction}
        <span className="animate-blink">▲</span>
      </span>
    </div>
  )
}

/** "best viewed at…" plaque. */
export function BestViewedBadge({ className = '' }) {
  return (
    <div
      className={`bevel-out rotate-3 rounded-[4px] border-2 border-ink/50 bg-blush px-2.5 py-1 ${className}`}
      aria-hidden="true"
    >
      <span className="text-[9px] tracking-[0.12em] text-ink/75 uppercase">
        {trinkets.bestViewed}
      </span>
    </div>
  )
}
