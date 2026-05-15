import { SkeletonBlock } from "@/components/atoms/SkeletonBlock";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SkeletonBlock className="h-8 w-40" />
      <SkeletonBlock className="mt-6 h-14 w-full max-w-2xl" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <SkeletonBlock className="h-72" />
        <SkeletonBlock className="h-72" />
        <SkeletonBlock className="h-72" />
      </div>
    </main>
  );
}
