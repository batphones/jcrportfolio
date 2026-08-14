import { about } from '../data/content'
import { ArtBlock, Eyebrow, ImagePlaceholder, Slot } from '../components/primitives'

/**
 * "about me:" — portrait on the left, two stacked info slots on the right.
 * Stacks to a single column on narrow windows / phones.
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

      {/* right: facts + OC profiles */}
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

        <Slot className="p-4">
          <div className="flex h-full flex-col gap-3">
            <div className="text-center">
              <p className="text-[13px] font-bold text-ink sm:text-sm">
                {about.ocProfiles.heading}
              </p>
              <p className="mt-1 text-[10px] leading-snug text-ink/65">{about.ocProfiles.blurb}</p>
            </div>

            <div className="grid flex-1 grid-cols-3 gap-2">
              {about.ocProfiles.characters.map((oc) => (
                <div key={oc.id} className="flex flex-col gap-1">
                  <div className="min-h-[70px] flex-1">
                    <ArtBlock src={oc.src} alt={`${oc.name} — ${oc.tag}`} />
                  </div>
                  <Eyebrow className="text-center">{oc.name}</Eyebrow>
                </div>
              ))}
            </div>
          </div>
        </Slot>
      </div>
    </div>
  )
}
