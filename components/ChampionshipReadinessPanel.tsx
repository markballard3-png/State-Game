export function ChampionshipReadinessPanel({
  score,
  summary,
  nextStep
}: {
  score: number;
  summary: string;
  nextStep: string;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Championship Readiness
      </p>
      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-300">Readiness Score</span>
          <span className="text-2xl font-black text-gold">{score}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-300">{summary}</p>
      </div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/50 p-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Next step</p>
        <p className="mt-1 text-sm font-semibold text-white">{nextStep}</p>
      </div>
    </section>
  );
}
