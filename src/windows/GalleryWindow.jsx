import { artworks } from '../data/content'
import { useWindows } from './WindowContext'

/**
 * "gallery:" — a justified grid, the way a photo gallery lays out.
 *
 * Each row's width is shared out in proportion to the pieces' aspect ratios
 * (`flex-grow: ratio` against `flex-basis: 0`), which makes every piece in a
 * row come out the same height and the row fill the window exactly. Nothing is
 * cropped, letterboxed or padded — the artwork keeps its own proportions and
 * there is no leftover space.
 *
 * Below `sm` the rows stack to one piece per line; four images across a phone
 * would be thumbnails.
 *
 * Clicking a piece opens it in a window on top of this one, which stays open
 * underneath.
 */
export function GalleryWindow() {
  const { open } = useWindows()
  const rows = [...new Set(artworks.map((art) => art.row))].sort((a, b) => a - b)

  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((row) => (
        <div key={row} className="flex flex-col gap-2.5 sm:flex-row">
          {artworks
            .filter((art) => art.row === row)
            .map((art) => (
              <button
                key={art.id}
                type="button"
                onClick={() => open('artwork', { artwork: art })}
                title={`Open ${art.title}`}
                /* The ratio drives the flex share, so the row fills exactly. */
                style={{ '--ratio': art.ratio }}
                className="no-tap-flash group block min-w-0 rounded-[3px] transition-transform duration-150 hover:scale-[1.02] focus-visible:scale-[1.02] active:scale-[0.99] sm:[flex-basis:0] sm:[flex-grow:var(--ratio)]"
              >
                <img
                  src={art.src}
                  alt={`${art.title} — ${art.medium}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="block w-full rounded-[3px] border border-ink/45 transition-colors group-hover:border-ink"
                />
              </button>
            ))}
        </div>
      ))}
    </div>
  )
}
