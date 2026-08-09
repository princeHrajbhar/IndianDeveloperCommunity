export function LoadingScreen({ label = "Checking your session" }: { label?: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[#030712] px-5 text-white">
      <div className="text-center">
        <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">{label}</p>
      </div>
    </div>
  );
}
