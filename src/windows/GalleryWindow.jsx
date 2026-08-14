import { artworks } from '../data/content'
import { ArtBlock } from '../components/primitives'
import { useWindows } from './WindowContext'

/**
 * "gallery:" — masonry of artwork thumbnails, mixing tall and short tiles like
 * the wireframe. `span` from content.js drives tile height (1 = short,
 * 2 = tall) and `grid-flow-row-dense` backfills any gap a tall tile leaves, so
 * short tiles later in the list slot into the holes rather than leaving voids.
 *
 * Clicking a tile opens a single-artwork window *on top of* this one; this
 * window stays open underneath.
 */
export function GalleryWindow() {
  const { open } = useWindows()

  return (
    <div className="grid auto-rows-[78px] grid-flow-row-dense grid-cols-2 gap-2.5 sm:auto-rows-[92px] sm:grid-cols-3 lg:grid-cols-4">
      {artworks.map((art) => (
        <button
          key={art.id}
          type="button"
          onClick={() => open('artwork', { artwork: art })}
          title={`Open ${art.title}`}
          style={{ gridRow: `span ${art.span}` }}
          className="no-tap-flash group rounded-[4px] transition-transform duration-150 hover:scale-[1.03] focus-visible:scale-[1.03] active:scale-[0.99]"
        >
          <span className="sr-only">{`${art.title} — ${art.medium}, ${art.year}`}</span>
          <ArtBlock
            src={art.src}
            alt={art.title}
            className="transition-colors group-hover:border-ink/70 group-hover:bg-art-deep"
          />
        </button>
      ))}
    </div>
  )
}
