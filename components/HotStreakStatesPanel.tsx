export function HotStreakStatesPanel({
  states
}: {
  states: Array<{ name: string; streak: number }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Hot States
      </p>
      <div className="mt-4 space-y-2">
        {states.length > 0 ? (
          states.map((state) => (
            <div
              key={state.name}
              className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white">{state.name}</span>
                <span className="text-sm font-bold text-neon">{state.streak} streak</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm text-slate-300">
            No hot streak states yet. Stack a few clean reps.
          </div>
        )}
      </div>
    </section>
  );
}
