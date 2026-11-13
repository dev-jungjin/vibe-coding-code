# 3일차 배포 체크리스트 — Git, GitHub, Vercel

이 문서는 `day-03` 정적 사이트를 Git 으로 저장하고, GitHub 에 올린 뒤, Vercel 로 인터넷에 공개하는 순서를 정리한 실습 체크리스트입니다. 한 단계를 끝낼 때마다 앞에 있는 확인란을 체크하세요.

이 과정 실습 코드는 **하나의 GitHub 저장소 안에 `day-01` ~ `day-24` 폴더가 함께 들어 있는 구조** 입니다. 그래서 Vercel 에 연결할 때 반드시 **Root Directory 를 `day-03` 으로** 지정해야 이 폴더의 `index.html` 이 사이트 홈이 됩니다.

---

## 1. Git 으로 로컬에 저장하기

프로젝트 저장소의 **루트 폴더** (`vibe-coding-code`) 에서 진행합니다. `day-03` 안에서만 `git init` 을 하면 이후 회차 폴더를 같은 저장소에 쌓기 어려워집니다.

- [ ] 터미널에서 저장소 루트로 이동합니다.

```bash
cd C:\Users\HOME_PC\Desktop\vibe-coding-code
```

- [ ] 아직 Git 저장소가 아니라면 초기화합니다. 이미 `.git` 폴더가 있다면 이 단계는 건너뜁니다.

```bash
git init
```

- [ ] 변경된 파일을 확인합니다.

```bash
git status
```

- [ ] 파일을 스테이징하고 커밋합니다. Claude Code 에게 "지금 변경을 커밋해 줘"라고 요청해도 됩니다.

```bash
git add .
git commit -m "Add day-03 static site ready for Vercel deployment"
```

커밋 메시지는 영어나 한글 모두 가능합니다. 무엇을 왜 바꿨는지 한 줄로 남기면 충분합니다.

💡 `node_modules`, `.next`, `.env.local` 같은 폴더는 루트 `.gitignore` 에 이미 제외되어 있어야 합니다. 실수로 커밋되지 않았는지 `git status` 로 한 번 더 확인하세요.

---

## 2. GitHub 저장소를 만들고 푸시하기

- [ ] GitHub 에서 새 저장소를 만듭니다. 저장소 이름은 영문 소문자 케밥케이스를 권장합니다. 예: `vibe-coding-code`.
- [ ] README 나 `.gitignore` 를 GitHub 화면에서 미리 만들지 않습니다. 로컬에 이미 파일이 있으므로 빈 저장소로 두는 편이 충돌이 적습니다.
- [ ] 로컬 저장소에 원격 주소를 연결하고 푸시합니다. `YOUR_USERNAME` 과 저장소 이름은 본인 것으로 바꿉니다.

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vibe-coding-code.git
git push -u origin main
```

이미 `origin` 이 있다면 `git remote add` 대신 `git remote -v` 로 주소를 확인한 뒤 `git push` 만 하면 됩니다.

- [ ] 브라우저에서 GitHub 저장소를 열어 `day-03/index.html` 이 보이는지 확인합니다.

---

## 3. Vercel 에 첫 배포하기 (Root Directory = day-03)

- [ ] [https://vercel.com](https://vercel.com) 에 로그인하고 **Add New Project** 를 선택합니다.
- [ ] GitHub 저장소 `vibe-coding-code` 를 Import 합니다.
- [ ] **Project Settings 의 Root Directory 를 `day-03` 으로 지정** 합니다.
  - 위치: Project Settings → General → Root Directory
  - 값을 `day-03` 으로 입력하고 저장합니다.
- [ ] Framework Preset 은 정적 사이트이므로 **Other** 또는 기본값으로 두어도 됩니다. 빌드 명령은 비워 둡니다.
- [ ] Deploy 를 눌러 첫 배포를 실행합니다.
- [ ] 배포가 끝나면 Vercel 이 발급한 URL (예: `https://something.vercel.app`) 을 브라우저에서 엽니다.
- [ ] 홈, 소개, 프로젝트, 문의 네 페이지가 메뉴로 이동하는지 확인합니다.
- [ ] 스마트폰과 PC 너비에서 레이아웃이 깨지지 않는지 확인합니다.

Root Directory 를 비워 두면 저장소 루트가 배포되어 `day-03/index.html` 이 홈이 되지 않습니다. 반드시 `day-03` 을 지정하세요.

---

## 4. 수정한 뒤 재배포하기

코드를 고친 뒤에는 다시 Vercel 대시보드에서 수동 업로드할 필요가 없습니다. GitHub 의 `main` 브랜치에 푸시하면 Vercel 이 자동으로 재배포합니다.

- [ ] `day-03` 에서 문구, 색상, 문의 페이지 등 작은 수정을 합니다.
- [ ] 저장소 루트에서 다시 커밋하고 푸시합니다.

```bash
git add day-03
git commit -m "Update day-03 contact copy for redeploy practice"
git push
```

- [ ] Vercel 대시보드의 Deployments 목록에 새 배포가 생기는지 확인합니다.
- [ ] 배포 상태가 Ready 가 되면 같은 URL 을 새로고침해 변경이 반영되었는지 확인합니다.

문제가 생기면 Vercel 배포 로그와 로컬 브라우저 화면을 Claude Code 에 붙여 넣고, 어떤 단계까지 성공했는지와 함께 도움을 요청하세요.

---

## 자주 겪는 실수

1. **Root Directory 를 설정하지 않음** — 루트가 배포되어 빈 화면이거나 폴더 목록만 보입니다. Settings 에서 `day-03` 으로 고칩니다.
2. **`day-03` 폴더 안에서만 `git init`** — 다음 회차 코드가 같은 저장소에 쌓이지 않습니다. 저장소 루트에서 Git 을 관리하세요.
3. **한글 폴더명 사용** — 이 과정은 경로에 한글을 쓰지 않습니다. 폴더명은 항상 `day-03` 처럼 영문 케밥케이스입니다.
4. **푸시는 했는데 화면이 그대로** — 배포가 아직 진행 중이거나 브라우저 캐시일 수 있습니다. Vercel 상태가 Ready 인지 보고, 강력 새로고침을 해 보세요.

다음 회차(4일차)에서는 이 정적 사이트를 잠시 두고, 같은 저장소의 `day-04` 폴더에 Next.js 게시판 프로젝트를 새로 시작합니다. 배포 단위를 나누는 방식은 오늘과 같습니다. Root Directory 만 `day-04` 로 바꾸면 됩니다.
