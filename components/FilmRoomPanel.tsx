import { StateInfo } from "@/types/game";

export function FilmRoomPanel({
  weakStates,
  recommendation
}: {
  weakStates: StateInfo[];
  recommendation: string;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Film Room
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{recommendation}</p>
      <div className="mt-4 space-y-2">
        {weakStates.map((state) => (
          <div
            key={state.abbreviation}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3"
          >
            <span className="text-sm text-white">{state.name}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {state.capital}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
