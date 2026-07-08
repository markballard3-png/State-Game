export function ParentStudyPlan({
  plan
}: {
  plan: string[];
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-slate-900/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Parent Study Plan
      </p>
      <div className="mt-4 space-y-3">
        {plan.map((step, index) => (
          <div
            key={step}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200"
          >
            <span className="mr-2 text-gold">{index + 1}.</span>
            {step}
          </div>
        ))}
      </div>
    </section>
  );
}
