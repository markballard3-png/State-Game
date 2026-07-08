import { Region } from "@/types/game";

export function SeasonSchedule({
  regions,
  activeRegion,
  unlockedRegions
}: {
  regions: Region[];
  activeRegion: Region;
  unlockedRegions: Region[];
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Season Schedule
      </p>
      <div className="mt-4 space-y-2">
        {regions.map((region, index) => {
          const unlocked = unlockedRegions.includes(region);
          const active = activeRegion === region;

          return (
            <div
              key={region}
              className={`rounded-2xl border px-3 py-3 ${
                active
                  ? "border-neon bg-neon/10"
                  : unlocked
                    ? "border-white/10 bg-slate-950/50"
                    : "border-white/5 bg-slate-950/20 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white">
                  Week {index + 1}: {region}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {active ? "Current" : unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
