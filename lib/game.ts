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

export function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\bst\b/g, "saint")
    .replace(/\s+/g, " ");
}

export function isCorrectCapitalAnswer(answer: string, capital: string) {
  const normalizedAnswer = normalizeAnswer(answer);
  const normalizedCapital = normalizeAnswer(capital);

  if (normalizedAnswer === normalizedCapital) {
    return true;
  }

  if (normalizedCapital === "saint paul" && normalizedAnswer === "st paul") {
    return true;
  }

  return false;
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
  weakOnly,
  forcedStateCode
}: {
  mode: GameMode;
  difficulty: DifficultyLevel;
  progress: ProgressData;
  activeRegion: Region;
  drillFocus: DrillFocus;
  weakOnly: boolean;
  forcedStateCode?: string | null;
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

  const forcedState =
    forcedStateCode
      ? states.find((state) => state.abbreviation === forcedStateCode)
      : undefined;
  const chosenState = forcedState ?? shuffle(weightedPool(pool, progress))[0];
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

export function getMasteredCount(progress: ProgressData) {
  return Object.values(progress.byState).filter((entry) => entry.masteryScore >= 90).length;
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

export function getRegionMastery(region: Region, progress: ProgressData) {
  const regionStates = states.filter((state) => state.region === region);
  const totalMastery = regionStates.reduce(
    (sum, state) => sum + progress.byState[state.abbreviation].masteryScore,
    0
  );

  return Math.round(totalMastery / regionStates.length);
}

export function getBowlName(region: Region) {
  const names: Record<Region, string> = {
    "Northeast Division": "New England Bowl",
    "ACC / Atlantic Division": "Atlantic Coast Bowl",
    "SEC South Division": "Dixie Bowl",
    "Big Ten Midwest Division": "Great Lakes Bowl",
    "Big 12 Plains Division": "Heartland Bowl",
    "Mountain West Division": "Rocky Mountain Bowl",
    "Pac-12 West Coast Division": "Pacific Coast Bowl"
  };

  return names[region];
}

export function getNationalRanking(progress: ProgressData) {
  const mastered = Object.values(progress.byState).filter(
    (entry) => entry.masteryScore >= 90
  ).length;
  const accuracy = progress.stats.totalQuestions
    ? Math.round((progress.stats.correctAnswers / progress.stats.totalQuestions) * 100)
    : 0;
  const score = mastered * 4 + accuracy + progress.stats.bestStreak;

  if (score >= 290) return 1;
  if (score >= 260) return 3;
  if (score >= 230) return 7;
  if (score >= 200) return 12;
  if (score >= 170) return 18;
  if (score >= 140) return 25;
  return 40;
}

export function getSeasonObjectives(progress: ProgressData) {
  const mastered = getMasteredCount(progress);

  return [
    {
      label: "Unlock next region",
      current: progress.unlockedRegions.length,
      target: regions.length
    },
    {
      label: "5-star states",
      current: mastered,
      target: 50
    },
    {
      label: "Bowl trophies",
      current: progress.stats.bowlTrophies,
      target: 7
    }
  ];
}

export function getModeAvailability(progress: ProgressData) {
  const mastered = getMasteredCount(progress);
  const totalQuestions = progress.stats.totalQuestions;
  const reviewCount = Object.values(progress.byState).filter(
    (entry) => entry.missedAnswers > 0
  ).length;

  return {
    practice: { unlocked: true, reason: "Always available" },
    roadTrip: {
      unlocked: progress.unlockedRegions.length >= 1,
      reason: "Start with your first region"
    },
    rivalry: {
      unlocked: totalQuestions >= 8,
      reason: "Answer 8 total questions to unlock Rivalry Week"
    },
    bowl: {
      unlocked: reviewCount >= 3,
      reason: "Miss 3 states or capitals to unlock Bowl Review"
    },
    championship: {
      unlocked: progress.unlockedRegions.length === regions.length && mastered >= 20,
      reason: "Unlock all regions and master 20 states"
    },
    dashboard: { unlocked: true, reason: "Always available" }
  };
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

export function getMostMissedCapitals(progress: ProgressData) {
  return [...states]
    .sort(
      (left, right) =>
        progress.byState[right.abbreviation].capitalMissed -
        progress.byState[left.abbreviation].capitalMissed ||
        progress.byState[right.abbreviation].missedAnswers -
          progress.byState[left.abbreviation].missedAnswers
    )
    .slice(0, 4);
}

export function getMostMissedMapStates(progress: ProgressData) {
  return [...states]
    .sort(
      (left, right) =>
        progress.byState[right.abbreviation].mapMissed -
        progress.byState[left.abbreviation].mapMissed ||
        progress.byState[right.abbreviation].missedAnswers -
          progress.byState[left.abbreviation].missedAnswers
    )
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

export function getHalftimeSummary(progress: ProgressData) {
  const totalQuestions = progress.stats.totalQuestions;
  const accuracy = totalQuestions
    ? Math.round((progress.stats.correctAnswers / totalQuestions) * 100)
    : 0;
  const mastered = getMasteredCount(progress);

  if (totalQuestions < 8) {
    return "Early drive. Keep stacking reps to build your scouting report.";
  }

  if (accuracy >= 85 && mastered >= 10) {
    return "Halftime lead. The offense is sharp and the season is trending up.";
  }

  if (accuracy >= 70) {
    return "Competitive game. A few weak states need extra film-room work.";
  }

  return "Tough first half. Slow down, use the memory hooks, and attack weak regions.";
}

export function getPracticeScript(progress: ProgressData) {
  const weakMap = getMostMissedMapStates(progress)[0];
  const weakCapital = getMostMissedCapitals(progress)[0];
  const weakState = getWeakStates(progress)[0];

  return [
    weakMap
      ? `Map drill first: revisit ${weakMap.name} and its neighbors.`
      : "Map drill first: keep building state-location reps.",
    weakCapital
      ? `Capital call: quiz ${weakCapital.capital} until recall feels automatic.`
      : "Capital call: keep rotating multiple-choice and typed capitals.",
    weakState
      ? `Memory hook: say '${weakState.memoryHook}' before the next snap.`
      : "Memory hook: use the team anchor before each answer."
  ];
}

export function getReviewQueue(progress: ProgressData) {
  return [...states]
    .sort((left, right) => {
      const leftEntry = progress.byState[left.abbreviation];
      const rightEntry = progress.byState[right.abbreviation];
      const leftPriority =
        leftEntry.mapMissed + leftEntry.capitalMissed + leftEntry.missedAnswers;
      const rightPriority =
        rightEntry.mapMissed + rightEntry.capitalMissed + rightEntry.missedAnswers;

      return rightPriority - leftPriority || leftEntry.masteryScore - rightEntry.masteryScore;
    })
    .slice(0, 8)
    .map((state) => {
      const entry = progress.byState[state.abbreviation];

      return {
        state,
        priority: entry.mapMissed + entry.capitalMissed + entry.missedAnswers,
        focus:
          entry.mapMissed > entry.capitalMissed
            ? "Map location"
            : entry.capitalMissed > 0
              ? "Capital recall"
              : "Mixed review"
      };
    });
}

export function getParentStudyPlan(progress: ProgressData) {
  const mapTargets = getMostMissedMapStates(progress).slice(0, 2);
  const capitalTargets = getMostMissedCapitals(progress).slice(0, 2);
  const weakRegions = regions
    .map((region) => ({ region, accuracy: getRegionAccuracy(region, progress) }))
    .sort((left, right) => left.accuracy - right.accuracy)
    .slice(0, 2);

  return [
    weakRegions[0]
      ? `Start with ${weakRegions[0].region} because it has the lowest accuracy right now.`
      : "Start with the current region and keep sessions short.",
    mapTargets.length > 0
      ? `Run map-only reps for ${mapTargets.map((state) => state.name).join(" and ")}.`
      : "Run a short map-only session first.",
    capitalTargets.length > 0
      ? `Finish with typed capitals for ${capitalTargets.map((state) => state.capital).join(" and ")}.`
      : "Finish with 3 typed capital answers for retrieval practice."
  ];
}

export function getAdaptivePracticeInsights(progress: ProgressData, activeRegion: Region) {
  const weakState = getWeakStates(progress)[0];
  const weakCapital = getMostMissedCapitals(progress)[0];
  const regionAccuracy = getRegionAccuracy(activeRegion, progress);

  return [
    weakState
      ? `${weakState.name} is still the lowest-mastery state. Keep it in the next drill block.`
      : "No weak state stands out yet. Keep spreading reps around the board.",
    weakCapital
      ? `${weakCapital.capital} is the shakiest capital recall right now. Use typed reps next.`
      : "Capital recall is staying balanced so far.",
    regionAccuracy >= 80
      ? `${activeRegion} is running hot at ${regionAccuracy}% accuracy.`
      : `${activeRegion} needs more reps at ${regionAccuracy}% accuracy.`
  ];
}

export function getKickoffMissions({
  progress,
  sessionQuestions,
  sessionCorrect,
  streak,
  focusedStateCode,
  focusedStateMastery
}: {
  progress: ProgressData;
  sessionQuestions: number;
  sessionCorrect: number;
  streak: number;
  focusedStateCode: string | null;
  focusedStateMastery?: number;
}) {
  const sessionAccuracy = sessionQuestions
    ? Math.round((sessionCorrect / sessionQuestions) * 100)
    : 0;
  const mastered = getMasteredCount(progress);

  return [
    {
      label: "Open the playbook",
      detail: "Get 12 questions on the board this session.",
      progress: `${Math.min(sessionQuestions, 12)}/12`,
      done: sessionQuestions >= 12
    },
    {
      label: "Protect the drive",
      detail: "Hold 80% accuracy once the warm-up ends.",
      progress: sessionQuestions === 0 ? "0%" : `${sessionAccuracy}%`,
      done: sessionQuestions >= 6 && sessionAccuracy >= 80
    },
    {
      label: "Chain mover",
      detail: "Reach a 6-answer streak.",
      progress: `${Math.min(streak, 6)}/6`,
      done: streak >= 6
    },
    {
      label: "5-star chase",
      detail: focusedStateCode
        ? "Push the pinned focus state toward stronger mastery."
        : "Pin a focus state and turn it around.",
      progress:
        focusedStateCode && typeof focusedStateMastery === "number"
          ? `${focusedStateMastery}%`
          : `${mastered}/50`,
      done: typeof focusedStateMastery === "number" ? focusedStateMastery >= 70 : false
    }
  ];
}

export function getAchievementSpotlight(progress: ProgressData) {
  const mastered = getMasteredCount(progress);
  const nextBadgeTarget =
    progress.stats.bestStreak < 5
      ? "Reach a 5-answer streak for Hot Streak."
      : progress.stats.totalQuestions < 25
        ? `Answer ${25 - progress.stats.totalQuestions} more questions for Film Room Grinder.`
        : mastered < 10
          ? `Master ${10 - mastered} more states for Ten-State Tackler.`
          : mastered < 25
            ? `Master ${25 - mastered} more states for Conference Closer.`
            : "Keep pushing toward all 50 mastered states.";

  if (progress.trophies.includes("National Championship Trophy")) {
    return {
      headline: "National Championship Trophy",
      detail: "You already cleared the biggest trophy on the board.",
      nextTarget: "Keep polishing weak states and preserve elite accuracy."
    };
  }

  if (mastered >= 25) {
    return {
      headline: "Conference Closer Pace",
      detail: `${mastered} states are already at 5-star mastery.`,
      nextTarget: nextBadgeTarget
    };
  }

  return {
    headline: progress.badges[progress.badges.length - 1] ?? "Season Kickoff",
    detail: `Current rank is built on ${progress.badges.length} earned badges and ${progress.trophies.length} trophies.`,
    nextTarget: nextBadgeTarget
  };
}

export function getRegionBossChallenge(progress: ProgressData, region: Region) {
  const regionStates = states.filter((state) => state.region === region);
  const cleared = regionStates.filter(
    (state) => progress.byState[state.abbreviation].masteryScore >= 70
  ).length;
  const weakest = [...regionStates].sort(
    (left, right) =>
      progress.byState[left.abbreviation].masteryScore -
      progress.byState[right.abbreviation].masteryScore
  )[0];

  return {
    title: `${region} Boss Battle`,
    detail:
      cleared === regionStates.length
        ? "This region is cleared. Keep polishing it toward full mastery."
        : "Get every state in this region to 70% mastery to beat the boss.",
    progressLabel: `${cleared}/${regionStates.length} states at 70%+`,
    weakestState: weakest
      ? `${weakest.name} · ${progress.byState[weakest.abbreviation].masteryScore}% mastery`
      : "No weak link found"
  };
}

export function getModeUnlockPreview(progress: ProgressData) {
  const availability = getModeAvailability(progress);

  return [
    {
      mode: "Rivalry Week",
      status: availability.rivalry.unlocked ? "Live" : "Locked",
      detail: availability.rivalry.reason,
      unlocked: availability.rivalry.unlocked
    },
    {
      mode: "Bowl Review",
      status: availability.bowl.unlocked ? "Live" : "Locked",
      detail: availability.bowl.reason,
      unlocked: availability.bowl.unlocked
    },
    {
      mode: "Championship Mode",
      status: availability.championship.unlocked ? "Live" : "Locked",
      detail: availability.championship.reason,
      unlocked: availability.championship.unlocked
    }
  ];
}

export function getRecoveryCoachTips({
  misses,
  promptState,
  promptQuestionType,
  focusedStateName,
  weakStates
}: {
  misses: number;
  promptState?: StateInfo | null;
  promptQuestionType?: string | null;
  focusedStateName?: string | null;
  weakStates: StateInfo[];
}) {
  return [
    promptState
      ? `Slow it down on ${promptState.name} and say the hook out loud before answering.`
      : "Use the state memory hook before each answer.",
    promptQuestionType === "map"
      ? `After ${misses} miss${misses === 1 ? "" : "es"}, use neighbors and region first.`
      : "If typed recall slips, switch your brain to first letters before full retrieval.",
    focusedStateName
      ? `${focusedStateName} is pinned, so give it one clean recovery rep next.`
      : weakStates[0]
        ? `${weakStates[0].name} should be the first bounce-back rep.`
        : "Pick one weak state and give it a focused comeback rep."
  ];
}

export function getDailyChallenge(progress: ProgressData) {
  const daySeed = new Date().toISOString().slice(0, 10);
  const hash = daySeed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const targetState = states[hash % states.length];
  const entry = progress.byState[targetState.abbreviation];
  const completed = entry.correctAnswers >= 3 || entry.masteryScore >= 70;

  return {
    title: `${targetState.name} Spotlight`,
    detail: `Score three clean reps or push ${targetState.name} to 70% mastery today.`,
    progressLabel: `${Math.min(entry.correctAnswers, 3)}/3 clean reps · ${entry.masteryScore}% mastery`,
    completed
  };
}

export function getHintLadder(state: StateInfo, questionType: string) {
  if (questionType === "map") {
    return [
      `This state plays in the ${state.region}.`,
      `Its code is ${state.abbreviation}.`,
      `Neighbors: ${state.neighboringStates.join(", ") || "No bordering states"}.`
    ];
  }

  return [
    `Team anchor: ${state.primaryTeamAnchor}.`,
    `Capital starts with ${state.capital[0]}.`,
    `Memory hook: ${state.memoryHook}`
  ];
}

export function getChampionshipReadiness(progress: ProgressData) {
  const mastered = getMasteredCount(progress);
  const accuracy = progress.stats.totalQuestions
    ? Math.round((progress.stats.correctAnswers / progress.stats.totalQuestions) * 100)
    : 0;
  const regionsUnlocked = progress.unlockedRegions.length;
  const reviewCount = Object.values(progress.byState).filter(
    (entry) => entry.missedAnswers > 0
  ).length;
  const score = Math.min(100, mastered * 2 + accuracy / 2 + regionsUnlocked * 4 - reviewCount);

  return {
    score,
    summary:
      score >= 85
        ? "The roster is close to title-game form."
        : score >= 65
          ? "The foundation is strong, but a few weak states still matter."
          : "More reps are needed before the title run feels safe.",
    nextStep:
      mastered < 20
        ? `Master ${20 - mastered} more states to strengthen the championship case.`
        : accuracy < 80
          ? "Raise overall accuracy above 80%."
          : "Keep cleaning up review states and protect your streak."
  };
}

export function getRegionVictoryStatus(progress: ProgressData, activeRegion: Region) {
  const completedBowls = progress.trophies.filter((trophy) => trophy.includes("Bowl")).length;
  const activeStates = states.filter((state) => state.region === activeRegion);
  const cleared = activeStates.filter(
    (state) => progress.byState[state.abbreviation].masteryScore >= 70
  ).length;

  return {
    title: completedBowls > 0 ? "Conference banners are going up." : "First banner is still ahead.",
    detail:
      completedBowls > 0
        ? "Completed regions now feed real season momentum."
        : "Clear one full region at 70% mastery to earn the first bowl banner.",
    completedCount: `${completedBowls}/${regions.length} regional bowls`,
    currentStatus: `${activeRegion}: ${cleared}/${activeStates.length} at 70%+`
  };
}

export function getFamilyHuddleNotes(progress: ProgressData) {
  const weakState = getWeakStates(progress)[0];
  const rank = getRank(progress);
  const accuracy = progress.stats.totalQuestions
    ? Math.round((progress.stats.correctAnswers / progress.stats.totalQuestions) * 100)
    : 0;

  return [
    `Current rank: ${rank}. Keep sessions short and confident.`,
    weakState
      ? `${weakState.name} is still the best place for a calm recovery rep.`
      : "No single state is dragging the session right now.",
    accuracy >= 80
      ? `Accuracy is strong at ${accuracy}%. Celebrate consistency today.`
      : `Accuracy is ${accuracy}%. Slow down and favor retrieval over speed.`
  ];
}

export function getDriveBonuses(driveYards: number, streak: number, playClock: number) {
  return [
    driveYards >= 50 ? "Midfield bonus active." : "Cross midfield to unlock a drive bonus.",
    streak >= 4 ? "Streak bonus active." : "Reach a 4-play streak for streak bonus points.",
    playClock >= 15 ? "Tempo bonus available." : "Answer quicker to keep the tempo bonus alive."
  ];
}

export function getPressureSummary({
  down,
  yardsToGo,
  playClock
}: {
  down: number;
  yardsToGo: number;
  playClock: number;
}) {
  if (down >= 4 && yardsToGo >= 8) {
    return {
      headline: "Fourth-down pressure",
      detail: `Need ${yardsToGo} yards with ${playClock}s on the clock. Pick the safest rep.`
    };
  }

  if (playClock <= 10) {
    return {
      headline: "Tempo pressure",
      detail: `Only ${playClock}s left. Trust the first good recall and snap the answer.`
    };
  }

  return {
    headline: "Manageable situation",
    detail: `${yardsToGo} yards to go on down ${down}. Stay calm and keep the drive alive.`
  };
}

export function getSessionMilestones({
  sessionQuestions,
  sessionCorrect,
  sessionBestStreak,
  sessionHighScore
}: {
  sessionQuestions: number;
  sessionCorrect: number;
  sessionBestStreak: number;
  sessionHighScore: number;
}) {
  const accuracy = sessionQuestions
    ? Math.round((sessionCorrect / sessionQuestions) * 100)
    : 0;

  return [
    {
      label: "10-question set",
      progress: `${Math.min(sessionQuestions, 10)}/10`,
      done: sessionQuestions >= 10
    },
    {
      label: "80% accuracy",
      progress: `${accuracy}%`,
      done: sessionQuestions >= 5 && accuracy >= 80
    },
    {
      label: "5-play streak",
      progress: `${Math.min(sessionBestStreak, 5)}/5`,
      done: sessionBestStreak >= 5
    },
    {
      label: "Score 100",
      progress: `${Math.min(sessionHighScore, 100)}/100`,
      done: sessionHighScore >= 100
    }
  ];
}

export function getComebackPath({
  misses,
  weakStates,
  focusedStateName
}: {
  misses: number;
  weakStates: StateInfo[];
  focusedStateName?: string | null;
}) {
  return [
    misses > 0
      ? `Reset with one easy rep before attacking the next hard question.`
      : "Keep the pressure low by staying one clean rep ahead.",
    focusedStateName
      ? `Use ${focusedStateName} as the bounce-back state if the drive stalls.`
      : weakStates[0]
        ? `Bounce back through ${weakStates[0].name} before returning to mixed reps.`
        : "Pick one trusted state for a recovery rep.",
    "Say the hook, picture the map, then answer."
  ];
}

export function getWeeklyGoals(progress: ProgressData) {
  const mastered = getMasteredCount(progress);
  const accuracy = progress.stats.totalQuestions
    ? Math.round((progress.stats.correctAnswers / progress.stats.totalQuestions) * 100)
    : 0;

  return [
    {
      label: "Master 5 more states",
      detail: `${mastered}/50 five-star states are complete.`,
      done: mastered >= 5
    },
    {
      label: "Hold 80% team accuracy",
      detail: `Current team accuracy is ${accuracy}%.`,
      done: accuracy >= 80
    },
    {
      label: "Earn a bowl banner",
      detail: `${progress.stats.bowlTrophies} bowl trophies earned so far.`,
      done: progress.stats.bowlTrophies >= 1
    }
  ];
}

export function getMasteryRadar(progress: ProgressData) {
  const totalStates = states.length;
  const mastered = getMasteredCount(progress);
  const mapReady = states.filter(
    (state) => progress.byState[state.abbreviation].mapCorrect >= 2
  ).length;
  const capitalReady = states.filter(
    (state) => progress.byState[state.abbreviation].capitalCorrect >= 2
  ).length;

  return [
    { label: "Overall Mastery", value: `${mastered}/${totalStates}` },
    { label: "Map Ready", value: `${mapReady}/${totalStates}` },
    { label: "Capital Ready", value: `${capitalReady}/${totalStates}` },
    { label: "Regions Unlocked", value: `${progress.unlockedRegions.length}/${regions.length}` }
  ];
}

export function getHotStreakStates(progress: ProgressData) {
  return [...states]
    .map((state) => ({
      name: state.name,
      streak: progress.byState[state.abbreviation].streak
    }))
    .filter((state) => state.streak > 0)
    .sort((left, right) => right.streak - left.streak)
    .slice(0, 4);
}

export function getParentQuickRecap(progress: ProgressData) {
  const mastered = getMasteredCount(progress);
  const weakState = getWeakStates(progress)[0];

  return [
    `${mastered}/50 states are now fully mastered.`,
    weakState
      ? `${weakState.name} still needs the next focused family rep.`
      : "No obvious weak state is standing out right now.",
    `Best streak reached ${progress.stats.bestStreak}.`
  ];
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
