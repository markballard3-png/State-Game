export function NationalRankingPanel({
  ranking,
  objectives
}: {
  ranking: number;
  objectives: Array<{ label: string; current: number; target: number }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        National Ranking
      </p>
      <div className="mt-3 rounded-2xl border border-gold/20 bg-gold/10 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Poll Position</p>
        <p className="mt-2 text-4xl font-black text-gold">#{ranking}</p>
      </div>
      <div className="mt-4 space-y-3">
        {objectives.map((objective) => {
          const percent = Math.min(
            100,
            Math.round((objective.current / objective.target) * 100)
          );

          return (
            <div key={objective.label}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-200">{objective.label}</span>
                <span className="text-slate-400">
                  {objective.current}/{objective.target}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-gold to-neon"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
