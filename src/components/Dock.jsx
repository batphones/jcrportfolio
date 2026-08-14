import { DesktopIcon } from './DesktopIcon'

/**
 * macOS-style dock: a gray bar across the bottom with its icons poking up
 * above the top edge, as in the wireframe.
 */
export function Dock({ items, onOpen }) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-[940px] px-3 pb-3 sm:px-5 sm:pb-4">
      <div className="h-[52px] rounded-[8px] border border-ink/40 bg-slot/80 shadow-[0_-1px_0_rgba(255,255,255,0.35)_inset] backdrop-blur-sm sm:h-[58px]" />

      <div className="absolute inset-x-0 bottom-4 flex items-end justify-center gap-2 sm:bottom-5 sm:gap-6">
        {items.map((item) => (
          <DesktopIcon
            key={item.id}
            label={item.label}
            size="sm"
            title={item.title}
            onClick={() => onOpen(item.kind)}
          />
        ))}
      </div>
    </div>
  )
}
