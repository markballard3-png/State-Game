export function HalftimeReport({
  summary,
  score,
  streak,
  accuracy
}: {
  summary: string;
  score: number;
  streak: number;
  accuracy: number;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Halftime Report
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-200">{summary}</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Card label="Score" value={String(score)} />
        <Card label="Best Streak" value={String(streak)} />
        <Card label="Accuracy" value={`${accuracy}%`} />
      </div>
    </section>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-black text-white">{value}</p>
    </div>
  );
}
