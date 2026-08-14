import { DesktopIcon } from './DesktopIcon'

/**
 * macOS-style dock: a gray bar across the bottom with its icons poking up
 * above the top edge, as in the wireframe.
 */
export function Dock({ items, onOpen }) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-[940px] px-3 pb-3 sm:px-5 sm:pb-4">
      <div className="bevel-out h-[52px] rounded-[6px] border-2 border-ink/55 bg-slot/85 backdrop-blur-sm sm:h-[58px]" />

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
