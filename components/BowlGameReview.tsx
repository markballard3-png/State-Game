import { StateInfo } from "@/types/game";

export function BowlGameReview({
  reviewCount,
  reviewStates
}: {
  reviewCount: number;
  reviewStates: StateInfo[];
}) {
  return (
    <section className="rounded-[26px] border border-white/10 bg-gradient-to-r from-sky-500/10 to-gold/10 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
        Bowl Game Review
      </p>
      <h2 className="mt-2 text-3xl font-black">Missed states come back under the lights</h2>
      <p className="mt-3 text-slate-300">
        This bowl review replays your toughest states and capitals more often so retrieval gets
        stronger with every round.
      </p>
      <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        {reviewCount} states currently on the bowl review board
      </p>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {reviewStates.map((state) => (
          <div
            key={state.abbreviation}
            className="rounded-2xl border border-white/10 bg-white/5 p-3"
          >
            <p className="text-sm font-bold text-white">{state.name}</p>
            <p className="mt-1 text-xs text-slate-400">{state.capital}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
