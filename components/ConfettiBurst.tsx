const pieces = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: 8 + (index % 11) * 8,
  delay: (index % 6) * 0.05,
  duration: 0.9 + (index % 4) * 0.15,
  rotate: (index % 2 === 0 ? 1 : -1) * (30 + index * 7),
  color: ["#facc15", "#2dd4bf", "#60a5fa", "#f472b6", "#fb923c"][index % 5]
}));

export function ConfettiBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece absolute top-20 block h-4 w-2 rounded-sm"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            ["--tw-rotate" as never]: `${piece.rotate}deg`
          }}
        />
      ))}
      <style jsx>{`
        .confetti-piece {
          animation-name: confetti-fall;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }

        @keyframes confetti-fall {
          0% {
            opacity: 0;
            transform: translateY(-20px) rotate(0deg) scale(0.8);
          }
          10% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(260px) rotate(540deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
