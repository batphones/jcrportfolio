import { useEffect, useRef, useState } from 'react'

import { useMediaQuery } from '../lib/useMediaQuery'

const SPAWN_INTERVAL_MS = 70 // throttle: at most ~14 sparkles a second
const SPARKLE_LIFETIME_MS = 820 // must outlast the sparkle-out animation
const MAX_SPARKLES = 18

const TONES = ['text-olive-50', 'text-khaki', 'text-rosewood', 'text-olive-100']

/**
 * Y2K cursor trail — sparkles that spawn behind the pointer and fade out.
 *
 * Skipped entirely on touch/coarse pointers (nothing to trail) and under
 * prefers-reduced-motion. Purely decorative and click-through.
 */
export function CursorSparkles() {
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [sparkles, setSparkles] = useState([])

  const lastSpawnRef = useRef(0)
  const nextIdRef = useRef(0)
  const timersRef = useRef(new Set())

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) return undefined

    const timers = timersRef.current

    const handleMove = (event) => {
      const now = Date.now()
      if (now - lastSpawnRef.current < SPAWN_INTERVAL_MS) return
      lastSpawnRef.current = now

      const id = (nextIdRef.current += 1)
      const sparkle = {
        id,
        x: event.clientX + (Math.random() * 20 - 10),
        y: event.clientY + (Math.random() * 20 - 10),
        size: 7 + Math.random() * 9,
        tone: TONES[id % TONES.length],
      }

      setSparkles((prev) => [...prev.slice(-(MAX_SPARKLES - 1)), sparkle])

      const timer = setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id))
        timers.delete(timer)
      }, SPARKLE_LIFETIME_MS)
      timers.add(timer)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
      setSparkles([])
    }
  }, [isFinePointer, prefersReducedMotion])

  if (!isFinePointer || prefersReducedMotion) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className={`animate-sparkle-out absolute block ${sparkle.tone}`}
          style={{ left: sparkle.x, top: sparkle.y }}
        >
          <svg viewBox="0 0 24 24" width={sparkle.size} height={sparkle.size}>
            <path
              d="M12 0c0 6.6 5.4 12 12 12-6.6 0-12 5.4-12 12 0-6.6-5.4-12-12-12 6.6 0 12-5.4 12-12z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}
    </div>
  )
}
