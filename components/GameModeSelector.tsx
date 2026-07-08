import { GameMode } from "@/types/game";
import { modeLabels } from "@/lib/game";

export function GameModeSelector({
  activeMode,
  onChange,
  availability
}: {
  activeMode: GameMode;
  onChange: (mode: GameMode) => void;
  availability: Record<GameMode, { unlocked: boolean; reason: string }>;
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
        Pick A Game Mode
      </p>
      <div className="grid gap-2">
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            disabled={!availability[mode].unlocked}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              activeMode === mode
                ? "border-neon bg-neon/10 text-white shadow-glow"
                : availability[mode].unlocked
                  ? "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                  : "cursor-not-allowed border-white/5 bg-white/5 text-slate-500 opacity-70"
            }`}
          >
            <span className="block text-sm font-semibold">{modeLabels[mode]}</span>
            <span className="mt-1 block text-xs text-slate-400">{availability[mode].reason}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
