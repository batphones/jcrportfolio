import { about, chibis } from '../data/content'
import { ImagePlaceholder, Slot } from '../components/primitives'

/**
 * "about me:" — portrait on the left, facts and the beach illustration on the
 * right. Stacks to a single column on narrow windows / phones.
 */
export function AboutWindow() {
  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* left: portrait */}
      {/* Capped on phones so the portrait doesn't push everything below the fold */}
      <div className="aspect-[5/4] max-h-[40vh] sm:aspect-auto sm:max-h-none sm:min-h-[300px]">
        <ImagePlaceholder
          src={about.portrait.src}
          alt={about.portrait.alt}
          label={
            <>
              image
              <br />
              placeholder.
            </>
          }
        />
      </div>

      {/* right: facts, then the illustration on its own */}
      <div className="grid gap-3 sm:grid-rows-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Slot className="p-4">
          <ul className="flex h-full flex-col justify-center gap-2 text-center">
            {about.facts.map((fact) => (
              <li key={fact.label} className="text-[12px] leading-snug text-ink sm:text-[13px]">
                <span className="font-bold">· {fact.label}</span>
                <span className="block text-[11px] text-ink/65 sm:text-[12px]">{fact.value}</span>
              </li>
            ))}
          </ul>
        </Slot>

        {/* Just the artwork — no panel, no heading, no tiles. */}
        <img
          src={chibis.beach.src}
          alt={chibis.beach.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="mx-auto block max-h-[300px] w-full max-w-[340px] object-contain select-none"
        />
      </div>
    </div>
  )
}
