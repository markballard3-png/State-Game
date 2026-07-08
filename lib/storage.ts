import { ProgressData, StateProgress } from "@/types/game";
import { regions, states } from "@/data/states";

export const STORAGE_KEY = "capital-kickoff-progress-v1";

export function createEmptyStateProgress(): StateProgress {
  return {
    masteryScore: 0,
    correctAnswers: 0,
    missedAnswers: 0,
    mapCorrect: 0,
    mapMissed: 0,
    capitalCorrect: 0,
    capitalMissed: 0,
    streak: 0,
    lastSeenAt: null
  };
}

export function createInitialProgress(): ProgressData {
  return {
    byState: Object.fromEntries(
      states.map((state) => [state.abbreviation, createEmptyStateProgress()])
    ),
    unlockedRegions: [regions[0]],
    badges: ["Season Kickoff"],
    trophies: [],
    stats: {
      totalQuestions: 0,
      correctAnswers: 0,
      bestStreak: 0,
      xp: 0,
      bowlTrophies: 0,
      seasonWins: 0,
      seasonLosses: 0
    }
  };
}

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") {
    return createInitialProgress();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return createInitialProgress();
  }

  try {
    const parsed = JSON.parse(stored) as Partial<ProgressData>;
    const base = createInitialProgress();

    return {
      ...base,
      ...parsed,
      byState: {
        ...base.byState,
        ...(parsed.byState ?? {})
      },
      stats: {
        ...base.stats,
        ...(parsed.stats ?? {})
      },
      unlockedRegions:
        parsed.unlockedRegions && parsed.unlockedRegions.length > 0
          ? parsed.unlockedRegions
          : base.unlockedRegions,
      badges: parsed.badges ?? base.badges,
      trophies: parsed.trophies ?? base.trophies
    };
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress: ProgressData) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
