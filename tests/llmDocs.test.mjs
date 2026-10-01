import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import {
  talkTopics,
  talkTopicsNote,
  event,
  faqs,
  prepNote,
  schedule,
  summaryRows,
  talkFlow,
} from '../src/data/event.ts'
import {
  fullPrompt,
  linkPrompt,
  llmDocPaths,
  llmDocUrls,
  llmIndexPath,
  llmIndexUrl,
  siteUrl,
} from '../src/data/llm.ts'

// AI용 안내 문서(public/)는 손으로 쓰므로, 화면이 쓰는 데이터와 어긋나지 않는지 확인한다.
const read = (path) => readFileSync(new URL(`../public/${path}`, import.meta.url), 'utf8')
const index = read(llmIndexPath)
const docs = Object.fromEntries(llmDocPaths.map((path) => [path, read(path)]))

test('the routing page links to every document at its deployed address', () => {
  for (const path of llmDocPaths) assert(index.includes(`${siteUrl}${path}`), path)
  const linked = [...index.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map((match) => match[1])
  for (const url of linked) {
    assert(url.startsWith(siteUrl), url)
    assert(existsSync(new URL(`../public/${url.slice(siteUrl.length)}`, import.meta.url)), url)
  }
})

test('the routing page and the overview carry the confirmed event facts', () => {
  for (const text of [index, docs['llm/event.md']]) {
    for (const fact of [
      event.dateNatural,
      event.time,
      event.venueFull,
      event.kakao,
      event.replyBy,
      event.email,
      event.scale,
    ])
      assert(text.includes(fact), fact)
    assert(text.includes(event.organizer))
  }
})

test('the overview lists everything on the participation guide card', () => {
  const text = docs['llm/event.md']
  for (const row of summaryRows) for (const line of row.lines) assert(text.includes(line), line)
})

test('the routing page alone covers the timetable and the talk topics', () => {
  // 세부 문서를 열지 못하는 AI도 목차 하나로 요약할 수 있게 핵심을 목차에도 둔다.
  for (const session of schedule) {
    assert(index.includes(session.range), session.range)
    assert(index.includes(session.title), session.title)
  }
  for (const role of talkTopics) {
    assert(index.includes(role.title), role.title)
    assert(index.includes(role.description), role.description)
  }
  assert(index.includes(talkTopicsNote))
  assert(index.includes(prepNote))
})

test('the programme document matches the on-screen timetable', () => {
  const text = docs['llm/program.md']
  for (const session of schedule) {
    assert(text.includes(session.range), session.range)
    assert(text.includes(session.title), session.title)
    assert(text.includes(`${session.type} · ${session.minutes}`))
    if (!session.steps) assert(text.includes(session.description), session.description)
  }
  for (const step of talkFlow) assert(text.includes(step), step)
})

test('the FAQ document matches the talk topics and questions', () => {
  const text = docs['llm/faq.md']
  for (const role of talkTopics) {
    assert(text.includes(role.title), role.title)
    assert(text.includes(role.description), role.description)
  }
  for (const faq of faqs) {
    assert(text.includes(faq.question), faq.question)
    assert(text.includes(faq.answer), faq.answer)
  }
  assert(text.includes(talkTopicsNote))
  assert(text.includes(prepNote))
})

test('prompts list every document address or embed every document', () => {
  // 사용자가 준 주소만 여는 AI 도구도 있으므로, 목차와 세부 문서 주소가 모두 프롬프트 끝에 있어야 한다.
  assert(linkPrompt().endsWith([llmIndexUrl, ...llmDocUrls].join('\n')))
  const full = fullPrompt([index, ...Object.values(docs)])
  assert(!full.includes(`\n${siteUrl}${llmIndexPath}\n\n---`))
  for (const text of [index, ...Object.values(docs)]) assert(full.includes(text.trim()))
})

test('the link preview image lives under assets/images and the page declares its site address', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const image = html.match(/property="og:image" content="([^"]+)"/)?.[1]
  assert(image?.startsWith('./assets/images/'), image)
  assert(existsSync(new URL(`../${image.slice(2)}`, import.meta.url)), image)
  assert(html.includes(`property="og:url" content="${siteUrl}"`))
})
