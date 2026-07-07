export function OpeningKickoff({
  onStart
}: {
  onStart: () => void;
}) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[32px] bg-slate-950/90 backdrop-blur">
      <div className="max-w-3xl rounded-[32px] border border-gold/20 bg-gradient-to-b from-slate-900 to-slate-950 p-10 text-center shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
          Start Your Season
        </p>
        <h2 className="mt-4 font-display text-6xl font-black leading-none text-white">
          Capital Kickoff
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Travel the country, win rivalry weeks, unlock bowl trophies, and turn every state into a
          5-star recruit.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4 text-left">
          <Feature label="Map Drill" value="Find each state on a stadium board map." />
          <Feature label="Capital Plays" value="Call the right capital under pressure." />
          <Feature label="Road Trip" value="Unlock regions one football culture at a time." />
        </div>
        <button
          type="button"
          onClick={onStart}
          className="mt-10 rounded-2xl bg-gold px-8 py-4 text-lg font-black text-slate-950 transition hover:brightness-110"
        >
          Kick Off the Season
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
