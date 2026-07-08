import { ProgressData, StateInfo } from "@/types/game";

export function TeamCardCollection({
  states,
  progress,
  onSelect
}: {
  states: StateInfo[];
  progress: ProgressData;
  onSelect: (state: StateInfo) => void;
}) {
  const collection = [...states]
    .sort((left, right) => {
      const leftScore = progress.byState[left.abbreviation].masteryScore;
      const rightScore = progress.byState[right.abbreviation].masteryScore;
      return rightScore - leftScore || left.name.localeCompare(right.name);
    })
    .slice(0, 12);

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/60 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Team Card Collection
          </p>
          <h3 className="mt-2 text-2xl font-black">Top cards in your locker room</h3>
        </div>
        <p className="max-w-sm text-right text-sm text-slate-400">
          Collect stronger cards by mastering states, capitals, and rivalry matchups.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {collection.map((state) => {
          const stateProgress = progress.byState[state.abbreviation];
          const logoPath = `/logos/${state.abbreviation.toLowerCase()}.png`;

          return (
            <button
              key={state.abbreviation}
              type="button"
              onClick={() => onSelect(state)}
              className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-left transition hover:border-neon hover:bg-neon/10"
              style={{
                backgroundImage: `linear-gradient(145deg, ${state.teamColors.primary}26, rgba(15,23,42,0.85))`
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className="helmet-shine flex h-14 w-14 items-center justify-center rounded-[18px] border text-lg font-black"
                  style={{
                    backgroundColor: state.teamColors.primary,
                    borderColor: state.teamColors.secondary,
                    color: state.teamColors.secondary
                  }}
                >
                  {state.abbreviation}
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300">
                    Card Power
                  </p>
                  <p className="text-2xl font-black text-white">{stateProgress.masteryScore}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold text-white">{state.name}</p>
                <p className="mt-1 text-sm text-slate-300">{state.capital}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                  {state.primaryTeamAnchor}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Optional logo slot: {logoPath}
                </p>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-gold to-neon"
                  style={{ width: `${stateProgress.masteryScore}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
