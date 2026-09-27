import Image from "next/image";
import { Skeleton } from "@/components/skeleton";

function PropertySkeleton() {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[var(--line)] bg-[var(--card)]">
      <Skeleton className="aspect-[1.48/1] w-full rounded-none" />

      <div className="px-4 pb-4 pt-4">
        <Skeleton className="h-4 w-[72%] rounded-[4px]" />
        <Skeleton className="mt-2.5 h-3 w-[46%] rounded-[3px]" />

        <div className="mt-5 flex items-end justify-between gap-4">
          <Skeleton className="h-5 w-[42%] rounded-[4px]" />
          <Skeleton className="h-8 w-12 rounded-[6px]" />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 border-t border-[var(--line)] pt-3">
          <Skeleton className="h-3 rounded-[3px]" />
          <Skeleton className="h-3 rounded-[3px]" />
          <Skeleton className="h-3 rounded-[3px]" />
          <Skeleton className="h-3 rounded-[3px]" />
        </div>
      </div>
    </article>
  );
}

export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading UMURANGA"
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
    >
      <header className="border-b border-white/10 bg-[#08285F] text-white">
        <div className="mx-auto flex h-[70px] w-full max-w-[1420px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Image
            src="/images/umuranga-logo-gold.png"
            alt="UMURANGA"
            width={424}
            height={100}
            priority
            className="h-[44px] w-auto object-contain sm:h-[50px]"
          />

          <div className="hidden items-center gap-8 lg:flex">
            <Skeleton className="h-3.5 w-8 rounded-[3px] bg-white/12 dark:bg-white/12" />
            <Skeleton className="h-3.5 w-9 rounded-[3px] bg-white/12 dark:bg-white/12" />
            <Skeleton className="h-3.5 w-10 rounded-[3px] bg-white/12 dark:bg-white/12" />
            <Skeleton className="h-3.5 w-12 rounded-[3px] bg-white/12 dark:bg-white/12" />
            <Skeleton className="h-3.5 w-16 rounded-[3px] bg-white/12 dark:bg-white/12" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="hidden h-10 w-28 rounded-[8px] bg-white/12 dark:bg-white/12 sm:block" />
            <Skeleton className="h-10 w-10 rounded-[8px] bg-white/12 dark:bg-white/12" />
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1420px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="border-b border-[var(--line)] pb-8 sm:pb-10">
          <Skeleton className="h-3.5 w-24 rounded-[3px]" />

          <div className="mt-5 max-w-3xl">
            <Skeleton className="h-9 w-[78%] rounded-[5px] sm:h-11" />
            <Skeleton className="mt-3 h-9 w-[56%] rounded-[5px] sm:h-11" />
          </div>

          <div className="mt-5 max-w-xl space-y-2.5">
            <Skeleton className="h-3.5 w-full rounded-[3px]" />
            <Skeleton className="h-3.5 w-[74%] rounded-[3px]" />
          </div>
        </div>

        <div className="grid gap-8 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
          <div>
            <div className="flex items-end justify-between gap-5">
              <div className="w-full max-w-sm">
                <Skeleton className="h-6 w-[58%] rounded-[4px]" />
                <Skeleton className="mt-3 h-3.5 w-[82%] rounded-[3px]" />
              </div>

              <Skeleton className="hidden h-9 w-24 rounded-[7px] sm:block" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <PropertySkeleton />
              <PropertySkeleton />
              <PropertySkeleton />
            </div>
          </div>

          <aside className="border-t border-[#D7B16F]/65 pt-6 lg:border-t lg:px-1">
            <Skeleton className="h-5 w-32 rounded-[4px]" />

            <div className="mt-6 space-y-5">
              <div>
                <Skeleton className="h-3 w-20 rounded-[3px]" />
                <Skeleton className="mt-2 h-10 w-full rounded-[7px]" />
              </div>

              <div>
                <Skeleton className="h-3 w-24 rounded-[3px]" />
                <Skeleton className="mt-2 h-10 w-full rounded-[7px]" />
              </div>

              <div>
                <Skeleton className="h-3 w-16 rounded-[3px]" />
                <Skeleton className="mt-2 h-24 w-full rounded-[7px]" />
              </div>

              <Skeleton className="h-11 w-full rounded-[8px]" />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
