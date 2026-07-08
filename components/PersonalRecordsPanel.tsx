export function PersonalRecordsPanel({
  sessionBestStreak,
  bestStreak,
  sessionHighScore,
  longestDrive,
  masteredTotal
}: {
  sessionBestStreak: number;
  bestStreak: number;
  sessionHighScore: number;
  longestDrive: number;
  masteredTotal: number;
}) {
  const cards = [
    { label: "Session High Score", value: String(sessionHighScore) },
    { label: "Longest Drive", value: `${longestDrive} yds` },
    { label: "Session Best Streak", value: String(sessionBestStreak) },
    { label: "Career Best Streak", value: String(bestStreak) },
    { label: "5-Star States", value: `${masteredTotal}/50` }
  ];

  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Personal Records
      </p>
      <div className="mt-4 grid grid-cols-1 gap-2">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
            <p className="mt-1 text-lg font-black text-white">{card.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
