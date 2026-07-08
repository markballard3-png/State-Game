export function RegionVictoryPanel({
  title,
  detail,
  completedCount,
  currentStatus
}: {
  title: string;
  detail: string;
  completedCount: string;
  currentStatus: string;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Region Victory
      </p>
      <h3 className="mt-3 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
      <div className="mt-4 grid gap-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Completed Bowls</p>
          <p className="mt-1 text-sm font-semibold text-white">{completedCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Current Region</p>
          <p className="mt-1 text-sm font-semibold text-white">{currentStatus}</p>
        </div>
      </div>
    </section>
  );
}
