import { InteractiveUSMap } from "@/components/InteractiveUSMap";
import { StateInfo } from "@/types/game";

export function MapQuiz({
  targetState,
  states,
  misses,
  onGuess
}: {
  targetState: StateInfo;
  states: StateInfo[];
  misses: number;
  onGuess: (guess: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Find the State
        </p>
        <h2 className="mt-2 text-4xl font-black">Find {targetState.name}.</h2>
        <p className="mt-3 text-slate-300">
          Football call sign: <span className="font-semibold">{targetState.footballNickname}</span>
        </p>
      </div>
      <InteractiveUSMap
        states={states}
        targetState={misses >= 2 ? targetState.abbreviation : undefined}
        highlightedRegion={misses >= 2 ? targetState.region : null}
        onSelect={onGuess}
      />
    </div>
  );
}
