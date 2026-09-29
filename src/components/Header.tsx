import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Wordmark } from './ui'
import ThemeSelect from './ThemeSelect'

const links = [
  { href: '#invitation', label: '초대의 말' },
  { href: '#program', label: 'ST:talk 소개' },
  { href: '#schedule', label: '진행 일정' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLButtonElement>(null)
  const { scrollYProgress } = useScroll()
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [open])
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="page-shell flex h-[76px] items-center justify-between gap-4 md:h-[88px]">
        <Wordmark />
        <nav className="hidden items-center gap-8 md:flex" aria-label="주요 메뉴">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-xs font-medium text-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#reply"
            className="group hidden min-h-11 items-center gap-4 rounded-full border border-border px-4 text-xs font-semibold transition-colors hover:bg-primary hover:text-primary-foreground min-[400px]:flex sm:px-5"
          >
            함께하기{' '}
            <ArrowUpRight
              className="transition-transform group-hover:rotate-45"
              size={15}
              aria-hidden="true"
            />
          </a>
          <ThemeSelect />
          <button
            ref={menuRef}
            type="button"
            className="grid size-11 place-items-center rounded-full hover:bg-primary/5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="모바일 메뉴"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full overflow-hidden border-y border-border bg-background shadow-xl shadow-shadow md:hidden"
          >
            <div className="page-shell flex flex-col py-3">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between border-b border-border/60 text-sm"
                >
                  <span className="flex items-center gap-5">
                    <span className="font-display text-[10px] text-muted">0{index + 1}</span>
                    {link.label}
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute right-0 bottom-0 left-0 h-[2px] origin-left bg-primary"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
    </header>
  )
}
