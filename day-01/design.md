---
name: 우리동네GS
slug: gs-retail
category: commerce
last_updated: "2026-09-02"
created_at: "2026-08-30"
lang: ko
logo: https://getdesign.kr/logos/gs-retail.png
colors:
  ## Core — 정확값 (1차 소스 + 독립 2차 출처 교차확인)
  primary-dark: oklch(0.263 0.023 259)   # #1E2530 — primary 버튼 배경이자 섹션 헤더 텍스트색. Dart 코드와 웹뷰 CSS 두 출처에서 확인
  signature-cyan: oklch(0.796 0.137 208)   # #00D4EA — GS25 시그니처 청록. 앱 아이콘 배경 실측과 같은 값
  white: oklch(1 0 0)   # #FFFFFF — 앱 기본 배경(흰 바탕 카드 레이아웃)이자 primary 버튼 전경색
  ## Neutral ramp — 앱 내부 웹뷰 .GS25 스코프 (용도 미공개, 이름은 명도순으로 부여)
  neutral-50: oklch(0.971 0.008 279)   # #F4F5FB — .GS25 스코프에서 4회로 최다 등장
  neutral-200: oklch(0.885 0.011 270)   # #D6D9E1
  neutral-300: oklch(0.820 0.013 267)   # #C0C4CD — 3회 등장
  neutral-400: oklch(0.788 0.023 254)   # #B0BBC9
  neutral-450: oklch(0.764 0.017 286)   # #B1B1BD
  neutral-600: oklch(0.441 0.024 285)   # #515160
  navy-deep: oklch(0.234 0.082 257)   # #001C43
  webview-blue: oklch(0.538 0.142 247)   # #0072BB — 기업 CI 의 GS Blue 와 sRGB 채널 1단위 차. 동일값으로 단정하지 말 것
  ## Service brands — 앱 내부 서비스의 공식 발행값 (네이티브 UI 토큰 아님)
  gs-all: oklch(0.377 0.104 259)   # #1C4078 — GS ALL 멤버십 · PANTONE 2154C. 웹뷰 CSS 에서도 실제 관찰됨
  gs-pay: oklch(0.607 0.215 257)   # #007CFF — GS Pay · PANTONE 285C. WINE25+ 팔레트의 파랑과 같은 발행값
  pop-yellow: oklch(0.945 0.202 106)   # #FFF400 — POP. 삼성증권 서비스표 통상사용권 계약 대상이라 참고값으로만 둘 것
  pop-black: oklch(0.244 0.006 1)   # #231F20 — POP. 위와 같은 계약 제약을 받는다
  wine25-red: oklch(0.610 0.206 29)   # #E43D30 — WINE25+ · PANTONE 179C
  wine25-green: oklch(0.629 0.159 143)   # #45A041 — WINE25+ · PANTONE 7738C
  wine25-yellow: oklch(0.871 0.178 93)   # #FDD000 — WINE25+ · PANTONE 7548C
  wine25-pink: oklch(0.838 0.089 27)   # #FFB4AB — WINE25+ · PANTONE 169C
  ## Corporate CI — 상표 규정 (인쇄/기업 아이덴티티 체계, UI 토큰 아님)
  gs-blue: oklch(0.538 0.143 248)   # #0072BC — PANTONE 300C
  gs-green: oklch(0.675 0.151 159)   # #18B273 — PANTONE 7482C
  gs-orange: oklch(0.708 0.177 50)   # #F57921 — PANTONE 166C
  gs-gray: oklch(0.606 0.005 258)   # #808285 — PANTONE Cool Gray 10C
typography:
  section-header:   # 홈 '많이 찾는 서비스' 섹션 헤더. 네이티브 Dart 코드에서 확인된 유일한 정확 타이포
    fontSize: 18px
    fontWeight: 700
spacing:
  screen-horizontal: 16px   # 홈 화면 좌우 공통 여백. EdgeInsets.symmetric(horizontal: 16)
  icon-hit-area: 40px   # 헤더 아이콘 버튼의 40×40 정사각 hit-area 컨테이너
fonts:
  font-sans: "\"Pretendard Variable\", Pretendard, -apple-system, \"Apple SD Gothic Neo\", system-ui, sans-serif"   # 네이티브 확정값 아님 — 웹뷰 @font-face 와 GS ALL BI 규정에서 취한 작업 기준선
---

# 우리동네GS — design.md

> 이 항목은 **Flutter 네이티브 앱**이 대상이라 라이브 CSS 를 읽어 토큰을 걷는 기법이 통하지 않는다. 그래서 값의 근거 강도가 고르지 않고, 이 문서는 그 편차를 지우는 대신 **네 등급으로 갈라 표기**한다 — (A) 정확값, (B) 근사 관찰, (C) 앱 내부 서비스 브랜드의 발행값, (D) 상표 규정. 등급을 무시하고 한 팔레트로 뭉뚱그리는 순간 이 문서는 근거보다 많은 것을 주장하게 된다.

## Brand & Style

우리동네GS는 GS25·GS더프레시·와인25플러스를 한 앱에 모은 GS리테일의 O4O 앱이고, 흰 바탕 카드 위에 청록 브랜드면과 근접 검정 CTA 를 짝지어 쓰는 것이 시각 시그니처다 [src:1][src:3][src:18]. 2022년 10월 11일 출시하면서 흩어져 있던 GS25 '나만의 냉장고', GS더프레시 공식 앱, 멤버십 앱 '더팝', 배달 앱 '우딜 주문하기' 넷을 하나로 합쳤다 [src:3]. App Store 부제가 그 범위를 그대로 적는다 — "나와 가까운 GS25, GS더프레시의 상품, 배달, 결제, 택배 등 종합 서비스" [src:1].

정서적 톤은 '친근한 생활밀착'이다. 반대편에는 커머스 앱다운 건조함이 있다 — 스토어 캡처에서 커머스 CTA 는 다크 네이비/블랙 계열로 관찰되고, 청록은 CTA 가 아니라 브랜드 표면(아이콘 배경·마스코트·원형 아이콘)에 머문다 [src:1][src:18].

## Colors

| 등급 | 근거 | 해당 토큰 | 차용 시 취급 |
| --- | --- | --- | --- |
| (A) 정확값 | 네이티브 Dart 코드 + 앱 내부 웹뷰 CSS 교차확인 [src:7][src:18] | `{colors.primary-dark}` · `{colors.signature-cyan}` · `{colors.white}` | 그대로 써도 되는 유일한 층 |
| (B) 근사 관찰 | 스토어 마케팅 캡처의 픽셀 인상 [src:1] | 없음 — 토큰으로 승격하지 않았다 | 산문 서술로만 참고 |
| (C) 서비스 브랜드 발행값 | GS리테일 서비스 브랜드 아카이브 [src:19] | `{colors.gs-all}` · `{colors.gs-pay}` · `{colors.pop-yellow}` · `{colors.pop-black}` · `wine25-*` 4종 | 앱 내부 기능의 색이지 앱 자체의 색이 아니다 |
| (D) 상표 규정 | GS리테일 기업 브랜드 아카이브 [src:20] | `{colors.gs-blue}` · `{colors.gs-green}` · `{colors.gs-orange}` · `{colors.gs-gray}` | UI 토큰이 아니다. 인쇄/기업 아이덴티티 체계 |

- **primary-dark**: `#1E2530` (기본 어두운 색, 1차 액션 버튼 배경 및 섹션 헤더 텍스트)
- **signature-cyan**: `#00D4EA` (시그니처 청록, 브랜드 강조 표면 및 뱃지)
- **white**: `#FFFFFF` (기본 배경, 카드 배경, primary 버튼 텍스트)
- **neutral-50**: `#F4F5FB` (페이지 배경색)
- **neutral-200**: `#D6D9E1` (경계선 및 카드 테두리)
- **neutral-600**: `#515160` (보조 텍스트 색상)

## Typography & Spacing

- **font-sans**: "Pretendard Variable", Pretendard, -apple-system, "Apple SD Gothic Neo", system-ui, sans-serif
- **section-header**: fontSize: 18px, fontWeight: 700, color: `#1E2530`
- **screen-horizontal**: 16px ~ 20px
- **card-radius**: 16px ~ 20px
- **pill-radius**: 9999px (완전 라운드)

## Do's and Don'ts

- **Do**: 1차 액션은 `{colors.primary-dark}`(#1E2530) 채움 + `{colors.white}`(#FFFFFF) 전경으로 두고, `{colors.signature-cyan}`(#00D4EA)은 브랜드 표면/뱃지/하이라이트에 배치한다.
- **Do**: 페이지 기본 배경은 `{colors.neutral-50}`(#F4F5FB)로 하고, 콘텐츠는 모서리가 둥근 흰색 카드(`background: #FFFFFF; border: 1px solid #D6D9E1; border-radius: 16px~20px;`)에 담는다.
- **Do**: 버튼, 태그, 필터는 모서리가 둥근 pill 형태를 사용한다.

---

## Responsive Layout System (반응형 레이아웃 원칙)

모든 페이지는 **처음부터 모바일 퍼스트(Mobile-First) 반응형 웹**을 기본으로 설계합니다.

- **기본 브레이크포인트**:
  - **모바일 (기본 스타일, 768px 미만)**: 단일 열(Single Column) 카드 스택 레이아웃. 가로 여백 `16px`, 카드 너비 `100%`.
  - **태블릿 / 데스크톱 (`@media (min-width: 768px)`)**: 2열 그리드(좌측 프로필/액션 + 우측 상세정보/갤러리). 최대 컨테이너 너비 `920px`, 좌우 여백 `24px~32px`.
- **레이아웃 단위 원칙**:
  - 고정 폭(`width: 500px` 등) 사용을 금지하고 유연한 단위(`%`, `max-width`, `flex`, `grid`, `minmax()`)를 사용합니다.
  - 컨테이너는 `width: 100%; max-width: 920px; margin: 0 auto;` 형태로 중앙 정렬합니다.
- **Do**: 프롬프트 작성 시 첫 단계부터 AI에게 "모바일 퍼스트 반응형 레이아웃" 제약을 명시합니다.
- **Don't**: 특정 기기 폭에만 맞춘 고정 픽셀 레이아웃을 작성한 뒤 나중에 미디어 쿼리를 덧붙이지 않습니다.
