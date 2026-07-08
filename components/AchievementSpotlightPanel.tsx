export function AchievementSpotlightPanel({
  headline,
  detail,
  nextTarget
}: {
  headline: string;
  detail: string;
  nextTarget: string;
}) {
  return (
    <section className="rounded-[24px] border border-gold/20 bg-gradient-to-br from-gold/10 to-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
        Achievement Spotlight
      </p>
      <h3 className="mt-3 text-xl font-black text-white">{headline}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-200">{detail}</p>
      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Next chase</p>
        <p className="mt-1 text-sm font-semibold text-white">{nextTarget}</p>
      </div>
    </section>
  );
}
