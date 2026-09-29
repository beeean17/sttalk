export const event = {
  name: 'ST:talk',
  organizer: '서울과학기술대학교 제42대 총졸업준비위원회',
  date: '2026년 11월 20일 (금)',
  dateISO: '2026-11-20',
  time: '19:00–21:00',
  venue: '중앙도서관 1층 ST 아트홀',
  email: 'seoultechgrad42@gmail.com',
}

export const mailto = `mailto:${event.email}?subject=${encodeURIComponent('[ST:talk] 행사 문의')}`

export const topics = [
  {
    id: 'career',
    label: '취업',
    english: 'CAREER',
    number: '01',
    title: '나에게 맞는 일을\n찾아가는 과정.',
    description:
      '직무를 선택한 계기부터 취업 준비, 현업에서의 하루까지. 그 길에서 직접 보고 느끼신 이야기를 들려주세요.',
    questions: [
      '학교에서의 어떤 경험이 지금 일에 도움이 되었나요?',
      '지금의 직무를 선택하게 된 계기가 궁금해요.',
      '취업을 준비하던 때로 돌아간다면 무엇을 하고 싶으신가요?',
    ],
    heroQuestion: '어떻게 지금의 일을 선택하셨나요?',
  },
  {
    id: 'startup',
    label: '창업',
    english: 'STARTUP',
    number: '02',
    title: '나만의 일을\n시작하는 용기.',
    description:
      '아이디어를 사업으로 옮긴 과정과 직접 부딪치며 배운 것들. 선배님이 만들어온 길이 후배에게 새로운 가능성이 됩니다.',
    questions: [
      '아이디어를 처음 실행에 옮긴 순간이 궁금해요.',
      '처음 시작할 때, 무엇부터 준비하셨나요?',
      '창업을 고민하는 후배에게 해주고 싶은 말씀이 있나요?',
    ],
    heroQuestion: '처음 시작할 때, 무엇부터 준비하셨나요?',
  },
  {
    id: 'graduate',
    label: '대학원 진학',
    english: 'GRADUATE SCHOOL',
    number: '03',
    title: '더 깊이 배워가는\n또 하나의 선택.',
    description:
      '진학을 결심한 이유, 연구 분야를 찾는 과정과 대학원 생활. 먼저 경험한 선배님의 이야기가 후배의 고민에 도움이 됩니다.',
    questions: [
      '취업과 진학 사이에서 어떻게 결정하셨나요?',
      '나에게 맞는 연구 분야는 어떻게 찾을 수 있을까요?',
      '진학 전에 알았으면 좋았을 것은 무엇인가요?',
    ],
    heroQuestion: '취업과 진학, 어떻게 결정하셨나요?',
  },
]

export const schedule = [
  {
    start: '19:00',
    end: '19:10',
    minutes: '10분',
    title: '만남의 시작',
    description: '행사 취지와 진행 방식 안내',
    type: '안내',
    talk: false,
  },
  {
    start: '19:10',
    end: '20:00',
    minutes: '50분',
    title: '첫 번째 테이블 토크',
    description: '선배님의 직무·경험 소개와 자유로운 질의응답',
    type: '1차시',
    talk: true,
  },
  {
    start: '20:00',
    end: '20:10',
    minutes: '10분',
    title: '잠시 쉬어가는 시간',
    description: '휴식',
    type: '휴식',
    talk: false,
  },
  {
    start: '20:10',
    end: '21:00',
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
