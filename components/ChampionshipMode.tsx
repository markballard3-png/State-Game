export function ChampionshipMode({
  masteredCount
}: {
  masteredCount: number;
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
    </section>
  );
}
