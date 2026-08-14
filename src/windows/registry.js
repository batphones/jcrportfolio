import { AboutWindow } from './AboutWindow'
import { ArtworkWindow } from './ArtworkWindow'
import { CommsWindow } from './CommsWindow'
import { ContactWindow } from './ContactWindow'
import { CredsWindow } from './CredsWindow'
import { FaqWindow } from './FaqWindow'
import { GalleryWindow } from './GalleryWindow'
import { RemindersWindow } from './RemindersWindow'

/**
 * Every window kind the desktop can open.
 *
 *   title      header text
 *   width      desktop width in px (mobile ignores it and uses a sheet)
 *   Component  body content
 *   key(props) optional — lets one kind have several distinct instances open
 *              at once (used by `artwork`, keyed on the piece's id)
 */
export const WINDOWS = {
  about: { title: 'about me:', width: 760, Component: AboutWindow },
  gallery: { title: 'gallery:', width: 800, Component: GalleryWindow },
  artwork: {
    title: 'artwork:',
    width: 520,
    Component: ArtworkWindow,
    key: (props) => props.artwork.id,
  },
  faq: { title: 'faq:', width: 520, Component: FaqWindow },
  comms: { title: 'comms:', width: 580, Component: CommsWindow },
  contact: { title: 'contact:', width: 460, Component: ContactWindow },
  creds: { title: 'creds:', width: 560, Component: CredsWindow },
  reminders: { title: 'reminders:', width: 480, Component: RemindersWindow },
}
