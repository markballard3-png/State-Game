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
    <div className="space-y-4">
      <div className="playful-card rounded-[26px] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
          Find the State
        </p>
        <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Tap {targetState.name} on the map.</h2>
        <p className="mt-3 text-base leading-7 text-slate-100/90">
          Find the state on the real U.S. map. After two misses, the right state will glow.
        </p>
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
