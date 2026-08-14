import { Eyebrow } from '../components/primitives'

/**
 * Single-artwork viewer. Opens stacked on top of the gallery window; closing
 * it reveals the gallery still sitting underneath.
 */
export function ArtworkWindow({ artwork }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid min-h-[260px] flex-1 place-items-center rounded-[6px] border border-ink/45 bg-khaki p-6 sm:min-h-[340px]">
        {artwork.src ? (
          <img
            src={artwork.src}
            alt={artwork.title}
            className="max-h-[52vh] w-auto max-w-full rounded-[3px] object-contain"
          />
        ) : (
          <span className="text-sm font-medium text-ink/70">placeholder.</span>
        )}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[13px] font-bold text-ink">{artwork.title}</p>
        <Eyebrow>
          {artwork.medium} · {artwork.year}
        </Eyebrow>
      </div>
    </div>
  )
}
