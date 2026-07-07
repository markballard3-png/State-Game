export function BowlGameReview({
  reviewCount
}: {
  reviewCount: number;
}) {
  return (
    <section className="rounded-[26px] border border-white/10 bg-gradient-to-r from-sky-500/10 to-gold/10 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
        Bowl Game Review
      </p>
      <h2 className="mt-2 text-3xl font-black">Missed states come back under the lights</h2>
      <p className="mt-3 text-slate-300">
        This bowl review replays your toughest states and capitals more often so retrieval gets
        stronger with every round.
      </p>
      <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        {reviewCount} states currently on the bowl review board
      </p>
    </section>
  );
}
