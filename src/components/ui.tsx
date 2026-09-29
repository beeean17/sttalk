import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.7 }}
    >
      {children}
    </motion.div>
  )
}

export function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-display flex items-center gap-2.5 text-[10px] font-bold tracking-[.16em] sm:text-[11px] ${light ? 'text-panel-accent' : 'text-muted'}`}
    >
      <span
        className={`size-1.5 rounded-full ${light ? 'bg-accent' : 'bg-primary'}`}
        aria-hidden="true"
      />
      {children}
    </p>
  )
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="ST:talk 처음으로"
      className={`font-display text-[32px] leading-none font-extrabold tracking-[-.075em] ${light ? 'text-panel-foreground' : 'text-foreground'}`}
    >
      st<span className={light ? 'text-accent' : 'text-primary'}>:</span>talk
      <span className={light ? 'text-accent' : 'text-primary'}>.</span>
    </a>
  )
}

export function ActionLink({
  children,
  href,
  light = false,
  className = '',
}: {
  children: ReactNode
  href: string
  light?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-13 items-center justify-between gap-6 rounded-full py-2 pr-2 pl-6 text-[13px] font-semibold transition-colors duration-200 ${light ? 'bg-accent text-accent-foreground hover:bg-accent-hover' : 'bg-primary text-primary-foreground hover:bg-primary-hover'} ${className}`}
    >
      {children}
      <span
        className={`grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:rotate-45 ${light ? 'bg-accent-foreground text-accent' : 'bg-accent text-accent-foreground'}`}
      >
        <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
      </span>
    </a>
  )
}
