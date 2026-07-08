export function MomentumMomentsPanel({ moments }: { moments: string[] }) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Momentum Moments
      </p>
      <div className="mt-4 space-y-2">
        {moments.length > 0 ? (
          moments.map((moment, index) => (
            <div
              key={`${moment}-${index}`}
              className={`rounded-2xl border px-3 py-3 ${
                index === 0
                  ? "border-gold/40 bg-gold/10"
                  : "border-white/10 bg-slate-950/50"
              }`}
            >
              <p className="text-sm text-slate-100">{moment}</p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3">
            <p className="text-sm text-slate-300">Big plays will show up here as the session builds.</p>
          </div>
        )}
      </div>
    </section>
  );
}
