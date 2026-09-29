import DesktopLanding from './components/DesktopLanding'
import MobileExperience from './components/MobileExperience'
import useMediaQuery from './hooks/useMediaQuery'

export default function App() {
  const spacious = useMediaQuery('(min-width: 768px)')
  return spacious ? <DesktopLanding /> : <MobileExperience />
}
