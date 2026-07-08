export function SessionGoalsPanel({
  sessionQuestions,
  sessionCorrect,
  streak,
  focusedStateName,
  focusedStateMastery
}: {
  sessionQuestions: number;
  sessionCorrect: number;
  streak: number;
  focusedStateName: string | null;
  focusedStateMastery?: number;
}) {
  const sessionAccuracy = sessionQuestions
    ? Math.round((sessionCorrect / sessionQuestions) * 100)
    : 0;
  const goals = [
    {
      label: "Warm-up reps",
      detail: `${Math.min(sessionQuestions, 5)}/5 questions`,
      done: sessionQuestions >= 5
    },
    {
      label: "Stay above 80%",
      detail: sessionQuestions === 0 ? "Start the session" : `${sessionAccuracy}% accuracy`,
      done: sessionQuestions >= 5 && sessionAccuracy >= 80
    },
    {
      label: "Build a streak",
      detail: `${Math.min(streak, 5)}/5 correct in a row`,
      done: streak >= 5
    },
    {
      label: focusedStateName ? `Focus ${focusedStateName}` : "Set a focus state",
      detail:
        focusedStateName && typeof focusedStateMastery === "number"
          ? `${focusedStateMastery}% mastery`
          : "Pin a review state below",
      done: typeof focusedStateMastery === "number" ? focusedStateMastery >= 70 : false
    }
  ];
  const completedGoals = goals.filter((goal) => goal.done).length;

  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Session Goals
      </p>
      <p className="mt-2 text-sm text-slate-300">
        {completedGoals}/4 goals cleared in this session.
      </p>
      <div className="mt-4 space-y-2">
        {goals.map((goal) => (
          <div
            key={goal.label}
            className={`rounded-2xl border px-3 py-3 ${
              goal.done
                ? "border-neon/40 bg-neon/10"
                : "border-white/10 bg-slate-950/50"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{goal.label}</span>
              <span
                className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  goal.done ? "text-neon" : "text-slate-500"
                }`}
              >
                {goal.done ? "Done" : "Live"}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{goal.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
