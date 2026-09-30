import { useEffect, useRef, useState } from 'react'
import CommitteeWordmark from './CommitteeWordmark'
import GalleryViewer from './GalleryViewer'
import ThemeSelect from './ThemeSelect'
import { alumniRoles, event, mailto, programSteps, schedule } from '../data/event'
import { galleryArchive, galleryItems } from '../data/gallery'
import useMediaQuery from '../hooks/useMediaQuery'
import '../styles/desktop.css'

const seatStudentImage = `${import.meta.env.BASE_URL}images/seat-student.svg`
const seatAlumniImage = `${import.meta.env.BASE_URL}images/seat-alumni.svg`

const desktopSlides = [
  { id: 'overview', label: '행사 소개' },
  { id: 'how-it-works', label: '진행 방식' },
  { id: 'gallery', label: '지난 ST:talk 현장' },
  { id: 'gallery-promo', label: '지난 행사 홍보 자료' },
  { id: 'alumni-role', label: '선배님 역할' },
  { id: 'time-and-place', label: '일정·장소' },
  { id: 'contact', label: '문의 및 연락' },
] as const

function SectionHeading({
  eyebrow,
  children,
  id,
}: {
  eyebrow: string
  children: string
  id: string
}) {
  return (
    <div className="desktop-section-heading">
      <p className="desktop-eyebrow">{eyebrow}</p>
      <h2 id={id}>{children}</h2>
    </div>
  )
}

function Seat({ alumni = false }: { alumni?: boolean }) {
  return (
    <div className="desktop-seat">
      <img src={alumni ? seatAlumniImage : seatStudentImage} alt="" width="25" height="25" />
      <span>{alumni ? '선배님' : '학생'}</span>
    </div>
  )
}

function SeatingDiagram() {
  return (
    <div
      className="desktop-diagram-card"
      aria-label="동문 선배님 한 분과 학생들이 함께 앉는 테이블 대화 예시"
    >
      <h3>한 테이블에서 함께 이야기합니다</h3>
      <div className="desktop-seat-layout" aria-hidden="true">
        <div className="desktop-seat-row">
          <Seat />
          <Seat />
          <Seat />
        </div>
        <div className="desktop-seat-row desktop-seat-middle">
          <Seat alumni />
          <div className="desktop-table">
            <span>
              대화
              <br />
              테이블
            </span>
          </div>
          <Seat />
        </div>
        <div className="desktop-seat-row">
          <Seat />
          <Seat />
          <Seat />
        </div>
      </div>
      <p className="desktop-diagram-detail">한 테이블 최대 10명 · 두 번의 대화 라운드</p>
      <p className="desktop-diagram-note">진행 방식 예시 · 실제 좌석 배치와 다를 수 있습니다</p>
    </div>
  )
}

export default function DesktopLanding() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const siteRef = useRef<HTMLDivElement>(null)
  const slideMode = useMediaQuery('(min-width: 1024px) and (min-height: 600px)')

  useEffect(() => {
    if (!slideMode) return
    const root = siteRef.current
    if (!root) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const headerHeight =
          root.querySelector<HTMLElement>('.desktop-header')?.getBoundingClientRect().height ?? 0
        let closest = 0
        let distance = Number.POSITIVE_INFINITY
        desktopSlides.forEach((slide, index) => {
          const section = document.getElementById(slide.id)
          if (!section) return
          const nextDistance = Math.abs(section.getBoundingClientRect().top - headerHeight)
          if (nextDistance < distance) {
            closest = index
            distance = nextDistance
          }
        })
        setActiveSlide(closest)
      })
    }
    update()
    root.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      root.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [slideMode])

  const galleryImage = (index: number, className = '') => {
    const item = galleryItems[index]
    if (!item) return null
    return (
      <button
        type="button"
        className={`desktop-gallery-item ${className}`}
        onClick={() => setViewerIndex(index)}
        aria-label={`${item.title} 크게 보기`}
      >
        <span className="desktop-gallery-image">
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes={
              className.includes('desktop-gallery-feature')
                ? '(min-width: 1200px) 850px, 90vw'
                : '(min-width: 1200px) 420px, 45vw'
            }
            width={item.width}
            height={item.height}
            alt={item.alt}
            loading="lazy"
          />
        </span>
        <span className="desktop-gallery-caption">
          {item.title} <span aria-hidden="true">↗</span>
        </span>
      </button>
    )
  }

  return (
    <div ref={siteRef} className="desktop-site" id="top">
      <a className="desktop-skip" href="#desktop-main">
        본문 바로가기
      </a>
      <header className="desktop-header">
        <div className="desktop-inner desktop-header-inner">
          <CommitteeWordmark className="desktop-logo" />
          <nav aria-label="주요 메뉴" className="desktop-nav">
            <a href="#overview">행사 소개</a>
            <a href="#how-it-works">진행 방식</a>
            <a href="#gallery" className="desktop-nav-gallery">
              지난 ST:talk
            </a>
            <a href="#alumni-role">선배님 역할</a>
            <a href="#time-and-place" className="desktop-nav-schedule">
              일정·장소
            </a>
            <a href="#contact" className="desktop-nav-contact">
              문의
            </a>
          </nav>
        </div>
      </header>

      <main id="desktop-main">
        <section id="overview" className="desktop-overview" aria-labelledby="desktop-hero-title">
          <div className="desktop-inner desktop-hero-grid">
            <div className="desktop-hero-copy">
              <p className="desktop-eyebrow">{event.year} ST:TALK&nbsp; / &nbsp;동문 선배 초청</p>
              <h1 id="desktop-hero-title">
                ST:talk
                <br />
                동문 선배님을 모십니다
              </h1>
              <p className="desktop-hero-description">
                서울과학기술대학교 동문 선배님과 재학생이 진로 경험을 나누는 소규모 테이블
                토크입니다.
              </p>
              <div className="desktop-fact-grid">
                <div className="desktop-fact">
                  <strong>날짜</strong>
                  <span>{event.dateShort}</span>
                </div>
                <div className="desktop-fact">
                  <strong>시간</strong>
                  <span>{event.time}</span>
                </div>
                <div className="desktop-fact">
                  <strong>장소</strong>
                  <span>{event.venueFull}</span>
                </div>
              </div>
              <a href="#how-it-works" className="desktop-primary-link">
                진행 방식 살펴보기 <span aria-hidden="true">↓</span>
              </a>
            </div>
            <figure className="desktop-hero-photo">
              {galleryItems[1] && (
                <img
                  src={galleryItems[1].src}
                  srcSet={galleryItems[1].srcSet}
                  sizes="(min-width: 1200px) 540px, 90vw"
                  width={galleryItems[1].width}
                  height={galleryItems[1].height}
                  alt={galleryItems[1].alt}
                  fetchPriority="high"
                />
              )}
              <figcaption>{galleryItems[1]?.title}</figcaption>
            </figure>
          </div>
        </section>

        <section
          id="how-it-works"
          className="desktop-how desktop-section-surface"
          aria-labelledby="desktop-how-title"
        >
          <div className="desktop-inner">
            <SectionHeading eyebrow="HOW IT WORKS" id="desktop-how-title">
              가까이 앉아, 깊이 나누는 대화
            </SectionHeading>
            <p className="desktop-how-intro">
              8–10명의 동문 선배님을 모시고, 한 테이블 최대 10명 규모로 두 차례 대화합니다.
            </p>
            <div className="desktop-how-grid">
              <SeatingDiagram />
              <div className="desktop-steps">
                {programSteps.map((step) => (
                  <article className="desktop-step" key={step.number}>
                    <span className="desktop-step-number">{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="desktop-gallery" aria-labelledby="desktop-gallery-title">
          <div className="desktop-inner">
            <div className="desktop-gallery-heading">
              <SectionHeading eyebrow="PAST ST:TALK" id="desktop-gallery-title">
                지난 ST:talk 현장
              </SectionHeading>
              <p>테이블에서 나눈 이야기와 행사의 분위기를 사진으로 먼저 만나보세요.</p>
            </div>
            <div className="desktop-gallery-group">
              <div className="desktop-gallery-group-title">
                <h3>2025년 상반기 · 현장 사진</h3>
                <span>사진 3</span>
              </div>
              <div className="desktop-gallery-photos">
                {galleryImage(0, 'desktop-gallery-feature')}
                <div className="desktop-gallery-side">
                  {galleryImage(1)}
                  {galleryImage(2)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="gallery-promo"
          className="desktop-gallery desktop-gallery-promo-slide desktop-section-surface"
          aria-labelledby="desktop-gallery-promo-title"
        >
          <div className="desktop-inner">
            <div className="desktop-gallery-heading">
              <SectionHeading eyebrow="PAST MATERIALS" id="desktop-gallery-promo-title">
                지난 행사 홍보 자료
              </SectionHeading>
              <p>{galleryArchive.desktopSummary}</p>
            </div>
            <div className="desktop-gallery-group">
              <div className="desktop-gallery-group-title">
                <h3>2026년 1학기 · 홍보 기록</h3>
                <span>지난 행사 자료 · 홍보물 2</span>
              </div>
              <div className="desktop-gallery-promo">
                {galleryImage(3, 'desktop-gallery-poster')}
                {galleryImage(4, 'desktop-gallery-banner')}
              </div>
            </div>
          </div>
        </section>

        <section id="alumni-role" className="desktop-alumni" aria-labelledby="desktop-alumni-title">
          <div className="desktop-inner">
            <SectionHeading eyebrow="FOR OUR ALUMNI" id="desktop-alumni-title">
              선배님의 이야기가 필요합니다
            </SectionHeading>
            <p className="desktop-alumni-intro">
              현재 하는 일, 선택과 준비 과정, 학생들의 질문을 중심으로 이야기합니다.
            </p>
            <div className="desktop-role-grid">
              {alumniRoles.map((role) => (
                <article className="desktop-role" key={role.number}>
                  <span>{role.number}</span>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="time-and-place"
          className="desktop-time desktop-section-surface"
          aria-labelledby="desktop-time-title"
        >
          <div className="desktop-inner">
            <SectionHeading eyebrow="TIME & PLACE" id="desktop-time-title">
              모이는 시간과 장소
            </SectionHeading>
            <div className="desktop-time-grid">
              <div className="desktop-schedule-card">
                <h3>{event.dateShort}&nbsp; / &nbsp;프로그램 (안)</h3>
                <ol>
                  {schedule.map((session) => (
                    <li key={session.range}>
                      <time>{session.range}</time>
                      <span>{session.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="desktop-location-card">
                <p className="desktop-eyebrow">LOCATION</p>
                <h3>
                  서울과학기술대학교
                  <br />
                  {event.venue}
                </h3>
                <p>
                  {event.dateNatural}
                  <br />
                  {event.timeNatural}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="desktop-contact desktop-section-surface"
          aria-labelledby="desktop-contact-title"
        >
          <div className="desktop-inner desktop-contact-content">
            <SectionHeading eyebrow="CONTACT" id="desktop-contact-title">
              문의 및 연락
            </SectionHeading>
            <p>행사에 관해 궁금한 점은 총졸업준비위원회로 문의해 주세요.</p>
            <a className="desktop-contact-link" href={mailto}>
              이메일로 문의하기 <span aria-hidden="true">↗</span>
            </a>
            <p className="desktop-organizer">주최&nbsp; {event.organizer}</p>
          </div>
          <footer className="desktop-footer">
            <div className="desktop-inner">
              <div className="desktop-footer-rule" />
              <strong>ST:talk</strong>
              <div className="desktop-footer-details">
                <p>{event.organizer}</p>
                <div className="desktop-footer-theme">
                  <span>화면 테마</span>
                  <ThemeSelect />
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
      {slideMode && (
        <nav className="desktop-slide-cta" aria-label="프레젠테이션 화면 이동">
          <span
            className="desktop-slide-progress"
            aria-label={`${activeSlide + 1} / ${desktopSlides.length} 화면`}
          >
            {String(activeSlide + 1).padStart(2, '0')}
            <span aria-hidden="true"> / {String(desktopSlides.length).padStart(2, '0')}</span>
          </span>
          <a
            href={`#${desktopSlides[activeSlide === desktopSlides.length - 1 ? 0 : activeSlide + 1].id}`}
            className="desktop-slide-next"
          >
            <span>{activeSlide === desktopSlides.length - 1 ? '처음으로' : '다음'}</span>
            <strong>
              {desktopSlides[activeSlide === desktopSlides.length - 1 ? 0 : activeSlide + 1].label}
            </strong>
            <span className="desktop-slide-arrow" aria-hidden="true">
              {activeSlide === desktopSlides.length - 1 ? '↑' : '↓'}
            </span>
          </a>
        </nav>
      )}
      <GalleryViewer
        items={galleryItems}
        initialIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </div>
  )
}
