import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { galleryItems, type GalleryItem } from '../data/gallery'
import '../styles/gallery.css'

type GalleryViewerProps = {
  items?: GalleryItem[]
  initialIndex: number | null
  onClose: () => void
}

export default function GalleryViewer({
  items = galleryItems,
  initialIndex,
  onClose,
}: GalleryViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const swipe = useRef<{ id: number; x: number; y: number } | null>(null)
  const [index, setIndex] = useState(initialIndex ?? 0)

  useEffect(() => {
    if (initialIndex !== null) setIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (initialIndex === null || items.length === 0) return

    const dialog = dialogRef.current
    if (!dialog) return
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()

    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [initialIndex, items.length])

  useEffect(() => {
    if (initialIndex === null || items.length === 0) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setIndex((current) => (current - 1 + items.length) % items.length)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setIndex((current) => (current + 1) % items.length)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [initialIndex, items.length])

  if (initialIndex === null || items.length === 0) return null

  const item = items[index] ?? items[0]
  const move = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + items.length) % items.length)
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="gallery-viewer"
      aria-label="지난 ST:talk 사진 확대 보기"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="gallery-viewer__panel">
        <div className="gallery-viewer__toolbar">
          <span className="gallery-viewer__count">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            className="gallery-viewer__icon"
            onClick={onClose}
            aria-label="사진 확대 보기 닫기"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <div
          className="gallery-viewer__stage"
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return
            if ((event.target as HTMLElement).closest('button')) return
            swipe.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerUp={(event) => {
            const start = swipe.current
            swipe.current = null
            if (!start || start.id !== event.pointerId) return
            const dx = event.clientX - start.x
            const dy = event.clientY - start.y
            if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1)
          }}
          onPointerCancel={() => {
            swipe.current = null
          }}
          onLostPointerCapture={() => {
            swipe.current = null
          }}
        >
          {items.length > 1 && (
            <button
              type="button"
              className="gallery-viewer__icon gallery-viewer__previous"
              onClick={() => move(-1)}
              aria-label="이전 사진"
            >
              <ChevronLeft size={28} aria-hidden="true" />
            </button>
          )}
          <img
            key={item.id}
            src={item.src}
            width={item.width}
            height={item.height}
            alt={item.alt}
            draggable={false}
          />
          {items.length > 1 && (
            <button
              type="button"
              className="gallery-viewer__icon gallery-viewer__next"
              onClick={() => move(1)}
              aria-label="다음 사진"
            >
              <ChevronRight size={28} aria-hidden="true" />
            </button>
          )}
        </div>
        <p className="gallery-viewer__caption">{item.title}</p>
      </div>
    </dialog>,
    document.body,
  )
}
