export type GalleryItem = {
  id: string
  src: string
  srcSet: string
  originalSrc: string
  width: number
  height: number
  title: string
  year: string
  kind: 'photo' | 'poster' | 'banner' | 'slide'
  alt: string
}

// 화면에 쓰는 사진만 번들에 넣는다. 이 목록에 없는 파일은 폴더에 있어도 배포되지 않는다.
const files = import.meta.glob(
  '../../assets/images/gallery/**/sttalk-{2025-table-talk,2026-spring-hall,2026-spring-table,2026-spring-screen}*.{jpg,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>

const image = (name: string) => files[`../../assets/images/gallery/${name}`]
const responsiveImage = (name: string, width: 800 | 1600) =>
  image(`responsive/${name}-${width}.webp`)

function sources(name: string) {
  return {
    src: responsiveImage(name, 800),
    srcSet: `${responsiveImage(name, 800)} 800w, ${responsiveImage(name, 1600)} 1600w`,
    originalSrc: image(`${name}.jpg`),
  }
}

export const galleryItems: GalleryItem[] = [
  {
    id: '2026-spring-hall',
    ...sources('sttalk-2026-spring-hall'),
    width: 4000,
    height: 1848,
    title: '행사장 전경',
    year: '2026',
    kind: 'photo',
    alt: '행사장 전경. 여러 테이블에서 학생과 선배님이 함께 대화하는 모습',
  },
  {
    id: '2026-spring-table',
    ...sources('sttalk-2026-spring-table'),
    width: 1600,
    height: 914,
    title: '테이블 대화 모습',
    year: '2026',
    kind: 'photo',
    alt: '한 테이블에서 선배님이 학생들과 이야기를 나누는 모습',
  },
  {
    id: '2025-table-talk',
    ...sources('sttalk-2025-table-talk'),
    width: 4032,
    height: 3024,
    title: '테이블 토크 현장',
    year: '2025',
    kind: 'photo',
    alt: '테이블 토크가 진행 중인 행사장',
  },
  {
    id: '2026-spring-screen',
    ...sources('sttalk-2026-spring-screen'),
    width: 1600,
    height: 914,
    title: '스크린 앞 테이블',
    year: '2026',
    kind: 'photo',
    alt: '스크린 앞 여러 테이블에서 학생들이 대화하는 모습',
  },
]
