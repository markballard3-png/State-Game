import { StateInfo } from "@/types/game";

export function PlaybookPanel({
  script,
  mapTargets,
  capitalTargets
}: {
  script: string[];
  mapTargets: StateInfo[];
  capitalTargets: StateInfo[];
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Practice Playbook
      </p>
      <div className="mt-4 space-y-3">
        {script.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm text-slate-200"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Map Targets</p>
          <p className="mt-2 text-sm text-white">
            {mapTargets.map((state) => state.name).join(", ") || "None"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Capital Targets</p>
          <p className="mt-2 text-sm text-white">
            {capitalTargets.map((state) => state.capital).join(", ") || "None"}
          </p>
        </div>
      </div>
    </section>
  );
}
