"use client";

import { useState } from "react";
import { StateInfo } from "@/types/game";

export function CapitalQuiz({
  state,
  options,
  typed,
  onSubmit
}: {
  state: StateInfo;
  options?: string[];
  typed: boolean;
  onSubmit: (answer: string) => void;
}) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="space-y-5">
      <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Call the Right Play
        </p>
        <h2 className="mt-2 text-4xl font-black">What is the capital of {state.name}?</h2>
        <p className="mt-3 text-slate-300">{state.memoryHook}</p>
      </div>
      {typed ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(answer);
            setAnswer("");
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
              onClick={() => onSubmit(option)}
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
