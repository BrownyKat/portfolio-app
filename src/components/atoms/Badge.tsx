import type { ComponentPropsWithoutRef } from "react";

type BadgeTone = "neutral" | "accent" | "success";

const tones: Record<BadgeTone, string> = {
  neutral: "border-[#47d7c4]/25 bg-[#fff7ec]/7 text-[#d6e7df]",
  accent: "border-[#47d7c4]/45 bg-[#47d7c4]/12 text-[#9df3e7]",
  success: "border-[#ffd166]/45 bg-[#ffd166]/12 text-[#ffe5a1]",
};

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  tone?: BadgeTone;
}

export function Badge({
  tone = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]} ${className}`}
      {...props}
    />
  );
}
