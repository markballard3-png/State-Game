import { StateInfo } from "@/types/game";

export function ReviewQueuePanel({
  queue
}: {
  queue: Array<{ state: StateInfo; priority: number; focus: string }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Review Queue
      </p>
      <div className="mt-4 space-y-2">
        {queue.map((item) => (
          <div
            key={item.state.abbreviation}
            className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{item.state.name}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                P{item.priority}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-3 text-xs text-slate-400">
              <span>{item.focus}</span>
              <span>{item.state.capital}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
