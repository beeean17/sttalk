import { useState } from 'react'
import GalleryViewer from './GalleryViewer'
import { templateItems } from '../data/template'

// 사전 준비 안내 옆의 "양식 예시 보기". 자기소개 양식 다섯 장을 확대 보기 창으로 보여 준다.
export default function TemplateExample({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <>
      <button type="button" className={`template-example ${className}`} onClick={() => setIndex(0)}>
        양식 예시 보기 <span aria-hidden="true">→</span>
      </button>
      <GalleryViewer
        items={templateItems}
        initialIndex={index}
        onClose={() => setIndex(null)}
        label="자기소개 양식 예시 보기"
      />
    </>
  )
}
