export function MasteryRadarPanel({
  items
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Mastery Radar
      </p>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-300">{item.label}</span>
              <span className="text-sm font-semibold text-white">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
