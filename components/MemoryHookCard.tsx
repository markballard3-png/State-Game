import { StateInfo } from "@/types/game";

export function MemoryHookCard({ state }: { state: StateInfo }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        Memory Hook
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-200">{state.memoryHook}</p>
    </div>
  );
}
