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
  email: 'seoultechgrad42@gmail.com',
  scale: '동문 선배님 8–10명 · 테이블당 10인 이하 · 2차시',
}

export const mailto = `mailto:${event.email}?subject=${encodeURIComponent('[ST:talk] 행사 문의')}`

export const programSteps = [
  {
    number: '01',
    title: '관심 분야로 만나요',
    description: '학생들이 관심 있는 직무·분야의 동문 선배님과 한 테이블에 앉습니다.',
  },
  {
    number: '02',
    title: '경험을 나눠요',
    description: '선배님이 지금 하는 일과 그 길을 선택하고 준비한 과정을 들려주십니다.',
  },
  {
    number: '03',
    title: '자유롭게 질문해요',
    description: '학생들의 질문에 답하고, 두 차시 동안 가까이에서 대화합니다.',
  },
]

export const alumniRoles = [
  { number: '01', title: '지금 하는 일', description: '현재 맡고 있는 일과 진로를 소개해 주세요.' },
  {
    number: '02',
    title: '여기까지의 과정',
    description: '준비와 선택, 현장에서 얻은 경험을 들려주세요.',
  },
  { number: '03', title: '후배들의 질문', description: '학생들의 궁금증에 편하게 답해 주세요.' },
]

export const schedule = [
  {
    start: '19:00',
    end: '19:10',
    range: '19:00–19:10',
    minutes: '10분',
    title: '행사 안내',
    description: '행사 취지와 진행 방식 안내',
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
  },
  {
    start: '20:00',
    end: '20:10',
    range: '20:00–20:10',
    minutes: '10분',
    title: '잠시 쉬어가는 시간',
    description: '휴식',
    type: '휴식',
    talk: false,
  },
  {
    start: '20:10',
    end: '21:00',
    range: '20:10–21:00',
    minutes: '50분',
    title: '두 번째 테이블 토크',
    description: '선배님의 직무·경험 소개와 자유로운 질의응답',
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
      '선배님의 경험을 바탕으로 편안하게 대화해 주시면 됩니다. 발표 자료를 포함한 사전 준비 사항은 확정 후 별도로 안내드리겠습니다.',
  },
  {
    question: '행사 문의는 어떻게 하나요?',
    answer: `행사와 관련해 궁금하신 점은 ${event.email}으로 문의해 주세요.`,
  },
]
