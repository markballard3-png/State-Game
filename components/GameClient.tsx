"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BowlGameReview } from "@/components/BowlGameReview";
import { CapitalQuiz } from "@/components/CapitalQuiz";
import { ChampionshipMode } from "@/components/ChampionshipMode";
import { ConferenceStandings } from "@/components/ConferenceStandings";
import { DesktopDashboardLayout } from "@/components/DesktopDashboardLayout";
import { FilmRoomPanel } from "@/components/FilmRoomPanel";
import { FeedbackBanner } from "@/components/FeedbackBanner";
import { GameModeSelector } from "@/components/GameModeSelector";
import { MapQuiz } from "@/components/MapQuiz";
import { OpeningKickoff } from "@/components/OpeningKickoff";
import { ParentDashboard } from "@/components/ParentDashboard";
import { PracticeFacilityPanel } from "@/components/PracticeFacilityPanel";
import { ProgressTracker } from "@/components/ProgressTracker";
import { RecruitingBoard } from "@/components/RecruitingBoard";
import { RivalryWeekMode } from "@/components/RivalryWeekMode";
import { RoadTripMode } from "@/components/RoadTripMode";
import { Scoreboard } from "@/components/Scoreboard";
import { SeasonStatusPanel } from "@/components/SeasonStatusPanel";
import { StateCard } from "@/components/StateCard";
import { TrophyCabinet } from "@/components/TrophyCabinet";
import { regions, states } from "@/data/states";
import {
  buildPrompt,
  getConferenceStandings,
  getEarnedBadges,
  getEarnedTrophies,
  getNextPracticeLabel,
  getRank,
  getStateByCode,
  getWeakStates,
  modeLabels,
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

export function GameClient() {
  const [progress, setProgress] = useState<ProgressData>(createInitialProgress());
  const [hydrated, setHydrated] = useState(false);
  const [activeMode, setActiveMode] = useState<GameMode>("practice");
  const [activeRegion, setActiveRegion] = useState<Region>(regions[0]);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(1);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [feedback, setFeedback] = useState("Kick off the season and start building confidence.");
  const [feedbackVariant, setFeedbackVariant] = useState<"neutral" | "success" | "warning">(
    "neutral"
  );
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [missesThisPrompt, setMissesThisPrompt] = useState(0);
  const [selectedState, setSelectedState] = useState(states[0]);
  const [seasonStarted, setSeasonStarted] = useState(false);
  const [drillFocus, setDrillFocus] = useState<DrillFocus>("mixed");
  const [weakOnly, setWeakOnly] = useState(false);

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
    if (!hydrated) {
      return;
    }

    setPrompt(
      buildPrompt({
        mode: activeMode,
        difficulty,
        progress,
        activeRegion,
        drillFocus,
        weakOnly
      })
    );
  }, [activeMode, difficulty, activeRegion, hydrated, drillFocus, weakOnly]);

  useEffect(() => {
    if (prompt?.kind === "standard") {
      setSelectedState(prompt.state);
      setMissesThisPrompt(0);
    }
  }, [prompt]);

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
      if (event.key === " ") setSeasonStarted(true);
    }

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [hydrated]);

  function advancePrompt(nextProgress = progress) {
    setPrompt(
      buildPrompt({
        mode: activeMode,
        difficulty,
        progress: nextProgress,
        activeRegion,
        drillFocus,
        weakOnly
      })
    );
    setMissesThisPrompt(0);
  }

  function handleStandardAnswer(answer: string) {
    if (!prompt || prompt.kind !== "standard") {
      return;
    }

    const correctAnswer =
      prompt.questionType === "map" ? prompt.state.abbreviation : prompt.state.capital;
    const normalizedGuess = answer.trim().toLowerCase();
    const normalizedCorrect = correctAnswer.trim().toLowerCase();
    const wasCorrect = normalizedGuess === normalizedCorrect;
    const nextProgress = updateProgressForAnswer({
      progress,
      stateCode: prompt.state.abbreviation,
      questionType: prompt.questionType,
      wasCorrect
    });

    setProgress(nextProgress);

    if (wasCorrect) {
      const points =
        prompt.questionType === "capital-typed" ? 10 : prompt.questionType === "map" ? 7 : 5;
      setScore((current) => current + points + streak);
      setStreak((current) => current + 1);
      setFeedback(
        `Touchdown. ${prompt.state.name} is locked in with ${prompt.state.capital}.`
      );
      setFeedbackVariant("success");
      advancePrompt(nextProgress);
      return;
    }

    setStreak(0);
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
    setFeedback(
      wasCorrect
        ? `Rivalry trophy earned. ${prompt.matchup.title} goes in the win column.`
        : `Tough rivalry loss. The matchup stays on the film room board.`
    );
    setFeedbackVariant(wasCorrect ? "success" : "warning");
    setScore((current) => current + (wasCorrect ? 20 : 3));
    setStreak((current) => (wasCorrect ? current + 2 : 0));
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
    setFeedback("Fresh season started. Build momentum one state at a time.");
    setFeedbackVariant("neutral");
    setSeasonStarted(false);
    setActiveMode("practice");
    setActiveRegion(regions[0]);
    setDifficulty(1);
    setDrillFocus("mixed");
    setWeakOnly(false);
    saveProgress(fresh);
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
    1: "Rookie",
    2: "Starter",
    3: "Captain",
    4: "Bowl MVP",
    5: "National Champion"
  };
  const conferenceStandings = getConferenceStandings(progress);
  const weakStates = getWeakStates(progress);
  const nextPracticeLabel = getNextPracticeLabel(progress);

  return (
    <AppShell>
      <div className="relative">
        {!seasonStarted ? <OpeningKickoff onStart={() => setSeasonStarted(true)} /> : null}
        <DesktopDashboardLayout
        left={
          <div className="scrollbar-thin flex h-full flex-col gap-6 overflow-y-auto">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                Capital Kickoff
              </p>
              <h1 className="mt-3 font-display text-3xl font-black leading-tight">
                NCAA State Stadium Challenge
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                A football-first geography game built for private family practice.
              </p>
            </div>
            <GameModeSelector activeMode={activeMode} onChange={setActiveMode} />
            <PracticeFacilityPanel
              drillFocus={drillFocus}
              weakOnly={weakOnly}
              onDrillFocusChange={setDrillFocus}
              onWeakOnlyChange={setWeakOnly}
            />
            <SeasonStatusPanel
              progress={progress}
              activeMode={modeLabels[activeMode]}
              difficultyLabel={difficultyLabels[difficulty]}
            />
            <ProgressTracker
              activeRegion={activeRegion}
              onRegionChange={setActiveRegion}
              progress={progress}
            />
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Difficulty
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {(Object.entries(difficultyLabels) as Array<[string, string]>).map(([level, label]) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(Number(level) as DifficultyLevel)}
                    className={`rounded-2xl border px-3 py-2 text-left text-sm ${
                      difficulty === Number(level)
                        ? "border-neon bg-neon/10 text-white"
                        : "border-white/10 bg-slate-950/50 text-slate-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Keyboard Shortcuts
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                1-5 difficulty, P practice, R road trip, B bowl review, Space start season.
              </p>
            </div>
          </div>
        }
        center={
          <div className="scrollbar-thin flex h-full flex-col gap-5 overflow-y-auto">
            <header className="rounded-[28px] border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                    {modeLabels[activeMode]}
                  </p>
                  <h2 className="mt-3 text-4xl font-black leading-tight">
                    Start your season and build football-powered memory.
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Score touchdowns by locating states, calling capitals, and surviving rivalry week.
                  </p>
                </div>
                <FeedbackBanner message={feedback} variant={feedbackVariant} />
              </div>
            </header>

            {activeMode === "roadTrip" ? (
              <RoadTripMode region={activeRegion} regionCompleted={regionCompleted} />
            ) : null}
            {activeMode === "bowl" ? <BowlGameReview reviewCount={reviewCount} /> : null}
            {activeMode === "championship" ? (
              <ChampionshipMode masteredCount={masteredCount} />
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
            ) : prompt?.kind === "standard" ? (
              <>
                {prompt.questionType === "map" ? (
                  <MapQuiz
                    targetState={prompt.state}
                    states={states}
                    misses={missesThisPrompt}
                    onGuess={handleStandardAnswer}
                  />
                ) : (
                  <CapitalQuiz
                    state={prompt.state}
                    options={prompt.options}
                    typed={prompt.questionType === "capital-typed"}
                    onSubmit={handleStandardAnswer}
                  />
                )}
                <StateCard
                  state={selectedState}
                  progress={progress.byState[selectedState.abbreviation]}
                />
              </>
            ) : null}
          </div>
        }
        right={
          <div className="scrollbar-thin flex h-full flex-col gap-5 overflow-y-auto">
            <Scoreboard
              score={score}
              streak={streak}
              xp={progress.stats.xp}
              rank={getRank(progress)}
              accuracy={accuracy}
            />
            <ConferenceStandings standings={conferenceStandings} />
            <RecruitingBoard states={states} progress={progress} />
            <FilmRoomPanel weakStates={weakStates} recommendation={nextPracticeLabel} />
            <TrophyCabinet trophies={progress.trophies} />
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Next Challenge
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                {prompt?.kind === "standard"
                  ? prompt.state.footballNickname
                  : prompt?.kind === "rivalry"
                    ? prompt.matchup.title
                    : "Kickoff warm-up"}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Weak states roll into Bowl Review. Mastered states move toward 5-star status.
              </p>
            </div>
          </div>
        }
        />
      </div>
    </AppShell>
  );
}
