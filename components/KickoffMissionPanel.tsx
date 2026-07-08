export function KickoffMissionPanel({
  missions
}: {
  missions: Array<{ label: string; detail: string; progress: string; done: boolean }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Kickoff Missions
      </p>
      <div className="mt-4 space-y-2">
        {missions.map((mission) => (
          <div
            key={mission.label}
            className={`rounded-2xl border px-3 py-3 ${
              mission.done ? "border-gold/40 bg-gold/10" : "border-white/10 bg-slate-950/50"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{mission.label}</span>
              <span
                className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  mission.done ? "text-gold" : "text-slate-500"
                }`}
              >
                {mission.progress}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{mission.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
