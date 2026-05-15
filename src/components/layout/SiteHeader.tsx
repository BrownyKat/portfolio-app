import Link from "next/link";
import { NavLinks } from "@/components/molecules/NavLinks";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#47d7c4]/25 bg-[#102b2f]/88 shadow-lg shadow-[#ff7a59]/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 sm:justify-between sm:px-6 sm:py-3 lg:px-8">
        <Link
          href="/"
          className="brand-name inline-flex min-h-9 w-full items-center justify-center transition sm:min-h-11 sm:w-auto"
        >
          Embuido, Franz Joseph M.
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
