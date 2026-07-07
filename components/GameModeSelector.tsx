import { GameMode } from "@/types/game";
import { modeLabels } from "@/lib/game";

export function GameModeSelector({
  activeMode,
  onChange
}: {
  activeMode: GameMode;
  onChange: (mode: GameMode) => void;
}) {
  const modes: GameMode[] = [
    "practice",
    "roadTrip",
    "rivalry",
    "bowl",
    "championship",
    "dashboard"
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
        Start Your Season
      </p>
      <div className="grid gap-2">
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              activeMode === mode
                ? "border-neon bg-neon/10 text-white shadow-glow"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <span className="block text-sm font-semibold">{modeLabels[mode]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
