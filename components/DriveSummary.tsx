export function DriveSummary({
  driveYards,
  recentPlays
}: {
  driveYards: number;
  recentPlays: string[];
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Drive Summary
      </p>
      <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Ball movement</span>
          <span className="text-lg font-black text-white">{driveYards} yds</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/10">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-neon via-gold to-orange-400"
            style={{ width: `${Math.min(100, driveYards)}%` }}
          />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {recentPlays.length > 0 ? (
          recentPlays.map((play, index) => (
            <div
              key={`${play}-${index}`}
              className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm text-slate-200"
            >
              {play}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">No plays yet. Kick off the drive.</p>
        )}
      </div>
    </section>
  );
}
