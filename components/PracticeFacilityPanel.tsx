import { DrillFocus } from "@/types/game";

const focusOptions: Array<{ value: DrillFocus; label: string }> = [
  { value: "mixed", label: "Mixed reps" },
  { value: "map", label: "Map only" },
  { value: "capital-choice", label: "Capital multiple choice" },
  { value: "capital-typed", label: "Capital typed" }
];

export function PracticeFacilityPanel({
  drillFocus,
  weakOnly,
  onDrillFocusChange,
  onWeakOnlyChange
}: {
  drillFocus: DrillFocus;
  weakOnly: boolean;
  onDrillFocusChange: (value: DrillFocus) => void;
  onWeakOnlyChange: (value: boolean) => void;
}) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Practice Facility
      </p>
      <div className="mt-3 grid gap-2">
        {focusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onDrillFocusChange(option.value)}
            className={`rounded-2xl border px-3 py-2 text-left text-sm ${
              drillFocus === option.value
                ? "border-neon bg-neon/10 text-white"
                : "border-white/10 bg-slate-950/50 text-slate-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onWeakOnlyChange(!weakOnly)}
        className={`mt-4 w-full rounded-2xl border px-3 py-3 text-left text-sm ${
          weakOnly
            ? "border-gold bg-gold/10 text-gold"
            : "border-white/10 bg-slate-950/50 text-slate-300"
        }`}
      >
        {weakOnly ? "Weak-state review enabled" : "Focus only on weak states"}
      </button>
    </section>
  );
}
