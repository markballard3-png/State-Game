"use client";

import { useState } from "react";
import { StateInfo } from "@/types/game";

export function RivalryWeekMode({
  leftState,
  rightState,
  bonusQuestion,
  bonusAnswer,
  onComplete
}: {
  leftState: StateInfo;
  rightState: StateInfo;
  bonusQuestion: string;
  bonusAnswer: string;
  onComplete: (wasCorrect: boolean) => void;
}) {
  const [leftAnswer, setLeftAnswer] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [bonus, setBonus] = useState("");

  return (
    <section className="space-y-5 rounded-[28px] border border-white/10 bg-slate-900/60 p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Rivalry Week
        </p>
        <h2 className="mt-2 text-4xl font-black">
          {leftState.name} vs. {rightState.name}
        </h2>
        <p className="mt-3 text-slate-300">
          Name both capitals, then finish the bonus question to win the rivalry trophy.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputCard
          label={`${leftState.name} capital`}
          value={leftAnswer}
          onChange={setLeftAnswer}
        />
        <InputCard
          label={`${rightState.name} capital`}
          value={rightAnswer}
          onChange={setRightAnswer}
        />
      </div>
      <InputCard label={bonusQuestion} value={bonus} onChange={setBonus} />
      <button
        type="button"
        onClick={() =>
          onComplete(
            leftAnswer.trim().toLowerCase() === leftState.capital.toLowerCase() &&
              rightAnswer.trim().toLowerCase() === rightState.capital.toLowerCase() &&
              bonus.trim().toLowerCase() === bonusAnswer.toLowerCase()
          )
        }
        className="rounded-2xl bg-gold px-5 py-3 font-bold text-slate-950 hover:brightness-110"
      >
        Finish Rivalry Week
      </button>
    </section>
  );
}

function InputCard({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block rounded-[24px] border border-white/10 bg-white/5 p-4">
      <span className="block text-sm font-semibold text-slate-200">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-neon"
      />
    </label>
  );
}
