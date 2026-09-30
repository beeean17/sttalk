import { lazy, Suspense } from 'react'
import DesktopLanding from './components/DesktopLanding'
import useMediaQuery from './hooks/useMediaQuery'

const MobileExperience = lazy(() => import('./components/MobileExperience'))

export default function App() {
  const spacious = useMediaQuery('(min-width: 768px) and (min-height: 600px)')

  if (spacious) return <DesktopLanding />

  return (
    <Suspense fallback={<div className="mobile-loading" aria-label="행사 정보 불러오는 중" />}>
      <MobileExperience />
    </Suspense>
  )
}
