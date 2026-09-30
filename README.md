# ST:talk

서울과학기술대학교 제42대 총졸업준비위원회의 동문 초청 행사 안내 사이트입니다. 동문 선배님이 행사 취지, 진행 방식, 지난 행사 기록과 일정을 살펴볼 수 있습니다. 사이트에 참가 신청이나 참여 회신 기능은 없으며, 이메일은 행사 문의용으로만 표시합니다.

## 실행

Node.js 24 이상을 권장합니다.

```sh
npm ci
npm run dev
```

```sh
npm run check        # TypeScript 검사
npm test             # 시트 위치·스냅 계산 단위 테스트
npm run format:check # 코드 형식 검사
npm run build        # 타입 검사 및 dist/ 프로덕션 빌드
npm run preview      # 빌드 결과 로컬 확인
```

## 현재 화면

| 뷰포트 조건                      | 화면 구성                                         |
| -------------------------------- | ------------------------------------------------- |
| 560px 미만                       | 모바일 행사 개요와 하단 4탭 탐색, 3단계 정보 시트 |
| 560–767px                        | 같은 시트를 넓은 폴드 레이아웃과 간격으로 표시    |
| 너비 768px 이상, 높이 600px 미만 | 가로형 휴대폰용 넓은 모바일 시트                  |
| 너비 768px 이상, 높이 600px 이상 | 태블릿·데스크톱용 섹션형 랜딩 페이지              |

모바일·폴드의 탭은 **소개 / 진행 / 기록 / 일정**, 시트 단계는 **Peek / Half / Full**입니다. 손잡이와 제목 영역을 드래그하거나, Peek의 제목·요약을 눌러 단계를 바꿀 수 있고, 본문은 시트 안에서 독립적으로 스크롤합니다. 하단 탐색은 접힌 상태와 중간 높이인 **Peek·Half에서 Expanded**, 완전히 올린 **Full에서만 Compact** 상태를 유지합니다. 스크롤·드래그·키보드 포커스 자체는 탐색 크기를 바꾸지 않으며, 유휴 타이머도 사용하지 않습니다. 현재 탭과 단계는 URL 해시에 반영되어 브라우저 뒤로 가기에도 연결됩니다.

[Figma의 V5 프로토타입](./FIGMA.md)은 움직일 때 축소하고 1200ms 뒤 복원하는 이전 전환을 보존합니다. 이번 변경은 React 화면에만 적용되었으며, 현재 동작은 [모바일 인터랙션 문서](./MOBILE_INTERACTION.md)의 단계별 정책을 따릅니다.

태블릿·데스크톱에서는 행사 개요, 진행 방식, 지난 ST:talk 갤러리, 선배님의 역할, 일정·장소, 문의 순으로 보여줍니다. 갤러리는 2025년 상반기 현장 사진 3장과 2026년 1학기 홍보물 2장을 로컬 자산으로 사용합니다. 페이지 안에서는 800px·1600px WebP를 화면 크기에 맞춰 받고, 이미지를 누른 확대 보기에서만 원본을 불러옵니다. 헤더의 위원회 워드마크는 grad42 원본의 두 줄 텍스트 규격을 반영합니다.

행사 정보는 **2026년 11월 20일 (금) 19:00–21:00**, 서울과학기술대학교 **중앙도서관 1층 ST 아트홀**입니다. 동문 선배님 8–10명, 테이블당 10인 이하, 2차시로 안내합니다. 세부 시간표는 행사 안내 19:00–19:10, 1차시 19:10–20:00, 휴식 20:00–20:10, 2차시 20:10–21:00의 **가안**입니다. 문의 이메일은 **seoultechgrad42@gmail.com**입니다.

## 코드와 콘텐츠

- `src/App.tsx`: 너비 768px·높이 600px 기준으로 두 화면 전환, 모바일 화면 지연 로드
- `src/components/MobileExperience.tsx`, `src/lib/sheetGeometry.ts`: 모바일·폴드 시트, 탭, 스냅 위치와 제스처
- `src/components/DesktopLanding.tsx`: 태블릿·데스크톱 섹션
- `src/components/SheetContent.tsx`: 모바일·폴드의 네 탭 본문
- `src/data/event.ts`: 행사 일시·장소·문의 주소·진행 단계·시간표
- `src/data/gallery.ts`, `public/images/`: 지난 행사 자료 5개와 목록용 WebP·확대용 원본 경로
- `src/components/GalleryViewer.tsx`: 공통 확대 보기
- `src/components/CommitteeWordmark.tsx`: grad42 규격의 공통 텍스트 워드마크
- `CONTENT.md`, `FIGMA.md`, `MOBILE_INTERACTION.md`: 문구 근거, 디자인 출처와 인터랙션 기록

React, TypeScript, Vite, Tailwind CSS, Motion, Lucide를 사용합니다. Noto Sans KR과 Manrope 가변 폰트는 Fontsource로 로컬 번들에 포함하므로 런타임 폰트 CDN 요청이 없습니다.

## 접근성과 테마

탭은 방향키·Home·End로 이동하고, 손잡이는 방향키·Home·End로 시트 단계를 바꿉니다. Escape는 열린 시트를 한 단계 줄이고, 갤러리 확대 보기에서는 닫기로 동작합니다. 갤러리에서는 좌우 방향키와 가로 스와이프로 자료를 넘길 수 있습니다. 포커스 표시, 본문 바로가기, 스크린리더 상태 알림, `prefers-reduced-motion` 대응을 포함합니다. 손잡이의 Pointer Events와 시트 본문 스크롤은 분리되어 있습니다. 기기 모델이나 힌지 API 대신 CSS 뷰포트 너비와 실제 화면 크기를 사용합니다.

전달받은 위원회 로고의 중심 색상은 파랑 `#3F57D2`, 노랑 `#FFD15F`입니다. `src/styles/tokens.css`는 원색을 `--brand-blue`, `--brand-yellow`로 보관하고, 화면에서는 `--background`, `--foreground`, `--primary`, `--card`, `--border`처럼 역할별 토큰을 씁니다. `@theme inline`을 통해 Tailwind 색상 유틸리티와 연결합니다.

기본 테마는 시스템 설정입니다. 라이트·다크를 직접 선택하면 `sttalk-theme` 키에 저장하고, 시스템을 선택하면 저장값을 지워 OS 설정을 따릅니다. `public/theme-init.js`가 첫 화면 표시 전에 저장된 테마를 적용합니다. 폰트와 색상 근거는 [FIGMA.md](./FIGMA.md)에 기록했습니다.

## GitHub Pages

사이트 주소: [https://beeean17.github.io/sttalk/](https://beeean17.github.io/sttalk/)

빌드 결과는 `dist/`입니다. Vite의 `base: './'`와 로컬 자산 경로를 사용하므로 `/sttalk/` 같은 저장소 하위 경로에서도 이미지와 코드가 로드됩니다. 모바일 탭·시트 위치는 URL 해시를 사용합니다.

`.github/workflows/pages.yml`은 `main` 푸시 또는 수동 실행 시 의존성 설치, 형식 검사, 단위 테스트, 빌드, GitHub Pages 배포를 수행합니다. 저장소 **Settings → Pages → Source**는 **GitHub Actions**로 설정되어 있습니다. 이후 `main`에 올린 변경은 검사를 통과하면 자동 배포됩니다.

구성 참고: [Tailwind의 Vite 설치 가이드](https://tailwindcss.com/docs/installation/using-vite), [Vite의 GitHub Pages 배포 안내](https://vite.dev/guide/static-deploy.html#github-pages).

## 변경 전 구현 검증 이력 — 2026-09-30

아래 결과는 **움직임에 따라 탐색이 축소되고 1.2초 후 복원되던 이전 동작**의 검증 이력입니다. 현재의 단계별 Expanded/Compact 정책에 대한 새 QA 완료를 뜻하지 않습니다.

당시 타입 검사·코드 형식 검사·시트 계산 단위 테스트 4개·프로덕션 빌드를 통과했습니다. Chromium 브라우저에서 320, 390, 560, 690, 768, 820, 1440px 화면의 가로 넘침, 서랍 드래그와 취소, 이전 방식의 스크롤 후 탐색바 복원, 키보드 이동, 사진 스와이프·확대, 테마 저장과 실시간 시스템 설정 변경, 뒤로 가기를 확인했습니다. 터치 이벤트 에뮬레이션과 `/sttalk/` 하위 경로의 빌드 파일 로딩도 확인했으며 브라우저 실행 오류는 없었습니다.

당시 iOS Safari·Android·실제 폴드 하드웨어 검수와 원격 배포는 수행하지 않았습니다.

## 초기 단계별 내비게이션 검증 이력 — 2026-09-30

아래는 Half까지 축소하던 이전 정책의 검증 기록입니다. 현재는 Peek·Half에서 확장하고 Full에서만 축소합니다.

변경 후 타입·형식 검사, 단위 테스트 4개와 빌드를 통과했습니다. Chromium의 390px 모바일·690px 폴드 터치 에뮬레이션에서 Peek는 확장, Half/Full은 축소 상태를 유지하며 스크롤·대기·키보드 포커스로 폭이 바뀌지 않는 것을 확인했습니다. 드래그 올리기·내리기·취소, 탭 전환, 키보드 조작, 해시 직접 진입과 뒤로 가기도 통과했습니다. 브라우저 실행 오류는 없었으며 검증용 임시 서버는 종료했습니다.
