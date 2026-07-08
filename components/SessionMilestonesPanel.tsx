export function SessionMilestonesPanel({
  milestones
}: {
  milestones: Array<{ label: string; progress: string; done: boolean }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Session Milestones
      </p>
      <div className="mt-4 space-y-2">
        {milestones.map((milestone) => (
          <div
            key={milestone.label}
            className={`rounded-2xl border px-3 py-3 ${
              milestone.done ? "border-neon/30 bg-neon/10" : "border-white/10 bg-slate-950/50"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{milestone.label}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {milestone.progress}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
