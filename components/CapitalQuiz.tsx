"use client";

import { useState } from "react";
import { HintLadderPanel } from "@/components/HintLadderPanel";
import { StudyCuePanel } from "@/components/StudyCuePanel";
import { StateInfo, StateProgress } from "@/types/game";

export function CapitalQuiz({
  state,
  progress,
  misses,
  hints,
  options,
  typed,
  onSubmit
}: {
  state: StateInfo;
  progress: StateProgress;
  misses: number;
  hints: string[];
  options?: string[];
  typed: boolean;
  onSubmit: (answer: string) => void;
}) {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="space-y-5">
      <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Capital Question
        </p>
        <h2 className="mt-2 text-3xl font-black">What is the capital of {state.name}?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Read the question, then choose the best answer.
        </p>
        {typed ? (
          <button
            type="button"
            onClick={() => setShowHint((current) => !current)}
            className="mt-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-neon hover:text-white"
          >
            {showHint ? "Hide hint" : "Show hint"}
          </button>
        ) : null}
      </div>
      {typed ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(answer);
            setAnswer("");
            setShowHint(false);
          }}
          className="rounded-[26px] border border-white/10 bg-slate-900/70 p-5"
        >
          <label className="mb-3 block text-sm font-semibold text-slate-200">
            Type the capital
          </label>
          <div className="flex gap-3">
            <input
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Enter capital city"
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-neon"
            />
            <button
              type="submit"
              className="rounded-2xl bg-gold px-5 py-3 font-bold text-slate-950 transition hover:brightness-110"
            >
              Check Answer
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {options?.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSubmit(option);
                setShowHint(false);
              }}
              className="rounded-[24px] border border-white/10 bg-slate-900/70 px-5 py-6 text-left text-xl transition hover:border-neon hover:bg-neon/10"
            >
              <span className="text-lg font-bold">{option}</span>
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <StudyCuePanel
          state={state}
          progress={progress}
          variant="capital"
          showCapitalHint={showHint}
        />
        <HintLadderPanel hints={hints} misses={misses} />
      </div>
    </div>
  );
}
