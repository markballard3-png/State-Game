export function DriveBonusPanel({ bonuses }: { bonuses: string[] }) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Drive Bonuses
      </p>
      <div className="mt-4 space-y-2">
        {bonuses.map((bonus) => (
          <div
            key={bonus}
            className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm text-slate-200"
          >
            {bonus}
          </div>
        ))}
      </div>
    </section>
  );
}
