export type GalleryItem = {
  id: string
  src: string
  width: number
  height: number
  title: string
  year: string
  kind: 'photo' | 'poster' | 'banner'
  alt: string
}

const image = (name: string) => `${import.meta.env.BASE_URL}images/${name}`

export const galleryItems: GalleryItem[] = [
  {
    id: '2025-table-talk',
    src: image('sttalk-2025-table-talk.jpg'),
    width: 4032,
    height: 3024,
    title: '2025년 상반기 · 테이블 토크 현장',
    year: '2025',
    kind: 'photo',
    alt: '2025년 상반기 ST:talk 테이블 토크 현장 사진',
  },
  {
    id: '2025-table-conversation',
    src: image('sttalk-2025-table-conversation.jpg'),
    width: 2016,
    height: 1512,
    title: '2025년 상반기 · 테이블 대화 모습',
    year: '2025',
    kind: 'photo',
    alt: '2025년 상반기 ST:talk 테이블에서 대화하는 모습',
  },
  {
    id: '2025-questions',
    src: image('sttalk-2025-questions.jpg'),
    width: 2856,
    height: 2142,
    title: '2025년 상반기 · 대화와 질의응답',
    year: '2025',
    kind: 'photo',
    alt: '2025년 상반기 ST:talk 대화와 질의응답 현장',
  },
  {
    id: '2026-spring-poster',
    src: image('sttalk-2026-spring-poster.jpg'),
    width: 5031,
    height: 7087,
    title: '2026년 1학기 · 행사 홍보 포스터',
    year: '2026',
    kind: 'poster',
    alt: '2026년 1학기 ST:talk 행사 홍보 포스터',
  },
  {
    id: '2026-spring-banner',
    src: image('sttalk-2026-spring-banner.jpg'),
    width: 6000,
    height: 1800,
    title: '2026년 1학기 · 행사 홍보 배너',
    year: '2026',
    kind: 'banner',
    alt: '2026년 1학기 ST:talk 행사 홍보 배너',
  },
]
