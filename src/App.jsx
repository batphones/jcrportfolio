import { Desktop } from './components/Desktop'
import { WindowManager } from './windows/WindowManager'

export default function App() {
  return (
    <WindowManager>
      <Desktop />
    </WindowManager>
  )
}
