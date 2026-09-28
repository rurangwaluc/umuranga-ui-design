"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthUser } from "@/lib/auth";

type Intent =
  | "find"
  | "property"
  | "business"
  | "team"
  | "professional";

const options: {
  id: Intent;
  title: string;
  mobileTitle: string;
  description: string;
  mobileDescription: string;
}[] = [
  {
    id: "find",
    title: "Find a property",
    mobileTitle: "Find a property",
    description: "Buy, rent, or explore homes and land.",
    mobileDescription: "Buy, rent or explore.",
  },
  {
    id: "property",
    title: "List or manage property",
    mobileTitle: "List or manage property",
    description: "Sell, rent out, or manage property you are responsible for.",
    mobileDescription: "Sell, rent out or manage.",
  },
  {
    id: "business",
    title: "Set up a real-estate business",
    mobileTitle: "Start a property business",
    description:
      "For agencies, property managers, developers, and property companies.",
    mobileDescription: "Agency, management or development.",
  },
  {
    id: "team",
    title: "Join a real-estate team",
    mobileTitle: "Join a real estate team",
    description: "For agents, brokers, managers, finance teams, and staff.",
    mobileDescription: "Agent, broker, manager or staff.",
  },
  {
    id: "professional",
    title: "Offer professional services",
    mobileTitle: "Offer professional services",
    description:
      "Surveying, valuation, legal, inspection, construction, and related services.",
    mobileDescription:
      "Surveying, valuation, legal, inspection, construction and related services.",
  },
];

function getInitialIntent(role: string | null): Intent | null {
  if (role === "landlord") return "property";
  if (role === "agency") return "business";
  if (role === "agent") return "team";
  if (role === "partner") return "professional";

  return null;
}

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const user = useAuthUser();

  const initialIntent = useMemo(
    () => getInitialIntent(searchParams.get("role")),
    [searchParams]
  );

  const [selected, setSelected] = useState<Intent | null>(initialIntent);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08285F] text-white">
        <div className="mx-auto flex h-[60px] w-full max-w-[1420px] items-center justify-between gap-3 px-4 sm:h-[70px] sm:gap-5 sm:px-6 lg:px-8">
          <Link href="/" aria-label="UMURANGA home">
            <Image
              src="/images/umuranga-logo-gold.png"
              alt="UMURANGA"
              width={424}
              height={100}
              priority
              className="h-[35px] w-auto object-contain sm:h-[50px]"
            />
          </Link>

          <div className="flex items-center gap-2">
            {!user ? (
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-[7px] border border-white/20 px-3.5 text-[13px] font-semibold text-white transition hover:border-[#D7B16F]/70 hover:bg-white/5 sm:h-10 sm:px-4 sm:text-sm"
              >
                Sign in
              </Link>
            ) : null}

            <div className="origin-right scale-[0.86] sm:scale-100">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-7 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* MOBILE / TABLET */}
        <div className="lg:hidden">
          <div className="max-w-[620px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-[#9A7841] dark:text-[#D7B16F]">
              WELCOME TO UMURANGA
            </p>

            <h1 className="mt-3 max-w-[460px] text-[2rem] font-semibold leading-[1.02] tracking-[-0.048em] sm:text-[2.6rem]">
              What do you want to do first?
            </h1>

            <p className="mt-3 max-w-[500px] text-sm font-medium leading-6 text-[var(--muted)]">
              Choose where to start. You can add more later.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-3">
            {options.map((option) => {
              const active = selected === option.id;
              const fullWidth = option.id === "professional";

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setSelected((current) =>
                      current === option.id ? null : option.id
                    )
                  }
                  aria-pressed={active}
                  className={[
                    "relative min-h-[132px] border p-4 text-left transition sm:min-h-[142px] sm:p-5",
                    fullWidth ? "col-span-2" : "",
                    active
                      ? "border-[#D7B16F] bg-[#F7F3EA] shadow-[inset_0_-2px_0_#D7B16F] dark:bg-white/[0.04]"
                      : "border-[var(--line)] bg-[var(--card)] active:bg-[var(--surface-soft)]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "block pr-5 text-[14px] font-bold leading-[1.2] tracking-[-0.025em] sm:pr-7 sm:text-[16px]",
                      active
                        ? "text-[#08285F] dark:text-white"
                        : "text-[var(--foreground)]",
                    ].join(" ")}
                  >
                    {option.mobileTitle}
                  </span>

                  <span className="mt-2 block max-w-[440px] text-[12px] font-medium leading-[1.5] text-[var(--muted)] sm:text-[13px]">
                    {option.mobileDescription}
                  </span>

                  <span
                    aria-hidden="true"
                    className={[
                      "absolute right-3.5 top-3.5 text-[15px] font-semibold sm:right-4 sm:top-4 sm:text-base",
                      active
                        ? "text-[#C99D54]"
                        : "text-[var(--muted)]",
                    ].join(" ")}
                  >
                    {active ? "✓" : "↗"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 border-t border-[var(--line)] pt-5">
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--card)] px-4 text-sm font-semibold text-[var(--muted)] transition-colors hover:border-[#D7B16F]/70 hover:text-[var(--foreground)]"
              >
                Skip for now
              </Link>

              <button
                type="button"
                disabled={!selected}
                className="inline-flex h-11 items-center justify-center rounded-[8px] bg-[#08285F] px-4 text-sm font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] transition disabled:cursor-not-allowed disabled:bg-[var(--soft)] disabled:text-[var(--muted)] disabled:shadow-none dark:bg-[#D7B16F] dark:text-[#08285F] dark:shadow-[inset_0_-2px_0_#08285F] dark:disabled:bg-white/[0.07] dark:disabled:text-white/30 dark:disabled:shadow-none"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden items-start gap-16 lg:grid lg:grid-cols-[minmax(0,720px)_300px] lg:justify-between">
          <div>
            <div className="max-w-[650px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7841] dark:text-[#D7B16F]">
                WELCOME TO UMURANGA
              </p>

              <h1 className="mt-4 text-[3.25rem] font-semibold leading-[1] tracking-[-0.055em]">
                What do you want to do first?
              </h1>

              <p className="mt-5 max-w-[540px] text-[15px] font-medium leading-7 text-[var(--muted)]">
                Start with what you need today. Nothing here limits what you can
                do later.
              </p>
            </div>

            <div className="mt-10 border-t border-[var(--line)]">
              {options.map((option) => {
                const active = selected === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                    setSelected((current) =>
                      current === option.id ? null : option.id
                    )
                  }
                    aria-pressed={active}
                    className={[
                      "group relative flex w-full cursor-pointer items-center justify-between gap-6 border-b border-[var(--line)] py-6 text-left transition-colors",
                      active
                        ? "bg-[#F7F3EA] dark:bg-white/[0.028]"
                        : "hover:bg-[var(--surface-soft)]",
                    ].join(" ")}
                  >
                    {active ? (
                      <span className="absolute inset-y-0 left-0 w-[3px] bg-[#D7B16F]" />
                    ) : null}

                    <span
                      className={[
                        "min-w-0 transition-transform duration-200",
                        active
                          ? "pl-4"
                          : "pl-0 group-hover:translate-x-0.5",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "block text-[19px] font-bold tracking-[-0.025em]",
                          active
                            ? "text-[#08285F] dark:text-white"
                            : "text-[var(--foreground)]",
                        ].join(" ")}
                      >
                        {option.title}
                      </span>

                      <span className="mt-1.5 block max-w-[520px] text-sm font-medium leading-6 text-[var(--muted)]">
                        {option.description}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "mr-3 shrink-0 text-lg font-semibold transition-all",
                        active
                          ? "text-[#D7B16F]"
                          : "text-[var(--muted)] group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]",
                      ].join(" ")}
                    >
                      {active ? "✓" : "→"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex items-center justify-end gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center px-4 text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                Skip for now
              </Link>

              <button
                type="button"
                disabled={!selected}
                className="inline-flex h-11 min-w-[160px] items-center justify-center rounded-[8px] bg-[#08285F] px-7 text-sm font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] transition hover:bg-[#0A326F] disabled:cursor-not-allowed disabled:bg-[var(--soft)] disabled:text-[var(--muted)] disabled:shadow-none dark:bg-[#D7B16F] dark:text-[#08285F] dark:shadow-[inset_0_-2px_0_#08285F] dark:hover:bg-[#E0BE82] dark:disabled:bg-white/[0.07] dark:disabled:text-white/30 dark:disabled:shadow-none"
              >
                Continue
              </button>
            </div>
          </div>

          <aside className="self-start sticky top-[102px]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/home/trust-property-real.webp"
                alt=""
                fill
                sizes="300px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(4,13,28,0.76)_100%)]" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E1C488]">
                  UMURANGA / RWANDA
                </p>

                <p className="mt-3 text-[22px] font-semibold leading-[1.1] tracking-[-0.035em]">
                  One place for the property journey ahead.
                </p>
              </div>
            </div>

            <div className="border-b border-[#D7B16F]/70 py-5">
              <p className="text-sm leading-6 text-[var(--muted)]">
                Buying, renting, ownership, management, business, and
                professional property services.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
