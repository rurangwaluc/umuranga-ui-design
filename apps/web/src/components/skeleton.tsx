import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-[#E4E0D7] dark:bg-[#1B1D22]",
        "before:absolute before:inset-y-0 before:left-0 before:w-[55%]",
        "before:-translate-x-[140%]",
        "before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.26),transparent)]",
        "before:animate-[shimmer_2.15s_ease-in-out_infinite]",
        "before:will-change-transform",
        "dark:before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.028),transparent)]",
        "motion-reduce:before:animate-none",
        className
      )}
    />
  );
}
