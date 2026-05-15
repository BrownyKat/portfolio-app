export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md border border-[#48e2ff]/18 bg-white/10 ${className}`}
    />
  );
}
