import { test } from 'node:test'
import assert from 'node:assert/strict'
import { activeSectionIndex, pagerIndex, progressLine } from '../src/lib/sectionProgress.ts'

test('the section that last crossed the line is the current one', () => {
  const line = progressLine(0, 800)
  assert.equal(line, 280)
  assert.equal(activeSectionIndex([0, 900, 1800, 2700, 3600], line), 0)
  assert.equal(activeSectionIndex([-700, 200, 1100, 2000, 2900], line), 1)
  assert.equal(activeSectionIndex([-2000, -1100, -200, 700, 1600], line), 2)
})

test('a section only counts once its top passes the line, not when it first appears', () => {
  const line = progressLine(0, 800)
  assert.equal(activeSectionIndex([-500, 281, 1200], line), 0)
  assert.equal(activeSectionIndex([-501, 280, 1199], line), 1)
})

test('a fixed header pushes the line down', () => {
  assert.equal(progressLine(70, 900), 70 + 830 * 0.35)
})

test('reaching the end selects the last section even if its top never crosses the line', () => {
  const line = progressLine(0, 800)
  assert.equal(activeSectionIndex([-3000, -2100, -1200, -300, 400], line), 3)
  assert.equal(activeSectionIndex([-3000, -2100, -1200, -300, 400], line, true), 4)
})

test('missing sections and empty lists fall back to the first section', () => {
  assert.equal(activeSectionIndex([], 280), 0)
  assert.equal(activeSectionIndex([Infinity, Infinity], 280), 0)
})

test('the pager picks the nearest tab and stays within range', () => {
  assert.equal(pagerIndex(0, 390, 5), 0)
  assert.equal(pagerIndex(194, 390, 5), 0)
  assert.equal(pagerIndex(196, 390, 5), 1)
  assert.equal(pagerIndex(390 * 4, 390, 5), 4)
  assert.equal(pagerIndex(390 * 9, 390, 5), 4)
  assert.equal(pagerIndex(-40, 390, 5), 0)
  assert.equal(pagerIndex(100, 0, 5), 0)
})
