export function AppShell({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-field bg-cover bg-fixed text-slate-100">
      <div className="mx-auto min-h-screen max-w-[1680px] px-6 py-6">{children}</div>
    </div>
  );
}
