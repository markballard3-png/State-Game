export function HintLadderPanel({
  hints,
  misses
}: {
  hints: string[];
  misses: number;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Hint Ladder
      </p>
      <div className="mt-4 space-y-2">
        {hints.map((hint, index) => {
          const unlocked = misses >= index;

          return (
            <div
              key={`${index}-${hint}`}
              className={`rounded-2xl border px-3 py-3 ${
                unlocked ? "border-neon/30 bg-neon/10" : "border-white/10 bg-slate-950/50"
              }`}
            >
              <p className={`text-sm ${unlocked ? "text-slate-100" : "text-slate-500"}`}>
                {unlocked ? hint : `Hint ${index + 1} unlocks after more misses.`}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
