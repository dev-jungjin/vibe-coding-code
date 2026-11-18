# 01일차: 내 컴퓨터에 개발 환경 만들고 첫 웹페이지 띄우기

Claude AI 기반 바이브코딩 풀스택 웹개발 1일차 실습 프로젝트입니다.
GS Retail 디자인 토큰 시스템(`design.md`)을 반영한 **모바일 퍼스트 반응형(Responsive Web) 프로필 카드 페이지**입니다.

---

## 1. 프로젝트 파일 구성

```text
day-01/
├── index.html         # 모바일 퍼스트 반응형 시맨틱 HTML5 구조
├── style.css          # Pretendard 웹폰트, GS Retail 디자인 토큰, 모바일 퍼스트 CSS
├── design.md          # GS Retail 디자인 시스템 및 반응형 레이아웃 명세서
├── README.md          # 실습 설명 및 반응형 검증 방법
└── images/
    ├── profile.jpg                 # 프로필 사진
    ├── cat.jpg                     # 반려묘 사진
    ├── dog.jpg                     # 반려견 사진
    ├── book-ai-agent.jpg           # 도서 표지 (AI 에이전트 엔지니어링)
    └── book-thinking-outsourced.png # 도서 표지 (사고외주)
```

---

## 2. 반응형 레이아웃 특징

1. **모바일 뷰 (기본 스타일, 768px 미만)**
   - 스마트폰 화면에 최적화된 단일 열(Single Column) 카드 스택 레이아웃
   - 상단 프로필 카드 $\rightarrow$ 문의 버튼 $\rightarrow$ 기본 정보 & 일상(음식·취미·독서) $\rightarrow$ 최근 읽은 책(2열 서재) $\rightarrow$ 반려동물 카드(2열 갤러리)
2. **태블릿 / 데스크톱 뷰 (`@media (min-width: 768px)`)**
   - 컨테이너 너비가 최대 960px로 확장되며 좌우 2열 그리드(Two Columns)로 자동 전환
   - **좌측 컬럼 (320px 고정)**: 프로필 메인 카드 + 액션 버튼 (스크롤 시 `sticky` 고정)
   - **우측 컬럼 (유연 확장)**: 기본 정보 및 일상 카드 + 최근 읽은 책 카드 + 반려동물 갤러리 카드
3. **초소형 모바일 대응 (`@media (max-width: 360px)`)**
   - 360px 이하 화면에서는 반려동물 카드와 도서 카드가 1열로 자동 전환되고 정보 행이 줄바꿈되어 깨짐 방지

---

## 3. 실행 및 반응형 검증 방법

1. 브라우저에서 `index.html` 파일을 엽니다:
   ```powershell
   cd day-01
   start index.html
   ```
2. **반응형 동작 확인**:
   - 브라우저 창의 가로폭을 줄이거나 늘려보며 768px을 기준으로 **1열(모바일) $\leftrightarrow$ 2열(데스크톱)** 전환을 확인합니다.
   - Chrome 개발자 도구(`F12` / Mac: `Cmd + Option + I`)를 켠 후 `Ctrl + Shift + M` (Mac: `Cmd + Shift + M`, 반응형 디바이스 툴바)을 눌러 iPhone, iPad, Desktop 환경을 번갈아 테스트합니다.
