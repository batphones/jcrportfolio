import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable window shell — the chrome every pop-up shares.
 *
 * Desktop: absolutely positioned, draggable by its header bar, cascaded and
 * stacked by the window manager.
 * Mobile:  a sheet pinned to the viewport (dragging a window around a phone
 * screen is pure friction), still stacked so the layering reads the same.
 *
 * Dragging is hand-rolled on pointer events rather than framer-motion's `drag`
 * so the window's committed x/y stay the single source of truth (framer would
 * layer a transform on top of them) and so nothing has to measure constraints.
 * Framer still owns the open/close animation.
 */
export function Window({
  title,
  onClose,
  onFocus,
  onMove,
  isFront,
  zIndex,
  x,
  y,
  width,
  draggable,
  children,
}) {
  const closeRef = useRef(null)
  const headerRef = useRef(null)

  // Move keyboard focus into whichever window is front-most, so Tab continues
  // inside the new window and Enter/Space closes it.
  useEffect(() => {
    if (isFront) closeRef.current?.focus({ preventScroll: true })
  }, [isFront])

  const startDrag = (event) => {
    if (!draggable) return
    if (event.target.closest('button')) return // never drag from the close button
    if (event.button != null && event.button !== 0) return

    event.preventDefault()
    onFocus?.()

    const header = headerRef.current
    const startX = event.clientX
    const startY = event.clientY
    const originX = x
    const originY = y

    const handleMove = (moveEvent) => {
      onMove?.(originX + (moveEvent.clientX - startX), originY + (moveEvent.clientY - startY))
    }

    const stop = () => {
      header.removeEventListener('pointermove', handleMove)
      header.removeEventListener('pointerup', stop)
      header.removeEventListener('pointercancel', stop)
      try {
        header.releasePointerCapture(event.pointerId)
      } catch {
        /* capture may already be gone — nothing to release */
      }
    }

    try {
      header.setPointerCapture(event.pointerId)
    } catch {
      /* synthetic/unsupported pointer ids simply skip capture */
    }
    header.addEventListener('pointermove', handleMove)
    header.addEventListener('pointerup', stop)
    header.addEventListener('pointercancel', stop)
  }

  const placement = draggable
    ? { position: 'absolute', left: x, top: y, width, maxHeight: '82vh', zIndex }
    : { position: 'absolute', zIndex }

  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-label={title}
      className={[
        'window-shell no-tap-flash pointer-events-auto flex flex-col overflow-hidden',
        'rounded-[10px] border border-ink/70 bg-sand-white shadow-window',
        draggable ? '' : 'inset-x-3 top-[7vh] bottom-[7vh]',
      ].join(' ')}
      style={placement}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.92, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 10 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.7 }}
    >
      {/* ---- header bar ---- */}
      <div
        ref={headerRef}
        onPointerDown={startDrag}
        className={[
          'relative flex shrink-0 items-center justify-center border-b border-ink/70 bg-teal px-11 py-2',
          /* select-none/touch-none so dragging the bar moves the window
             instead of selecting the title text or scrolling the page */
          'touch-none select-none',
          draggable ? 'cursor-grab active:cursor-grabbing' : '',
        ].join(' ')}
      >
        <h2 className="truncate text-center text-[15px] font-bold tracking-tight text-ink sm:text-lg">
          {title}
        </h2>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={`Close ${title}`}
          className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-[4px] border border-ink/70 bg-rosewood text-ink transition hover:bg-[#bd6b53] active:scale-95"
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
            <path
              d="M2.5 2.5 L13.5 13.5 M13.5 2.5 L2.5 13.5"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>

      {/* ---- body ---- */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-cream p-3 sm:p-4">{children}</div>
    </motion.div>
  )
}
