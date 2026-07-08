export function FeedbackBanner({
  message,
  variant
}: {
  message: string;
  variant: "neutral" | "success" | "warning";
}) {
  const styles = {
    neutral: "border-white/20 bg-white/10 text-white shadow-lg",
    success: "border-neon/40 bg-neon/15 text-white shadow-lg",
    warning: "border-gold/40 bg-gold/15 text-white shadow-lg"
  } as const;

  const labels = {
    neutral: "Game Note",
    success: "Correct",
    warning: "Try Again"
  } as const;

  return (
    <div className={`rounded-[24px] border px-5 py-4 ${styles[variant]}`}>
      <p className="text-xs font-bold uppercase tracking-[0.24em] opacity-90">{labels[variant]}</p>
      <p className="mt-2 max-w-sm text-sm font-medium leading-6">{message}</p>
    </div>
  );
}
