export function FamilyHuddlePanel({ notes }: { notes: string[] }) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-slate-900/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
        Family Huddle
      </p>
      <div className="mt-4 space-y-2">
        {notes.map((note) => (
          <div
            key={note}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
          >
            <p className="text-sm text-slate-200">{note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
