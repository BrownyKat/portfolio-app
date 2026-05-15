import { SkeletonBlock } from "@/components/atoms/SkeletonBlock";

export default function LogLoading() {
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
      <div>
        <SkeletonBlock className="h-6 w-48" />
        <SkeletonBlock className="mt-5 h-24 max-w-3xl" />
        <SkeletonBlock className="mt-8 h-96" />
      </div>
      <SkeletonBlock className="h-72" />
    </main>
  );
}
