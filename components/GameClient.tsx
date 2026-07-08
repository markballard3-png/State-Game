"use client";

import { useEffect, useState } from "react";
import { AchievementSpotlightPanel } from "@/components/AchievementSpotlightPanel";
import { AdaptiveInsightsPanel } from "@/components/AdaptiveInsightsPanel";
import { AnswerHistoryPanel } from "@/components/AnswerHistoryPanel";
import { AppShell } from "@/components/AppShell";
import { BowlGameReview } from "@/components/BowlGameReview";
import { CapitalChallengeModal } from "@/components/CapitalChallengeModal";
import { CapitalQuiz } from "@/components/CapitalQuiz";
import { ChampionshipMode } from "@/components/ChampionshipMode";
import { ChampionshipReadinessPanel } from "@/components/ChampionshipReadinessPanel";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { ConferenceStandings } from "@/components/ConferenceStandings";
import { CoachClipboard } from "@/components/CoachClipboard";
import { ComebackPathPanel } from "@/components/ComebackPathPanel";
import { DriveBonusPanel } from "@/components/DriveBonusPanel";
import { DriveSituationPanel } from "@/components/DriveSituationPanel";
import { DriveSummary } from "@/components/DriveSummary";
import { FilmRoomPanel } from "@/components/FilmRoomPanel";
import { FeedbackBanner } from "@/components/FeedbackBanner";
import { FocusDeckPanel } from "@/components/FocusDeckPanel";
import { FocusTimerPanel } from "@/components/FocusTimerPanel";
import { GameModeSelector } from "@/components/GameModeSelector";
import { DailyChallengePanel } from "@/components/DailyChallengePanel";
import { HalftimeReport } from "@/components/HalftimeReport";
import { KickoffMissionPanel } from "@/components/KickoffMissionPanel";
import { MapQuiz } from "@/components/MapQuiz";
import { MomentumMomentsPanel } from "@/components/MomentumMomentsPanel";
import { NationalRankingPanel } from "@/components/NationalRankingPanel";
import { ParentDashboard } from "@/components/ParentDashboard";
import { PersonalRecordsPanel } from "@/components/PersonalRecordsPanel";
import { PlaybookPanel } from "@/components/PlaybookPanel";
import { PracticeFacilityPanel } from "@/components/PracticeFacilityPanel";
import { PracticePresetPanel } from "@/components/PracticePresetPanel";
import { ProgressTracker } from "@/components/ProgressTracker";
import { PressurePanel } from "@/components/PressurePanel";
import { RecruitingBoard } from "@/components/RecruitingBoard";
import { RecoveryCoachPanel } from "@/components/RecoveryCoachPanel";
import { HotStreakStatesPanel } from "@/components/HotStreakStatesPanel";
import { MasteryRadarPanel } from "@/components/MasteryRadarPanel";
import { RegionVictoryPanel } from "@/components/RegionVictoryPanel";
import { RegionBossPanel } from "@/components/RegionBossPanel";
import { RivalryWeekMode } from "@/components/RivalryWeekMode";
import { RivalryHistoryPanel } from "@/components/RivalryHistoryPanel";
import { RoadTripMode } from "@/components/RoadTripMode";
import { Scoreboard } from "@/components/Scoreboard";
import { SeasonSchedule } from "@/components/SeasonSchedule";
import { SessionGoalsPanel } from "@/components/SessionGoalsPanel";
import { SessionMilestonesPanel } from "@/components/SessionMilestonesPanel";
import { SessionWrapPanel } from "@/components/SessionWrapPanel";
import { SeasonStatusPanel } from "@/components/SeasonStatusPanel";
import { StateCard } from "@/components/StateCard";
import { TrophyCabinet } from "@/components/TrophyCabinet";
import { UnlockPreviewPanel } from "@/components/UnlockPreviewPanel";
import { ReviewQueuePanel } from "@/components/ReviewQueuePanel";
import { RewardTrack } from "@/components/RewardTrack";
import { WeeklyGoalsPanel } from "@/components/WeeklyGoalsPanel";
import { regions, states } from "@/data/states";
import {
  buildCapitalOptions,
  buildPrompt,
  getAchievementSpotlight,
  getAdaptivePracticeInsights,
  getChampionshipReadiness,
  getComebackPath,
  getConferenceStandings,
  getDailyChallenge,
  getDriveBonuses,
  getEarnedBadges,
  getEarnedTrophies,
  getHalftimeSummary,
  getHotStreakStates,
  getHintLadder,
  getKickoffMissions,
  getMasteryRadar,
  getModeAvailability,
  getMostMissedCapitals,
  getMostMissedMapStates,
  getModeUnlockPreview,
  getNationalRanking,
  getPressureSummary,
  getRecoveryCoachTips,
  getRegionBossChallenge,
  getRegionVictoryStatus,
  isCorrectCapitalAnswer,
  getMasteredCount,
  getNextPracticeLabel,
  getPracticeScript,
  getRank,
  getReviewQueue,
  getSessionMilestones,
  getSeasonObjectives,
  getStateByCode,
  getWeakStates,
  getWeeklyGoals,
  updateProgressForAnswer
} from "@/lib/game";
import { createInitialProgress, loadProgress, saveProgress } from "@/lib/storage";
import {
  DifficultyLevel,
  DrillFocus,
  GameMode,
  ProgressData,
  Prompt,
  Region
} from "@/types/game";

function getRoundSecondsForDifficulty(difficulty: DifficultyLevel) {
  if (difficulty <= 1) return 7 * 60;
  if (difficulty <= 2) return 5 * 60;
  return 3 * 60;
}

function formatRoundTime(totalSeconds: number) {
  const minutes = Math.max(0, Math.floor(totalSeconds / 60));
  const seconds = Math.max(0, totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function buildPracticePromptForCode({
  code,
  difficulty,
  progress,
  activeRegion,
  drillFocus,
  weakOnly
}: {
  code: string;
  difficulty: DifficultyLevel;
  progress: ProgressData;
  activeRegion: Region;
  drillFocus: DrillFocus;
  weakOnly: boolean;
}) {
  return buildPrompt({
    mode: "practice",
    difficulty,
    progress,
    activeRegion,
    drillFocus,
    weakOnly,
    forcedStateCode: code
  });
}

function buildPracticeOrder() {
  const codes = states.map((state) => state.abbreviation);

  for (let index = codes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [codes[index], codes[swapIndex]] = [codes[swapIndex], codes[index]];
  }

  return codes;
}

export function GameClient() {
  const [progress, setProgress] = useState<ProgressData>(createInitialProgress());
  const [hydrated, setHydrated] = useState(false);
  const [activeMode, setActiveMode] = useState<GameMode>("practice");
  const [activeRegion, setActiveRegion] = useState<Region>(regions[0]);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(1);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [capitalChallenge, setCapitalChallenge] = useState<null | {
    state: typeof states[number];
    options: string[];
  }>(null);
  const [feedback, setFeedback] = useState("Press Start to begin the game.");
  const [feedbackVariant, setFeedbackVariant] = useState<"neutral" | "success" | "warning">(
    "neutral"
  );
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [driveYards, setDriveYards] = useState(0);
  const [down, setDown] = useState(1);
  const [yardsToGo, setYardsToGo] = useState(10);
  const [playClock, setPlayClock] = useState(25);
  const [recentPlays, setRecentPlays] = useState<string[]>([]);
  const [missesThisPrompt, setMissesThisPrompt] = useState(0);
  const [selectedState, setSelectedState] = useState(states[0]);
  const [seasonStarted] = useState(true);
  const [drillFocus, setDrillFocus] = useState<DrillFocus>("mixed");
  const [weakOnly, setWeakOnly] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionBestStreak, setSessionBestStreak] = useState(0);
  const [sessionHighScore, setSessionHighScore] = useState(0);
  const [sessionFocusSeconds, setSessionFocusSeconds] = useState(0);
  const [forcedStateCode, setForcedStateCode] = useState<string | null>(null);
  const [roundSecondsRemaining, setRoundSecondsRemaining] = useState(420);
  const [practiceRoundStarted, setPracticeRoundStarted] = useState(false);
  const [practiceRemainingCodes, setPracticeRemainingCodes] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [momentumMoments, setMomentumMoments] = useState<string[]>([
    "Season opened. Start stacking correct answers to build momentum."
  ]);
  const [longestDrive, setLongestDrive] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<
    Array<{ state: string; questionType: string; result: "correct" | "miss"; detail: string }>
  >([]);
  const [rivalryHistory, setRivalryHistory] = useState<
    Array<{ title: string; result: "win" | "loss"; detail: string }>
  >([]);

  useEffect(() => {
    if (!seasonStarted || activeMode === "dashboard") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSessionFocusSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [seasonStarted, activeMode, sessionFocusSeconds]);

  useEffect(() => {
    const stored = loadProgress();
    setProgress({
      ...stored,
      badges: getEarnedBadges(stored),
      trophies: getEarnedTrophies(stored)
    });
    setHydrated(true);
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    setSessionHighScore((current) => Math.max(current, score));
  }, [score]);

  useEffect(() => {
    setLongestDrive((current) => Math.max(current, driveYards));
  }, [driveYards]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (activeMode === "practice") {
      if (!practiceRoundStarted) {
        setPrompt(null);
      }
      return;
    }

    setPrompt(
      buildPrompt({
        mode: activeMode,
        difficulty,
        progress,
        activeRegion,
        drillFocus,
        weakOnly,
        forcedStateCode
      })
    );
  }, [activeMode, difficulty, activeRegion, hydrated, drillFocus, weakOnly, forcedStateCode, practiceRoundStarted]);

  useEffect(() => {
    if (prompt?.kind === "standard") {
      setSelectedState(prompt.state);
      setMissesThisPrompt(0);
    }
  }, [prompt]);

  useEffect(() => {
    if (!hydrated || activeMode !== "practice") {
      return;
    }

    setRoundSecondsRemaining(getRoundSecondsForDifficulty(difficulty));
    setCapitalChallenge(null);
    setPracticeRoundStarted(false);
    setPracticeRemainingCodes([]);
  }, [activeMode, difficulty, hydrated]);

  useEffect(() => {
    if (!hydrated || activeMode !== "practice" || !practiceRoundStarted || !prompt || roundSecondsRemaining <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRoundSecondsRemaining((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [activeMode, hydrated, practiceRoundStarted, prompt, roundSecondsRemaining]);

  useEffect(() => {
    if (showConfetti) {
      const timeoutId = window.setTimeout(() => setShowConfetti(false), 1400);
      return () => window.clearTimeout(timeoutId);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (activeMode !== "practice" || roundSecondsRemaining > 0) {
      return;
    }

    setPrompt(null);
    setCapitalChallenge(null);
    setPracticeRoundStarted(false);
    setPracticeRemainingCodes([]);
    setFeedback("Time is up. Press Start to play again.");
    setFeedbackVariant("warning");
  }, [activeMode, roundSecondsRemaining]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === "1") setDifficulty(1);
      if (event.key === "2") setDifficulty(2);
      if (event.key === "3") setDifficulty(3);
      if (event.key === "4") setDifficulty(4);
      if (event.key === "5") setDifficulty(5);
      if (event.key.toLowerCase() === "p") setActiveMode("practice");
      if (event.key.toLowerCase() === "r") setActiveMode("roadTrip");
      if (event.key.toLowerCase() === "b") setActiveMode("bowl");
    }

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [hydrated]);

  useEffect(() => {
    if (!seasonStarted || activeMode === "dashboard") {
      return;
    }

    if (!(difficulty >= 4 || activeMode === "championship")) {
      return;
    }

    if (playClock <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPlayClock((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [playClock, seasonStarted, difficulty, activeMode]);

  useEffect(() => {
    if (playClock > 0 || !seasonStarted || activeMode === "dashboard") {
      return;
    }

    setFeedback("Delay of game. The clock hit zero and the offense backed up.");
    setFeedbackVariant("warning");
    setRecentPlays((current) => ["Delay of game: 5-yard penalty", ...current].slice(0, 5));
    setPlayClock(25);
    setDriveYards((current) => Math.max(0, current - 5));
    setYardsToGo((current) => current + 5);
    setDown((current) => {
      if (current >= 4) {
        setRecentPlays((plays) => ["Turnover on downs after delay of game", ...plays].slice(0, 5));
        setDriveYards(0);
        setYardsToGo(10);
        return 1;
      }

      return current + 1;
    });
  }, [playClock, seasonStarted, activeMode]);

  function updateDrive({
    gain,
    playLabel,
    wasCorrect
  }: {
    gain: number;
    playLabel: string;
    wasCorrect: boolean;
  }) {
    setPlayClock(25);
    setRecentPlays((current) => [playLabel, ...current].slice(0, 5));

    if (!wasCorrect) {
      setDriveYards((current) => Math.max(0, current - gain));
      setYardsToGo((current) => current + gain);
      setDown((current) => {
        if (current >= 4) {
          setRecentPlays((plays) => ["Turnover on downs", ...plays].slice(0, 5));
          setDriveYards(0);
          setYardsToGo(10);
          return 1;
        }

        return current + 1;
      });
      return;
    }

    setDriveYards((current) => {
      const next = current + gain;
      const touchdown = next >= 100;

      if (touchdown) {
        setRecentPlays((plays) => ["Touchdown drive finished", ...plays].slice(0, 5));
        addMomentumMoment("Touchdown drive finished. Big energy on that possession.");
        setDown(1);
        setYardsToGo(10);
        return 0;
      }

      setYardsToGo((currentYards) => {
        if (gain >= currentYards) {
          setDown(1);
          return 10;
        }

        setDown((currentDown) => Math.min(4, currentDown + 1));
        return Math.max(1, currentYards - gain);
      });

      return next;
    });
  }

  function advancePrompt(nextProgress = progress, nextForcedStateCode = forcedStateCode) {
    setPrompt(
      buildPrompt({
        mode: activeMode,
        difficulty,
        progress: nextProgress,
        activeRegion,
        drillFocus,
        weakOnly,
        forcedStateCode: nextForcedStateCode
      })
    );
    setMissesThisPrompt(0);
  }

  function advancePracticeQueue(nextProgress = progress) {
    setPracticeRemainingCodes((current) => {
      const remaining = current.slice(1);

      if (remaining.length === 0) {
        setPrompt(null);
        setPracticeRoundStarted(false);
        setCapitalChallenge(null);
        setFeedback("Amazing job! You worked through all 50 states.");
        setFeedbackVariant("success");
        return [];
      }

      setPrompt(
        buildPracticePromptForCode({
          code: remaining[0],
          difficulty,
          progress: nextProgress,
          activeRegion,
          drillFocus,
          weakOnly
        })
      );
      setMissesThisPrompt(0);
      return remaining;
    });
  }

  function addMomentumMoment(message: string) {
    setMomentumMoments((current) => [message, ...current].slice(0, 4));
  }

  function recordSessionResult(wasCorrect: boolean) {
    setSessionQuestions((current) => current + 1);
    if (wasCorrect) {
      setSessionCorrect((current) => current + 1);
    }
  }

  function pushRivalryHistory(title: string, result: "win" | "loss", detail: string) {
    setRivalryHistory((current) => [{ title, result, detail }, ...current].slice(0, 5));
  }

  function pushAnswerHistory(
    state: string,
    questionType: string,
    result: "correct" | "miss",
    detail: string
  ) {
    setAnswerHistory((current) => [{ state, questionType, result, detail }, ...current].slice(0, 6));
  }

  function handleStandardAnswer(answer: string) {
    if (!prompt || prompt.kind !== "standard") {
      return;
    }

    const wasCorrect =
      prompt.questionType === "map"
        ? answer.trim().toLowerCase() === prompt.state.abbreviation.toLowerCase()
        : isCorrectCapitalAnswer(answer, prompt.state.capital);
    const nextProgress = updateProgressForAnswer({
      progress,
      stateCode: prompt.state.abbreviation,
      questionType: prompt.questionType,
      wasCorrect
    });
    const previousModeAvailability = getModeAvailability(progress);
    const nextModeAvailability = getModeAvailability(nextProgress);
    const currentStateProgress = progress.byState[prompt.state.abbreviation];
    const nextStateProgress = nextProgress.byState[prompt.state.abbreviation];
    const nextStreak = wasCorrect ? streak + 1 : 0;

    if (prompt.questionType === "map" && activeMode === "practice") {
      setProgress(nextProgress);
      recordSessionResult(wasCorrect);
      pushAnswerHistory(
        prompt.state.name,
        "map",
        wasCorrect ? "correct" : "miss",
        wasCorrect ? `Found ${prompt.state.name} on the U.S. map.` : `Missed ${prompt.state.name} on the U.S. map.`
      );

      if (wasCorrect) {
        setScore((current) => current + 6 + streak);
        setSessionBestStreak((current) => Math.max(current, nextStreak));
        setStreak((current) => current + 1);
        updateDrive({
          gain: 12,
          playLabel: `${prompt.state.name}: map found`,
          wasCorrect: true
        });
        setFeedback(`Nice! Now choose the capital for ${prompt.state.name}.`);
        setFeedbackVariant("neutral");
        setCapitalChallenge({
          state: prompt.state,
          options: buildCapitalOptions(prompt.state, states, 3)
        });
        return;
      }

      setStreak(0);
      updateDrive({
        gain: 8,
        playLabel: `${prompt.state.name}: missed on the map`,
        wasCorrect: false
      });
      setMissesThisPrompt((current) => current + 1);
      setFeedback("Try again on the map. After two misses, the answer will glow.");
      setFeedbackVariant("warning");
      return;
    }

    setProgress(nextProgress);
    recordSessionResult(wasCorrect);
    pushAnswerHistory(
      prompt.state.name,
      prompt.questionType,
      wasCorrect ? "correct" : "miss",
      wasCorrect ? `Locked in ${prompt.state.capital}.` : `Missed the ${prompt.questionType} rep.`
    );

    if (wasCorrect) {
      const points =
        prompt.questionType === "capital-typed" ? 10 : prompt.questionType === "map" ? 7 : 5;
      const yards =
        prompt.questionType === "capital-typed" ? 22 : prompt.questionType === "map" ? 15 : 10;
      setScore((current) => current + points + streak);
      setSessionBestStreak((current) => Math.max(current, nextStreak));
      setStreak((current) => current + 1);
      updateDrive({
        gain: yards,
        playLabel: `${prompt.state.name}: ${yards}-yard gain on ${prompt.questionType}`,
        wasCorrect: true
      });
      setFeedback(
        `Touchdown. ${prompt.state.name} is locked in with ${prompt.state.capital}.`
      );
      setFeedbackVariant("success");

      if ([3, 5, 8].includes(nextStreak)) {
        addMomentumMoment(`${nextStreak}-play streak. The offense is humming.`);
      }

      if (currentStateProgress.masteryScore < 90 && nextStateProgress.masteryScore >= 90) {
        addMomentumMoment(`${prompt.state.name} just became a 5-star state.`);
      }

      if (
        !previousModeAvailability.rivalry.unlocked &&
        nextModeAvailability.rivalry.unlocked
      ) {
        addMomentumMoment("Rivalry Week unlocked after a strong early session.");
      }

      if (!previousModeAvailability.bowl.unlocked && nextModeAvailability.bowl.unlocked) {
        addMomentumMoment("Bowl Review unlocked. The film room is ready.");
      }

      if (
        !previousModeAvailability.championship.unlocked &&
        nextModeAvailability.championship.unlocked
      ) {
        addMomentumMoment("Championship Mode unlocked. You're ready for the title run.");
      }

      if (forcedStateCode === prompt.state.abbreviation) {
        setForcedStateCode(null);
        addMomentumMoment(`${prompt.state.name} cleared its focus rep and leaves the deck.`);
        advancePrompt(nextProgress, null);
        return;
      }

      advancePrompt(nextProgress);
      return;
    }

    setStreak(0);
    updateDrive({
      gain: 8,
      playLabel: `${prompt.state.name}: lost 8 yards after a missed ${prompt.questionType}`,
      wasCorrect: false
    });
    setMissesThisPrompt((current) => current + 1);
    setFeedback(
      prompt.questionType === "map"
        ? `Whistle. Try again and watch the region clue after two misses.`
        : `Not quite. Review the hook: ${prompt.state.memoryHook}`
    );
    setFeedbackVariant("warning");

    if (prompt.questionType !== "map") {
      advancePrompt(nextProgress);
    }
  }

  function handleRivalryResult(wasCorrect: boolean) {
    if (!prompt || prompt.kind !== "rivalry") {
      return;
    }

    const [leftCode, rightCode] = prompt.matchup.states;
    const left = getStateByCode(leftCode);
    const right = getStateByCode(rightCode);

    if (!left || !right) {
      return;
    }

    let nextProgress = progress;

    nextProgress = updateProgressForAnswer({
      progress: nextProgress,
      stateCode: left.abbreviation,
      questionType: "capital-typed",
      wasCorrect
    });
    nextProgress = updateProgressForAnswer({
      progress: nextProgress,
      stateCode: right.abbreviation,
      questionType: "capital-typed",
      wasCorrect
    });

    setProgress(nextProgress);
    recordSessionResult(wasCorrect);
    pushAnswerHistory(
      prompt.matchup.title,
      "rivalry",
      wasCorrect ? "correct" : "miss",
      wasCorrect ? "Won the rivalry bonus battle." : "Dropped the rivalry bonus battle."
    );
    setFeedback(
      wasCorrect
        ? `Rivalry trophy earned. ${prompt.matchup.title} goes in the win column.`
        : `Tough rivalry loss. The matchup stays on the film room board.`
    );
    setFeedbackVariant(wasCorrect ? "success" : "warning");
    setScore((current) => current + (wasCorrect ? 20 : 3));
    const nextStreak = wasCorrect ? streak + 2 : 0;
    setSessionBestStreak((current) => Math.max(current, nextStreak));
    setStreak((current) => (wasCorrect ? current + 2 : 0));
    updateDrive({
      gain: wasCorrect ? 30 : 10,
      playLabel: wasCorrect
        ? `${prompt.matchup.title}: 30-yard rivalry strike`
        : `${prompt.matchup.title}: rivalry sack for loss`,
      wasCorrect
    });

    if (wasCorrect) {
      addMomentumMoment(`${prompt.matchup.title} delivered a rivalry win.`);
      pushRivalryHistory(prompt.matchup.title, "win", "Won the bonus battle and banked the rivalry trophy.");
      if (nextStreak >= 5) {
        addMomentumMoment("Big-game confidence is up after that rivalry result.");
      }
    } else {
      pushRivalryHistory(prompt.matchup.title, "loss", "Missed the rivalry bonus and sent it to the film room.");
    }

    advancePrompt(nextProgress);
  }

  function handleResetProgress() {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        "Reset all saved progress for Capital Kickoff on this browser?"
      );

      if (!confirmed) {
        return;
      }
    }

    const fresh = createInitialProgress();
    setProgress(fresh);
    setScore(0);
    setStreak(0);
    setDriveYards(0);
    setDown(1);
    setYardsToGo(10);
    setPlayClock(25);
    setRecentPlays([]);
    setFeedback("Fresh season started. Build momentum one state at a time.");
    setFeedbackVariant("neutral");
    setActiveMode("practice");
    setActiveRegion(regions[0]);
    setDifficulty(1);
    setDrillFocus("mixed");
    setWeakOnly(false);
    setSessionQuestions(0);
    setSessionCorrect(0);
    setSessionBestStreak(0);
    setSessionHighScore(0);
    setSessionFocusSeconds(0);
    setForcedStateCode(null);
    setRoundSecondsRemaining(getRoundSecondsForDifficulty(1));
    setPracticeRoundStarted(false);
    setPracticeRemainingCodes([]);
    setCapitalChallenge(null);
    setShowConfetti(false);
    setLongestDrive(0);
    setAnswerHistory([]);
    setMomentumMoments(["Fresh season started. New momentum will build from the next snap."]);
    setRivalryHistory([]);
    saveProgress(fresh);
  }

  function resetSessionLayer() {
    setSessionQuestions(0);
    setSessionCorrect(0);
    setSessionBestStreak(0);
    setSessionHighScore(0);
    setSessionFocusSeconds(0);
    setRoundSecondsRemaining(getRoundSecondsForDifficulty(difficulty));
    setPracticeRoundStarted(false);
    setPracticeRemainingCodes([]);
    setCapitalChallenge(null);
    setShowConfetti(false);
    setLongestDrive(0);
    setAnswerHistory([]);
    setMomentumMoments(["New session started. Build another run of momentum."]);
    setRivalryHistory([]);
    setFeedback("Fresh session started. Keep the current progress and attack the next mission.");
    setFeedbackVariant("neutral");
  }

  const accuracy = progress.stats.totalQuestions
    ? Math.round((progress.stats.correctAnswers / progress.stats.totalQuestions) * 100)
    : 0;
  const reviewCount = states.filter(
    (state) => progress.byState[state.abbreviation].missedAnswers > 0
  ).length;
  const masteredCount = states.filter(
    (state) => progress.byState[state.abbreviation].masteryScore >= 90
  ).length;
  const regionCompleted = states
    .filter((state) => state.region === activeRegion)
    .every((state) => progress.byState[state.abbreviation].masteryScore >= 70);
  const difficultyLabels: Record<DifficultyLevel, string> = {
    1: "Easy",
    2: "Medium",
    3: "Tricky",
    4: "Hard",
    5: "Expert"
  };
  const conferenceStandings = getConferenceStandings(progress);
  const weakStates = getWeakStates(progress);
  const reviewQueue = getReviewQueue(progress);
  const mapTargets = getMostMissedMapStates(progress);
  const capitalTargets = getMostMissedCapitals(progress);
  const nextPracticeLabel = getNextPracticeLabel(progress);
  const halftimeSummary = getHalftimeSummary(progress);
  const practiceScript = getPracticeScript(progress);
  const adaptiveInsights = getAdaptivePracticeInsights(progress, activeRegion);
  const dailyChallenge = getDailyChallenge(progress);
  const focusedState =
    forcedStateCode ? states.find((state) => state.abbreviation === forcedStateCode) ?? null : null;
  const kickoffMissions = getKickoffMissions({
    progress,
    sessionQuestions,
    sessionCorrect,
    streak,
    focusedStateCode: forcedStateCode,
    focusedStateMastery: focusedState
      ? progress.byState[focusedState.abbreviation].masteryScore
      : undefined
  });
  const achievementSpotlight = getAchievementSpotlight(progress);
  const championshipReadiness = getChampionshipReadiness(progress);
  const driveBonuses = getDriveBonuses(driveYards, streak, playClock);
  const pressureSummary = getPressureSummary({ down, yardsToGo, playClock });
  const regionBossChallenge = getRegionBossChallenge(progress, activeRegion);
  const regionVictoryStatus = getRegionVictoryStatus(progress, activeRegion);
  const unlockPreview = getModeUnlockPreview(progress);
  const recoveryCoachTips = getRecoveryCoachTips({
    misses: missesThisPrompt,
    promptState: prompt?.kind === "standard" ? prompt.state : null,
    promptQuestionType: prompt?.kind === "standard" ? prompt.questionType : null,
    focusedStateName: focusedState?.name ?? null,
    weakStates
  });
  const nationalRanking = getNationalRanking(progress);
  const seasonObjectives = getSeasonObjectives(progress);
  const sessionMilestones = getSessionMilestones({
    sessionQuestions,
    sessionCorrect,
    sessionBestStreak,
    sessionHighScore
  });
  const weeklyGoals = getWeeklyGoals(progress);
  const masteryRadar = getMasteryRadar(progress);
  const hotStreakStates = getHotStreakStates(progress);
  const comebackPath = getComebackPath({
    misses: missesThisPrompt,
    weakStates,
    focusedStateName: focusedState?.name ?? null
  });
  const masteredCountForUnlocks = getMasteredCount(progress);
  const sessionAccuracy = sessionQuestions
    ? Math.round((sessionCorrect / sessionQuestions) * 100)
    : 0;
  const masteredCountSessionView = states.filter(
    (state) => progress.byState[state.abbreviation].masteryScore >= 90
  ).length;
  const quarterLabel =
    score >= 180 ? "Stage 4" : score >= 120 ? "Stage 3" : score >= 60 ? "Stage 2" : "Stage 1";
  const currentInstructions =
    capitalChallenge
      ? `Now choose the capital for ${capitalChallenge.state.name}.`
      : prompt?.kind === "standard"
      ? prompt.questionType === "map"
        ? `Tap ${prompt.state.name} on the map.`
        : `Answer the capital question for ${prompt.state.name}.`
      : prompt?.kind === "rivalry"
        ? "Read the challenge and pick the best answer."
        : activeMode === "dashboard"
          ? "This page is for grown-ups to review progress."
          : "Press start and answer the next question.";

  const currentGoal =
    capitalChallenge
      ? "Goal: pick the right capital city."
      : prompt?.kind === "standard"
      ? prompt.questionType === "map"
        ? "Goal: find the correct state."
        : "Goal: choose or type the correct capital."
      : "Goal: finish the challenge.";
  const simpleLevelOptions: Array<{ label: string; value: DifficultyLevel }> = [
    { label: "Easy · 7 min", value: 1 },
    { label: "Medium · 5 min", value: 2 },
    { label: "Hard · 3 min", value: 4 }
  ];
  const isStandardPrompt = prompt?.kind === "standard";

  function applyPracticePreset(preset: {
    drillFocus: DrillFocus;
    weakOnly: boolean;
    difficulty: DifficultyLevel;
    label: string;
  }) {
    setDrillFocus(preset.drillFocus);
    setWeakOnly(preset.weakOnly);
    setDifficulty(preset.difficulty);
    setFeedback(`${preset.label} preset loaded. Attack the next rep with intention.`);
    setFeedbackVariant("neutral");
  }

  function handleStartPractice() {
    const nextQueue = buildPracticeOrder();

    setActiveMode("practice");
    setPracticeRoundStarted(true);
    setPracticeRemainingCodes(nextQueue);
    setRoundSecondsRemaining(getRoundSecondsForDifficulty(difficulty));
    setForcedStateCode(null);
    setCapitalChallenge(null);
    setFeedback("Game started. Tap the correct state on the U.S. map.");
    setFeedbackVariant("neutral");
    setPrompt(
      buildPracticePromptForCode({
        code: nextQueue[0],
        difficulty,
        progress,
        activeRegion,
        drillFocus,
        weakOnly
      })
    );
    setMissesThisPrompt(0);
  }

  function handleCapitalChallengeAnswer(answer: string) {
    if (!capitalChallenge) {
      return;
    }

    const wasCorrect = isCorrectCapitalAnswer(answer, capitalChallenge.state.capital);
    const nextProgress = updateProgressForAnswer({
      progress,
      stateCode: capitalChallenge.state.abbreviation,
      questionType: "capital-choice",
      wasCorrect
    });
    const nextStreak = wasCorrect ? streak + 1 : 0;

    setProgress(nextProgress);
    recordSessionResult(wasCorrect);
    pushAnswerHistory(
      capitalChallenge.state.name,
      "capital-choice",
      wasCorrect ? "correct" : "miss",
      wasCorrect ? `Capital locked in: ${capitalChallenge.state.capital}.` : `Missed the capital for ${capitalChallenge.state.name}.`
    );

    if (wasCorrect) {
      setScore((current) => current + 10 + streak);
      setSessionBestStreak((current) => Math.max(current, nextStreak));
      setStreak((current) => current + 1);
      updateDrive({
        gain: 18,
        playLabel: `${capitalChallenge.state.name}: capital answer locked in`,
        wasCorrect: true
      });
      setFeedback(`Correct! ${capitalChallenge.state.capital} is the capital of ${capitalChallenge.state.name}.`);
      setFeedbackVariant("success");
      setCapitalChallenge(null);
      setShowConfetti(true);
      advancePracticeQueue(nextProgress);
      return;
    }

    setStreak(0);
    updateDrive({
      gain: 6,
      playLabel: `${capitalChallenge.state.name}: missed capital follow-up`,
      wasCorrect: false
    });
    setFeedback(`Not quite. Try the capital question for ${capitalChallenge.state.name} again.`);
    setFeedbackVariant("warning");
    setCapitalChallenge({
      state: capitalChallenge.state,
      options: buildCapitalOptions(capitalChallenge.state, states, 3)
    });
  }

  return (
    <AppShell>
      <div className="relative mx-auto max-w-[1180px]">
        <div className={`grid gap-4 ${isStandardPrompt ? "min-h-[calc(100vh-3rem)]" : ""}`}>
          <header className="rounded-[28px] border border-white/10 bg-slate-950/75 p-5 shadow-panel backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                  State Game
                </p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-white">
                  One question at a time
                </h1>
                <p className="mt-2 text-sm text-slate-300">
                  {currentInstructions}
                </p>
                <p className="mt-2 text-sm font-semibold text-neon">{currentGoal}</p>
              </div>
              <div className="max-w-md">
                <FeedbackBanner message={feedback} variant={feedbackVariant} />
              </div>
            </div>
          </header>

          {isStandardPrompt ? (
            <section className="relative grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
              <main className="rounded-[28px] border border-white/10 bg-slate-950/75 p-5 shadow-panel backdrop-blur">
                {prompt.questionType === "map" ? (
                  <MapQuiz
                    targetState={prompt.state}
                    states={states}
                    misses={missesThisPrompt}
                    progress={progress}
                    onGuess={handleStandardAnswer}
                  />
                ) : (
                  <CapitalQuiz
                    state={prompt.state}
                    progress={progress.byState[prompt.state.abbreviation]}
                    misses={missesThisPrompt}
                    hints={getHintLadder(prompt.state, prompt.questionType)}
                    options={prompt.options}
                    typed={prompt.questionType === "capital-typed"}
                    onSubmit={handleStandardAnswer}
                  />
                )}
              </main>
              <aside className="grid gap-4">
                <div className="rounded-[28px] border border-white/10 bg-slate-950/75 p-4 shadow-panel backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Level
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {simpleLevelOptions.map(({ label, value }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setDifficulty(value)}
                        className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${
                          difficulty === value
                            ? "border-neon bg-neon/10 text-white"
                            : "border-white/10 bg-slate-950/50 text-slate-300"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleStartPractice}
                    className="mt-4 w-full rounded-3xl bg-gold px-5 py-3 text-base font-black text-slate-950 transition hover:brightness-110"
                  >
                    Start
                  </button>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-slate-950/75 p-4 shadow-panel backdrop-blur">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Time</p>
                      <p className="mt-1 text-2xl font-black text-gold">
                        {activeMode === "practice" && practiceRoundStarted
                          ? formatRoundTime(roundSecondsRemaining)
                          : "--:--"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Score</p>
                      <p className="mt-1 text-2xl font-black text-white">{score}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Streak</p>
                      <p className="mt-1 text-2xl font-black text-white">{streak}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Correct</p>
                      <p className="mt-1 text-2xl font-black text-white">{accuracy}%</p>
                    </div>
                  </div>
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">How to Play</p>
                    <p className="mt-2 text-sm text-slate-200">
                      Press Start, tap the state on the map, then pick its capital.
                    </p>
                  </div>
                </div>
              </aside>
              {capitalChallenge ? (
                <CapitalChallengeModal
                  stateName={capitalChallenge.state.name}
                  options={capitalChallenge.options}
                  onChoose={handleCapitalChallengeAnswer}
                />
              ) : null}
              {showConfetti ? <ConfettiBurst /> : null}
            </section>
          ) : (
            <>
              <main className="rounded-[28px] border border-white/10 bg-slate-950/75 p-6 shadow-panel backdrop-blur">
                <SessionWrapPanel
                  visible={sessionQuestions >= 10}
                  sessionQuestions={sessionQuestions}
                  sessionAccuracy={sessionAccuracy}
                  sessionBestStreak={sessionBestStreak}
                  masteredThisSession={masteredCountSessionView}
                  headline={momentumMoments[0] ?? "Keep going."}
                  onResetSession={resetSessionLayer}
                />

                {activeMode === "roadTrip" ? (
                  <RoadTripMode
                    region={activeRegion}
                    regionCompleted={regionCompleted}
                    progress={progress}
                    regionStates={states.filter((state) => state.region === activeRegion)}
                  />
                ) : null}
                {activeMode === "bowl" ? (
                  <BowlGameReview reviewCount={reviewCount} reviewStates={weakStates} />
                ) : null}
                {activeMode === "championship" ? (
                  <ChampionshipMode
                    masteredCount={masteredCount}
                    accuracy={accuracy}
                    reviewCount={reviewCount}
                  />
                ) : null}

                {activeMode === "dashboard" ? (
                  <ParentDashboard progress={progress} onResetProgress={handleResetProgress} />
                ) : prompt?.kind === "rivalry" ? (
                  (() => {
                    const left = getStateByCode(prompt.matchup.states[0]);
                    const right = getStateByCode(prompt.matchup.states[1]);

                    if (!left || !right) {
                      return null;
                    }

                    return (
                      <RivalryWeekMode
                        leftState={left}
                        rightState={right}
                        bonusQuestion={prompt.matchup.bonusQuestion}
                        bonusAnswer={prompt.matchup.bonusAnswer}
                        onComplete={handleRivalryResult}
                      />
                    );
                  })()
                ) : (
                  <div className="flex min-h-[320px] items-center justify-center">
                    <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-white/5 p-8 text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                        Ready To Play
                      </p>
                      <h2 className="mt-3 text-3xl font-black text-white">
                        Start your next question
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        Press Start to begin on the U.S. map.
                      </p>
                      <button
                        type="button"
                        onClick={handleStartPractice}
                        className="mt-6 rounded-3xl bg-gold px-8 py-4 text-lg font-black text-slate-950 transition hover:brightness-110"
                      >
                        Start
                      </button>
                    </div>
                  </div>
                )}
              </main>
            </>
          )}

        </div>
      </div>
    </AppShell>
  );
}
