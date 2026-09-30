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

// 가로로 넘기는 탭 화면에서, 스크롤 위치에 가장 가까운 탭을 고른다.
export function pagerIndex(scrollLeft: number, pageWidth: number, count: number) {
  if (pageWidth <= 0 || count <= 0) return 0
  return Math.max(0, Math.min(count - 1, Math.round(scrollLeft / pageWidth)))
}
