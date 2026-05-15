import { SkeletonBlock } from "@/components/atoms/SkeletonBlock";

export default function WorkLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SkeletonBlock className="h-7 w-24" />
      <SkeletonBlock className="mt-5 h-24 max-w-3xl" />
      <SkeletonBlock className="mt-8 h-12 max-w-4xl" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SkeletonBlock className="h-80" />
        <SkeletonBlock className="h-80" />
        <SkeletonBlock className="h-80" />
      </div>
    </main>
  );
}
