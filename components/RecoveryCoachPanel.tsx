export function RecoveryCoachPanel({ tips }: { tips: string[] }) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Recovery Coach
      </p>
      <div className="mt-4 space-y-2">
        {tips.map((tip) => (
          <div
            key={tip}
            className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3"
          >
            <p className="text-sm text-slate-200">{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
