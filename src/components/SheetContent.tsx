import { useState } from 'react'
import { event, mailto, programSteps, schedule } from '../data/event'
import { galleryArchive, galleryItems } from '../data/gallery'
import GalleryViewer from './GalleryViewer'

export type SheetTab = 'intro' | 'program' | 'gallery' | 'schedule'

type SheetContentProps = {
  tab: SheetTab
}

function IntroContent() {
  return (
    <>
      <section className="sheet-content__group sheet-content__group--intro-lead">
        <p className="sheet-content__label">동문 선배님과 후배가 만나는 자리</p>
        <h3 className="sheet-content__title">경험이 다음 선택의 힌트가 되도록.</h3>
        <p className="sheet-content__body">
          ST:talk는 서울과학기술대학교 동문 선배님과 재학생이 진로 경험을 나누는 소규모 테이블
          토크입니다.
        </p>
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
        <h3 className="sheet-content__title">작은 테이블에서 깊게 나누는 대화</h3>
        <p className="sheet-content__body">
          동문 선배님 8–10명을 모시고, 한 테이블에 10명 이하가 함께합니다. 행사는 두 차시로
          진행됩니다.
        </p>
      </section>
      {programSteps.map((step) => (
        <section className="sheet-content__group sheet-content__group--step" key={step.number}>
          <h3 className="sheet-content__step-title">
            {step.number}&nbsp; {step.title}
          </h3>
          <p className="sheet-content__body">{step.description}</p>
        </section>
      ))}
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
        <h3 className="sheet-content__title">행사의 분위기를 먼저 만나보세요</h3>
        <p className="sheet-content__body">{galleryArchive.summary}</p>
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
              srcSet={item.srcSet}
              sizes="(max-width: 559px) calc(100vw - 48px), calc(100vw - 64px)"
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
        <p className="sheet-content__label">가안</p>
        <h3 className="sheet-content__title">
          {event.dateHeading}, {event.venueHeading}에서
        </h3>
        <p className="sheet-content__strong">
          {event.date}&nbsp; {event.time}
        </p>
        <p className="sheet-content__body">{event.venueFull}</p>
      </section>
      {schedule.map((session) => (
        <section className="sheet-content__group sheet-content__group--step" key={session.range}>
          <p className="sheet-content__label">{session.range}</p>
          <h3 className="sheet-content__step-title">
            {session.title} · {session.minutes}
          </h3>
          <p className="sheet-content__body">{session.description}</p>
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
