export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md border border-[#47d7c4]/18 bg-white/10 ${className}`}
    />
  );
}
