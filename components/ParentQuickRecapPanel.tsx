export function ParentQuickRecapPanel({ recap }: { recap: string[] }) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-slate-900/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
        Quick Recap
      </p>
      <div className="mt-4 space-y-2">
        {recap.map((line) => (
          <div
            key={line}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200"
          >
            {line}
          </div>
        ))}
      </div>
    </section>
  );
}
