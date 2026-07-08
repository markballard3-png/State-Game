export function ChampionshipMode({
  masteredCount,
  accuracy,
  reviewCount
}: {
  masteredCount: number;
  accuracy: number;
  reviewCount: number;
}) {
  return (
    <section className="rounded-[26px] border border-gold/20 bg-gradient-to-r from-gold/10 to-transparent p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
        National Championship
      </p>
      <h2 className="mt-2 text-3xl font-black">Full 50-state title run</h2>
      <p className="mt-3 text-slate-300">
        Mixed map and capital snaps, fewer hints, and pressure-packed scoring. Build mastery in all
        50 states to earn the national title.
      </p>
      <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        {masteredCount}/50 states currently at 5-star mastery
      </p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Accuracy</p>
          <p className="mt-2 text-2xl font-black text-white">{accuracy}%</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">5-star states</p>
          <p className="mt-2 text-2xl font-black text-white">{masteredCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Review queue</p>
          <p className="mt-2 text-2xl font-black text-white">{reviewCount}</p>
        </div>
      </div>
    </section>
  );
}
