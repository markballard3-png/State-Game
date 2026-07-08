import { DifficultyLevel, DrillFocus } from "@/types/game";

export function PracticePresetPanel({
  onApplyPreset
}: {
  onApplyPreset: (preset: {
    drillFocus: DrillFocus;
    weakOnly: boolean;
    difficulty: DifficultyLevel;
    label: string;
  }) => void;
}) {
  const presets: Array<{
    label: string;
    drillFocus: DrillFocus;
    weakOnly: boolean;
    difficulty: DifficultyLevel;
  }> = [
    { label: "Warm-Up", drillFocus: "mixed", weakOnly: false, difficulty: 1 },
    { label: "Map Lock-In", drillFocus: "map", weakOnly: true, difficulty: 2 },
    { label: "Capital Grind", drillFocus: "capital-typed", weakOnly: true, difficulty: 3 },
    { label: "Game Speed", drillFocus: "mixed", weakOnly: false, difficulty: 4 }
  ];

  return (
    <section className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Practice Presets
      </p>
      <div className="mt-3 grid gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onApplyPreset(preset)}
            className="rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3 text-left text-sm text-slate-200 transition hover:border-neon hover:bg-neon/10"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </section>
  );
}
