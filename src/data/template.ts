import type { GalleryItem } from './gallery'
import slide1 from '../../assets/images/template/sttalk-template-1.png'
import slide2 from '../../assets/images/template/sttalk-template-2.png'
import slide3 from '../../assets/images/template/sttalk-template-3.png'
import slide4 from '../../assets/images/template/sttalk-template-4.png'
import slide5 from '../../assets/images/template/sttalk-template-5.png'

// 선배님께 보내는 자기소개 양식의 예시 화면. 누를 때만 불러오므로 크기별 사본은 두지 않는다.
const slide = (number: number, src: string, title: string, alt: string): GalleryItem => ({
  id: `template-${number}`,
  src,
  srcSet: `${src} 1600w`,
  originalSrc: src,
  width: 1600,
  height: 923,
  title,
  year: '2026',
  kind: 'slide',
  alt,
})

const blank = (topic: string) => `${topic} 양식. 제목만 있고 내용은 자유롭게 채우는 빈 페이지.`

export const templateItems: GalleryItem[] = [
  slide(
    1,
    slide1,
    '01 자기소개 · 양식 예시',
    '자기소개 양식. 이름, 나이, 직장, 직무, 입학년도, 전공, 학점, 졸업년도, 자격증, 어학, 현장 및 인턴 경험, 수상경력, 학부연구생·교환학생, 취업 준비 기간을 적는 칸과, 재학 중 활동과 취업 준비 기간을 연도별로 정리한 연표 예시가 있다.',
  ),
  slide(2, slide2, '02 직무 선택 및 준비 과정', blank('직무 선택 및 준비 과정')),
  slide(3, slide3, '03 면접 및 자소서 준비', blank('면접 및 자소서 준비')),
  slide(4, slide4, '04 회사 생활 및 커리어 발전', blank('회사 생활 및 커리어 발전')),
  slide(5, slide5, '05 취업 준비 경험 및 조언', blank('취업 준비 경험 및 조언')),
]
