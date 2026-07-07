export function TrophyCabinet({ trophies }: { trophies: string[] }) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Trophy Cabinet
      </p>
      <div className="mt-3 space-y-2">
        {trophies.length > 0 ? (
          trophies.map((trophy) => (
            <div
              key={trophy}
              className="rounded-2xl border border-gold/20 bg-gold/10 px-3 py-3 text-sm font-semibold text-gold"
            >
              {trophy}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">Win a region to earn your first bowl trophy.</p>
        )}
      </div>
    </section>
  );
}
