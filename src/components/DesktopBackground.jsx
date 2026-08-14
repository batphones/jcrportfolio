/**
 * Animated desktop wallpaper: a palette gradient, four slow-drifting colour
 * blobs, and a field of twinkling stars.
 *
 * The stars are PLACEHOLDER decoration — swap `StarGlyph` for real sparkle
 * art, or drop the whole <StarField> if the desktop should stay bare. Their
 * positions live in STARS below so they can be re-scattered without touching
 * the markup.
 *
 * Purely decorative: the whole layer is aria-hidden and click-through, and it
 * sits behind every icon and window.
 */

/* Drifting colour blobs. Kept low-opacity so ink-coloured text stays legible. */
const BLOBS = [
  { className: 'animate-drift-a', style: { top: '-14%', left: '-8%', width: '46%', height: '52%', background: 'var(--color-khaki)', opacity: 0.5 } },
  { className: 'animate-drift-b', style: { top: '22%', right: '-12%', width: '52%', height: '58%', background: 'var(--color-rosewood)', opacity: 0.34 } },
  { className: 'animate-drift-c', style: { bottom: '-20%', left: '18%', width: '48%', height: '50%', background: 'var(--color-olive)', opacity: 0.26 } },
  { className: 'animate-drift-d', style: { top: '4%', left: '38%', width: '38%', height: '44%', background: 'var(--color-blush)', opacity: 0.55 } },
]

/**
 * PLACEHOLDER star positions — hand-scattered rather than random so the layout
 * is identical on every render and never lands a star dead-centre behind the
 * title. `s` is size in px, `d` the twinkle duration, `delay` the offset.
 */
const STARS = [
  { x: 6, y: 12, s: 16, d: 4.5, delay: 0, c: 'text-olive' },
  { x: 13, y: 34, s: 10, d: 5.5, delay: 1.2, c: 'text-rosewood' },
  { x: 4, y: 62, s: 13, d: 4, delay: 2.4, c: 'text-olive' },
  { x: 10, y: 82, s: 9, d: 6, delay: 0.6, c: 'text-rosewood' },
  { x: 19, y: 71, s: 15, d: 4.8, delay: 3.1, c: 'text-olive' },
  { x: 24, y: 20, s: 11, d: 5.2, delay: 1.8, c: 'text-rosewood' },
  { x: 30, y: 47, s: 12, d: 4.2, delay: 2.9, c: 'text-olive' },
  { x: 27, y: 89, s: 18, d: 5.8, delay: 0.3, c: 'text-olive' },
  { x: 36, y: 8, s: 9, d: 4.6, delay: 3.6, c: 'text-rosewood' },
  { x: 41, y: 78, s: 14, d: 5, delay: 1.5, c: 'text-olive' },
  { x: 45, y: 26, s: 10, d: 6.2, delay: 2.1, c: 'text-rosewood' },
  { x: 49, y: 92, s: 12, d: 4.4, delay: 0.9, c: 'text-olive' },
  { x: 54, y: 14, s: 15, d: 5.4, delay: 3.3, c: 'text-rosewood' },
  { x: 58, y: 68, s: 9, d: 4.9, delay: 1.1, c: 'text-olive' },
  { x: 63, y: 40, s: 17, d: 5.6, delay: 2.7, c: 'text-rosewood' },
  { x: 67, y: 85, s: 11, d: 4.1, delay: 0.4, c: 'text-olive' },
  { x: 71, y: 22, s: 13, d: 6.4, delay: 3.9, c: 'text-rosewood' },
  { x: 76, y: 57, s: 9, d: 4.7, delay: 1.7, c: 'text-olive' },
  { x: 80, y: 9, s: 14, d: 5.1, delay: 2.3, c: 'text-rosewood' },
  { x: 84, y: 76, s: 19, d: 5.9, delay: 0.8, c: 'text-olive' },
  { x: 88, y: 44, s: 11, d: 4.3, delay: 3.4, c: 'text-rosewood' },
  { x: 92, y: 88, s: 13, d: 5.3, delay: 1.9, c: 'text-olive' },
  { x: 95, y: 30, s: 16, d: 4.5, delay: 2.6, c: 'text-rosewood' },
  { x: 97, y: 64, s: 10, d: 6.1, delay: 0.2, c: 'text-olive' },
  { x: 34, y: 60, s: 10, d: 5.7, delay: 3.7, c: 'text-rosewood' },
  { x: 15, y: 50, s: 12, d: 4.4, delay: 2.2, c: 'text-olive' },
  { x: 60, y: 95, s: 11, d: 5.5, delay: 1.4, c: 'text-rosewood' },
  { x: 73, y: 96, s: 9, d: 4.8, delay: 3.0, c: 'text-olive' },
  { x: 22, y: 5, s: 12, d: 5.0, delay: 2.5, c: 'text-olive' },
  { x: 47, y: 55, s: 9, d: 6.3, delay: 0.7, c: 'text-rosewood' },
  { x: 8, y: 94, s: 14, d: 4.6, delay: 1.6, c: 'text-olive' },
  { x: 90, y: 15, s: 10, d: 5.2, delay: 3.5, c: 'text-olive' },
]


/** Four-point sparkle. Replace this path to change the star shape. */
function StarGlyph({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 0c0 6.6 5.4 12 12 12-6.6 0-12 5.4-12 12 0-6.6-5.4-12-12-12 6.6 0 12-5.4 12-12z"
        fill="currentColor"
      />
    </svg>
  )
}

function StarField() {
  return (
    <div className="absolute inset-0">
      {STARS.map((star) => (
        <span
          key={`${star.x}-${star.y}`}
          className={`animate-twinkle absolute block ${star.c}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            '--twinkle-duration': `${star.d}s`,
            '--twinkle-delay': `${star.delay}s`,
          }}
        >
          <StarGlyph size={star.s} />
        </span>
      ))}
    </div>
  )
}

export function DesktopBackground() {
  return (
    <div className="bg-desk pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BLOBS.map((blob) => (
        <div key={blob.className} className={`blob ${blob.className}`} style={blob.style} />
      ))}
      <StarField />
      {/* Paper grain over the whole thing so the gradient isn't glassy-flat */}
      <div className="bg-grain absolute inset-0" />
    </div>
  )
}
