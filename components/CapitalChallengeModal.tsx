export function CapitalChallengeModal({
  stateName,
  options,
  onChoose
}: {
  stateName: string;
  options: string[];
  onChoose: (option: string) => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/55 p-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/20 bg-[#16305f] p-6 shadow-panel">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
          Capital Check
        </p>
        <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          What is the capital of {stateName}?
        </h3>
        <p className="mt-2 text-base text-slate-100/90">
          Pick the right capital to finish this state.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChoose(option)}
              className="rounded-3xl border border-white/20 bg-white/10 px-5 py-5 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:border-gold hover:bg-white/20"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
