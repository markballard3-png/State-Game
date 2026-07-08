import { getRecruitingTier } from "@/lib/game";
import { ProgressData, StateInfo } from "@/types/game";

export function RecruitingBoard({
  states,
  progress
}: {
  states: StateInfo[];
  progress: ProgressData;
}) {
  const groups = {
    "5-Star Mastered States": [] as StateInfo[],
    "4-Star Almost There": [] as StateInfo[],
    "3-Star Needs Practice": [] as StateInfo[],
    "Walk-On States": [] as StateInfo[]
  };

  states.forEach((state) => {
    const tier = getRecruitingTier(progress.byState[state.abbreviation].masteryScore);
    groups[tier].push(state);
  });

  return (
    <section className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        Recruiting Board
      </p>
      {Object.entries(groups).map(([tier, items]) => (
        <div key={tier} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">{tier}</h3>
            <span className="text-xs text-slate-400">{items.length}</span>
          </div>
          <p className="text-sm text-slate-300">
            {items.slice(0, 5).map((state) => state.name).join(", ") || "No states yet"}
          </p>
        </div>
      ))}
    </section>
  );
}
