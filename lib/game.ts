import { rivalries } from "@/data/rivalries";
import { regions, states } from "@/data/states";
import {
  DrillFocus,
  DifficultyLevel,
  GameMode,
  ProgressData,
  Prompt,
  QuestionType,
  Region,
  StateInfo
} from "@/types/game";

export const modeLabels: Record<GameMode, string> = {
  practice: "Practice Facility",
  roadTrip: "Road Trip Season",
  rivalry: "Rivalry Week",
  bowl: "Bowl Review",
  championship: "Championship Mode",
  dashboard: "Parent Dashboard"
};

export function getStateByCode(code: string) {
  return states.find((state) => state.abbreviation === code);
}

export function buildCapitalOptions(target: StateInfo, pool: StateInfo[]) {
  const sameRegion = pool.filter(
    (state) =>
      state.abbreviation !== target.abbreviation &&
      state.region === target.region &&
      state.capital !== target.capital
  );
  const fallback = pool.filter(
    (state) =>
      state.abbreviation !== target.abbreviation && state.capital !== target.capital
  );

  const distractors = shuffle([...sameRegion, ...fallback])
    .slice(0, 3)
    .map((state) => state.capital);

  return shuffle([target.capital, ...distractors]);
}

export function shuffle<T>(items: T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export function getQuestionType(difficulty: DifficultyLevel): QuestionType {
  if (difficulty === 1) return Math.random() > 0.5 ? "map" : "capital-choice";
  if (difficulty === 2) return Math.random() > 0.55 ? "map" : "capital-choice";
  if (difficulty === 3) return Math.random() > 0.45 ? "capital-typed" : "map";
  if (difficulty === 4) {
    return shuffle<QuestionType>(["map", "capital-choice", "capital-typed"])[0];
  }
  return Math.random() > 0.5 ? "map" : "capital-typed";
}

export function weightedPool(pool: StateInfo[], progress: ProgressData) {
  const weighted: StateInfo[] = [];

  pool.forEach((state) => {
    const entry = progress.byState[state.abbreviation];
    const missedWeight = 1 + entry.missedAnswers;
    const masteryPenalty = entry.masteryScore >= 90 ? 0 : 3;
    const repetitions = Math.max(1, missedWeight + masteryPenalty - Math.floor(entry.masteryScore / 35));

    for (let index = 0; index < repetitions; index += 1) {
      weighted.push(state);
    }
  });

  return weighted.length > 0 ? weighted : pool;
}

export function buildPrompt({
  mode,
  difficulty,
  progress,
  activeRegion,
  drillFocus,
  weakOnly
}: {
  mode: GameMode;
  difficulty: DifficultyLevel;
  progress: ProgressData;
  activeRegion: Region;
  drillFocus: DrillFocus;
  weakOnly: boolean;
}): Prompt | null {
  if (mode === "dashboard") {
    return null;
  }

  if (mode === "rivalry") {
    return {
      kind: "rivalry",
      matchup: shuffle(rivalries)[0]
    };
  }

  let pool = states;

  if (mode === "practice" || mode === "roadTrip") {
    pool = states.filter((state) => state.region === activeRegion);
  }

  if (mode === "bowl") {
    pool = states.filter((state) => progress.byState[state.abbreviation].missedAnswers > 0);

    if (pool.length === 0) {
      pool = states.filter((state) => progress.byState[state.abbreviation].masteryScore < 85);
    }
  }

  if (weakOnly) {
    const weakPool = pool.filter(
      (state) => progress.byState[state.abbreviation].masteryScore < 70
    );

    if (weakPool.length > 0) {
      pool = weakPool;
    }
  }

  const chosenState = shuffle(weightedPool(pool, progress))[0];
  const questionType =
    drillFocus === "mixed"
      ? mode === "bowl"
        ? shuffle<QuestionType>(["map", "capital-choice", "capital-typed"])[0]
        : getQuestionType(difficulty)
      : drillFocus;

  return {
    kind: "standard",
    questionType,
    state: chosenState,
    options:
      questionType === "capital-choice" ? buildCapitalOptions(chosenState, states) : undefined,
    mode
  };
}

export function getRank(progress: ProgressData) {
  const mastered = Object.values(progress.byState).filter(
    (entry) => entry.masteryScore >= 90
  ).length;
  const accuracy = progress.stats.totalQuestions
    ? progress.stats.correctAnswers / progress.stats.totalQuestions
    : 0;

  if (mastered >= 50 && accuracy >= 0.9) return "National Champion";
  if (mastered >= 40) return "All-American";
  if (mastered >= 30) return "Bowl MVP";
  if (mastered >= 20) return "Team Captain";
  if (mastered >= 10) return "Starter";
  if (progress.stats.totalQuestions >= 10) return "Backup";
  return "Walk-On";
}

export function getRecruitingTier(score: number) {
  if (score >= 90) return "5-Star Mastered States";
  if (score >= 70) return "4-Star Almost There";
  if (score >= 40) return "3-Star Needs Practice";
  return "Walk-On States";
}

export function updateProgressForAnswer({
  progress,
  stateCode,
  questionType,
  wasCorrect
}: {
  progress: ProgressData;
  stateCode: string;
  questionType: QuestionType;
  wasCorrect: boolean;
}) {
  const entry = progress.byState[stateCode];
  const nextEntry = {
    ...entry,
    lastSeenAt: Date.now(),
    correctAnswers: entry.correctAnswers + (wasCorrect ? 1 : 0),
    missedAnswers: entry.missedAnswers + (wasCorrect ? 0 : 1),
    mapCorrect: entry.mapCorrect + (wasCorrect && questionType === "map" ? 1 : 0),
    mapMissed: entry.mapMissed + (!wasCorrect && questionType === "map" ? 1 : 0),
    capitalCorrect:
      entry.capitalCorrect +
      (wasCorrect && questionType !== "map" ? 1 : 0),
    capitalMissed:
      entry.capitalMissed +
      (!wasCorrect && questionType !== "map" ? 1 : 0),
    streak: wasCorrect ? entry.streak + 1 : 0,
    masteryScore: Math.max(
      0,
      Math.min(100, entry.masteryScore + (wasCorrect ? 12 : -6))
    )
  };
  const nextByState = {
    ...progress.byState,
    [stateCode]: nextEntry
  };

  const nextUnlockedRegions = [...progress.unlockedRegions];

  regions.forEach((region, index) => {
    if (nextUnlockedRegions.includes(region)) {
      return;
    }

    if (index === 0) {
      nextUnlockedRegions.push(region);
      return;
    }

    const regionComplete = states
      .filter((state) => state.region === regions[index - 1])
      .every((state) => nextByState[state.abbreviation].masteryScore >= 70);

    if (regionComplete) {
      nextUnlockedRegions.push(region);
    }
  });

  const baseProgress = {
    ...progress,
    byState: nextByState,
    unlockedRegions: nextUnlockedRegions,
    stats: {
      ...progress.stats,
      totalQuestions: progress.stats.totalQuestions + 1,
      correctAnswers: progress.stats.correctAnswers + (wasCorrect ? 1 : 0),
      bestStreak: Math.max(progress.stats.bestStreak, nextEntry.streak),
      xp: progress.stats.xp + (wasCorrect ? (questionType === "capital-typed" ? 18 : 12) : 3),
      seasonWins: progress.stats.seasonWins + (wasCorrect ? 1 : 0),
      seasonLosses: progress.stats.seasonLosses + (wasCorrect ? 0 : 1)
    }
  };

  const trophies = getEarnedTrophies(baseProgress);
  const badges = getEarnedBadges(baseProgress);

  return {
    ...baseProgress,
    badges,
    trophies,
    stats: {
      ...baseProgress.stats,
      bowlTrophies: trophies.filter((trophy) => trophy.includes("Bowl")).length
    }
  };
}

export function getRegionAccuracy(region: Region, progress: ProgressData) {
  const pool = states.filter((state) => state.region === region);
  const correct = pool.reduce(
    (sum, state) => sum + progress.byState[state.abbreviation].correctAnswers,
    0
  );
  const total = pool.reduce(
    (sum, state) =>
      sum +
      progress.byState[state.abbreviation].correctAnswers +
      progress.byState[state.abbreviation].missedAnswers,
    0
  );

  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

export function getRecommendedPractice(progress: ProgressData) {
  const sorted = [...states].sort((left, right) => {
    const leftEntry = progress.byState[left.abbreviation];
    const rightEntry = progress.byState[right.abbreviation];
    return (
      leftEntry.masteryScore - rightEntry.masteryScore ||
      rightEntry.missedAnswers - leftEntry.missedAnswers
    );
  });

  return sorted.slice(0, 5);
}

export function getWeakStates(progress: ProgressData) {
  return [...states]
    .sort((left, right) => {
      const leftEntry = progress.byState[left.abbreviation];
      const rightEntry = progress.byState[right.abbreviation];
      return (
        leftEntry.masteryScore - rightEntry.masteryScore ||
        rightEntry.missedAnswers - leftEntry.missedAnswers
      );
    })
    .slice(0, 4);
}

export function getConferenceStandings(progress: ProgressData) {
  return regions.map((region) => {
    const regionStates = states.filter((state) => state.region === region);
    const mastered = regionStates.filter(
      (state) => progress.byState[state.abbreviation].masteryScore >= 70
    ).length;

    return {
      region,
      mastered,
      total: regionStates.length,
      accuracy: getRegionAccuracy(region, progress)
    };
  });
}

export function getNextPracticeLabel(progress: ProgressData) {
  const weakest = getRecommendedPractice(progress)[0];

  if (!weakest) {
    return "Kick off your first drill.";
  }

  return `${weakest.name} and ${weakest.capital} need the next rep.`;
}

export function getEarnedBadges(progress: ProgressData) {
  const badges = ["Season Kickoff"];
  const mastered = Object.values(progress.byState).filter(
    (entry) => entry.masteryScore >= 90
  ).length;

  if (progress.stats.bestStreak >= 5) badges.push("Hot Streak");
  if (progress.stats.totalQuestions >= 25) badges.push("Film Room Grinder");
  if (mastered >= 10) badges.push("Ten-State Tackler");
  if (mastered >= 25) badges.push("Conference Closer");
  if (mastered >= 50) badges.push("National Champion");

  return badges;
}

export function getEarnedTrophies(progress: ProgressData) {
  const trophies = [...progress.trophies];
  const mastered = Object.values(progress.byState).filter(
    (entry) => entry.masteryScore >= 90
  ).length;

  regions.forEach((region) => {
    const regionCleared = states
      .filter((state) => state.region === region)
      .every((state) => progress.byState[state.abbreviation].masteryScore >= 70);

    if (regionCleared && !trophies.includes(`${region} Bowl`)) {
      trophies.push(`${region} Bowl`);
    }
  });

  if (mastered >= 50 && !trophies.includes("National Championship Trophy")) {
    trophies.push("National Championship Trophy");
  }

  return trophies;
}
