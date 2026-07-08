export function AnswerHistoryPanel({
  history
}: {
  history: Array<{
    state: string;
    questionType: string;
    result: "correct" | "miss";
    detail: string;
  }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Answer Tape
      </p>
      <div className="mt-4 space-y-2">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div
              key={`${item.state}-${item.questionType}-${index}`}
              className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white">{item.state}</span>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    item.result === "correct" ? "text-neon" : "text-red-300"
                  }`}
                >
                  {item.result}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {item.questionType} · {item.detail}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3">
            <p className="text-sm text-slate-300">Recent answers will build a film strip here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
