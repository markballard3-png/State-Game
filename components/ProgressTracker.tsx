import { regions } from "@/data/states";
import { getRegionAccuracy } from "@/lib/game";
import { ProgressData, Region } from "@/types/game";

export function ProgressTracker({
  activeRegion,
  onRegionChange,
  progress
}: {
  activeRegion: Region;
  onRegionChange: (region: Region) => void;
  progress: ProgressData;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          Season Progress
        </p>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          {progress.unlockedRegions.length}/{regions.length} regions unlocked
        </span>
      </div>
      <div className="grid gap-2">
        {regions.map((region) => {
          const unlocked = progress.unlockedRegions.includes(region);
          const accuracy = getRegionAccuracy(region, progress);
          return (
            <button
              key={region}
              type="button"
              disabled={!unlocked}
              onClick={() => onRegionChange(region)}
              className={`rounded-2xl border p-3 text-left transition ${
                activeRegion === region
                  ? "border-neon bg-neon/10 shadow-glow"
                  : "border-white/10 bg-white/5"
              } ${unlocked ? "text-white hover:border-white/20" : "cursor-not-allowed text-slate-500 opacity-70"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{region}</span>
                <span className="text-xs text-slate-300">{accuracy}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
