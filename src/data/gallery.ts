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
  // 칸에 맞춰 잘릴 때 남길 부분(object-position). 없으면 목록의 기본값을 쓴다.
  focus?: string
}

// 화면에 쓰는 사진만 번들에 넣는다. 이 목록에 없는 파일은 폴더에 있어도 배포되지 않는다.
const files = import.meta.glob(
  '../../assets/images/gallery/**/sttalk-{2025-table-talk,2026-spring-hall,2026-spring-table,2026-spring-group}*.{jpg,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>

const image = (name: string) => files[`../../assets/images/gallery/${name}`]
const responsiveImage = (name: string, width: number) => image(`responsive/${name}-${width}.webp`)

function sources(name: string) {
  return {
    src: responsiveImage(name, 800),
    srcSet: `${responsiveImage(name, 800)} 800w, ${responsiveImage(name, 1600)} 1600w`,
    originalSrc: image(`${name}.jpg`),
  }
}

// 원본이 작은 사진은 늘리지 않고 원래 크기 한 장만 쓴다.
function smallSource(name: string, width: number) {
  return {
    src: responsiveImage(name, width),
    srcSet: `${responsiveImage(name, width)} ${width}w`,
    originalSrc: image(`${name}.jpg`),
  }
}

// 첫 화면 사진. 갤러리와 겹치지 않도록 목록에는 넣지 않는다.
export const heroPhoto: GalleryItem = {
  id: '2025-table-talk',
  ...sources('sttalk-2025-table-talk'),
  width: 4032,
  height: 3024,
  title: '테이블 토크 현장',
  year: '2025',
  kind: 'photo',
  alt: '테이블 토크가 진행 중인 행사장',
}

// 전경, 가까이서 본 테이블, 단체 사진 순서다. 서로 다른 장면만 고른다.
export const galleryItems: GalleryItem[] = [
  {
    id: '2026-spring-hall',
    ...sources('sttalk-2026-spring-hall'),
    width: 4000,
    height: 1848,
    title: '행사장 전경',
    year: '2026',
    kind: 'photo',
    alt: '행사장 전경. 스크린 앞 여러 테이블에서 학생과 선배님이 함께 대화하는 모습',
    // 왼쪽 테이블은 다음 사진에 크게 나오므로 스크린이 있는 오른쪽을 남긴다.
    focus: '100% 60%',
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
    id: '2026-spring-group',
    ...smallSource('sttalk-2026-spring-group', 519),
    width: 519,
    height: 372,
    title: '단체 사진',
    year: '2026',
    kind: 'photo',
    alt: '행사를 마치고 선배님과 학생, 준비위원이 함께 찍은 단체 사진',
    // 위쪽은 벽이라, 잘릴 때는 사람이 있는 아래쪽을 남긴다.
    focus: '50% 100%',
  },
]
