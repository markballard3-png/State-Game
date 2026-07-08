import { StateInfo, StateProgress } from "@/types/game";

export function StudyCuePanel({
  state,
  progress,
  variant,
  misses = 0,
  showCapitalHint = false
}: {
  state: StateInfo;
  progress: StateProgress;
  variant: "map" | "capital";
  misses?: number;
  showCapitalHint?: boolean;
}) {
  const capitalWords = state.capital.split(" ");
  const capitalPattern = capitalWords
    .map((word) => `${word[0]}${"•".repeat(Math.max(word.length - 1, 0))}`)
    .join(" ");
  const confidenceLabel =
    progress.masteryScore >= 85 ? "Locked in" : progress.masteryScore >= 60 ? "Building" : "Needs reps";

  return (
    <div className="rounded-[26px] border border-white/10 bg-slate-900/70 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Study Sideline
      </p>
      <div className="mt-4 grid gap-3 text-sm">
        <CueCard label="Confidence" value={`${confidenceLabel} · ${progress.masteryScore}%`} />
        <CueCard label="Region" value={state.region} />
        <CueCard label="State Code" value={state.abbreviation} />
        <CueCard
          label="Team Anchor"
          value={
            state.secondaryTeamAnchor
              ? `${state.primaryTeamAnchor} / ${state.secondaryTeamAnchor}`
              : state.primaryTeamAnchor
          }
        />
        <CueCard
          label={variant === "map" ? "Neighboring States" : "Memory Hook"}
          value={
            variant === "map"
              ? misses > 0
                ? state.neighboringStates.join(", ") || "No bordering states"
                : `${state.neighboringStates.length} bordering states`
              : state.memoryHook
          }
        />
        {variant === "capital" ? (
          <CueCard
            label="Capital Pattern"
            value={
              showCapitalHint
                ? `${capitalPattern} · ${capitalWords.length} word${capitalWords.length === 1 ? "" : "s"}`
                : "Reveal the first-letter pattern when needed"
            }
          />
        ) : null}
      </div>
    </div>
  );
}

function CueCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <span className="text-slate-400">{label}</span>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
