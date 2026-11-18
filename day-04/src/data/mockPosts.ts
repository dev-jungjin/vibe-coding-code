export type MockPost = {
  id: string;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  createdAt: string;
};

export const mockPosts: MockPost[] = [
  {
    id: "welcome",
    title: "바이브코딩 자유게시판에 오신 것을 환영합니다",
    author: "양준렬",
    category: "안내",
    excerpt:
      "4일차부터는 Next.js 로 게시판의 뼈대를 만듭니다. 오늘은 아직 데이터베이스 없이, 미리 적어 둔 가짜 데이터로 목록과 상세 화면을 먼저 완성합니다.",
    content: [
      "4일차부터 이 과정은 정적 HTML 사이트에서 한 걸음 더 나아가, Next.js App Router 로 게시판 프로젝트를 시작합니다.",
      "오늘은 API 나 데이터베이스를 붙이지 않습니다. src/data/mockPosts.ts 에 미리 적어 둔 글 데이터를 목록 화면과 상세 화면에 그대로 보여 줍니다. 화면의 모양과 이동 흐름을 먼저 완성해 두면, 5일차에 데이터 용어와 REST API 를 배울 때 어디에 연결해야 하는지 눈에 들어옵니다.",
      "오른쪽 위나 목록의 카드 제목을 눌러 상세 페이지로 이동해 보세요. 주소창의 /posts/welcome 같은 경로가 곧 동적 라우트입니다.",
      "다음 회차에서는 같은 화면 위에 글 작성, 수정, 삭제 API 를 쌓고, 그다음 회차부터는 Prisma 와 Supabase 로 실제 저장소에 연결합니다. 오늘 만든 뼈대가 그 출발점입니다.",
    ].join("\n\n"),
    createdAt: "2026-11-04T09:00:00+09:00",
  },
  {
    id: "prompt-three",
    title: "AI 에게 코딩을 시킬 때 필요한 세 가지: 목표, 제약, 예시",
    author: "양준렬",
    category: "바이브코딩",
    excerpt:
      "예쁜 게시판 만들어줘 한 줄만 주면 AI 는 범위를 스스로 넓힙니다. 목표, 제약, 예시를 적으면 결과물의 오차가 줄어듭니다.",
    content: [
      "2일차에 연습한 프롬프트 3요소는 Next.js 프로젝트에서도 그대로 유효합니다.",
      "목표는 무엇을 만들지입니다. 예를 들어 게시글 목록과 상세 페이지를 가진 자유게시판, 처럼 범위를 분명히 적습니다.",
      "제약은 무엇을 지키고 무엇을 하지 말지입니다. Next.js 15 App Router, TypeScript, Tailwind CSS, GS Retail 색상, 모바일 퍼스트, 한글 경로 금지처럼 경계를 정해 두면 불필요한 라이브러리가 끼어들기 어렵습니다.",
      "예시는 모양새입니다. 목록은 카드 그리드, 카드에는 제목·작성자·날짜·요약, 상세에는 본문이 단락으로 나뉜다, 처럼 구체적인 형태를 보여 줍니다.",
      "CLAUDE.md 는 이 세 가지를 프로젝트 규칙으로 옮겨 적은 파일입니다. 세션이 바뀌어도 AI 가 같은 제약을 읽고 작업을 이어 갈 수 있습니다.",
    ].join("\n\n"),
    createdAt: "2026-11-05T10:30:00+09:00",
  },
  {
    id: "mobile-first",
    title: "처음부터 모바일 퍼스트로 잡아야 하는 이유",
    author: "김도윤",
    category: "프론트엔드",
    excerpt:
      "고정 폭으로 만든 뒤 나중에 반응형을 덧붙이면 CSS 가 쉽게 꼬입니다. 첫 화면부터 한 열로 쌓고, 768px 이상에서만 여러 열로 넓히세요.",
    content: [
      "1일차부터 강조한 모바일 퍼스트 원칙은 Tailwind CSS 를 쓸 때도 같습니다.",
      "기본 클래스는 스마트폰 기준입니다. 예를 들어 grid-cols-1 이 기본이고, 넓어지면 md:grid-cols-2 를 더합니다. 데스크톱 레이아웃을 먼저 짠 뒤 미디어 쿼리로 줄이는 방식과 반대입니다.",
      "고정 픽셀 너비(w-[500px] 같은 값)로 카드나 컨테이너를 잠그지 마세요. w-full, max-w-5xl, grid, flex 처럼 유연한 단위를 사용합니다.",
      "확인은 개발자 도구의 장치 툴바로 합니다. 너비를 줄이고 늘이며 카드가 한 열에서 두 열로 바뀌는지, 헤더 메뉴가 줄바꿈되어도 눌릴 수 있는지 직접 봅니다.",
    ].join("\n\n"),
    createdAt: "2026-11-06T14:15:00+09:00",
  },
  {
    id: "why-nextjs",
    title: "왜 지금 Next.js App Router 로 옮기나요",
    author: "박서연",
    category: "Next.js",
    excerpt:
      "HTML 파일만으로도 소개 사이트는 충분합니다. 게시판처럼 글이 늘고 줄어드는 서비스는 라우팅과 서버 코드를 한 프로젝트에서 다루는 편이 수월합니다.",
    content: [
      "1~3일차의 정적 사이트는 페이지 수가 적고 내용이 거의 바뀌지 않을 때 가장 단순합니다. 파일을 더하고 링크로 연결하면 됩니다.",
      "게시판은 다릅니다. 글 목록, 글 상세, 곧이어 글 작성까지 경로가 늘어나고, 나중에는 서버에서 데이터를 읽고 쓰는 API 가 필요합니다. Next.js App Router 는 이 화면과 서버 코드를 한 폴더 구조로 묶습니다.",
      "src/app/page.tsx 가 목록, src/app/posts/[id]/page.tsx 가 상세입니다. 대괄호 폴더 이름이 동적 구간입니다. 주소의 /posts/welcome 에서 welcome 이 id 로 전달됩니다.",
      "오늘은 그 id 로 가짜 데이터 배열에서 글을 찾아 보여 줍니다. 내일은 같은 경로 위에 API 를 얹고, 이후 회차에서 데이터베이스로 바꿉니다. 폴더 이름은 거의 그대로입니다.",
    ].join("\n\n"),
    createdAt: "2026-11-07T11:00:00+09:00",
  },
  {
    id: "git-deploy",
    title: "3일차에 배운 배포를 Next.js 에도 그대로 적용하려면",
    author: "이하늘",
    category: "배포",
    excerpt:
      "회차 폴더가 한 저장소에 모여 있으므로, Vercel 의 Root Directory 만 해당 일차 폴더로 바꾸면 됩니다. day-03 과 같은 방식입니다.",
    content: [
      "3일차에 정적 사이트를 GitHub 에 올리고 Vercel 로 공개했습니다. Next.js 프로젝트도 배포의 큰 흐름은 같습니다. 커밋하고 푸시하면 Vercel 이 빌드한 뒤 URL 을 발급합니다.",
      "다른 점은 두 가지입니다. 첫째, 이 폴더에는 package.json 이 있으므로 Vercel 이 npm install 과 next build 를 실행합니다. 둘째, 저장소가 모노레포이므로 Root Directory 를 day-04 로 지정해야 합니다.",
      "환경 변수는 아직 없습니다. 6일차부터 Supabase 키를 쓸 때는 소스 코드가 아니라 Vercel 의 Environment Variables 와 로컬 .env.local 에 둡니다.",
      "오늘은 로컬에서 npm install 과 npm run dev 로 화면이 뜨는 데 집중하세요. 배포는 뼈대가 안정된 뒤에 반복하면 됩니다.",
    ].join("\n\n"),
    createdAt: "2026-11-08T16:45:00+09:00",
  },
  {
    id: "design-tokens",
    title: "GS Retail 토큰을 Tailwind 테마로 옮긴 방법",
    author: "양준렬",
    category: "디자인",
    excerpt:
      "배경 #F4F5FB, 카드 #FFFFFF, 강조 #00D4EA, 주 색 #1E2530, 모서리 18px 을 CSS 변수로 등록하면, 유틸리티 클래스만으로 1~3일차와 같은 인상을 유지할 수 있습니다.",
    content: [
      "1~3일차에는 style.css 의 :root 에 디자인 토큰을 적었습니다. 4일차에는 src/app/globals.css 의 @theme 블록에 같은 값을 등록합니다.",
      "예를 들어 --color-primary-dark: #1E2530 을 등록하면 bg-primary-dark, text-primary-dark 클래스를 쓸 수 있습니다. --radius-card: 18px 는 rounded-card 가 됩니다.",
      "시그니처 청록 #00D4EA 는 버튼 배경이 아니라 뱃지, 강조 막대, 로고 포인트처럼 브랜드 표면에 둡니다. 주요 버튼은 #1E2530 배경에 흰 글자를 유지합니다.",
      "서체는 계속 Pretendard 입니다. 회차가 바뀌어도 색과 곡선이 흔들리지 않아야, 수강생이 기능 변화에만 눈을 둘 수 있습니다.",
    ].join("\n\n"),
    createdAt: "2026-11-09T13:20:00+09:00",
  },
];

export function getAllPosts(): MockPost[] {
  return [...mockPosts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPostById(id: string): MockPost | undefined {
  return mockPosts.find((post) => post.id === id);
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
