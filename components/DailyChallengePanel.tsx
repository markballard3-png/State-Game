export function DailyChallengePanel({
  title,
  detail,
  progressLabel,
  completed
}: {
  title: string;
  detail: string;
  progressLabel: string;
  completed: boolean;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Daily Challenge
      </p>
      <h3 className="mt-3 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3">
        <span className="text-sm font-semibold text-white">{progressLabel}</span>
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
            completed ? "text-neon" : "text-slate-500"
          }`}
        >
          {completed ? "Complete" : "Live"}
        </span>
      </div>
    </section>
  );
}
