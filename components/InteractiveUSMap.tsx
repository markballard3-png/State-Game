import { getRegionMastery } from "@/lib/game";
import { ProgressData, StateInfo } from "@/types/game";

const regionOrder = [
  "Northeast Division",
  "ACC / Atlantic Division",
  "SEC South Division",
  "Big Ten Midwest Division",
  "Big 12 Plains Division",
  "Mountain West Division",
  "Pac-12 West Coast Division"
] as const;

export function InteractiveUSMap({
  states,
  targetState,
  highlightedRegion,
  progress,
  onSelect
}: {
  states: StateInfo[];
  targetState?: string;
  highlightedRegion?: string | null;
  progress: ProgressData;
  onSelect: (code: string) => void;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Stadium Map Drill
          </p>
          <h3 className="mt-2 text-2xl font-black">Interactive U.S. field map</h3>
        </div>
        <p className="max-w-xs text-right text-sm text-slate-400">
          Click a state tile. After two misses, the correct region glows.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {regionOrder.map((region) => (
          <div
            key={region}
            className={`rounded-3xl border p-4 ${
              highlightedRegion === region
                ? "border-gold bg-gold/10 shadow-[0_0_0_1px_rgba(246,195,74,0.2),0_0_32px_rgba(246,195,74,0.12)]"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                {region}
              </p>
              <span className="text-[11px] font-semibold text-slate-400">
                {getRegionMastery(region, progress)}% mastery
              </span>
            </div>
            <div className="mb-4 h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-gold to-neon"
                style={{ width: `${getRegionMastery(region, progress)}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {states
                .filter((state) => state.region === region)
                .map((state) => {
                  const mastery = progress.byState[state.abbreviation].masteryScore;

                  return (
                  <button
                    key={state.abbreviation}
                    type="button"
                    onClick={() => onSelect(state.abbreviation)}
                    className={`rounded-xl border px-2 py-3 text-sm font-bold transition ${
                      targetState === state.abbreviation
                        ? "border-neon bg-neon/10 text-white"
                        : "border-white/10 bg-slate-950/50 text-slate-200 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="block">{state.abbreviation}</span>
                      <span className="text-[10px] text-slate-400">{mastery}%</span>
                    </div>
                    <span className="mt-1 block text-[11px] font-medium text-slate-400">
                      {state.name}
                    </span>
                  </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
