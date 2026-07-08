import { ReviewQueueItem } from "@/types/game";

export function FocusDeckPanel({
  queue,
  focusedStateCode,
  onFocusState,
  onClearFocus
}: {
  queue: ReviewQueueItem[];
  focusedStateCode: string | null;
  onFocusState: (stateCode: string) => void;
  onClearFocus: () => void;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Focus Deck
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Pin one weak state so it stays in the next prompt rotation.
          </p>
        </div>
        {focusedStateCode ? (
          <button
            type="button"
            onClick={onClearFocus}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-neon hover:text-white"
          >
            Clear Focus
          </button>
        ) : null}
      </div>
      <div className="mt-4 space-y-2">
        {queue.map((item) => {
          const isFocused = item.state.abbreviation === focusedStateCode;

          return (
            <div
              key={item.state.abbreviation}
              className={`rounded-2xl border px-3 py-3 ${
                isFocused ? "border-neon/40 bg-neon/10" : "border-white/10 bg-slate-950/50"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{item.state.name}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.focus} · {item.state.capital}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onFocusState(item.state.abbreviation)}
                  className={`rounded-2xl px-3 py-2 text-xs font-semibold transition ${
                    isFocused
                      ? "bg-neon text-slate-950"
                      : "border border-white/10 bg-slate-900 text-slate-100 hover:border-neon"
                  }`}
                >
                  {isFocused ? "Focused" : "Focus Next"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
