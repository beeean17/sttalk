import { useEffect, useLayoutEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import useMediaQuery from '../hooks/useMediaQuery'

type ThemePreference = 'system' | 'light' | 'dark'
const storageKey = 'sttalk-theme'

function readPreference(value: string | null | undefined): ThemePreference {
  return value === 'light' || value === 'dark' ? value : 'system'
}

export default function ThemeSelect() {
  const [preference, setPreference] = useState<ThemePreference>(() =>
    readPreference(document.documentElement.dataset.themePreference),
  )
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)')
  const resolved = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference

  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.theme = resolved
    root.dataset.themePreference = preference
    const pageColor = getComputedStyle(root).getPropertyValue('--background').trim()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', pageColor)
  }, [preference, resolved])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null)
        setPreference(readPreference(event.newValue))
    }
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  function changePreference(next: ThemePreference) {
    setPreference(next)
    try {
      if (next === 'system') localStorage.removeItem(storageKey)
      else localStorage.setItem(storageKey, next)
    } catch {
      // The choice still works for this page even if saving is unavailable.
    }
  }

  const Icon = preference === 'system' ? Monitor : preference === 'dark' ? Moon : Sun
  const label = preference === 'system' ? '시스템 설정' : preference === 'dark' ? '다크' : '라이트'

  return (
    <div className="relative grid size-11 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-surface focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-focus">
      <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
      <select
        aria-label="색상 테마"
        title={`색상 테마: ${label}`}
        value={preference}
        onChange={(event) => changePreference(readPreference(event.target.value))}
        className="absolute inset-0 size-full cursor-pointer rounded-full opacity-0"
      >
        <option value="system">시스템 설정</option>
        <option value="light">라이트</option>
        <option value="dark">다크</option>
      </select>
    </div>
  )
}
