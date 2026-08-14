import { Eyebrow } from '../components/primitives'

/**
 * Single-artwork viewer. Opens stacked on top of the gallery window; closing
 * it reveals the gallery still sitting underneath.
 *
 * The piece is shown whole — `object-contain` inside a height cap — so a tall
 * reference sheet and a wide one both fit without being cropped.
 */
export function ArtworkWindow({ artwork }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid place-items-center rounded-[6px] border border-ink/45 bg-blush-cream p-3">
        <img
          src={artwork.src}
          alt={artwork.title}
          decoding="async"
          draggable={false}
          className="max-h-[62vh] w-auto max-w-full rounded-[3px] object-contain"
        />
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[13px] font-bold text-ink">{artwork.title}</p>
        <Eyebrow>{[artwork.medium, artwork.year].filter(Boolean).join(' · ')}</Eyebrow>
      </div>
    </div>
  )
}
