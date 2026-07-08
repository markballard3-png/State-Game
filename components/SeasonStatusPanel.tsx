import { ProgressData } from "@/types/game";

export function SeasonStatusPanel({
  progress,
  activeMode,
  difficultyLabel
}: {
  progress: ProgressData;
  activeMode: string;
  difficultyLabel: string;
}) {
  return (
    <section className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        Season Board
      </p>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Mode</span>
          <span className="text-sm font-semibold text-white">{activeMode}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-300">Difficulty</span>
          <span className="text-sm font-semibold text-white">{difficultyLabel}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-300">Season Record</span>
          <span className="text-sm font-semibold text-white">
            {progress.stats.seasonWins}-{progress.stats.seasonLosses}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-300">XP Bank</span>
          <span className="text-sm font-semibold text-white">{progress.stats.xp}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-300">Bowl Trophies</span>
          <span className="text-sm font-semibold text-white">{progress.stats.bowlTrophies}</span>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Badges</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {progress.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-neon/20 bg-neon/10 px-3 py-1 text-xs font-semibold text-neon"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
