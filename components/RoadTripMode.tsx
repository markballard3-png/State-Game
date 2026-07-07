import { Region } from "@/types/game";

export function RoadTripMode({
  region,
  regionCompleted
}: {
  region: Region;
  regionCompleted: boolean;
}) {
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
      <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        {regionCompleted ? "Bowl berth secured" : "Work this region until the bowl game opens"}
      </p>
    </div>
  );
}
