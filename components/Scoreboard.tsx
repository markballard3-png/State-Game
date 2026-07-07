type ScoreboardProps = {
  score: number;
  streak: number;
  xp: number;
  rank: string;
  accuracy: number;
};

export function Scoreboard({
  score,
  streak,
  xp,
  rank,
  accuracy
}: ScoreboardProps) {
  return (
    <section className="overflow-hidden rounded-[26px] border border-gold/20 bg-slate-900/80">
      <div className="field-stripes border-b border-white/10 bg-turf-700 px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.34em] text-slate-100/75">
          Saturday Scoreboard
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Points</p>
            <p className="text-3xl font-black">{score}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Streak</p>
            <p className="text-3xl font-black">{streak}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">XP</p>
            <p className="text-3xl font-black">{xp}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 px-5 py-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current Rank</p>
          <p className="mt-2 text-2xl font-black text-gold">{rank}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Accuracy</p>
            <span className="text-sm font-bold text-neon">{accuracy}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-gold to-neon"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
