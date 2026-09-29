import { useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowUpRight, MessageCircle, Plus } from 'lucide-react'
import { topics } from '../data/event'

export default function TableScene() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 100, damping: 22 })
  const rotateY = useSpring(y, { stiffness: 100, damping: 22 })
  function tilt(e: PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(-((e.clientY - rect.top) / rect.height - 0.5) * 7)
    y.set(((e.clientX - rect.left) / rect.width - 0.5) * 7)
  }
  return (
    <div
      className="scene-perspective"
      onPointerMove={tilt}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <motion.div
        className="table-scene relative isolate overflow-hidden rounded-[28px] bg-brand-panel text-panel-foreground sm:rounded-[36px]"
        style={reduced ? {} : { rotateX, rotateY }}
      >
        <div className="scene-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8">
          <span className="font-display text-[9px] tracking-[.2em] text-panel-muted">
            A SEAT FOR YOUR STORY
          </span>
          <span className="grid size-8 place-items-center rounded-full border border-panel-border">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
        <div className="scene-table-wrap relative mx-auto aspect-square w-full max-w-[480px]">
          <div
            className="scene-orbit absolute inset-[10%] rounded-full border border-dashed border-panel-border"
            aria-hidden="true"
          />
          <div className="absolute top-[9%] left-1/2 z-10 -translate-x-1/2 text-center">
            <div className="alumni-seat mx-auto grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-lg sm:size-14">
              <Person />
            </div>
            <span className="mt-2 block text-[9px] font-medium text-panel-accent">동문 선배님</span>
          </div>
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (((i + 1) * 40 - 90) * Math.PI) / 180
            return (
              <div
                key={i}
                aria-hidden="true"
                className="student-seat absolute grid size-[34px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[12px] border border-panel-border bg-seat text-seat-foreground sm:size-10"
                style={{
                  left: `${50 + Math.cos(angle) * 35}%`,
                  top: `${52 + Math.sin(angle) * 35}%`,
                  rotate: `${(i + 1) * 40}deg`,
                }}
              >
                <Person />
              </div>
            )
          })}
          <button
            type="button"
            className="round-table absolute top-[30%] left-[28%] z-20 flex aspect-square w-[44%] flex-col items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-panel-foreground"
            onClick={() => setActive((active + 1) % topics.length)}
            aria-label="다음 대화 주제 보기"
          >
            <span
              className="absolute inset-3 rounded-full border border-accent-foreground/15"
              aria-hidden="true"
            />
            <span className="font-display text-[clamp(27px,4vw,44px)] font-extrabold tracking-[-.075em]">
              st:talk.
            </span>
            <span className="font-display mt-1 text-[7px] tracking-[.15em] sm:text-[8px]">
              NEXT STARTS HERE
            </span>
            <span className="mt-4 grid size-6 place-items-center rounded-full border border-accent-foreground/30">
              <Plus size={13} aria-hidden="true" />
            </span>
          </button>
          <div
            className="pointer-events-none absolute right-[4%] bottom-[6%] left-[4%] z-30 flex justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                className="flex max-w-full items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3.5 text-[10px] font-medium text-foreground shadow-xl sm:text-xs"
              >
                <MessageCircle size={15} className="shrink-0 text-primary" aria-hidden="true" />
                {topics[active].heroQuestion}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-between gap-3 border-t border-panel-border px-6 py-5 sm:px-8">
          <span className="text-[10px] text-panel-muted">테이블을 눌러 대화를 시작해 보세요</span>
          <div className="flex gap-1.5" aria-hidden="true">
            {topics.map((topic, i) => (
              <span
                key={topic.id}
                className={`h-1 rounded-full transition-all ${active === i ? 'w-5 bg-accent' : 'w-1 bg-panel-foreground/30'}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Person() {
  return (
    <svg viewBox="0 0 32 32" className="size-[60%]" fill="currentColor" aria-hidden="true">
      <circle cx="16" cy="10" r="5" />
      <path d="M6 27c0-13 20-13 20 0Z" />
    </svg>
  )
}
