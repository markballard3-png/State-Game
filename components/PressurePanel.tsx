export function PressurePanel({
  headline,
  detail
}: {
  headline: string;
  detail: string;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Pressure Check
      </p>
      <h3 className="mt-3 text-lg font-black text-white">{headline}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
    </section>
  );
}
