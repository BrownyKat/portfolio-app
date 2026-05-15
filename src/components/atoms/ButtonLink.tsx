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
      "border border-[#48e2ff]/70 bg-[#48e2ff] text-[#061018] shadow-lg shadow-[#48e2ff]/25 hover:-translate-y-0.5 hover:bg-[#b8ff6a]",
    secondary:
      "border border-[#ff4fd8]/40 bg-white/7 text-[#f5fbff] shadow-lg shadow-[#ff4fd8]/10 hover:-translate-y-0.5 hover:border-[#48e2ff] hover:bg-[#48e2ff]/10",
  };

  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-300 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
