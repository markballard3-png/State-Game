import { getBowlName } from "@/lib/game";
import { ProgressData, Region, StateInfo } from "@/types/game";

export function RoadTripMode({
  region,
  regionCompleted,
  progress,
  regionStates
}: {
  region: Region;
  regionCompleted: boolean;
  progress: ProgressData;
  regionStates: StateInfo[];
}) {
  const mastered = regionStates.filter(
    (state) => progress.byState[state.abbreviation].masteryScore >= 70
  ).length;

  return (
    <div className="rounded-[26px] border border-white/10 bg-gradient-to-r from-gold/10 to-transparent p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
        College Football Road Trip
      </p>
      <h2 className="mt-2 text-3xl font-black">{region}</h2>
      <p className="mt-3 max-w-3xl text-slate-300">
        Win this regional season by stacking map stops, capital calls, and review snaps. When
        mastery in this division climbs high enough, the next region unlocks automatically.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Regional wins</p>
          <p className="mt-2 text-2xl font-black text-white">
            {mastered}/{regionStates.length}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Bowl game</p>
          <p className="mt-2 text-lg font-black text-gold">{getBowlName(region)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</p>
          <p className="mt-2 text-lg font-black text-white">
            {regionCompleted ? "Bowl berth secured" : "Keep driving"}
          </p>
        </div>
      </div>
    </div>
  );
}
