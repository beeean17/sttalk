import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { activeSectionIndex, progressLine } from '../lib/sectionProgress'

type Options = {
  // 스크롤되는 요소. 없으면 창이 스크롤된다.
  scroller?: RefObject<HTMLElement | null> | null
  // 고정 헤더처럼 화면 위쪽을 가리는 높이.
  topInset?: () => number
}

export default function useActiveSection(
  ids: readonly string[],
  { scroller = null, topInset }: Options = {},
) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const element = scroller?.current ?? null
    const target: HTMLElement | Window = element ?? window
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const tops = ids.map(
          (id) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity,
        )
        const atEnd = element
          ? element.scrollTop + element.clientHeight >= element.scrollHeight - 2
          : window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
        const scrollable = element
          ? element.scrollHeight > element.clientHeight + 2
          : document.documentElement.scrollHeight > window.innerHeight + 2
        const line = progressLine(topInset?.() ?? 0, window.innerHeight)
        setActive(activeSectionIndex(tops, line, scrollable && atEnd))
      })
    }
    update()
    target.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      target.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
    // topInset은 호출할 때마다 최신 값을 읽으므로 의존성에 넣지 않는다.
  }, [ids, scroller])

  return active
}
