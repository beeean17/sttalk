// 섹션 상단 위치들로 "지금 보고 있는 섹션"을 고른다.
// tops: 각 섹션 상단의 화면 기준 y좌표(문서 순서), line: 기준선 y좌표.
// 기준선을 지난 마지막 섹션이 현재 섹션이고, 끝까지 스크롤하면 마지막 섹션으로 본다.
export function activeSectionIndex(tops: number[], line: number, atEnd = false) {
  if (tops.length === 0) return 0
  if (atEnd) return tops.length - 1
  let current = 0
  tops.forEach((top, index) => {
    if (top <= line) current = index
  })
  return current
}

// 기준선은 가려지지 않은 영역의 위에서 35% 지점에 둔다.
export function progressLine(topInset: number, viewportHeight: number) {
  return topInset + (viewportHeight - topInset) * 0.35
}

// 모바일 하단 내비는 첫 섹션(행사 소개)에서만 라벨을 펼친다.
export function dockState(activeIndex: number): 'expanded' | 'compact' {
  return activeIndex === 0 ? 'expanded' : 'compact'
}
