import { useState } from 'react'
import CommitteeWordmark from './CommitteeWordmark'
import GalleryViewer from './GalleryViewer'
import ThemeSelect from './ThemeSelect'
import { galleryItems } from '../data/gallery'
import '../styles/desktop.css'

const seatStudentImage = `${import.meta.env.BASE_URL}images/seat-student.svg`
const seatAlumniImage = `${import.meta.env.BASE_URL}images/seat-alumni.svg`

const steps = [
  {
    number: '01',
    title: '관심 있는 테이블에 자리',
    description: '학생들이 관심 직무와 진로 분야의 동문 선배님 테이블에 앉습니다.',
  },
  {
    number: '02',
    title: '경험을 듣고',
    description: '선배님이 현재 하는 일과 선택의 과정을 소개합니다.',
  },
  {
    number: '03',
    title: '질문을 나눕니다',
    description: '궁금한 점을 묻고 서로의 경험을 함께 이야기합니다.',
  },
]

const roles = [
  ['01', '지금 하는 일', '현재 맡고 있는 일과 진로를 소개해 주세요.'],
  ['02', '여기까지의 과정', '준비와 선택, 현장에서 얻은 경험을 들려주세요.'],
  ['03', '후배들의 질문', '학생들의 궁금증에 편하게 답해 주세요.'],
]

const timetable = [
  ['19:00–19:10', '행사 소개'],
  ['19:10–20:00', '1차 테이블 대화'],
  ['20:00–20:10', '휴식'],
  ['20:10–21:00', '2차 테이블 대화'],
]

const galleryCaptions = [
  '2025년 상반기 · 현장 사진 · 테이블 토크',
  '2025년 상반기 · 현장 사진 · 테이블 대화',
  '2025년 상반기 · 현장 사진 · 질의응답',
  '2026년 1학기 · 홍보 포스터',
  '2026년 1학기 · 홍보 배너',
]

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
  const galleryImage = (index: number, className = '') => {
    const item = galleryItems[index]
    if (!item) return null
    return (
      <button
        type="button"
        className={`desktop-gallery-item ${className}`}
        onClick={() => setViewerIndex(index)}
        aria-label={`${item.alt || galleryCaptions[index]} 크게 보기`}
      >
        <span className="desktop-gallery-image">
          <img src={item.src} alt={item.alt} loading="lazy" />
        </span>
        <span className="desktop-gallery-caption">
          {galleryCaptions[index]} <span aria-hidden="true">↗</span>
        </span>
      </button>
    )
  }

  return (
    <div className="desktop-site" id="top">
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
              <p className="desktop-eyebrow">2026 ST:TALK&nbsp; / &nbsp;동문 선배 초청</p>
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
                  <span>2026. 11. 20. (금)</span>
                </div>
                <div className="desktop-fact">
                  <strong>시간</strong>
                  <span>19:00–21:00</span>
                </div>
                <div className="desktop-fact">
                  <strong>장소</strong>
                  <span>서울과기대 중앙도서관 1층 ST 아트홀</span>
                </div>
              </div>
              <a href="#how-it-works" className="desktop-primary-link">
                진행 방식 살펴보기 <span aria-hidden="true">↓</span>
              </a>
            </div>
            <figure className="desktop-hero-photo">
              {galleryItems[0] && <img src={galleryItems[0].src} alt={galleryItems[0].alt} />}
              <figcaption>2025년 상반기 · ST:talk 테이블 토크 현장</figcaption>
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
                {steps.map((step) => (
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
                지난 ST:talk 갤러리
              </SectionHeading>
              <p>테이블에서 나눈 이야기와 행사의 기록을 모았습니다.</p>
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
            <div className="desktop-gallery-group">
              <div className="desktop-gallery-group-title">
                <h3>2026년 1학기 · 홍보 기록</h3>
                <span>홍보물 2</span>
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
              {roles.map(([number, title, description]) => (
                <article className="desktop-role" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
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
                <h3>2026. 11. 20. (금)&nbsp; / &nbsp;프로그램 (안)</h3>
                <ol>
                  {timetable.map(([time, title]) => (
                    <li key={time}>
                      <time>{time}</time>
                      <span>{title}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="desktop-location-card">
                <p className="desktop-eyebrow">LOCATION</p>
                <h3>
                  서울과학기술대학교
                  <br />
                  중앙도서관 1층 ST 아트홀
                </h3>
                <p>
                  2026년 11월 20일 금요일
                  <br />
                  오후 7시–9시
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
          <div className="desktop-inner">
            <SectionHeading eyebrow="CONTACT" id="desktop-contact-title">
              문의 및 연락
            </SectionHeading>
            <p>행사에 관해 궁금한 점은 총졸업준비위원회로 문의해 주세요.</p>
            <a href="mailto:seoultechgrad42@gmail.com">seoultechgrad42@gmail.com</a>
            <p className="desktop-organizer">
              주최&nbsp; 서울과학기술대학교 제42대 총졸업준비위원회
            </p>
          </div>
        </section>
      </main>

      <footer className="desktop-footer">
        <div className="desktop-inner">
          <div className="desktop-footer-rule" />
          <strong>ST:talk</strong>
          <div className="desktop-footer-details">
            <p>서울과학기술대학교 제42대 총졸업준비위원회</p>
            <div className="desktop-footer-theme">
              <span>화면 테마</span>
              <ThemeSelect />
            </div>
          </div>
        </div>
      </footer>
      <GalleryViewer
        items={galleryItems}
        initialIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </div>
  )
}
