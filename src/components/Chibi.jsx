import { chibis } from '../data/content'

/**
 * A chibi drawing placed on the desktop.
 *
 * The artwork itself is never transformed — no mirroring, no recolouring, no
 * cropping beyond the transparent margin already trimmed off the PNG. The
 * wrapper handles all positioning; the inner <img> only carries an optional
 * idle bob, so the two transforms can never fight. Sizing is CSS-only.
 *
 * Always click-through: a chibi must never steal a click from an icon it
 * happens to sit near.
 */
export function Chibi({ name, className = '', width, bob = 0 }) {
  const art = chibis[name]
  if (!art) return null

  return (
    <div className={`pointer-events-none absolute select-none ${className}`} style={{ width }}>
      <img
        src={art.src}
        alt={art.alt}
        draggable={false}
        decoding="async"
        className={bob ? 'animate-bob block w-full' : 'block w-full'}
        style={bob ? { '--bob-duration': `${bob}s` } : undefined}
      />
    </div>
  )
}
