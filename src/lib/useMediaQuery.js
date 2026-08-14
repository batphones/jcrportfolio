import { useEffect, useState } from 'react'

/**
 * Subscribes to a CSS media query.
 * Used to swap the literal desktop-icon layout for a simple stacked list on
 * small screens, and to disable window dragging where it makes no sense.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)

    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True once the viewport is wide enough for the real desktop metaphor. */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}
