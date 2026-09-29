export const sheetStages = ['peek', 'half', 'full'] as const
export type SheetStage = (typeof sheetStages)[number]

export function sheetGeometry(height: number, fold: boolean, safeBottom = 0, safeTop = 0) {
  const fullTop = Math.max(24, safeTop)
  const peekHeight = fold ? 154 : 132
  const peekBottom = Math.max(fold ? 92 : 88, safeBottom + 76)
  const halfBottom = Math.max(fold ? 46 : 44, safeBottom + 24)
  const peekTop = Math.max(fullTop + 80, height - peekBottom - peekHeight)
  const halfTop = Math.max(
    fullTop + 40,
    Math.min(peekTop - 40, height - halfBottom - Math.min(fold ? 430 : 420, height * 0.58)),
  )
  return {
    tops: [peekTop, halfTop, fullTop],
    heights: [peekHeight, height - halfBottom - halfTop, height - fullTop],
    insets: [fold ? 20 : 14, fold ? 10 : 8, 0],
    radii: [28, 16, 24],
    dockBottom: Math.max(fold ? 20 : 17, safeBottom + 8),
    peekBottom,
  }
}

export function progressAtTop(top: number, tops: number[]) {
  const [peek, half, full] = tops
  if (top >= half) return Math.max(0, Math.min(1, (peek - top) / (peek - half)))
  return 1 + Math.max(0, Math.min(1, (half - top) / (half - full)))
}

export function topAtProgress(progress: number, tops: number[]) {
  const index = progress <= 1 ? 0 : 1
  const fraction = Math.max(0, Math.min(1, progress - index))
  return tops[index] + (tops[index + 1] - tops[index]) * fraction
}

// Project the final gesture using recent velocity, rather than the whole drag average.
export function snapStage(top: number, velocity: number, tops: number[]): SheetStage {
  const projected = Math.max(tops[2], Math.min(tops[0], top + velocity * 160))
  let nearest = 0
  for (let i = 1; i < tops.length; i++) {
    if (Math.abs(tops[i] - projected) < Math.abs(tops[nearest] - projected)) nearest = i
  }
  return sheetStages[nearest]
}
