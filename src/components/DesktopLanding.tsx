import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
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
import useActiveSection from '../hooks/useActiveSection'
import useMediaQuery from '../hooks/useMediaQuery'
import '../styles/desktop.css'

const sectionIds = siteSections.map((section) => section.id)

function SectionHeading({
  eyebrow,
  children,
  id,
  intro,
}: {
  eyebrow: string
  children: string
  id: string
  intro?: ReactNode
}) {
  return (
    <div className="desktop-section-heading">
      <p className="desktop-eyebrow">{eyebrow}</p>
      <h2 id={id}>{children}</h2>
      {intro && <p className="desktop-section-intro">{intro}</p>}
    </div>
  )
}

export default function DesktopLanding() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const siteRef = useRef<HTMLDivElement>(null)
  const slideMode = useMediaQuery('(min-width: 1024px) and (min-height: 600px)')
  // 헤더 메뉴가 진행 막대 역할을 하도록, 지금 보고 있는 섹션을 추적한다.
  // 데스크톱은 .desktop-site가, 태블릿은 창이 스크롤된다.
  const activeSection = useActiveSection(sectionIds, {
    scroller: slideMode ? siteRef : null,
    topInset: () =>
      siteRef.current?.querySelector<HTMLElement>('.desktop-header')?.getBoundingClientRect()
        .bottom ?? 0,
  })

  return (
    <div ref={siteRef} className="desktop-site" id="top">
      <a className="desktop-skip" href="#desktop-main">
        본문 바로가기
      </a>
      <header className="desktop-header">
        <div className="desktop-inner desktop-header-inner">
          <CommitteeWordmark className="desktop-logo" />
          <nav aria-label="주요 메뉴" className="desktop-nav">
            {siteSections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={index === activeSection ? 'location' : undefined}
                className={[
                  section.id === 'contact' ? 'desktop-nav-contact' : '',
                  index < activeSection ? 'is-done' : '',
                  index === activeSection ? 'is-current' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="desktop-main">
        <section id="overview" className="desktop-overview" aria-labelledby="desktop-hero-title">
          <div className="desktop-hero">
            <div className="desktop-hero-copy">
              <p className="desktop-eyebrow">{event.year} ST:TALK / 동문 선배 초청</p>
              <h1 id="desktop-hero-title">
                <span className="desktop-hero-name">
                  ST<span className="desktop-hero-colon">:</span>talk
                </span>{' '}
                <span className="desktop-hero-sub">동문 선배님을 모십니다</span>
              </h1>
              <p className="desktop-hero-description">{heroDescription}</p>
              <AiSummary />
            </div>
            <figure className="desktop-hero-photo">
              <img
                src={heroPhoto.src}
                srcSet={heroPhoto.srcSet}
                sizes="(min-width: 1024px) 50vw, 92vw"
                width={heroPhoto.width}
                height={heroPhoto.height}
                alt={heroPhoto.alt}
                fetchPriority="high"
              />
            </figure>
          </div>
          <div className="desktop-inner">
            <dl className="desktop-facts">
              <div>
                <dt>날짜</dt>
                <dd>
                  <time dateTime={event.dateISO}>{event.dateShort}</time>
                </dd>
              </div>
              <div>
                <dt>시간</dt>
                <dd>{event.time}</dd>
              </div>
              <div>
                <dt>장소 · 서울과학기술대학교</dt>
                <dd>{event.venue}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="how-it-works" className="desktop-program" aria-labelledby="desktop-how-title">
          <div className="desktop-inner">
            <SectionHeading eyebrow="HOW IT WORKS" id="desktop-how-title" intro={programIntro}>
              진행 방식과 시간표
            </SectionHeading>
            <div className="desktop-timeline-head">
              <h3>진행 시간표</h3>
              <span className="desktop-draft-badge">가안</span>
              <p className="desktop-timeline-date">
                {event.dateShort} {event.time}
              </p>
            </div>
            <ol className="desktop-timeline">
              {schedule.map((session) => (
                <li key={session.range} className={`desktop-slot ${session.talk ? 'is-talk' : ''}`}>
                  <span className="desktop-slot-bar" aria-hidden="true" />
                  <time className="desktop-slot-time">{session.range}</time>
                  <div className="desktop-slot-card">
                    <span className="desktop-slot-tag">
                      {session.type} · {session.minutes}
                    </span>
                    <h4>{session.title}</h4>
                    {session.steps ? (
                      <ol className="desktop-slot-steps">
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
          </div>
        </section>

        <section id="stories" className="desktop-stories" aria-labelledby="desktop-stories-title">
          <div className="desktop-inner desktop-stories-grid">
            <div className="desktop-stories-lead">
              <SectionHeading eyebrow="TALK TOPICS" id="desktop-stories-title" intro={storyIntro}>
                선배님 이야기 주제
              </SectionHeading>
              <div className="desktop-topics">
                <p>{storyTopicsLabel}</p>
                <ul>
                  {storyTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
              <div className="desktop-note">
                <strong>사전 준비</strong>
                <p>{prepNote}</p>
                <TemplateExample />
              </div>
            </div>
            <div className="desktop-roles-column">
              <ol className="desktop-roles">
                {talkTopics.map((role) => (
                  <li key={role.number}>
                    <span className="desktop-role-number" aria-hidden="true">
                      {role.number}
                    </span>
                    <div>
                      <h3>{role.title}</h3>
                      <p>{role.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="desktop-roles-note">{talkTopicsNote}</p>
            </div>
          </div>
        </section>

        <section id="gallery" className="desktop-gallery" aria-labelledby="desktop-gallery-title">
          <div className="desktop-inner">
            <div className="desktop-gallery-head">
              <SectionHeading
                eyebrow="PAST ST:TALK"
                id="desktop-gallery-title"
                intro={galleryIntro}
              >
                지난 ST:talk 현장
              </SectionHeading>
              <p className="desktop-gallery-count">지난 행사 · 현장 사진 {galleryItems.length}</p>
            </div>
            <div className="desktop-gallery-grid">
              {galleryItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`desktop-gallery-item ${index === 0 ? 'is-wide' : ''}`}
                  onClick={() => setViewerIndex(index)}
                  aria-label={`${item.title} 크게 보기`}
                >
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes={
                      index === 0
                        ? '(min-width: 1024px) 62vw, 92vw'
                        : '(min-width: 1024px) 31vw, 46vw'
                    }
                    width={item.width}
                    height={item.height}
                    alt={item.alt}
                    loading="lazy"
                    style={item.focus ? { objectPosition: item.focus } : undefined}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="desktop-contact" aria-labelledby="desktop-contact-title">
          <div className="desktop-inner desktop-contact-grid">
            <div className="desktop-contact-lead">
              <SectionHeading
                eyebrow="CONTACT & INFO"
                id="desktop-contact-title"
                intro={contactIntro}
              >
                문의 및 안내
              </SectionHeading>
              <p className="desktop-contact-deadline">
                <strong>
                  <time dateTime={event.replyByISO}>{event.replyBy}</time>까지
                </strong>{' '}
                {replyNote}
              </p>
              <div className="desktop-contact-actions">
                <a
                  className="desktop-contact-link"
                  href={event.kakao}
                  target="_blank"
                  rel="noreferrer"
                >
                  카카오톡 오픈채팅 <span aria-hidden="true">↗</span>
                </a>
                <ContactEmail />
              </div>
            </div>
            <div className="desktop-summary">
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
          </div>
        </section>
      </main>
      <GalleryViewer
        items={galleryItems}
        initialIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
        caption={false}
      />
    </div>
  )
}
