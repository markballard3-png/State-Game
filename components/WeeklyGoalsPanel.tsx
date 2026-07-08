export function WeeklyGoalsPanel({
  goals
}: {
  goals: Array<{ label: string; detail: string; done: boolean }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Team Goals
      </p>
      <div className="mt-4 space-y-2">
        {goals.map((goal) => (
          <div
            key={goal.label}
            className={`rounded-2xl border px-3 py-3 ${
              goal.done ? "border-gold/30 bg-gold/10" : "border-white/10 bg-slate-950/50"
            }`}
          >
            <p className="text-sm font-semibold text-white">{goal.label}</p>
            <p className="mt-1 text-xs text-slate-400">{goal.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
