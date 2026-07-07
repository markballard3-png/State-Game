export function FeedbackBanner({
  message,
  variant
}: {
  message: string;
  variant: "neutral" | "success" | "warning";
}) {
  const styles = {
    neutral: "border-white/10 bg-white/5 text-slate-200",
    success: "border-neon/30 bg-neon/10 text-neon",
    warning: "border-gold/30 bg-gold/10 text-gold"
  } as const;

  const labels = {
    neutral: "Film Room Note",
    success: "Touchdown",
    warning: "Whistle"
  } as const;

  return (
    <div className={`rounded-[24px] border px-5 py-4 ${styles[variant]}`}>
      <p className="text-xs uppercase tracking-[0.24em] opacity-80">{labels[variant]}</p>
      <p className="mt-2 max-w-sm text-sm">{message}</p>
    </div>
  );
}
