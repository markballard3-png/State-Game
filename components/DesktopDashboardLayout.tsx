export function DesktopDashboardLayout({
  left,
  center,
  right
}: {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100vh-3rem)] grid-cols-[300px_minmax(720px,1fr)_360px] gap-6">
      <aside className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-panel backdrop-blur">
        {left}
      </aside>
      <main className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-panel backdrop-blur">
        {center}
      </main>
      <aside className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-panel backdrop-blur">
        {right}
      </aside>
    </div>
  );
}
