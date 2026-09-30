import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { CalendarDays, Images, Mail, MessagesSquare, Sparkles } from 'lucide-react'
import AiSummary from './AiSummary'
import CommitteeWordmark from './CommitteeWordmark'
import GalleryViewer from './GalleryViewer'
import ThemeSelect from './ThemeSelect'
import {
  alumniRoles,
  contactIntro,
  event,
  galleryIntro,
  heroDescription,
  mailto,
  prepNote,
  programIntro,
  schedule,
  siteSections,
  storyIntro,
  storyTopics,
  storyTopicsLabel,
  summaryRows,
} from '../data/event'
import { galleryItems } from '../data/gallery'
import useActiveSection from '../hooks/useActiveSection'
import { dockState } from '../lib/sectionProgress'
import '../styles/mobile.css'

const sectionIds = siteSections.map((section) => section.id)
const dockIcons = {
  overview: Sparkles,
  'how-it-works': CalendarDays,
  'alumni-role': MessagesSquare,
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

export default function MobileExperience() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const activeSection = useActiveSection(sectionIds)
  const navState = dockState(activeSection)
  const heroPhoto = galleryItems.find((item) => item.id === '2025-table-talk')

  // 이 화면은 나중에 불러오므로, 주소에 섹션 해시가 있으면 그린 뒤에 직접 맞춰 준다.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (sectionIds.some((sectionId) => sectionId === id))
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <div className="mobile-page" id="top" data-nav-state={navState}>
      <a className="skip-link" href="#mobile-main">
        본문 바로가기
      </a>
      <main id="mobile-main">
        <section id="overview" className="mobile-overview" aria-labelledby="mobile-hero-title">
          <header className="mobile-brand">
            <CommitteeWordmark />
          </header>
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
              <dt>장소</dt>
              <dd>
                {event.venue}
                <small>서울과학기술대학교</small>
              </dd>
            </div>
          </dl>
          {heroPhoto && (
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
          )}
        </section>

        <section id="how-it-works" className="mobile-section" aria-labelledby="mobile-how-title">
          <SectionHeading eyebrow="HOW IT WORKS" id="mobile-how-title" intro={programIntro}>
            가까이 앉아, 깊이 나누는 대화
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

        <section id="alumni-role" className="mobile-section" aria-labelledby="mobile-alumni-title">
          <SectionHeading eyebrow="FOR OUR ALUMNI" id="mobile-alumni-title" intro={storyIntro}>
            선배님의 이야기가 필요합니다
          </SectionHeading>
          <ol className="mobile-roles">
            {alumniRoles.map((role) => (
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
          </div>
        </section>

        <section id="gallery" className="mobile-section" aria-labelledby="mobile-gallery-title">
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
                  sizes={index < 2 ? '100vw' : '50vw'}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  loading="lazy"
                />
                <span className="mobile-gallery-caption">{item.title}</span>
              </button>
            ))}
          </div>
          <p className="mobile-gallery-hint">사진을 누르면 크게 볼 수 있습니다.</p>
        </section>

        <section
          id="contact"
          className="mobile-section mobile-contact"
          aria-labelledby="mobile-contact-title"
        >
          <SectionHeading eyebrow="CONTACT" id="mobile-contact-title" intro={contactIntro}>
            문의 및 연락
          </SectionHeading>
          <a className="mobile-contact-link" href={mailto}>
            이메일로 문의하기 <span aria-hidden="true">↗</span>
          </a>
          <p className="mobile-contact-email">
            <span>이메일</span>
            {event.email}
          </p>
          <div className="mobile-summary">
            <h3>행사 한눈에 보기</h3>
            <dl>
              {summaryRows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.lines[0]}
                    <br />
                    {row.lines[1]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <footer className="mobile-footer">
            <div>
              <strong>ST:talk</strong>
              <p>{event.organizer}</p>
            </div>
            <div className="mobile-footer-theme">
              <span>화면 테마</span>
              <ThemeSelect />
            </div>
          </footer>
        </section>
      </main>

      {/* 하단 내비: 첫 섹션에서는 라벨까지 펼치고, 그 아래 섹션에서는 아이콘만 남긴다. */}
      <div className="floating-dock-position">
        <nav
          aria-label="섹션 이동"
          className="floating-dock"
          style={{ '--dock-active': activeSection } as CSSProperties}
        >
          <span className="dock-selection" aria-hidden="true" />
          {siteSections.map((section, index) => {
            const Icon = dockIcons[section.id]
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-label={section.label}
                aria-current={index === activeSection ? 'location' : undefined}
                className="dock-tab"
              >
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                <span className="dock-label" aria-hidden="true">
                  {section.short}
                </span>
              </a>
            )
          })}
        </nav>
      </div>

      <GalleryViewer
        items={galleryItems}
        initialIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </div>
  )
}
