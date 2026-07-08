export function ConferenceStandings({
  standings
}: {
  standings: Array<{
    region: string;
    mastered: number;
    total: number;
    accuracy: number;
  }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Conference Standings
      </p>
      <div className="mt-3 space-y-2">
        {standings.map((entry) => (
          <div
            key={entry.region}
            className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{entry.region}</span>
              <span className="text-xs text-slate-400">{entry.accuracy}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-gold to-neon"
                style={{ width: `${(entry.mastered / entry.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
