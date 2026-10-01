// AI에게 요약을 맡길 때 쓰는 안내 문서와 프롬프트.
// 문서 원본은 public/llms.txt(목차)와 public/llm/*.md이며, 배포 주소로 그대로 열린다.
export const siteUrl = 'https://beeean17.github.io/sttalk/'

export const llmIndexPath = 'llms.txt'
export const llmDocPaths = ['llm/event.md', 'llm/program.md', 'llm/faq.md']
export const llmIndexUrl = `${siteUrl}${llmIndexPath}`

const request = [
  '초청받은 동문 선배의 입장에서 알아야 할 내용을 한국어로 요약해 주세요.',
  '',
  '- 언제, 어디서 열리는지',
  '- 어떤 방식으로 진행되는지 (시간표 포함)',
  '- 선배가 무엇을 이야기하고 준비하면 되는지',
  '- 아직 정해지지 않은 것과 문의처',
  '',
  '문서에 없는 내용은 추측하지 말고 "문서에 없음"이라고 적어 주세요.',
]

export const llmDocUrls = llmDocPaths.map((path) => `${siteUrl}${path}`)

// 링크만 담은 프롬프트. 웹 주소를 열 수 있는 AI에 쓴다.
// 일부 AI 도구는 사용자가 직접 준 주소만 열 수 있어서, 목차 안의 링크를 따라가지 못한다.
// 그래서 세부 문서 주소도 목차와 함께 프롬프트에 모두 적는다.
export function linkPrompt() {
  return [
    '아래 주소들은 서울과학기술대학교 동문 초청 행사 "ST:talk" 안내 사이트의 내용을 정리한 문서입니다.',
    `첫 번째 주소(목차)를 먼저 읽고, 나머지 세부 문서도 읽은 뒤 ${request[0]}`,
    ...request.slice(1),
    '주소를 하나도 열 수 없다면 요약하지 말고 열 수 없다고 알려 주세요. 일부만 열렸다면 연 문서로 요약하고, 열지 못한 주소를 함께 알려 주세요.',
    '',
    llmIndexUrl,
    ...llmDocUrls,
  ].join('\n')
}

// 문서 본문까지 담은 프롬프트. 주소를 열지 못하는 AI에 쓴다.
export function fullPrompt(documents: string[]) {
  return [
    '아래는 서울과학기술대학교 동문 초청 행사 "ST:talk" 안내 사이트의 내용을 정리한 문서입니다.',
    `문서를 읽고 ${request[0]}`,
    ...request.slice(1),
    '',
    ...documents.map((text) => `---\n\n${text.trim()}\n`),
  ].join('\n')
}
