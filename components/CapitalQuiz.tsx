"use client";

import { useState } from "react";
import { StudyCuePanel } from "@/components/StudyCuePanel";
import { StateInfo, StateProgress } from "@/types/game";

export function CapitalQuiz({
  state,
  progress,
  options,
  typed,
  onSubmit
}: {
  state: StateInfo;
  progress: StateProgress;
  options?: string[];
  typed: boolean;
  onSubmit: (answer: string) => void;
}) {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
        <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Call the Right Play
          </p>
          <h2 className="mt-2 text-4xl font-black">What is the capital of {state.name}?</h2>
          <p className="mt-3 text-slate-300">{state.memoryHook}</p>
          {typed ? (
            <button
              type="button"
              onClick={() => setShowHint((current) => !current)}
              className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-neon hover:text-white"
            >
              {showHint ? "Hide capital pattern" : "Reveal capital pattern"}
            </button>
          ) : null}
        </div>
        <StudyCuePanel
          state={state}
          progress={progress}
          variant="capital"
          showCapitalHint={showHint}
        />
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
              Snap It
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {options?.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSubmit(option);
                setShowHint(false);
              }}
              className="rounded-[24px] border border-white/10 bg-slate-900/70 px-5 py-6 text-left transition hover:border-neon hover:bg-neon/10"
            >
              <span className="text-lg font-bold">{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
