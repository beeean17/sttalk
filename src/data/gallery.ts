export type GalleryItem = {
  id: string
  src: string
  srcSet: string
  originalSrc: string
  width: number
  height: number
  title: string
  year: string
  kind: 'photo' | 'poster' | 'banner'
  alt: string
}

const image = (name: string) => `${import.meta.env.BASE_URL}images/${name}`
const responsiveImage = (name: string, width: 800 | 1600) =>
  image(`responsive/${name}-${width}.webp`)

function sources(name: string) {
  return {
    src: responsiveImage(name, 800),
    srcSet: `${responsiveImage(name, 800)} 800w, ${responsiveImage(name, 1600)} 1600w`,
    originalSrc: image(`${name}.jpg`),
  }
}

export const galleryArchive = {
  summary:
    '2025년 상반기 현장 사진과 2026년 1학기 홍보물을 모았습니다. 아래 자료는 이번 2026년 11월 행사 안내와 별개인 지난 행사 자료입니다.',
  desktopSummary:
    '테이블에서 나눈 이야기와 행사의 기록을 모았습니다. 아래 홍보물은 이번 2026년 11월 행사 안내와 별개인 지난 행사 자료입니다.',
}

export const galleryItems: GalleryItem[] = [
  {
    id: '2025-table-talk',
    ...sources('sttalk-2025-table-talk'),
    width: 4032,
    height: 3024,
    title: '2025년 상반기 · 테이블 토크 현장',
    year: '2025',
    kind: 'photo',
    alt: '2025년 상반기 ST:talk 테이블 토크 현장 사진',
  },
  {
    id: '2025-table-conversation',
    ...sources('sttalk-2025-table-conversation'),
    width: 2016,
    height: 1512,
    title: '2025년 상반기 · 테이블 대화 모습',
    year: '2025',
    kind: 'photo',
    alt: '2025년 상반기 ST:talk 테이블에서 대화하는 모습',
  },
  {
    id: '2025-questions',
    ...sources('sttalk-2025-questions'),
    width: 2856,
    height: 2142,
    title: '2025년 상반기 · 대화와 질의응답',
    year: '2025',
    kind: 'photo',
    alt: '2025년 상반기 ST:talk 대화와 질의응답 현장',
  },
  {
    id: '2026-spring-poster',
    ...sources('sttalk-2026-spring-poster'),
    width: 5031,
    height: 7087,
    title: '2026년 1학기 · 행사 홍보 포스터',
    year: '2026',
    kind: 'poster',
    alt: '2026년 1학기 ST:talk 행사 홍보 포스터',
  },
  {
    id: '2026-spring-banner',
    ...sources('sttalk-2026-spring-banner'),
    width: 6000,
    height: 1800,
    title: '2026년 1학기 · 행사 홍보 배너',
    year: '2026',
    kind: 'banner',
    alt: '2026년 1학기 ST:talk 행사 홍보 배너',
  },
]
