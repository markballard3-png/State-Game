export function UnlockPreviewPanel({
  items
}: {
  items: Array<{ mode: string; status: string; detail: string; unlocked: boolean }>;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Unlock Preview
      </p>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div
            key={item.mode}
            className={`rounded-2xl border px-3 py-3 ${
              item.unlocked ? "border-neon/30 bg-neon/10" : "border-white/10 bg-slate-950/50"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{item.mode}</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {item.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
