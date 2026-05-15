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
                ? "border border-[#48e2ff]/55 bg-[#48e2ff]/14 text-[#9ff0ff] shadow-[0_0_22px_rgba(72,226,255,0.16)]"
                : "text-[#b8c8d6] hover:bg-white/7 hover:text-[#f5fbff]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
