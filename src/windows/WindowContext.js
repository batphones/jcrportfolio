import { createContext, useContext } from 'react'

/**
 * Window-manager API shared by the desktop and by anything rendered inside a
 * window (so a gallery tile can open a *new* window on top of its own).
 *
 *   open(kind, props?)  open or focus a window
 *   close(id)           close one window by id
 *   focus(id)           bring one window to the front of the stack
 *   stack               ordered array, last entry is the front-most window
 */
export const WindowContext = createContext(null)

export function useWindows() {
  const ctx = useContext(WindowContext)
  if (!ctx) {
    throw new Error('useWindows() must be used inside <WindowManager>')
  }
  return ctx
}
