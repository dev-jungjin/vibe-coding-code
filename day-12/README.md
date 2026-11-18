# 12일차 — 문제가 생기면 로그에서 원인 찾기 (1개월차 최종본)

11일차까지 쌓아 온 게시판에 구조화 로깅을 더한 1개월차 최종 예제입니다. 로컬 `logs/` 폴더와 Vercel Runtime Logs 에서 같은 JSON 형식으로 원인을 추적합니다.

## 이 폴더에서 배우는 것

- `CLAUDE.md` 의 Logging Rules 를 기준으로 로그 형식을 통일하기
- `src/lib/logger.ts` 가 `timestamp`, `level`, `action`, `userId`, `path`, `durationMs`, `meta` 를 JSON 으로 남기기
- 로컬에서는 `logs/app.log` 에 추가하고, 프로덕션에서는 콘솔만 사용해 Vercel 이 수집하게 하기
- 비밀번호와 토큰을 로그에 남기지 않기
- `/api/debug-error` 로 일부러 문제를 만들고, 로그에서 해당 기록을 찾기

## 11일차에서 늘어난 것

- `src/lib/logger.ts` 와 `logs/.gitkeep`
- `GET /api/health`, `GET /api/debug-error`
- `/admin/logs-lab` 안내 및 실험 페이지
- 글 작성/수정/삭제와 관리자 조치에도 구조화 로그를 남김

## 실행 방법

```bash
cd day-12
cp .env.example .env
npm install
npx prisma db push
npm run dev
```

1. [http://localhost:3000/admin/logs-lab](http://localhost:3000/admin/logs-lab) 을 엽니다.
2. `GET /api/health` 를 눌러 정상 로그를 만듭니다.
3. `GET /api/debug-error` 를 눌러 500 오류를 만듭니다.
4. `logs/app.log` 또는 개발 서버 터미널에서 `"action":"debug.error"` 를 검색합니다.

Vercel 에 배포한 뒤에는 프로젝트의 Runtime Logs 화면에서 같은 `action` 값으로 검색합니다. 프로덕션에서는 `logs/app.log` 파일이 생성되지 않고 콘솔 출력만 사용됩니다.

`.env` 가 비어 있어도 `npm run build` 는 성공합니다.
