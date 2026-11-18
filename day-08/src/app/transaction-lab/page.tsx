import { DatabaseSetupNotice } from "@/components/SetupNotice";
import { TransactionLabPanel } from "@/components/TransactionLabPanel";
import { formatDateTime } from "@/lib/format";
import { safeQuery } from "@/lib/safe-db";

export const dynamic = "force-dynamic";

export default async function TransactionLabPage() {
  const { data, error } = await safeQuery(
    async (prisma) => {
      const [stat, logs, postCount] = await Promise.all([
        prisma.boardStat.findUnique({ where: { id: "singleton" } }),
        prisma.postAuditLog.findMany({
          orderBy: { createdAt: "desc" },
          take: 8,
        }),
        prisma.post.count(),
      ]);
      return { stat, logs, postCount };
    },
    { stat: null, logs: [], postCount: 0 },
  );

  return (
    <div className="stack">
      <section className="page-hero">
        <div>
          <span className="badge">Day 07</span>
          <h1>트랜잭션 실습실</h1>
          <p>
            정상 커밋과 중간 오류 롤백을 비교합니다. 오류를 일으켜도 글 수, 통계, 감사 로그가
            한 줄도 남지 않아야 합니다.
          </p>
        </div>
      </section>

      {error ? <DatabaseSetupNotice /> : null}

      {!error ? (
        <>
          <section className="post-list" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
            <article className="card">
              <p className="helper">BoardStat.totalPosts</p>
              <h2 style={{ margin: 0 }}>{data.stat?.totalPosts ?? 0}</h2>
            </article>
            <article className="card">
              <p className="helper">BoardStat.totalViews</p>
              <h2 style={{ margin: 0 }}>{data.stat?.totalViews ?? 0}</h2>
            </article>
            <article className="card">
              <p className="helper">실제 Post 수</p>
              <h2 style={{ margin: 0 }}>{data.postCount}</h2>
            </article>
          </section>

          <TransactionLabPanel
            initialTotalPosts={data.stat?.totalPosts ?? 0}
            initialPostCount={data.postCount}
          />

          <section className="card stack">
            <h2 className="page-title" style={{ fontSize: "18px" }}>
              최근 감사 로그
            </h2>
            {data.logs.length === 0 ? (
              <p className="helper">아직 감사 로그가 없습니다. 정상 커밋을 한 번 실행해 보세요.</p>
            ) : (
              <ul className="stack" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {data.logs.map((log) => (
                  <li key={log.id} className="meta-row">
                    <span className="badge badge-muted">{log.action}</span>
                    <span>{log.summary}</span>
                    <span>{formatDateTime(log.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
