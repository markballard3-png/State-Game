import { MemoryHookCard } from "@/components/MemoryHookCard";
import { TeamThemeCard } from "@/components/TeamThemeCard";
import { StateInfo, StateProgress } from "@/types/game";

export function StateCard({
  state,
  progress
}: {
  state: StateInfo;
  progress: StateProgress;
}) {
  return (
    <section className="grid gap-4 rounded-[28px] border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            State Card
          </p>
          <h3 className="mt-2 text-3xl font-black">
            {state.name} <span className="text-slate-500">{state.abbreviation}</span>
          </h3>
          <p className="mt-2 text-lg text-slate-300">Capital: {state.capital}</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Mastery</p>
          <p className="text-3xl font-black text-neon">{progress.masteryScore}%</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <TeamThemeCard state={state} />
        <MemoryHookCard state={state} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatPill label="Region" value={state.region} />
        <StatPill label="Correct" value={String(progress.correctAnswers)} />
        <StatPill label="Missed" value={String(progress.missedAnswers)} />
        <StatPill label="Neighbors" value={state.neighboringStates.join(", ")} />
      </div>
    </section>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}
