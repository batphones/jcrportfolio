import { artworks } from '../data/content'
import { ArtBlock } from '../components/primitives'
import { useWindows } from './WindowContext'

/**
 * "gallery:" — uneven grid of artwork thumbnails, matching the wireframe's
 * mix of tall and short tiles. Clicking a tile opens a single-artwork window
 * *on top of* this one; this window stays open underneath.
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
