export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-white">
      <div className="playful-card max-w-lg rounded-[28px] p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Page Not Found</p>
        <h1 className="mt-3 text-3xl font-black">Let&apos;s head back to the map.</h1>
        <p className="mt-3 text-base text-slate-100/90">
          The page you were looking for is not here.
        </p>
      </div>
    </main>
  );
}
