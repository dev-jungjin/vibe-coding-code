# CLAUDE.md — Day 12 Vibe Board

이 폴더는 'Claude AI 기반 바이브코딩 풀스택 웹개발' 12일차 실습 프로젝트이자 1개월차 최종본입니다.

## 과정 맥락

- 오늘 목표: 구조화 로그를 남기고, 의도적 오류를 로그에서 추적하며 Vercel Runtime Logs 를 확인하기
- 스택: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma, Supabase Auth

## 코딩 규칙

- 디렉토리명과 파일명은 영문 소문자 케밥케이스만 사용합니다.
- 장식용 이모지는 사용하지 않습니다. 보충 설명에만 `💡` 를 쓸 수 있습니다.
- 디자인 토큰은 GS Retail 값을 유지합니다.
- Prisma, 인증, 인가는 이전 일차 규칙을 그대로 유지합니다.
- DB 또는 Auth 환경 변수가 없어도 `npm run build` 가 성공해야 합니다.

## Logging Rules

모든 의미 있는 서버 동작(글 작성/수정/삭제, 관리자 조치, 헬스 체크, 의도적 오류)은 `src/lib/logger.ts` 의 `log()` 만 사용합니다. `console.log` 에 자유 형식 문자열을 남기지 않습니다.

### 형식

로그는 한 줄에 하나의 JSON 객체입니다.

```json
{
  "timestamp": "2026-11-13T04:12:00.000Z",
  "level": "info",
  "action": "post.create",
  "userId": "user-id-or-null",
  "path": "/api/posts",
  "durationMs": 42,
  "meta": { "postId": "..." }
}
```

필수 필드: `timestamp`, `level`, `action`. 가능하면 `userId`, `path`, `durationMs`, `meta` 를 함께 남깁니다.

### 출력 위치

- 항상 `console` 에 JSON 한 줄을 출력합니다. Vercel Runtime Logs 는 이 표준 출력을 수집합니다.
- 로컬 개발(`NODE_ENV !== "production"`)에서는 같은 줄을 `logs/app.log` 에도 덧붙입니다.
- `logs/*.log` 는 커밋하지 않습니다. `logs/.gitkeep` 만 유지합니다.

### 민감 정보 마스킹

비밀번호, 비밀번호 해시, 액세스/리프레시 토큰, Authorization 헤더, 쿠키, 시크릿, `anon_key`, `service_role` 은 절대 로그에 남기지 않습니다. `logger` 는 해당 키를 `[REDACTED]` 로 가립니다. 로그를 추가할 때 `meta` 에 원문 비밀번호나 환경 변수를 넣지 마세요.

### 실습 엔드포인트

- `GET /api/health` — 정상 로그 (`action=health.check`)
- `GET /api/debug-error` — 의도적 500 오류 로그 (`action=debug.error`)
- 안내 페이지: `/admin/logs-lab`
