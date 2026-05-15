"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/logs", label: "Logs", match: "/logs" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="flex items-center gap-1">
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href ||
              pathname.startsWith(link.match ?? link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold transition sm:px-4 ${
              isActive
                ? "border border-[#47d7c4]/55 bg-[#47d7c4]/14 text-[#9df3e7] shadow-[0_0_22px_rgba(71,215,196,0.18)]"
                : "text-[#c8ded7] hover:bg-[#fff7ec]/8 hover:text-[#fff7ec]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
