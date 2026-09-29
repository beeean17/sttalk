import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sheetGeometry, progressAtTop, topAtProgress, snapStage } from '../src/lib/sheetGeometry.ts'

test('approved phone and fold frames retain their three snap positions', () => {
  assert.deepEqual(sheetGeometry(844, false).tops, [624, 380, 24])
  assert.deepEqual(sheetGeometry(840, true).tops, [594, 364, 24])
})

test('short, landscape and tall screens keep ordered usable stops within the viewport', () => {
  for (const height of [320, 390, 568, 667, 844, 1024]) {
    for (const fold of [false, true]) {
      const { tops, heights, dockBottom } = sheetGeometry(height, fold, 34, 47)
      assert(tops[0] > tops[1] && tops[1] > tops[2])
      assert(tops[2] >= 47)
      assert(dockBottom >= 42)
      for (let i = 0; i < 3; i++) {
        assert(heights[i] > 0)
        assert(tops[i] + heights[i] <= height)
      }
    }
  }
})

test('drag mapping preserves pointer position across both sheet segments and clamps overshoot', () => {
  const { tops } = sheetGeometry(844, false)
  for (let top = tops[2]; top <= tops[0]; top += 3) {
    assert(Math.abs(topAtProgress(progressAtTop(top, tops), tops) - top) < 0.0001)
  }
  assert.equal(progressAtTop(2000, tops), 0)
  assert.equal(progressAtTop(-200, tops), 2)
})

test('a flick advances in its direction while a slow release chooses the nearest stop', () => {
  const { tops } = sheetGeometry(844, false)
  assert.equal(snapStage(540, 0, tops), 'peek')
  assert.equal(snapStage(540, -1, tops), 'half')
  assert.equal(snapStage(330, 0, tops), 'half')
  assert.equal(snapStage(330, -2, tops), 'full')
  assert.equal(snapStage(330, 2, tops), 'peek')
  assert.equal(snapStage(500, 100, tops), 'peek')
  assert.equal(snapStage(500, -100, tops), 'full')
})
