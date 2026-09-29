# Figma 디자인 기록

[StTalk Introduce 디자인 파일](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-2)은 동문 초청 행사 정보를 중심으로 개편한 화면의 출처입니다. Figma 수정 사항은 웹사이트와 자동 동기화되지 않습니다. 현재 React 구현은 아래의 데스크톱·태블릿 화면과 모바일·폴드 V4/V5 셸을 코드로 옮긴 상태입니다.

## 정보 구성과 현재 코드

| 디자인 영역                                                                  | React 구현                                                |
| ---------------------------------------------------------------------------- | --------------------------------------------------------- |
| 데스크톱·태블릿의 행사 개요, 진행 방식, 갤러리, 선배님 역할, 일정·장소, 문의 | `src/components/DesktopLanding.tsx`                       |
| 모바일·폴드의 행사 개요와 4탭·3단계 정보 시트                                | `src/components/MobileExperience.tsx`                     |
| 소개·진행·기록·일정 탭 본문                                                  | `src/components/SheetContent.tsx`                         |
| 갤러리의 자료·캡션과 확대 보기                                               | `src/data/gallery.ts`, `src/components/GalleryViewer.tsx` |
| grad42 두 줄 위원회 워드마크                                                 | `src/components/CommitteeWordmark.tsx`                    |

이전 웹의 긴 초대 편지, 주제별 탭, FAQ, 참여 회신 영역은 현 페이지에 표시하지 않습니다. 행사 설명과 지난 자료 열람이 중심이며, 이메일은 문의 링크입니다. 회신 기한이나 신청 버튼·폼은 없습니다. 참여 여부에 관한 별도 연락이 필요한 경우 사이트 링크와 함께 보내는 메시지에서 안내합니다. 휴대폰 번호는 제공되지 않아 표시하지 않습니다.

공식 행사 정보는 **2026년 11월 20일 금요일 19:00–21:00**, 서울과학기술대학교 중앙도서관 1층 ST 아트홀입니다. 동문 선배 8–10명, 테이블당 10인 이하, 2차시로 설명합니다. 시간표는 행사 안내 19:00–19:10, 1차시 19:10–20:00, 휴식 20:00–20:10, 2차시 20:10–21:00의 가안입니다. 학생 이동 방식과 사례비·주차·발표 자료 준비 여부는 확정 정보로 쓰지 않습니다.

## 이전 행사 자료

| 자료                        | 확인된 출처                                                                    | 현재 사용          |
| --------------------------- | ------------------------------------------------------------------------------ | ------------------ |
| 2025년 상반기 현장 사진 3장 | 제41대 위원회 `2025학년도 상반기 취업강연회 결과보고서.hwp`에 포함된 JPEG      | 대표 사진과 갤러리 |
| 2026년 1학기 홍보 포스터    | 제42대 위원회 `취업강연회_1학기/게시/KakaoTalk_Photo_2026-05-12-09-52-53.jpeg` | 지난 홍보 기록     |
| 2026년 1학기 홍보 배너      | 같은 폴더의 `KakaoTalk_Photo_2026-05-27-15-19-49.jpeg`                         | 지난 홍보 기록     |

현장 사진 중 1장은 컬러, 2장은 보고서의 흐린 흑백 원본입니다. 이미지 생성이나 장면 변경 없이 Figma가 제공한 원본을 `public/images/`에 저장했습니다. 2026년 1학기 홍보물의 날짜·신청 방법은 이번 11월 행사의 안내가 아니므로 갤러리에서 과거 자료로 분리합니다. 현재 갤러리는 사진 3장과 홍보물 2개이며, 닫기·이전·다음 버튼과 Escape·좌우 방향키를 지원하는 확대 보기를 사용합니다. 책자 PDF와 책자용 페이지 탐색은 아직 구현 범위에 없습니다.

## 편집 화면

`10 Website` 페이지에는 크기별 Light/Dark 프레임이 있습니다.

| 화면      | 너비 | Light                                                                                     | Dark                                                                                      |
| --------- | ---- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 데스크톱  | 1440 | [열기](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-2) | [열기](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-3) |
| 태블릿    | 820  | [열기](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-4) | [열기](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-5) |
| 폴드 펼침 | 690  | [열기](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-6) | [열기](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-7) |
| 스마트폰  | 390  | [열기](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-8) | [열기](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=15-9) |

`02 Foundations`에는 색상·서체·간격, `22 Page Sections`에는 데스크톱·태블릿 섹션과 이전 모바일·폴드 섹션, `23 Mobile Shell`(`68:2`)에는 모바일·폴드 셸 상태가 있습니다. V2/V3 섹션과 옛 웹 컴포넌트는 디자인 이력으로 남아 있으며 현 React 페이지의 구조를 설명하는 기준은 위 대응표입니다.

## 색상·서체·워드마크

- Figma의 `ST:talk Primitives`와 `ST:talk Color` Light/Dark 변수는 `src/styles/tokens.css`의 팔레트·역할별 토큰에 대응합니다. 브랜드 원색은 Blue `#3F57D2`, Yellow `#FFD15F`입니다.
- 웹의 `Noto Sans KR Variable`·`Manrope Variable`은 Figma의 `Noto Sans KR`·`Manrope`에 대응합니다. Noto Sans KR 600은 Figma 가변 축 `wght: 600`을 사용합니다.
- 워드마크는 grad42 `web/src/shared/ui/ServiceTitleBar.tsx`의 `LogoLockup` 규격을 따릅니다. 위쪽 ‘서울과학기술대학교’는 Noto Sans KR 11px / 400, 아래쪽 ‘총졸업준비위원회’는 15px / 700, 행간 125%, 줄 사이 간격 0입니다. 두 줄의 테마 색상은 Light `#464652` / `#1B1B22`, Dark `#ABAAB8` / `#E2E1EB`입니다. 코드에서도 텍스트 컴포넌트로 렌더링합니다.

## 모바일·폴드 디자인 이력

V4에서 기존 Mobile/Fold 기본 프레임 ID를 유지하며 플로팅 하단 탐색과 확장형 시트를 추가했습니다. 모바일 셸 `70:1023`, 폴드 셸 `70:3909`에 네 탭과 Peek/Half/Full 단계를 구성했고, 각 탭의 콘텐츠를 크기별로 재사용했습니다. 문의 링크는 소개 탭, 실제 자료 5개는 기록 탭에 있습니다. [모바일 중간/Dark](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=72-1743), [폴드 기록 전체/Light](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=72-2153)도 기록되어 있습니다.

V5에서는 탐색에 Expanded/Compact 축을 더해 기기별 24개, 전체 48개 셸 상태를 만들었습니다. 디자인 기록에는 탐색 탭 변형 16개와 상태 전환 연결 408개가 포함됩니다. 확장 탐색은 Mobile 348 × 64px·Fold 440 × 64px, 축소 탐색은 Mobile 240 × 56px·Fold 280 × 56px입니다. 축소할 때 네 아이콘과 선택 상태는 남기고 라벨만 숨깁니다. [모바일 축소/Light](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=78-1892), [모바일 축소/Dark](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=78-2068), [폴드 축소/Light](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=78-2153), [폴드 축소/Dark](https://www.figma.com/design/mFaA5zalLdtjp8qUbEkqRx/StTalk-Introduce?node-id=78-2315) 프레임을 추가했습니다.

Figma의 Smart Animate와 `AFTER_TIMEOUT` 1200ms는 상태 전환 시연용입니다. 실제 React에서는 Pointer Events로 손가락 이동을 따라가고, 놓는 속도를 반영해 가장 가까운 단계를 선택하며, 스크롤·드래그 이후 1.2초 유휴 시 탐색을 복원합니다. 입력 규칙과 접근성 동작은 [MOBILE_INTERACTION.md](./MOBILE_INTERACTION.md)에 정리했습니다.

## 다시 캡처하기

개발 서버에서 Figma MCP가 제공하는 `#figmacapture=…` 링크로 열면 캡처 스크립트가 로드됩니다. 캡처 ID는 한 번만 사용합니다. 이 경로는 `import.meta.env.DEV`로 제한되어 배포 빌드에서는 실행되지 않습니다.
