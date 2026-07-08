export function FocusTimerPanel({
  seconds,
  label
}: {
  seconds: number;
  label: string;
}) {
  const minutes = Math.floor(seconds / 60);
  const remaining = String(seconds % 60).padStart(2, "0");

  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Focus Timer
      </p>
      <p className="mt-3 text-3xl font-black text-white">
        {minutes}:{remaining}
      </p>
      <p className="mt-2 text-sm text-slate-300">{label}</p>
    </section>
  );
}
