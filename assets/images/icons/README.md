# ST:talk 웹 아이콘

웹페이지의 브랜드 파랑 `#3F57D2`과 노랑 `#FFD15F`을 바탕으로, 대화를 뜻하는 말풍선과 ST:talk의 콜론(:)을 결합했습니다.

## 파일

- `sttalk-web-icon.png`: 내장 image_gen 도구로 제작한 1254 × 1254 원본. 둥근 파란 타일 바깥은 투명합니다.
- `sttalk-web-icon-512.png`: 512 × 512 PNG.
- `favicon-32.png`: 브라우저 탭용 32 × 32 PNG.
- `favicon.ico`: 16, 32, 48px를 포함하는 ICO.
- `apple-touch-icon.png`: 홈 화면용 180 × 180 PNG. 시스템의 모서리 마스크를 위해 배경을 파랑으로 채운 불투명 정사각형입니다.

`index.html`에 파비콘과 Apple 홈 화면 아이콘을 연결했습니다. 기존 `assets/images/favicon.svg`는 보존했습니다.

PNG 크기 조정과 ICO 변환은 Pillow로 수행했습니다. 원본은 요청한 1024px보다 큰 1254px로 생성되었으며, 최종 출력 색상에는 생성 도구의 미세한 질감과 변동이 있습니다.

## 생성 프롬프트

사용 도구: 내장 `image_gen.imagegen`, `transparent_background: true`.

```text
Use case: logo-brand
Asset type: square website favicon and home-screen icon for ST:talk, a Korean university alumni and student table-talk event.
Primary request: Create one polished minimal brand icon matching the site's cobalt blue #3F57D2 and warm yellow #FFD15F, expressing conversation and the colon in ST:talk.
Subject: A bold warm-yellow rounded speech bubble with one short clean tail at its lower left, containing exactly two large cobalt-blue circular dots stacked vertically as a centered colon. Place this bubble centered inside a solid cobalt-blue rounded square tile.
Style/medium: Crisp flat graphic, vector-like edges, simple geometric silhouette, friendly and professional editorial identity.
Composition/framing: A single front-facing icon on a square 1024 by 1024 canvas. The blue rounded tile fills nearly the whole canvas with an even small 4% margin; corners are smoothly rounded. The bubble fills about 65% of the tile width and height. The two dots are generous and clearly separated. Comfortable symmetrical padding. Ensure recognition at 16, 32 and 48 pixel sizes.
Color palette: Only solid #3F57D2 cobalt blue and #FFD15F warm yellow.
Scene/backdrop: True transparent alpha outside the blue rounded-square tile; the tile itself is opaque.
Constraints: Exactly one icon, no lettering or words, no additional dots, no people, no graduation cap, no border, no shadow, no gradients, no gloss, no 3D, no texture, no mockup, no presentation sheet, no watermark.
```
