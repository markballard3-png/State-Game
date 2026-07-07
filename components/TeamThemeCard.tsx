import { StateInfo } from "@/types/game";

export function TeamThemeCard({ state }: { state: StateInfo }) {
  return (
    <div
      className="rounded-[24px] border p-4"
      style={{
        borderColor: `${state.teamColors.accent}33`,
        background: `linear-gradient(145deg, ${state.teamColors.primary}33, rgba(15,23,42,0.7))`
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/70">
        Team Theme
      </p>
      <div className="mt-4 flex items-center gap-4">
        <div
          className="helmet-shine flex h-16 w-16 items-center justify-center rounded-[20px] border text-xl font-black"
          style={{
            backgroundColor: state.teamColors.primary,
            borderColor: state.teamColors.secondary,
            color: state.teamColors.secondary
          }}
        >
          {state.abbreviation}
        </div>
        <div>
          <p className="font-semibold text-white">{state.primaryTeamAnchor}</p>
          {state.secondaryTeamAnchor ? (
            <p className="text-sm text-slate-300">Secondary: {state.secondaryTeamAnchor}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
