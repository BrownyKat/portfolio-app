import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: "primary" | "secondary";
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  const variants = {
    primary:
      "border border-[#47d7c4]/70 bg-[#47d7c4] text-[#102a2e] shadow-lg shadow-[#47d7c4]/25 hover:-translate-y-0.5 hover:bg-[#ffd166]",
    secondary:
      "border border-[#ff7a59]/45 bg-[#fff7ec]/8 text-[#fff7ec] shadow-lg shadow-[#ff7a59]/15 hover:-translate-y-0.5 hover:border-[#47d7c4] hover:bg-[#47d7c4]/12",
  };

  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-300 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
