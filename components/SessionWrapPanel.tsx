export function SessionWrapPanel({
  visible,
  sessionQuestions,
  sessionAccuracy,
  sessionBestStreak,
  masteredThisSession,
  headline,
  onResetSession
}: {
  visible: boolean;
  sessionQuestions: number;
  sessionAccuracy: number;
  sessionBestStreak: number;
  masteredThisSession: number;
  headline: string;
  onResetSession: () => void;
}) {
  if (!visible) {
    return null;
  }

  return (
    <section className="rounded-[28px] border border-gold/20 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
        Session Wrap
      </p>
      <h3 className="mt-2 text-2xl font-black">That was a strong stretch.</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{headline}</p>
      <div className="mt-4 grid grid-cols-4 gap-3">
        <Metric label="Questions" value={String(sessionQuestions)} />
        <Metric label="Accuracy" value={`${sessionAccuracy}%`} />
        <Metric label="Best streak" value={String(sessionBestStreak)} />
        <Metric label="5-star total" value={String(masteredThisSession)} />
      </div>
      <button
        type="button"
        onClick={onResetSession}
        className="mt-4 rounded-2xl bg-gold px-4 py-3 text-sm font-bold text-slate-950 transition hover:brightness-110"
      >
        Start a Fresh Session
      </button>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  );
}
