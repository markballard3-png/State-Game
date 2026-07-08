export function AppShell({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-field bg-cover bg-fixed text-slate-100">
      <div className="mx-auto min-h-screen max-w-[1680px] px-4 py-4 sm:px-6 sm:py-6">{children}</div>
    </div>
  );
}
