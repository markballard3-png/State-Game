export function RivalryHistoryPanel({
  history
}: {
  history: Array<{ title: string; result: "win" | "loss"; detail: string }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Rivalry Ledger
      </p>
      <div className="mt-4 space-y-2">
        {history.length > 0 ? (
          history.map((item) => (
            <div
              key={`${item.title}-${item.detail}`}
              className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white">{item.title}</span>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    item.result === "win" ? "text-neon" : "text-red-300"
                  }`}
                >
                  {item.result}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3">
            <p className="text-sm text-slate-300">Rivalry results will post here after big games.</p>
          </div>
        )}
      </div>
    </section>
  );
}
