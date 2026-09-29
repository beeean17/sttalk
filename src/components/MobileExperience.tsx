import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { CalendarDays, Images, MessagesSquare, Sparkles } from 'lucide-react'
import CommitteeWordmark from './CommitteeWordmark'
import ThemeSelect from './ThemeSelect'
import SheetContent from './SheetContent'
import { event } from '../data/event'
import useMediaQuery from '../hooks/useMediaQuery'
import {
  progressAtTop,
  sheetGeometry,
  sheetStages,
  snapStage,
  topAtProgress,
} from '../lib/sheetGeometry'
import type { SheetStage } from '../lib/sheetGeometry'
import '../styles/mobile.css'

const tabs = [
  {
    id: 'intro',
    label: '소개',
    heading: '행사 소개',
    preview: '진로에 관한 경험을 나누는 테이블 토크',
    Icon: Sparkles,
  },
  {
    id: 'program',
    label: '진행',
    heading: '이렇게 진행돼요',
    preview: '10인 이하 테이블에서, 두 번의 대화',
    Icon: MessagesSquare,
  },
  {
    id: 'gallery',
    label: '기록',
    heading: '지난 ST:talk',
    preview: '현장 사진과 홍보 자료로 만나는 ST:talk',
    Icon: Images,
  },
  {
    id: 'schedule',
    label: '일정',
    heading: '행사 일정',
    preview: '11월 20일 금요일, 저녁 7시부터 9시까지',
    Icon: CalendarDays,
  },
] as const
type TabId = (typeof tabs)[number]['id']

function routeFromHash(): { tab: TabId; stage: SheetStage } {
  const hash = window.location.hash.slice(1)
  const [tab, stage] = hash.split('-')
  if (tabs.some((item) => item.id === tab)) {
    return {
      tab: tab as TabId,
      stage: sheetStages.includes(stage as SheetStage) ? (stage as SheetStage) : 'half',
    }
  }
  return { tab: 'program', stage: 'peek' }
}

export default function MobileExperience() {
  const initial = useRef(routeFromHash()).current
  const [tab, setTab] = useState<TabId>(initial.tab)
  const [stage, setStage] = useState<SheetStage>(initial.stage)
  const compact = stage === 'full'
  const [dragging, setDragging] = useState(false)
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    safeBottom: 0,
    safeTop: 0,
  })
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const rootRef = useRef<HTMLDivElement>(null)
  const safeRef = useRef<HTMLDivElement>(null)
  const baseRef = useRef<HTMLElement>(null)
  const handleRef = useRef<HTMLButtonElement>(null)
  const panelRefs = useRef<Partial<Record<TabId, HTMLDivElement | null>>>({})
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({})
  const stageRef = useRef(stage)
  const tabRef = useRef(tab)
  const settleRef = useRef<{ stop: () => void } | null>(null)
  const gesture = useRef<{
    id: number
    y: number
    top: number
    stage: SheetStage
    moved: boolean
    samples: { y: number; time: number }[]
  } | null>(null)
  const ignoreClick = useRef(false)
  const fold = viewport.width >= 560
  const geometry = sheetGeometry(viewport.height, fold, viewport.safeBottom, viewport.safeTop)
  const geometryRef = useRef(geometry)
  geometryRef.current = geometry
  const progress = useMotionValue(sheetStages.indexOf(initial.stage))
  const y = useTransform(progress, [0, 1, 2], geometry.tops)
  const height = useTransform(progress, [0, 1, 2], geometry.heights)
  const inset = useTransform(progress, [0, 1, 2], geometry.insets)
  const radius = useTransform(progress, [0, 1, 2], geometry.radii)
  const detailsOpacity = useTransform(progress, [0, 0.2, 1], [0, 0, 1])
  const active = tabs.find((item) => item.id === tab)!
  const detailVisible = stage !== 'peek' || dragging

  useEffect(() => {
    if (reduced && !gesture.current) {
      settleRef.current?.stop()
      progress.set(sheetStages.indexOf(stageRef.current))
    }
  }, [reduced, progress])

  const moveTo = useCallback(
    (nextTab: TabId, nextStage: SheetStage, history: 'push' | 'replace' | 'none' = 'replace') => {
      if (
        nextStage === 'peek' &&
        panelRefs.current[tabRef.current]?.contains(document.activeElement)
      )
        handleRef.current?.focus({ preventScroll: true })
      stageRef.current = nextStage
      tabRef.current = nextTab
      setTab(nextTab)
      setStage(nextStage)
      settleRef.current?.stop()
      settleRef.current = animate(
        progress,
        sheetStages.indexOf(nextStage),
        reduced ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 42, mass: 1 },
      )
      if (history !== 'none') {
        const hash = `#${nextTab}-${nextStage}`
        if (window.location.hash !== hash)
          window.history[history === 'push' ? 'pushState' : 'replaceState'](null, '', hash)
      }
    },
    [progress, reduced],
  )

  useLayoutEffect(() => {
    const root = rootRef.current!
    const update = () => {
      const rect = root.getBoundingClientRect()
      const safe = getComputedStyle(safeRef.current!)
      setViewport({
        width: rect.width,
        height: rect.height,
        safeBottom: parseFloat(safe.paddingBottom) || 0,
        safeTop: parseFloat(safe.paddingTop) || 0,
      })
      gesture.current = null
      setDragging(false)
      settleRef.current?.stop()
      progress.set(sheetStages.indexOf(stageRef.current))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(root)
    return () => observer.disconnect()
  }, [progress])

  useEffect(() => {
    const onLocation = () => {
      const next = routeFromHash()
      moveTo(next.tab, next.stage, 'none')
      if (window.location.hash === '#top')
        baseRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape' || e.defaultPrevented || document.querySelector('dialog[open]')) return
      const current = stageRef.current
      if (current !== 'peek') {
        moveTo(tabRef.current, current === 'full' ? 'half' : 'peek')
        handleRef.current?.focus({ preventScroll: true })
      }
    }
    window.addEventListener('popstate', onLocation)
    window.addEventListener('hashchange', onLocation)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('popstate', onLocation)
      window.removeEventListener('hashchange', onLocation)
      window.removeEventListener('keydown', onKey)
      settleRef.current?.stop()
    }
  }, [moveTo])

  function pickTab(next: TabId) {
    const nextStage =
      next === tab
        ? stage === 'peek'
          ? 'half'
          : stage === 'half'
            ? 'peek'
            : 'half'
        : stage === 'full'
          ? 'full'
          : 'half'
    moveTo(next, nextStage, next === tab ? 'replace' : 'push')
  }

  function onTabsKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      moveTo(tab, stage === 'peek' ? 'half' : 'full')
      requestAnimationFrame(() => panelRefs.current[tab]?.focus({ preventScroll: true }))
      return
    } else return
    e.preventDefault()
    moveTo(tabs[next].id, stage === 'full' ? 'full' : 'half', 'push')
    tabRefs.current[tabs[next].id]?.focus({ preventScroll: true })
  }

  function startDrag(e: PointerEvent<HTMLButtonElement>) {
    if (!e.isPrimary || e.button !== 0) return
    settleRef.current?.stop()
    ignoreClick.current = false
    gesture.current = {
      id: e.pointerId,
      y: e.clientY,
      top: topAtProgress(progress.get(), geometryRef.current.tops),
      stage: stageRef.current,
      moved: false,
      samples: [{ y: e.clientY, time: e.timeStamp }],
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function drag(e: PointerEvent<HTMLButtonElement>) {
    const g = gesture.current
    if (!g || g.id !== e.pointerId) return
    const delta = e.clientY - g.y
    if (!g.moved && Math.abs(delta) < 4) return
    g.moved = true
    setDragging(true)
    g.samples = [
      ...g.samples.filter((s) => e.timeStamp - s.time < 100),
      { y: e.clientY, time: e.timeStamp },
    ]
    progress.set(progressAtTop(g.top + delta, geometryRef.current.tops))
  }

  function finishDrag(e: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const g = gesture.current
    if (!g || g.id !== e.pointerId) return
    gesture.current = null
    setDragging(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId)
    if (!g.moved && !cancelled) return
    ignoreClick.current = g.moved
    const first = g.samples.find((s) => e.timeStamp - s.time <= 100)
    const velocity =
      first && e.timeStamp > first.time ? (e.clientY - first.y) / (e.timeStamp - first.time) : 0
    const next = cancelled
      ? g.stage
      : snapStage(
          topAtProgress(progress.get(), geometryRef.current.tops),
          velocity,
          geometryRef.current.tops,
        )
    moveTo(tab, next)
  }

  return (
    <div
      ref={rootRef}
      className="mobile-experience"
      data-sheet-stage={stage}
      data-nav-state={compact ? 'compact' : 'expanded'}
      data-tab={tab}
    >
      <div ref={safeRef} className="safe-area-probe" aria-hidden="true" />
      <a
        href={`#${tab}-half`}
        className="skip-link"
        onClick={(e) => {
          e.preventDefault()
          moveTo(tab, 'half')
          requestAnimationFrame(() => panelRefs.current[tab]?.focus())
        }}
      >
        본문 바로가기
      </a>
      <main
        id="top"
        ref={baseRef}
        className="mobile-overview"
        style={{ bottom: viewport.height - geometry.tops[0] + 12 }}
        inert={stage === 'full' ? true : undefined}
      >
        <header className="mobile-brand">
          <CommitteeWordmark />
        </header>
        <div className="mobile-hero">
          <p className="text-[11px] leading-[1.55] font-bold text-primary">
            2026&nbsp; · &nbsp;ALUMNI TABLE TALK
          </p>
          <p className="mobile-event-name font-bold text-primary">ST:talk</p>
          <h1 className="text-[30px] leading-[1.35] font-bold">
            진로의 다음 장,
            <br className="fold:hidden" />
            <span className="hidden fold:inline"> </span>선배의 경험에서.
          </h1>
          <p className="text-[14px] leading-[28.7px] text-muted">
            동문 선배와 재학생이 마주 앉아 나누는
            <br />
            취업 · 창업 · 대학원 진학 이야기
          </p>
          <div className="flex flex-col gap-1.5 rounded-2xl bg-surface p-4">
            <p className="text-[14px] leading-[1.55] font-bold">
              <time dateTime={event.dateISO}>2026. 11. 20. 금요일</time>&nbsp; · &nbsp;{event.time}
            </p>
            <p className="text-[12px] leading-[21.6px] text-muted">
              서울과학기술대학교 {event.venue}
            </p>
          </div>
          <p className="text-[11px] leading-[16.5px] text-muted">
            동문 선배 8–10명&nbsp; · &nbsp;테이블당 10인 이하&nbsp; · &nbsp;2차시
          </p>
        </div>
      </main>

      <motion.section
        className="information-sheet"
        aria-label="ST:talk 상세 정보"
        style={{ y, height, left: inset, right: inset, borderRadius: radius }}
      >
        <button
          ref={handleRef}
          type="button"
          className="sheet-handle"
          aria-label={`정보 서랍 ${stage === 'full' ? '줄이기' : '펼치기'}`}
          aria-expanded={stage !== 'peek'}
          aria-controls="sheet-detail"
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={(e) => finishDrag(e)}
          onPointerCancel={(e) => finishDrag(e, true)}
          onLostPointerCapture={(e) => finishDrag(e, true)}
          onClick={() => {
            if (ignoreClick.current) {
              ignoreClick.current = false
              return
            }
            moveTo(tab, stage === 'peek' ? 'half' : stage === 'half' ? 'full' : 'half')
          }}
          onKeyDown={(e) => {
            const map: Record<string, SheetStage> = {
              ArrowUp: stage === 'peek' ? 'half' : 'full',
              ArrowDown: stage === 'full' ? 'half' : 'peek',
              Home: 'peek',
              End: 'full',
            }
            if (map[e.key]) {
              e.preventDefault()
              moveTo(tab, map[e.key])
            }
          }}
        >
          <span aria-hidden="true" className="h-1 w-9 rounded-full bg-muted opacity-35" />
        </button>
        <div className="sheet-heading">
          <h2 className="min-w-0 flex-1 text-[18px] leading-[1.55] font-bold">{active.heading}</h2>
        </div>
        {stage === 'peek' && !dragging && (
          <p
            id="sheet-preview"
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            className="sheet-preview text-[12px] leading-[21.6px] text-muted"
          >
            {active.preview}
          </p>
        )}
        <motion.div
          id="sheet-detail"
          className="sheet-detail"
          style={{ opacity: detailsOpacity }}
          hidden={!detailVisible}
        >
          {tabs.map((item) => (
            <div
              key={item.id}
              id={`panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              tabIndex={0}
              hidden={item.id !== tab}
              ref={(el) => {
                panelRefs.current[item.id] = el
              }}
              className="sheet-scroll"
            >
              <SheetContent tab={item.id} />
              {item.id === 'intro' && (
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5 text-[13px] text-muted">
                  <span>화면 테마</span>
                  <ThemeSelect />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </motion.section>

      <div className="floating-dock-position" style={{ bottom: geometry.dockBottom }}>
        <motion.nav
          role="tablist"
          aria-label="행사 정보"
          className="floating-dock"
          animate={{
            width: Math.min(viewport.width - 42, compact ? (fold ? 280 : 240) : fold ? 440 : 348),
            height: compact ? 56 : 64,
            borderRadius: compact ? 28 : 36,
          }}
          transition={{ duration: reduced ? 0 : 0.3, ease: 'easeOut' }}
        >
          {tabs.map(({ id, label, Icon }, index) => (
            <motion.button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-label={label}
              aria-selected={tab === id}
              aria-controls={id === tab && !detailVisible ? 'sheet-preview' : `panel-${id}`}
              tabIndex={tab === id ? 0 : -1}
              ref={(el) => {
                tabRefs.current[id] = el
              }}
              className={`dock-tab ${tab === id ? 'text-primary' : 'text-muted'}`}
              animate={{ height: compact ? 44 : 52 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: 'easeOut' }}
              onClick={() => pickTab(id)}
              onKeyDown={(e) => onTabsKey(e, index)}
            >
              {tab === id && (
                <motion.span
                  layoutId="dock-selection"
                  className="dock-selection"
                  transition={{ duration: reduced ? 0 : 0.3, ease: 'easeOut' }}
                />
              )}
              <Icon size={20} strokeWidth={1.8} aria-hidden="true" className="relative shrink-0" />
              <motion.span
                aria-hidden="true"
                className={`relative overflow-hidden text-[11px] leading-[17px] ${tab === id ? 'font-bold' : ''}`}
                animate={{
                  height: compact ? 0 : 17,
                  opacity: compact ? 0 : 1,
                  marginTop: compact ? 0 : 2,
                }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              >
                {label}
              </motion.span>
            </motion.button>
          ))}
        </motion.nav>
      </div>
      <p role="status" className="sr-only">
        {active.heading},{' '}
        {stage === 'peek' ? '접힌 상태' : stage === 'half' ? '중간 높이' : '전체 보기'}
      </p>
    </div>
  )
}
