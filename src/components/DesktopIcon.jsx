import { ArtBlock } from './primitives'

/** Warm khaki folder, drawn to read like a macOS folder at small sizes. */
function FolderGlyph() {
  return (
    <svg viewBox="0 0 64 50" className="size-full" aria-hidden="true">
      {/* back panel + tab */}
      <path
        d="M2 10a5 5 0 0 1 5-5h15.6a4 4 0 0 1 2.9 1.2L30 11h27a5 5 0 0 1 5 5v27a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5z"
        className="fill-olive"
      />
      {/* front flap, slightly lighter so the fold reads */}
      <path
        d="M2 17h60v26a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5z"
        className="fill-khaki"
      />
      <path
        d="M2 10a5 5 0 0 1 5-5h15.6a4 4 0 0 1 2.9 1.2L30 11h27a5 5 0 0 1 5 5v27a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5z"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
    </svg>
  )
}

/**
 * A desktop file/folder: icon above, label underneath, macOS-style hover
 * (slight lift + highlighted label).
 *
 * `variant`
 *   folder — khaki folder glyph
 *   art    — purple artwork thumbnail placeholder
 */
export function DesktopIcon({
  label,
  variant = 'folder',
  tall = false,
  onClick,
  title,
  className = '',
  size = 'md',
}) {
  const iconBox =
    variant === 'art'
      ? tall
        ? 'w-[62px] h-[86px] sm:w-[74px] sm:h-[104px]'
        : 'w-[62px] h-[62px] sm:w-[74px] sm:h-[74px]'
      : size === 'sm'
        ? 'w-[52px] h-[42px] sm:w-[58px] sm:h-[46px]'
        : 'w-[64px] h-[52px] sm:w-[74px] sm:h-[58px]'

  return (
    <button
      type="button"
      onClick={onClick}
      title={title ?? label}
      className={`no-tap-flash group flex w-[92px] flex-col items-center gap-1.5 outline-none sm:w-[104px] ${className}`}
    >
      <span
        className={`${iconBox} shadow-icon block text-ink transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.07] group-focus-visible:scale-[1.07] group-active:scale-[0.97]`}
      >
        {variant === 'art' ? (
          <ArtBlock
            alt={label}
            className="transition-colors group-hover:bg-art-deep"
          />
        ) : (
          <FolderGlyph />
        )}
      </span>

      <span className="max-w-full rounded-[3px] px-1.5 py-0.5 text-center text-[11px] leading-tight font-medium break-words text-ink transition-colors group-hover:bg-ink group-hover:text-cream group-focus-visible:bg-ink group-focus-visible:text-cream sm:text-[12px]">
        {label}
      </span>
    </button>
  )
}
