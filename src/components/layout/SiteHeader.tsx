import Link from "next/link";
import { NavLinks } from "@/components/molecules/NavLinks";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#48e2ff]/20 bg-[#071018]/82 shadow-lg shadow-[#48e2ff]/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm font-black tracking-[0.18em] text-[#f5fbff] transition hover:text-[#48e2ff] sm:text-base"
        >
          FRANZ
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
