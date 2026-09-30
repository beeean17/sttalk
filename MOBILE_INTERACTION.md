# 모바일·폴드 하단 탐색과 시트

React 구현은 **560px 미만 모바일**, **560–767px 폴드**에서 같은 네 탭 정보 시트를 사용합니다. 너비 768px 이상은 높이도 600px 이상일 때 태블릿·데스크톱 섹션형 화면으로 전환하며, 높이가 낮은 가로형 휴대폰은 넓은 모바일 시트를 유지합니다. 폴드라는 이름은 뷰포트 폭을 뜻하며 기기 모델이나 힌지 API를 감지하지 않습니다.

## 디자인 근거

- [Apple HIG — Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets): grabber, 단계별 높이와 문맥을 유지하는 상세 정보.
- [Apple HIG — Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures/): 제스처 외의 대체 입력과 즉각적인 피드백.
- [Apple HIG — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility): 동작 줄이기 설정 존중.
- [Toss TDS — BottomSheet](https://tossmini-docs.toss.im/tds-mobile/components/bottom-sheet/): 상세 정보와 내부 스크롤·시트 조작의 구분.
- [Toss TDS — BottomCTA](https://tossmini-docs.toss.im/tds-mobile/components/BottomCTA/Single/): 하단 안전 영역 고려.

세 단계의 위치와 스프링 계수는 ST:talk 구현값이며 Apple·토스의 공식 수치가 아닙니다. 아래 Figma 프로토타입의 1200ms 타이머는 과거 디자인 시연값이며 현재 React 구현에는 없습니다.

## Figma 프로토타입

[Mobile Light 프레임](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-8)과 Fold Light 프레임(`15:6`)은 기존 ID를 유지합니다. `23 Mobile Shell` 페이지(`68:2`)에는 Mobile/Fold 각각 **소개 / 진행 / 기록 / 일정** 네 탭 × **Peek / Half / Full** 세 단계 × **Expanded / Compact** 탐색 상태를 둡니다. 기기별 24개, 전체 48개 셸 상태이며 Light/Dark는 프레임 테마를 상속합니다.

Figma의 확장 탐색은 Mobile 348 × 64px·Fold 440 × 64px, 아이콘 전용 축소 탐색은 Mobile 240 × 56px·Fold 280 × 56px입니다. 축소해도 네 아이콘과 선택 상태는 남고 라벨만 숨겨집니다. Figma Smart Animate와 `AFTER_TIMEOUT` 1200ms는 움직일 때 축소하고 잠시 후 복원하던 **이전 프로토타입**의 전환 시연입니다. 이번 변경에서 Figma 파일은 수정하지 않았습니다. [FIGMA.md](./FIGMA.md)의 V5 설명도 당시 디자인과 이전 React 동작을 기록한 것이며, 아래 단계별 고정 정책이 현재 구현 기준입니다.

## React 구현

`src/components/MobileExperience.tsx`는 뷰포트와 안전 영역을 측정하고, `src/lib/sheetGeometry.ts`가 Peek/Half/Full의 위치·높이·여백을 계산합니다. `ResizeObserver`로 폭과 높이 변화를 반영합니다. `Peek`에서는 제목과 한 줄 요약, `Half`와 `Full`에서는 같은 탭의 상세 본문을 독립 스크롤 영역에 표시합니다. 손잡이와 제목 영역에서 Pointer Events로 시트를 끌고, 놓을 때 최근 이동 속도를 반영해 가까운 단계에 스냅합니다. Peek의 제목이나 요약을 누르면 Half로 열립니다. 시트 본문에서는 기본 세로 스크롤을 유지합니다.

하단 탐색의 크기는 **시트 단계만** 결정합니다. Peek와 Half에서는 라벨이 보이는 Expanded, Full에서만 아이콘이 보이는 Compact입니다. 서랍을 완전히 올린 상태에서는 스크롤이 멈춰도 Compact를 유지하고, Half나 Peek로 내리면 Expanded로 돌아옵니다. 본문 스크롤, 손잡이·도크의 움직임, 키보드 포커스만으로는 크기를 바꾸지 않으며 타이머도 없습니다. `useMediaQuery`가 동작 줄이기 설정의 실시간 변경을 구독하고 모바일 청크 안의 `MotionConfig`도 해당 설정을 반영하며, 줄이기 설정에서는 시트 단계와 도크 전환 시간을 0으로 둡니다. 도크 버튼은 축소 상태에도 최소 44px 폭·높이를 유지합니다.

현재 탭과 단계는 `#program-peek` 같은 URL 해시로 저장합니다. 유효한 해시가 없으면 진행 탭의 Peek에서 시작합니다. 다른 탭을 선택하면 기본적으로 Half로 열고, Full에서는 Full을 유지합니다. 현재 탭을 다시 선택하면 탐색 크기와 관계없이 Peek↔Half, Full→Half로 바뀝니다. 단계가 바뀌면 탐색 크기도 그 단계에 맞춰 바로 바뀝니다.

| 입력                               | 동작                                              |
| ---------------------------------- | ------------------------------------------------- |
| 손잡이 클릭                        | Peek → Half → Full → Half                         |
| 손잡이 드래그                      | 손가락 이동을 따르다가 놓는 위치·속도에 따라 스냅 |
| Peek 제목·요약 클릭                | Half로 열기                                       |
| 제목 영역 드래그                   | 손잡이와 같은 방식으로 단계 이동                  |
| 탭에서 좌우 방향키·Home·End        | 다른 탭으로 이동하고 해당 탭을 엶                 |
| 탭에서 위쪽 방향키                 | 시트를 한 단계 확장하고 본문으로 포커스 이동      |
| 손잡이에서 위·아래 방향키·Home·End | 단계 확장·축소 또는 처음·끝 단계로 이동           |
| Escape                             | Full → Half → Peek 순으로 한 단계 축소            |
| 브라우저 뒤로 가기                 | 해시에 기록된 탭·단계 복원                        |

소개 탭의 이메일은 행사 문의 링크입니다. 기록 탭은 로컬 이미지 다섯 개를 보여주며, 확대 보기에서는 닫기 버튼·Escape와 이전/다음 버튼·좌우 방향키·가로 스와이프를 사용할 수 있습니다. 확대 보기는 `document.body`의 네이티브 `dialog`로 열어 시트 transform 안에 갇히지 않도록 했습니다.

## 확인이 필요한 환경

이 문서는 구현 구조를 설명하며 실기기 검수 결과를 뜻하지 않습니다. iOS Safari와 Android Chrome의 주소창 변화·`dvh`·안전 영역, 폴드 폭 변화, 확대 글씨, 스크린리더와 포커스 순서, 동작 줄이기 설정은 실제 기기에서 확인해야 합니다.
