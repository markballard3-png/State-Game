import { ProgressData } from "@/types/game";

export function RewardTrack({ progress }: { progress: ProgressData }) {
  const milestones = [
    { label: "Helmet Unlock", value: 150, current: progress.stats.xp },
    { label: "Bowl Trophy", value: 6, current: progress.stats.bowlTrophies },
    { label: "All-American", value: 25, current: progress.badges.length }
  ];

  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Reward Track
      </p>
      <div className="mt-4 space-y-4">
        {milestones.map((milestone) => {
          const percent = Math.min(100, Math.round((milestone.current / milestone.value) * 100));

          return (
            <div key={milestone.label}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-white">{milestone.label}</span>
                <span className="text-slate-400">
                  {milestone.current}/{milestone.value}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-gold to-neon"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
