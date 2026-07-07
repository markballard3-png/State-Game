import { getRecommendedPractice, getRegionAccuracy, getRank } from "@/lib/game";
import { regions, states } from "@/data/states";
import { ProgressData } from "@/types/game";

export function ParentDashboard({
  progress,
  onResetProgress
}: {
  progress: ProgressData;
  onResetProgress: () => void;
}) {
  const masteredStates = states.filter(
    (state) => progress.byState[state.abbreviation].masteryScore >= 90
  );
  const masteredCapitals = states.filter(
    (state) => progress.byState[state.abbreviation].capitalCorrect >= 3
  );
  const mostMissedStates = [...states]
    .sort(
      (left, right) =>
        progress.byState[right.abbreviation].missedAnswers -
        progress.byState[left.abbreviation].missedAnswers
    )
    .slice(0, 5);
  const mostMissedCapitals = [...states]
    .sort(
      (left, right) =>
        progress.byState[right.abbreviation].capitalMissed -
        progress.byState[left.abbreviation].capitalMissed
    )
    .slice(0, 5);
  const recommended = getRecommendedPractice(progress);

  return (
    <section className="space-y-5">
      <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Parent Dashboard
        </p>
        <h2 className="mt-2 text-4xl font-black">Progress report</h2>
        <p className="mt-3 text-slate-300">
          All progress is saved locally in the browser for private family use.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="States mastered" value={`${masteredStates.length}/50`} />
        <MetricCard label="Capitals mastered" value={`${masteredCapitals.length}/50`} />
        <MetricCard
          label="Total questions"
          value={String(progress.stats.totalQuestions)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <MetricCard label="Current rank" value={getRank(progress)} />
        <MetricCard label="Best streak" value={String(progress.stats.bestStreak)} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Panel title="Most missed states">
          {mostMissedStates.map((state) => (
            <LineItem
              key={state.abbreviation}
              label={state.name}
              value={`${progress.byState[state.abbreviation].missedAnswers} misses`}
            />
          ))}
        </Panel>
        <Panel title="Most missed capitals">
          {mostMissedCapitals.map((state) => (
            <LineItem
              key={state.abbreviation}
              label={state.capital}
              value={`${progress.byState[state.abbreviation].capitalMissed} misses`}
            />
          ))}
        </Panel>
        <Panel title="Recommended next practice">
          {recommended.map((state) => (
            <LineItem
              key={state.abbreviation}
              label={state.name}
              value={`${progress.byState[state.abbreviation].masteryScore}% mastery`}
            />
          ))}
        </Panel>
      </div>
      <Panel title="Accuracy by region">
        {regions.map((region) => (
          <LineItem
            key={region}
            label={region}
            value={`${getRegionAccuracy(region, progress)}%`}
          />
        ))}
      </Panel>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onResetProgress}
          className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
        >
          Reset saved progress
        </button>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-black text-neon">{value}</p>
    </div>
  );
}

function Panel({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
      <span className="text-sm text-slate-200">{label}</span>
      <span className="text-sm font-semibold text-slate-400">{value}</span>
    </div>
  );
}
