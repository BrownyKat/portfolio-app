import type { ComponentPropsWithoutRef } from "react";

type BadgeTone = "neutral" | "accent" | "success";

const tones: Record<BadgeTone, string> = {
  neutral: "border-[#48e2ff]/25 bg-white/6 text-[#c9dae6]",
  accent: "border-[#48e2ff]/45 bg-[#48e2ff]/12 text-[#9ff0ff]",
  success: "border-[#b8ff6a]/45 bg-[#b8ff6a]/12 text-[#d8ff9f]",
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
