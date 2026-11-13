# 3일차 — 내 사이트를 인터넷에 공개하기

2일차 다중 페이지 소개 사이트에 문의 페이지, 파비콘, `robots.txt` 를 더하고, Git 저장과 Vercel 배포를 실습할 수 있도록 정리한 정적 사이트입니다.

## 학습 목표

- Git 으로 코드를 저장하고, 커밋으로 변경 이력을 남기는 이유를 이해합니다.
- GitHub 저장소에 코드를 올려 원격에 원본을 보관합니다.
- Vercel 로 배포해 URL 로 접속한 뒤, 수정하고 다시 푸시하면 재배포되는 흐름을 경험합니다.
- 이 과정처럼 회차 폴더가 한 저장소에 모인 경우, Vercel **Root Directory 를 `day-03` 으로 지정** 해야 한다는 점을 확실히 익힙니다.

## 폴더 구조

```text
day-03/
├── index.html              # 홈
├── about.html              # 소개
├── projects.html           # 프로젝트
├── contact.html            # 문의 폼 (정적 예제)
├── style.css               # 공통 스타일
├── design.md               # GS Retail 디자인 토큰
├── favicon.svg             # 사이트 아이콘
├── robots.txt              # 검색 로봇 안내
├── .gitignore              # OS 임시 파일 및 환경 변수 제외
├── DEPLOY-CHECKLIST.md     # Git 커밋/푸시와 Vercel 배포 절차
├── images/
└── README.md
```

## 로컬에서 확인하는 방법

이 폴더는 Node.js 프로젝트 설치가 필요하지 않습니다.

```bash
npx --yes serve .
```

또는 `index.html` 을 브라우저로 직접 열어도 됩니다. 메뉴에서 홈 / 소개 / 프로젝트 / 문의가 모두 이어지는지, 모바일과 데스크톱 레이아웃이 깨지지 않는지 먼저 확인하세요.

문의 페이지의 전송 버튼은 서버로 메일을 보내지 않고, 입력값 확인 메시지만 보여 줍니다. 정적 사이트 단계에서는 이 동작이 정상입니다.

## 인터넷에 공개하는 방법

자세한 명령과 확인 항목은 `DEPLOY-CHECKLIST.md` 에 있습니다. 핵심만 요약하면 다음과 같습니다.

1. 저장소 루트(`vibe-coding-code`)에서 `git init` → `git add` → `git commit` 을 진행합니다.
2. GitHub 저장소를 만들고 `git push` 로 올립니다.
3. Vercel 에서 저장소를 Import 한 뒤, **Root Directory = `day-03`** 으로 설정하고 배포합니다.
4. 발급된 URL 로 네 페이지를 확인한 뒤, 파일을 수정하고 다시 푸시해 재배포를 확인합니다.

## 디자인

2일차와 같은 GS Retail 토큰, Pretendard, 18px 카드, 모바일 퍼스트 레이아웃을 유지합니다. 변경점은 공통 메뉴에 "문의"가 추가되고, 문의 폼과 배포 안내 배너가 생긴 것입니다.

## 관련 자료

- 배포 절차 전문: `DEPLOY-CHECKLIST.md`
- 이전 회차: `../day-02/`
- 다음 회차(Next.js 게시판 뼈대): `../day-04/`
