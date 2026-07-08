export function DriveSituationPanel({
  down,
  yardsToGo,
  playClock
}: {
  down: number;
  yardsToGo: number;
  playClock: number;
}) {
  const downLabel = `${down}${down === 1 ? "st" : down === 2 ? "nd" : down === 3 ? "rd" : "th"} Down`;

  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Drive Situation
      </p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat label="Down" value={downLabel} />
        <Stat label="To Go" value={`${yardsToGo} yds`} />
        <Stat label="Play Clock" value={`${playClock}s`} danger={playClock <= 8} />
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  danger = false
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className={`mt-2 text-sm font-bold ${danger ? "text-gold" : "text-white"}`}>{value}</p>
    </div>
  );
}
