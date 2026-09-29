import { useRef, useState, type KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Lightbulb,
  MessageCircle,
} from 'lucide-react'
import { topics } from '../data/event'
import { Label, Reveal } from './ui'

const icons = [BriefcaseBusiness, Lightbulb, GraduationCap]

export default function Topics() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = useReducedMotion()
  const topic = topics[selected]
  const Icon = icons[selected]
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    let next = selected
    if (e.key === 'ArrowRight') next = (selected + 1) % topics.length
    else if (e.key === 'ArrowLeft') next = (selected - 1 + topics.length) % topics.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = topics.length - 1
    else return
    e.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="stories" className="section-space page-shell" aria-labelledby="stories-title">
      <Reveal>
        <div className="mb-9 flex flex-col justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end">
          <div>
            <Label>03 / YOUR STORY</Label>
            <h2 id="stories-title" className="section-title mt-5">
              선배님에게는 경험,
              <br />
              후배에게는 <span className="text-primary">가능성.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-[1.9] text-muted">
            정해진 답보다 직접 겪은 이야기가 궁금합니다.
            <br />
            어떤 이야기를 나눌지, 함께 떠올려 볼까요?
          </p>
        </div>
      </Reveal>
      <Reveal>
        <div className="overflow-hidden rounded-[24px] border border-border bg-card sm:rounded-[32px]">
          <div
            className="flex border-b border-border p-2 sm:p-3"
            role="tablist"
            aria-label="대화 주제"
          >
            {topics.map((item, index) => (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                ref={(el) => {
                  tabs.current[index] = el
                }}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls={`panel-${item.id}`}
                tabIndex={selected === index ? 0 : -1}
                onKeyDown={onKeyDown}
                onClick={() => setSelected(index)}
                className={`relative flex min-h-13 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl px-2 text-xs font-medium transition-colors sm:text-sm ${selected === index ? 'text-primary-foreground' : 'text-muted hover:text-foreground'}`}
              >
                {selected === index && (
                  <motion.span
                    layoutId="topic-highlight"
                    transition={{ duration: reduced ? 0 : 0.35 }}
                    className="absolute inset-0 rounded-2xl bg-primary"
                  />
                )}
                <span className="font-display relative hidden text-[10px] sm:inline">
                  {item.number}
                </span>
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </div>
          {topics.map(
            (item, index) =>
              selected !== index && (
                <div
                  key={item.id}
                  id={`panel-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${item.id}`}
                  hidden
                />
              ),
          )}
          <motion.div
            key={topic.id}
            id={`panel-${topic.id}`}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`tab-${topic.id}`}
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
            className="grid min-h-[425px] gap-9 p-6 fold:grid-cols-2 fold:gap-6 sm:p-9 md:min-h-[350px] md:gap-12 lg:p-12"
          >
            <div>
              <div className="mb-6 flex items-center gap-3 text-primary">
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                <span className="font-display text-[10px] font-bold tracking-[.17em]">
                  {topic.english}
                </span>
              </div>
              <h3 className="whitespace-pre-line text-[28px] leading-[1.45] font-semibold tracking-[-.055em] sm:text-[34px]">
                {topic.title}
              </h3>
              <p className="mt-5 max-w-md text-[13px] leading-[1.95] text-muted">
                {topic.description}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <p className="mb-1 flex items-center gap-2 text-[10px] font-medium text-muted">
                <MessageCircle size={13} aria-hidden="true" /> 이런 질문으로 시작해 보세요
              </p>
              {topic.questions.map((question, i) => (
                <motion.div
                  key={question}
                  initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : 0.07 * i, duration: reduced ? 0 : 0.35 }}
                  className="flex items-start gap-3 rounded-2xl bg-surface/75 px-4 py-4 text-[12px] leading-[1.8] sm:text-[13px]"
                >
                  <span className="font-display pt-0.5 text-[10px] font-bold text-primary">Q.</span>
                  <span className="flex-1">{question}</span>
                  <ArrowUpRight
                    size={14}
                    className="mt-1 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  )
}
