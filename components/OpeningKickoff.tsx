export function OpeningKickoff({
  onStart
}: {
  onStart: () => void;
}) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[32px] bg-slate-950/90 backdrop-blur">
      <div className="max-w-3xl rounded-[32px] border border-gold/20 bg-gradient-to-b from-slate-900 to-slate-950 p-10 text-center shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
          Ready To Play
        </p>
        <h2 className="mt-4 font-display text-6xl font-black leading-none text-white">
          Capital Kickoff
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Learn states and capitals with short, fun rounds. Pick an answer, build your streak, and
          watch your progress grow.
        </p>
        <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
          <Feature label="Step 1" value="Read the question." />
          <Feature label="Step 2" value="Tap your answer." />
          <Feature label="Step 3" value="Keep going to build your streak." />
        </div>
        <button
          type="button"
          onClick={onStart}
          className="mt-10 rounded-2xl bg-gold px-8 py-4 text-lg font-black text-slate-950 transition hover:brightness-110"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
}

function Feature({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-bold text-white">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{value}</p>
    </div>
  );
}
