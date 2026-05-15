import { ButtonLink } from "@/components/atoms/ButtonLink";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col items-start justify-center px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#47d7c4]">
        404
      </p>
      <h1 className="mt-3 text-4xl font-black text-[#fff7ec]">
        Page not found.
      </h1>
      <p className="mt-4 text-lg leading-8 text-[#c8ded7]">
        The route may have moved or the log entry may not exist.
      </p>
      <ButtonLink href="/work" className="mt-8">
        Back to work
      </ButtonLink>
    </main>
  );
}
