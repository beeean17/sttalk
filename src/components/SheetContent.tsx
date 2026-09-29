import { useState } from 'react'
import { event, mailto } from '../data/event'
import { galleryItems } from '../data/gallery'
import GalleryViewer from './GalleryViewer'
import '../styles/gallery.css'

export type SheetTab = 'intro' | 'program' | 'gallery' | 'schedule'

type SheetContentProps = {
  tab: SheetTab
}

const sessions = [
  { time: '19:00–19:10', title: '행사 안내 · 10분', detail: '취지와 진행 방식 소개' },
  { time: '19:10–20:00', title: '1차시 테이블 토크 · 50분', detail: '선배님의 이야기와 질의응답' },
  { time: '20:00–20:10', title: '휴식 · 10분', detail: '잠시 쉬어가는 시간' },
  { time: '20:10–21:00', title: '2차시 테이블 토크 · 50분', detail: '선배님의 이야기와 질의응답' },
]

function IntroContent() {
  return (
    <>
      <section className="sheet-content__group sheet-content__group--intro-lead">
        <p className="sheet-content__label">동문 선배님과 후배가 만나는 자리</p>
        <h2 className="sheet-content__title">경험이 다음 선택의 힌트가 되도록.</h2>
        <p className="sheet-content__body">
          ST:talk는 서울과학기술대학교 동문 선배님과 재학생이 진로 경험을 나누는 소규모 테이블
          토크입니다.
        </p>
      </section>
      <section className="sheet-content__group">
        <p className="sheet-content__strong">2026. 11. 20. (금) &nbsp;·&nbsp; 19:00–21:00</p>
        <p className="sheet-content__body">{event.venue}</p>
      </section>
      <section className="sheet-content__group sheet-content__group--lead">
        <h3 className="sheet-content__subheading">어떤 이야기를 나눌까요?</h3>
        <p className="sheet-content__strong">취업 · 창업 · 대학원 진학</p>
        <p className="sheet-content__body">
          일을 선택한 계기, 준비 과정, 지금의 일상과 배움까지. 선배님이 직접 겪은 이야기를
          들려주세요.
        </p>
      </section>
      <section className="sheet-content__group sheet-content__group--contact">
        <p className="sheet-content__label">행사 문의</p>
        <a className="sheet-content__contact-link" href={mailto}>
          {event.email} ↗
        </a>
      </section>
    </>
  )
}

function ProgramContent() {
  return (
    <>
      <section className="sheet-content__group sheet-content__group--lead">
        <p className="sheet-content__label">PROGRAM</p>
        <h2 className="sheet-content__title">작은 테이블에서 깊게 나누는 대화</h2>
        <p className="sheet-content__body">
          동문 선배님 8–10명을 모시고, 한 테이블에 10명 이하가 함께합니다. 행사는 두 차시로
          진행됩니다.
        </p>
      </section>
      <section className="sheet-content__group sheet-content__group--step">
        <h3 className="sheet-content__step-title">01&nbsp; 관심 분야로 만나요</h3>
        <p className="sheet-content__body">
          학생들이 관심 있는 직무·분야의 선배님과 한 테이블에 앉습니다.
        </p>
      </section>
      <section className="sheet-content__group sheet-content__group--step">
        <h3 className="sheet-content__step-title">02&nbsp; 경험을 나눠요</h3>
        <p className="sheet-content__body">
          선배님이 지금 하는 일과 그 길을 선택하고 준비한 과정을 들려주십니다.
        </p>
      </section>
      <section className="sheet-content__group sheet-content__group--step">
        <h3 className="sheet-content__step-title">03&nbsp; 자유롭게 질문해요</h3>
        <p className="sheet-content__body">
          학생들의 질문에 답하고, 두 차시 동안 가까이에서 대화합니다.
        </p>
      </section>
      <section className="sheet-content__group sheet-content__group--role">
        <h3 className="sheet-content__step-title">선배님께 부탁드리는 이야기</h3>
        <p className="sheet-content__body">
          현재 하는 일, 진로를 준비하며 겪은 일, 후배에게 전하고 싶은 조언을 편안하게 나눠주세요.
        </p>
      </section>
    </>
  )
}

function GalleryContent() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <>
      <section className="sheet-content__group sheet-content__group--lead">
        <p className="sheet-content__label">PAST ST:TALK</p>
        <h2 className="sheet-content__title">지난 ST:talk의 장면</h2>
        <p className="sheet-content__body">
          2025년 상반기 현장 사진과 2026년 1학기 홍보물을 모았습니다. 아래 자료는 이번 2026년 11월
          행사 안내와 별개입니다.
        </p>
      </section>
      {galleryItems.map((item, index) => (
        <figure
          className={`sheet-content__gallery-item sheet-content__gallery-item--${item.kind}`}
          key={item.id}
        >
          <button
            type="button"
            className="sheet-content__gallery-button"
            aria-label={`${item.title} 확대 보기`}
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={item.src}
              width={item.width}
              height={item.height}
              alt={item.alt}
              loading="lazy"
            />
          </button>
          <figcaption className="sheet-content__caption">{item.title}</figcaption>
        </figure>
      ))}
      <GalleryViewer initialIndex={selectedIndex} onClose={() => setSelectedIndex(null)} />
    </>
  )
}

function ScheduleContent() {
  return (
    <>
      <section className="sheet-content__group sheet-content__group--lead">
        <p className="sheet-content__label">SCHEDULE&nbsp; · &nbsp;가안</p>
        <h2 className="sheet-content__title">11월 20일, ST 아트홀에서</h2>
        <p className="sheet-content__strong">2026년 11월 20일 (금)&nbsp; 19:00–21:00</p>
        <p className="sheet-content__body">서울과학기술대학교 {event.venue}</p>
      </section>
      {sessions.map((session) => (
        <section className="sheet-content__group sheet-content__group--step" key={session.time}>
          <p className="sheet-content__label">{session.time}</p>
          <h3 className="sheet-content__step-title">{session.title}</h3>
          <p className="sheet-content__body">{session.detail}</p>
        </section>
      ))}
      <p className="sheet-content__note">※ 세부 시간표는 가안이며 변경될 수 있습니다.</p>
    </>
  )
}

export default function SheetContent({ tab }: SheetContentProps) {
  return (
    <div className="sheet-content">
      {tab === 'intro' && <IntroContent />}
      {tab === 'program' && <ProgramContent />}
      {tab === 'gallery' && <GalleryContent />}
      {tab === 'schedule' && <ScheduleContent />}
    </div>
  )
}
