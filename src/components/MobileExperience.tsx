import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import { CalendarDays, Images, Mail, MessagesSquare, Sparkles } from 'lucide-react'
import AiSummary from './AiSummary'
import CommitteeWordmark from './CommitteeWordmark'
import ContactEmail from './ContactEmail'
import GalleryViewer from './GalleryViewer'
import TemplateExample from './TemplateExample'
import {
  talkTopics,
  talkTopicsNote,
  contactIntro,
  event,
  galleryIntro,
  heroDescription,
  prepNote,
  replyNote,
  programIntro,
  schedule,
  siteSections,
  storyIntro,
  storyTopics,
  storyTopicsLabel,
  summaryRows,
} from '../data/event'
import { galleryItems, heroPhoto } from '../data/gallery'
import { pagerIndex } from '../lib/sectionProgress'
import '../styles/mobile.css'

const sectionIds = siteSections.map((section) => section.id)
const dockIcons = {
  overview: Sparkles,
  'how-it-works': CalendarDays,
  stories: MessagesSquare,
  gallery: Images,
  contact: Mail,
}

function SectionHeading({
  eyebrow,
  children,
  id,
  intro,
}: {
  eyebrow: string
  children: string
  id: string
  intro: string
}) {
  return (
    <div className="mobile-section-heading">
      <p className="mobile-eyebrow">{eyebrow}</p>
      <h2 id={id}>{children}</h2>
      <p className="mobile-section-intro">{intro}</p>
    </div>
  )
}

// 탭 하나의 화면. 세로로는 이 안에서만 스크롤되고, 보고 있지 않은 탭은 조작과 읽기에서 뺀다.
function Panel({
  id,
  current,
  register,
  children,
}: {
  id: string
  current: boolean
  register: (element: HTMLDivElement | null) => void
  children: ReactNode
}) {
  return (
    <div
      id={id}
      ref={register}
      role="tabpanel"
      aria-labelledby={`dock-tab-${id}`}
      className="mobile-panel"
      tabIndex={current ? 0 : -1}
      inert={!current}
    >
      {children}
    </div>
  )
}

function indexFromHash() {
  const id = window.location.hash.slice(1)
  return Math.max(
    0,
    sectionIds.findIndex((sectionId) => sectionId === id),
  )
}

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'

export default function MobileExperience() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const [active, setActive] = useState(indexFromHash)
  // 하단 내비는 내용이 움직이면 접히고, 한 번 누르면 다시 펼쳐진다.
  const [compact, setCompact] = useState(false)
  const activeRef = useRef(active)
  const rootRef = useRef<HTMLDivElement>(null)
  const pagerRef = useRef<HTMLElement>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // 코드가 직접 스크롤시킨 움직임(내비로 탭 넘기기, 맨 위로 올리기, 폭 변경 후 맞추기)은
  // 사용자가 내용을 움직인 것이 아니므로 내비를 접지 않는다. 움직임이 멎고 0.2초 뒤에 해제한다.
  const guardRef = useRef({ on: false, timer: 0 })
  const holdNav = useCallback(() => {
    const guard = guardRef.current
    guard.on = true
    window.clearTimeout(guard.timer)
    guard.timer = window.setTimeout(() => {
      guard.on = false
    }, 200)
  }, [])

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = scrollBehavior()) => {
      const pager = pagerRef.current
      if (!pager) return
      holdNav()
      pager.scrollTo({ left: index * pager.clientWidth, behavior })
    },
    [holdNav],
  )

  // 탭은 가로 스크롤 스냅으로 넘긴다. 넘기는 동안 선택 표시는 손가락을 따라가고,
  // 멈춘 뒤에 현재 탭을 확정한다(도중에 바꾸면 넘기던 화면이 조작 불가로 바뀐다).
  useLayoutEffect(() => {
    const root = rootRef.current
    const pager = pagerRef.current
    if (!root || !pager) return
    let timer = 0
    // 탭을 넘기든 탭 안을 내리든, 내용이 움직이면 내비를 접는다. 스크롤 이벤트는 위로
    // 전달되지 않으므로 캡처 단계에서 한꺼번에 받는다.
    const onContentMove = () => {
      if (guardRef.current.on) holdNav()
      else setCompact(true)
    }
    const settle = () => {
      window.clearTimeout(timer)
      const index = pagerIndex(pager.scrollLeft, pager.clientWidth, sectionIds.length)
      if (index === activeRef.current) return
      activeRef.current = index
      setActive(index)
      const hash = `#${sectionIds[index]}`
      if (window.location.hash !== hash) window.history.replaceState(null, '', hash)
    }
    const onScroll = () => {
      if (pager.clientWidth > 0)
        dockRef.current?.style.setProperty(
          '--dock-active',
          String(pager.scrollLeft / pager.clientWidth),
        )
      window.clearTimeout(timer)
      timer = window.setTimeout(settle, 120)
    }
    // 화면 폭이 바뀌면 보고 있던 탭에 다시 맞춘다.
    const align = () => {
      holdNav()
      pager.scrollTo({ left: activeRef.current * pager.clientWidth, behavior: 'instant' })
    }
    align()
    const observer = new ResizeObserver(align)
    observer.observe(pager)
    root.addEventListener('scroll', onContentMove, { capture: true, passive: true })
    pager.addEventListener('scroll', onScroll, { passive: true })
    pager.addEventListener('scrollend', settle)
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(guardRef.current.timer)
      observer.disconnect()
      root.removeEventListener('scroll', onContentMove, { capture: true })
      pager.removeEventListener('scroll', onScroll)
      pager.removeEventListener('scrollend', settle)
    }
  }, [holdNav])

  const scrollPanelToTop = useCallback(
    (index: number) => {
      holdNav()
      panelRefs.current[index]?.scrollTo({ top: 0, behavior: scrollBehavior() })
    },
    [holdNav],
  )

  // 뒤로 가기와 주소의 해시를 탭에 연결한다. 워드마크(#top)는 첫 탭의 맨 위로 보낸다.
  useEffect(() => {
    const onLocation = () => {
      const index = indexFromHash()
      goTo(index)
      if (window.location.hash === '#top') scrollPanelToTop(0)
    }
    window.addEventListener('popstate', onLocation)
    window.addEventListener('hashchange', onLocation)
    return () => {
      window.removeEventListener('popstate', onLocation)
      window.removeEventListener('hashchange', onLocation)
    }
  }, [goTo, scrollPanelToTop])

  // 다른 탭을 누르면 그 탭으로 넘기고, 보고 있는 탭을 다시 누르면 맨 위로 올린다.
  function pickTab(index: number) {
    setCompact(false)
    if (index === activeRef.current) {
      scrollPanelToTop(index)
      return
    }
    window.history.pushState(null, '', `#${sectionIds[index]}`)
    goTo(index)
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = sectionIds.length - 1
    const next =
      event.key === 'ArrowRight'
        ? Math.min(last, index + 1)
        : event.key === 'ArrowLeft'
          ? Math.max(0, index - 1)
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1
    if (next < 0) return
    event.preventDefault()
    if (next !== index) pickTab(next)
    tabRefs.current[next]?.focus({ preventScroll: true })
  }

  return (
    <div
      ref={rootRef}
      className="mobile-page"
      id="top"
      data-nav-state={compact ? 'compact' : 'expanded'}
    >
      <a
        className="skip-link"
        href={`#${sectionIds[active]}`}
        onClick={(event) => {
          event.preventDefault()
          panelRefs.current[active]?.focus()
        }}
      >
        본문 바로가기
      </a>
      {/* 위원회 워드마크는 모든 탭에서 제자리에 있고, 그 아래 내용만 좌우로 넘어간다. */}
      <header className="mobile-brand">
        <CommitteeWordmark />
      </header>
      <main id="mobile-main" ref={pagerRef} className="mobile-pager">
        <Panel
          id="overview"
          current={active === 0}
          register={(element) => {
            panelRefs.current[0] = element
          }}
        >
          <section className="mobile-overview" aria-labelledby="mobile-hero-title">
            <div className="mobile-hero-copy">
              <p className="mobile-eyebrow">{event.year} ST:TALK / 동문 선배 초청</p>
              <h1 id="mobile-hero-title">
                <span className="mobile-hero-name">
                  ST<span className="mobile-accent">:</span>talk
                </span>{' '}
                <span className="mobile-hero-sub">동문 선배님을 모십니다</span>
              </h1>
              <p className="mobile-hero-description">{heroDescription}</p>
              <AiSummary className="mobile-ai-button" />
            </div>
            <dl className="mobile-facts">
              <div>
                <dt>일시</dt>
                <dd>
                  <time dateTime={event.dateISO}>{event.dateShort}</time> · {event.time}
                </dd>
              </div>
              <div>
                <dt>장소</dt>
                <dd>
                  {event.venue}
                  <small>서울과학기술대학교</small>
                </dd>
              </div>
            </dl>
            <figure className="mobile-hero-photo">
              <img
                src={heroPhoto.src}
                srcSet={heroPhoto.srcSet}
                sizes="100vw"
                width={heroPhoto.width}
                height={heroPhoto.height}
                alt={heroPhoto.alt}
                fetchPriority="high"
              />
            </figure>
          </section>
        </Panel>

        <Panel
          id="how-it-works"
          current={active === 1}
          register={(element) => {
            panelRefs.current[1] = element
          }}
        >
          <section className="mobile-section" aria-labelledby="mobile-how-title">
            <SectionHeading eyebrow="HOW IT WORKS" id="mobile-how-title" intro={programIntro}>
              진행 방식과 시간표
            </SectionHeading>
            <div className="mobile-timeline-head">
              <h3>진행 시간표</h3>
              <span className="mobile-draft-badge">가안</span>
              <p>
                {event.dateShort.replace(`${event.year}. `, '')} {event.time}
              </p>
            </div>
            <ol className="mobile-timeline">
              {schedule.map((session) => (
                <li key={session.range} className={`mobile-slot ${session.talk ? 'is-talk' : ''}`}>
                  <span className="mobile-slot-bar" aria-hidden="true" />
                  <div className="mobile-slot-card">
                    <div className="mobile-slot-meta">
                      <time>{session.range}</time>
                      <span className="mobile-slot-tag">
                        {session.type} · {session.minutes}
                      </span>
                    </div>
                    <h4>{session.title}</h4>
                    {session.steps ? (
                      <ol className="mobile-slot-steps">
                        {session.steps.map((step, index) => (
                          <li key={step}>
                            <span aria-hidden="true">{index + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p>{session.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Panel>

        <Panel
          id="stories"
          current={active === 2}
          register={(element) => {
            panelRefs.current[2] = element
          }}
        >
          <section className="mobile-section" aria-labelledby="mobile-stories-title">
            <SectionHeading eyebrow="TALK TOPICS" id="mobile-stories-title" intro={storyIntro}>
              선배님 이야기 주제
            </SectionHeading>
            <ol className="mobile-roles">
              {talkTopics.map((role) => (
                <li key={role.number}>
                  <span className="mobile-role-number mobile-accent" aria-hidden="true">
                    {role.number}
                  </span>
                  <div>
                    <h3>{role.title}</h3>
                    <p>{role.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mobile-roles-note">{talkTopicsNote}</p>
            <div className="mobile-topics">
              <p>{storyTopicsLabel}</p>
              <ul>
                {storyTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
            <div className="mobile-note">
              <strong className="mobile-accent">사전 준비</strong>
              <p>{prepNote}</p>
              <TemplateExample />
            </div>
          </section>
        </Panel>

        <Panel
          id="gallery"
          current={active === 3}
          register={(element) => {
            panelRefs.current[3] = element
          }}
        >
          <section className="mobile-section" aria-labelledby="mobile-gallery-title">
            <SectionHeading eyebrow="PAST ST:TALK" id="mobile-gallery-title" intro={galleryIntro}>
              지난 ST:talk 현장
            </SectionHeading>
            <p className="mobile-gallery-count">지난 행사 · 현장 사진 {galleryItems.length}</p>
            <div className="mobile-gallery-grid">
              {galleryItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="mobile-gallery-item"
                  onClick={() => setViewerIndex(index)}
                  aria-label={`${item.title} 크게 보기`}
                >
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes="100vw"
                    width={item.width}
                    height={item.height}
                    alt={item.alt}
                    loading="lazy"
                    style={item.focus ? { objectPosition: item.focus } : undefined}
                  />
                </button>
              ))}
            </div>
            <p className="mobile-gallery-hint">사진을 누르면 크게 볼 수 있습니다.</p>
          </section>
        </Panel>

        <Panel
          id="contact"
          current={active === 4}
          register={(element) => {
            panelRefs.current[4] = element
          }}
        >
          <section className="mobile-section mobile-contact" aria-labelledby="mobile-contact-title">
            <SectionHeading eyebrow="CONTACT & INFO" id="mobile-contact-title" intro={contactIntro}>
              문의 및 안내
            </SectionHeading>
            <p className="mobile-contact-deadline">
              <strong>
                <time dateTime={event.replyByISO}>{event.replyBy}</time>까지
              </strong>{' '}
              {replyNote}
            </p>
            <a className="mobile-contact-link" href={event.kakao} target="_blank" rel="noreferrer">
              카카오톡 오픈채팅 <span aria-hidden="true">↗</span>
            </a>
            <div className="mobile-contact-email">
              <ContactEmail />
            </div>
            <div className="mobile-summary">
              <h3>참여 안내</h3>
              <dl>
                {summaryRows.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>
                      {row.lines.map((line, index) => (
                        <span key={line}>
                          {index > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </Panel>
      </main>

      {/* 하단 내비: 접힌 상태에서 누르면 탭을 바꾸지 않고 펼치기만 한다. 키보드로 누른 경우는
          바로 탭을 바꾼다. 펼친 직후에 남은 스크롤 움직임으로 다시 접히지 않게 잠시 붙잡아 둔다. */}
      <div className="floating-dock-position">
        <div
          ref={dockRef}
          role="tablist"
          aria-label="행사 정보"
          className="floating-dock"
          style={{ '--dock-active': active } as CSSProperties}
          onClickCapture={(event) => {
            if (!compact || event.detail === 0) return
            event.stopPropagation()
            holdNav()
            setCompact(false)
          }}
        >
          <span className="dock-selection" aria-hidden="true" />
          {siteSections.map((section, index) => {
            const Icon = dockIcons[section.id]
            return (
              <button
                key={section.id}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                type="button"
                role="tab"
                id={`dock-tab-${section.id}`}
                aria-label={section.label}
                aria-selected={index === active}
                aria-controls={section.id}
                tabIndex={index === active ? 0 : -1}
                className="dock-tab"
                onClick={() => pickTab(index)}
                onKeyDown={(event) => onTabKey(event, index)}
              >
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                <span className="dock-label" aria-hidden="true">
                  {section.short}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <GalleryViewer
        items={galleryItems}
        initialIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
        caption={false}
      />
    </div>
  )
}
