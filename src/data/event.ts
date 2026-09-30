export const event = {
  name: 'ST:talk',
  year: '2026',
  organizer: '서울과학기술대학교 제42대 총졸업준비위원회',
  date: '2026년 11월 20일 (금)',
  dateShort: '2026. 11. 20. (금)',
  dateNatural: '2026년 11월 20일 금요일',
  dateHeading: '11월 20일',
  dateISO: '2026-11-20',
  time: '19:00–21:00',
  timeNatural: '오후 7시–9시',
  venue: '중앙도서관 1층 ST 아트홀',
  venueHeading: 'ST 아트홀',
  venueFull: '서울과학기술대학교 중앙도서관 1층 ST 아트홀',
  // 참여 여부를 알려 달라고 부탁드리는 기한.
  replyBy: '10월 15일(목)',
  replyByISO: '2026-10-15',
  // 문의와 회신은 카카오톡 오픈채팅으로 받고, 이메일은 주소만 보여 준다.
  kakao: 'https://open.kakao.com/o/sT89waQi',
  email: 'seoultechgrad42@gmail.com',
  scale: '동문 선배님 8–10명 · 테이블당 10인 이하 · 2차시',
}

// 화면 순서. 데스크톱 헤더 메뉴와 모바일 하단 내비가 같은 목록을 쓴다.
export const siteSections = [
  { id: 'overview', label: '행사 소개', short: '소개' },
  { id: 'how-it-works', label: '진행·일정', short: '진행' },
  { id: 'stories', label: '선배님 이야기', short: '이야기' },
  { id: 'gallery', label: '지난 현장', short: '현장' },
  { id: 'contact', label: '문의', short: '문의' },
] as const

export const heroDescription =
  '서울과학기술대학교 동문 선배님과 재학생이 진로 경험을 나누는 소규모 테이블 토크입니다. 취업·창업·대학원 진학까지, 선배님이 걸어온 길을 가까이에서 들려주세요.'

export const programIntro =
  '8–10명의 동문 선배님을 모시고, 한 테이블 최대 10명 규모로 두 차례 대화합니다.'

export const storyIntro =
  '학생들의 의견을 모아 다섯 가지 주제로 정리했습니다. 인상 깊었거나 자신 있는 주제 위주로 편하게 이야기해 주세요.'
export const storyTopicsLabel = '선배님이 직접 겪은 진로 경험이면 충분합니다'
export const storyTopics = ['취업', '창업', '대학원 진학']
export const prepNote =
  '자기소개 양식과 예상 질문 목록은 따로 보내드립니다. 양식에 꼭 맞추지 않고 자유롭게 준비하셔도 됩니다.'

export const galleryIntro = '테이블에서 나눈 이야기와 행사의 분위기를 사진으로 먼저 만나보세요.'
export const contactIntro =
  '행사에 관해 궁금한 점은 총졸업준비위원회 카카오톡 오픈채팅으로 문의해 주세요.'
export const replyNote = '참여 여부를 카카오톡 오픈채팅으로 답변 부탁드립니다.'

const [scaleGuests, ...scaleRest] = event.scale.split(' · ')
// 문의 화면의 "참여 안내" 카드. 일시·장소는 첫 화면에 있어 여기서는 되풀이하지 않는다.
export const summaryRows = [
  { label: '규모', lines: [scaleGuests, scaleRest.join(' · ')] },
  { label: '강연비', lines: ['소정의 강연비를 드립니다'] },
  // 행사가 금요일이라 5부제 제한 끝자리가 5·0이다. 날짜가 바뀌면 함께 고친다.
  { label: '주차', lines: ['주차할 수 있습니다', '차량 5부제로 번호 끝자리 5·0 차량은 입차 불가'] },
  { label: '다과', lines: ['간식과 음료를 준비해 드립니다'] },
]

// 선배님께 부탁드리는 이야기 주제. 위원회가 보내는 자기소개 양식·예상 질문 목록과 같은 순서다.
export const talkTopics = [
  {
    number: '01',
    title: '자기소개',
    description: '전공과 직장·직무, 재학 중 활동과 취업 준비 기간을 간단히 소개해 주세요.',
  },
  {
    number: '02',
    title: '직무 선택과 준비 과정',
    description: '지금의 직무와 직장을 고른 이유와 기준, 정보를 얻은 방법을 들려주세요.',
  },
  {
    number: '03',
    title: '자기소개서와 면접',
    description: '자기소개서 소재와 작성 요령, 면접 준비와 경험을 나눠 주세요.',
  },
  {
    number: '04',
    title: '회사 생활과 커리어',
    description: '입사 초기의 적응, 근무 환경, 입사 후 필요한 공부를 이야기해 주세요.',
  },
  {
    number: '05',
    title: '취업 준비 경험과 조언',
    description: '준비 기간의 생활, 도움이 된 활동과 제도, 아쉬웠던 점을 전해 주세요.',
  },
]
export const talkTopicsNote =
  '조형대학 선배님께는 포트폴리오(작업물 선정, 구성)에 대한 질문도 드립니다.'

// 한 차시의 테이블 토크가 흘러가는 순서. 데스크톱·태블릿 시간표의 1차시 설명에 쓴다.
export const talkFlow = [
  '관심 있는 직무·분야의 동문 선배님과 한 테이블에 앉습니다.',
  '선배님이 지금 하는 일과 그 길을 선택하고 준비한 과정을 들려주십니다.',
  '학생들의 질문에 답하며 가까이에서 자유롭게 대화합니다.',
]

export type ScheduleSession = {
  start: string
  end: string
  range: string
  minutes: string
  title: string
  description: string
  type: string
  talk: boolean
  steps?: string[]
}

export const schedule: ScheduleSession[] = [
  {
    start: '19:00',
    end: '19:10',
    range: '19:00–19:10',
    minutes: '10분',
    title: '행사 안내',
    description: '행사 취지와 진행 방식을 안내합니다.',
    type: '안내',
    talk: false,
  },
  {
    start: '19:10',
    end: '20:00',
    range: '19:10–20:00',
    minutes: '50분',
    title: '첫 번째 테이블 토크',
    description: '선배님의 직무·경험 소개와 자유로운 질의응답',
    type: '1차시',
    talk: true,
    steps: talkFlow,
  },
  {
    start: '20:00',
    end: '20:10',
    range: '20:00–20:10',
    minutes: '10분',
    title: '쉬어가는 시간',
    description: '다음 차시 전에 잠시 쉬어갑니다.',
    type: '휴식',
    talk: false,
  },
  {
    start: '20:10',
    end: '21:00',
    range: '20:10–21:00',
    minutes: '50분',
    title: '두 번째 테이블 토크',
    description: '1차시와 같은 방식으로 선배님의 경험을 듣고 자유롭게 질문합니다.',
    type: '2차시',
    talk: true,
  },
]

export const faqs = [
  {
    question: '어떤 이야기를 나누면 될까요?',
    answer:
      '취업, 창업, 대학원 진학 등 선배님이 직접 겪은 진로 경험을 자유롭게 나누어 주시면 됩니다. 직무를 선택한 계기, 준비 과정, 현재 하는 일과 후배들에게 전하고 싶은 이야기 모두 좋습니다.',
  },
  {
    question: '학생들과는 어떻게 만나나요?',
    answer:
      '학생들은 관심 있는 직무·직업의 선배님을 신청하고 해당 테이블에 앉습니다. 테이블당 10인 이하로, 선배님의 이야기를 듣고 궁금한 점을 직접 질문하는 방식입니다. 행사는 총 2차시로 진행합니다.',
  },
  {
    question: '발표 자료를 미리 준비해야 하나요?',
    answer:
      '자기소개 양식과 예상 질문 목록을 따로 보내드립니다. 양식에 꼭 맞추지 않고 자유롭게 준비하시면 되며, 자기소개서나 포트폴리오처럼 도움이 될 자료를 덧붙이셔도 됩니다.',
  },
  {
    question: '참여 여부는 언제까지 알려 드려야 하나요?',
    answer: `${event.replyBy}까지 카카오톡 오픈채팅(${event.kakao})으로 답변 부탁드립니다.`,
  },
  {
    question: '강연비와 주차, 식사는 어떻게 되나요?',
    answer:
      '소정의 강연비를 드립니다. 주차는 가능하지만, 차량 5부제 때문에 번호 끝자리가 5 또는 0인 차량은 들어올 수 없습니다. 현장에는 간식과 음료를 준비해 드립니다.',
  },
  {
    question: '행사 문의는 어떻게 하나요?',
    answer: `행사와 관련해 궁금하신 점은 카카오톡 오픈채팅(${event.kakao})으로 문의해 주세요. 이메일은 ${event.email}입니다.`,
  },
]
