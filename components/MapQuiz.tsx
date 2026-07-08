import { ProgressData, StateInfo } from "@/types/game";
import { InteractiveUSMap } from "@/components/InteractiveUSMap";

export function MapQuiz({
  targetState,
  states,
  misses,
  progress,
  onGuess
}: {
  targetState: StateInfo;
  states: StateInfo[];
  misses: number;
  progress: ProgressData;
  onGuess: (guess: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
        <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Find the State
          </p>
          <h2 className="mt-2 text-4xl font-black">Find {targetState.name}.</h2>
          <p className="mt-3 text-slate-300">
            Football call sign:{" "}
            <span className="font-semibold">{targetState.footballNickname}</span>
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Anchor team: {targetState.primaryTeamAnchor}
            {targetState.secondaryTeamAnchor ? ` / ${targetState.secondaryTeamAnchor}` : ""}
          </p>
        </div>
        <div className="rounded-[26px] border border-white/10 bg-slate-900/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Scouting Report
          </p>
          <div className="mt-3 grid gap-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <span className="text-slate-400">Region</span>
              <p className="mt-1 font-semibold text-white">{targetState.region}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <span className="text-slate-400">Neighbors</span>
              <p className="mt-1 font-semibold text-white">
                {targetState.neighboringStates.join(", ") || "None"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <span className="text-slate-400">Miss counter</span>
              <p className="mt-1 font-semibold text-white">{misses}/2 before region hint</p>
            </div>
          </div>
        </div>
      </div>
      <InteractiveUSMap
        states={states}
        targetState={misses >= 2 ? targetState.abbreviation : undefined}
        highlightedRegion={misses >= 2 ? targetState.region : null}
        progress={progress}
        onSelect={onGuess}
      />
    </div>
  );
}
