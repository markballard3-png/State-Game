export function RocketOutcomeOverlay({
  outcome
}: {
  outcome: "perfect" | "damaged" | "crash";
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {outcome === "perfect" ? (
        <div className="absolute inset-0 fireworks-wrap">
          {Array.from({ length: 18 }, (_, index) => (
            <span
              key={index}
              className="firework-burst"
              style={{
                left: `${8 + (index % 6) * 16}%`,
                top: `${10 + Math.floor(index / 6) * 24}%`,
                animationDelay: `${(index % 6) * 0.18}s`
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300/10 via-transparent to-yellow-300/10" />
          <div className="outcome-banner outcome-banner-perfect">SUPER LANDING!</div>
        </div>
      ) : null}

      {outcome === "damaged" ? (
        <div className="absolute inset-0 smoke-wrap bg-slate-900/25">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className="smoke-cloud"
              style={{
                left: `${(index % 4) * 25}%`,
                bottom: `${(index % 3) * 8}%`,
                animationDelay: `${index * 0.18}s`
              }}
            />
          ))}
          <div className="outcome-banner outcome-banner-damaged">SMOKY LANDING!</div>
        </div>
      ) : null}

      {outcome === "crash" ? (
        <div className="absolute inset-0 explosion-wrap bg-red-950/35 screen-shake">
          <div className="explosion-core" />
          {Array.from({ length: 22 }, (_, index) => (
            <span
              key={index}
              className="explosion-spark"
              style={{
                ["--spark-rotate" as never]: `${index * 16}deg`,
                animationDelay: `${(index % 5) * 0.05}s`
              }}
            />
          ))}
          <div className="outcome-banner outcome-banner-crash">BOOM!</div>
        </div>
      ) : null}
    </div>
  );
}
