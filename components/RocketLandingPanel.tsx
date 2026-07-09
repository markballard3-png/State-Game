export function RocketLandingPanel({
  completedCount,
  accuracy,
  status,
  hardStateCount
}: {
  completedCount: number;
  accuracy: number;
  status: string;
  hardStateCount: number;
}) {
  const rocketPercent = Math.min(100, (completedCount / 50) * 100);

  return (
    <div className="rounded-[32px] border border-white/15 bg-gradient-to-b from-white/18 to-white/10 p-5 shadow-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-200">Rocket Landing</p>
      <div className="rocket-sky mt-3 rounded-[24px] p-4">
        <div className="relative mx-auto h-80 w-56 overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-b from-sky-300/40 via-indigo-950/70 to-emerald-500/40">
          <div className="absolute inset-x-0 top-4 flex justify-center gap-2 opacity-80">
            <span className="text-sm">🪐</span>
            <span className="text-xs">⭐</span>
            <span className="text-sm">✨</span>
            <span className="text-xs">🌟</span>
          </div>
          <div className="absolute left-3 top-16 text-xs opacity-80">☁️</div>
          <div className="absolute right-3 top-24 text-sm opacity-80">🌙</div>
          <div className="absolute left-5 bottom-16 text-xs opacity-70">⭐</div>
          <div
            className="absolute left-1/2 transition-all duration-500"
            style={{
              bottom: `calc(${rocketPercent}% - 4px)`,
              transform: "translateX(-50%)"
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="rocket-trail" />
              <div className="rocket-flame-main" />
              <div className="rocket-flame-side rocket-flame-left" />
              <div className="rocket-flame-side rocket-flame-right" />
              <div className="rocket-body text-9xl leading-none">🚀</div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-8 bg-emerald-400/80" />
          <div className="absolute inset-x-0 bottom-6 h-3 bg-emerald-200/40 blur-sm" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-lg">
          <span>⭐</span>
          <span className="text-sm font-black text-white">{completedCount}/50 states finished</span>
          <span>⭐</span>
        </div>
        <div className="mt-3 flex justify-center">
          <div className="rounded-full border border-yellow-200/40 bg-yellow-300/20 px-4 py-2 text-base font-black text-yellow-100">
            Accuracy: {accuracy}%
          </div>
        </div>
        <p className="mt-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-yellow-200">
          Mission control
        </p>
        <p className="mt-1 text-center text-base font-semibold leading-7 text-slate-100/90">{status}</p>
        <p className="mt-2 text-center text-xs font-semibold text-slate-200/80">
          Hard states to revisit: {hardStateCount}
        </p>
      </div>
    </div>
  );
}
