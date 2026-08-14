import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Window } from '../components/Window'
import { WINDOWS } from './registry'
import { WindowContext } from './WindowContext'
import { useIsDesktop } from '../lib/useMediaQuery'

/** How far each newly-opened window is nudged from the last one. */
const CASCADE_STEP = 28
const CASCADE_WRAP = 6
/** Px of a window that must stay on-screen after a drag. */
const MIN_VISIBLE = 90

/**
 * Owns the stack of open windows and renders them above the desktop.
 *
 * Stacking rules, per the brief:
 *  · opening a window from inside another window pushes a NEW window on top,
 *    offset slightly — the one beneath stays open
 *  · a close button only closes its own window; everything underneath survives
 *  · clicking anywhere in a buried window brings it back to the front
 */
export function WindowManager({ children }) {
  const [stack, setStack] = useState([])
  const isDesktop = useIsDesktop()

  const open = useCallback((kind, props = {}) => {
    const spec = WINDOWS[kind]
    if (!spec) {
      console.warn(`[WindowManager] unknown window kind: "${kind}"`)
      return
    }

    const id = spec.key ? `${kind}:${spec.key(props)}` : kind

    setStack((prev) => {
      // Already open? Just bring it to the front rather than duplicating it.
      const existing = prev.find((win) => win.id === id)
      if (existing) return [...prev.filter((win) => win.id !== id), existing]

      const step = prev.length % CASCADE_WRAP
      const viewportW = window.innerWidth
      const viewportH = window.innerHeight
      const width = Math.min(spec.width, viewportW - 48)

      return [
        ...prev,
        {
          id,
          kind,
          props,
          width,
          x: Math.round((viewportW - width) / 2 + (step - 2) * CASCADE_STEP),
          y: Math.round(Math.max(56, viewportH * 0.11) + step * CASCADE_STEP),
        },
      ]
    })
  }, [])

  const close = useCallback((id) => {
    setStack((prev) => prev.filter((win) => win.id !== id))
  }, [])

  const focus = useCallback((id) => {
    setStack((prev) => {
      if (prev.length < 2 || prev[prev.length - 1].id === id) return prev // already front
      const target = prev.find((win) => win.id === id)
      if (!target) return prev
      return [...prev.filter((win) => win.id !== id), target]
    })
  }, [])

  const closeAll = useCallback(() => setStack([]), [])

  /* Committed position after a header drag. Clamped so a window can never be
     dropped somewhere it can't be grabbed again. */
  const move = useCallback((id, x, y) => {
    setStack((prev) =>
      prev.map((win) => {
        if (win.id !== id) return win
        const minX = MIN_VISIBLE - win.width
        const maxX = window.innerWidth - MIN_VISIBLE
        const maxY = window.innerHeight - MIN_VISIBLE
        return {
          ...win,
          x: Math.min(Math.max(x, minX), maxX),
          y: Math.min(Math.max(y, 0), maxY),
        }
      }),
    )
  }, [])

  // Escape closes the front-most window only, mirroring the close buttons.
  useEffect(() => {
    if (stack.length === 0) return undefined

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setStack((prev) => prev.slice(0, -1))
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [stack.length])

  const value = useMemo(
    () => ({ stack, open, close, focus, move, closeAll, isDesktop }),
    [stack, open, close, focus, move, closeAll, isDesktop],
  )

  return (
    <WindowContext.Provider value={value}>
      {children}

      {/* Window layer — sits above the desktop, only the windows catch clicks.
          `fixed` makes this its own stacking context, so the per-window
          z-indexes inside are local to it. The z-50 here is what actually lifts
          every window above the desktop's own layered content. */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <AnimatePresence>
          {/* Scrim: dims the desktop behind the windows. Deliberately click-
              through, so desktop icons stay usable while windows are open. */}
          {stack.length > 0 && (
            <motion.div
              key="scrim"
              className="absolute inset-0 bg-ink/25"
              style={{ zIndex: 99 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}

          {stack.map((win, index) => {
            const spec = WINDOWS[win.kind]
            const Body = spec.Component

            return (
              <Window
                key={win.id}
                title={spec.title}
                x={win.x}
                y={win.y}
                width={win.width}
                zIndex={100 + index}
                isFront={index === stack.length - 1}
                draggable={isDesktop}
                onClose={() => close(win.id)}
                onFocus={() => focus(win.id)}
                onMove={(nextX, nextY) => move(win.id, nextX, nextY)}
              >
                <Body {...win.props} />
              </Window>
            )
          })}
        </AnimatePresence>
      </div>
    </WindowContext.Provider>
  )
}
