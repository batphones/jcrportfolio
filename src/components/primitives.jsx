/**
 * Small shared pieces used inside window bodies, so every window keeps the
 * same wireframe vocabulary: gray "content slots" and purple art blocks.
 */

/** The gray rounded content box from the wireframe. */
export function Slot({ className = '', children, ...rest }) {
  return (
    <div
      className={`rounded-[6px] border border-ink/45 bg-slot ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

/** Section label — small, uppercase, mono. */
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`text-[10px] font-bold tracking-[0.18em] text-ink/55 uppercase ${className}`}>
      {children}
    </p>
  )
}

/**
 * An artwork slot. Renders the real image when `src` is set, and the purple
 * placeholder block from the wireframe when it isn't.
 */
export function ArtBlock({ src, alt, label, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className={`size-full rounded-[4px] border border-ink/45 object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`grid size-full place-items-center rounded-[4px] border border-ink/45 bg-art p-2 text-center ${className}`}
      aria-label={alt}
    >
      {label ? (
        <span className="text-[11px] leading-snug font-bold break-words text-white/90">
          {label}
        </span>
      ) : null}
    </div>
  )
}

/** Neutral image placeholder (used for the About portrait). */
export function ImagePlaceholder({ src, alt, label, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className={`size-full rounded-[6px] border border-ink/45 object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`grid size-full place-items-center rounded-[6px] border border-ink/45 bg-slot-soft p-4 text-center ${className}`}
      aria-label={alt}
    >
      <span className="text-base leading-tight font-medium text-ink/70 sm:text-xl">{label}</span>
    </div>
  )
}
