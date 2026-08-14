import { chibis } from '../data/content'

/**
 * A chibi drawing placed on the desktop.
 *
 * The artwork itself is never transformed — no mirroring, no recolouring, no
 * cropping beyond the transparent margin already trimmed off the PNG. The
 * wrapper handles all positioning; the inner <img> only carries an optional
 * idle bob, so the two transforms can never fight. Sizing is CSS-only.
 *
 * Three ways to size one, in order of robustness:
 *  · `fitHeight` + an `h-…%` class — scales with the desktop's height. Use
 *    this for anything that has to stay clear of the featured block, whose
 *    own size is a percentage of the viewport: a fixed-px chibi that clears
 *    it at 1440x900 will collide at 1024x700.
 *  · a `w-…` class in `className` — fixed, but can vary per breakpoint.
 *  · `width` as a number — fixed px, fine inside a panel that shares its scale.
 *
 * Always click-through: a chibi must never steal a click from an icon it
 * happens to sit near.
 */
export function Chibi({ name, className = '', width, bob = 0, fitHeight = false }) {
  const art = chibis[name]
  if (!art) return null

  return (
    <div
      className={`pointer-events-none absolute select-none ${className}`}
      style={width ? { width } : undefined}
    >
      <img
        src={art.src}
        alt={art.alt}
        draggable={false}
        decoding="async"
        className={[
          fitHeight ? 'h-full w-auto' : 'w-full',
          'block',
          bob ? 'animate-bob' : '',
        ].join(' ')}
        style={bob ? { '--bob-duration': `${bob}s` } : undefined}
      />
    </div>
  )
}
