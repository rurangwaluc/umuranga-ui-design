"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  Home,
  LogOut,
  Search,
  UserRound,
} from "lucide-react";
import {
  clearAuthSession,
  getDashboardLabel,
  getRefreshToken,
  getStoredUser,
} from "@/lib/auth";
import { apiRequest } from "@/lib/api";
import { ThemeToggle } from "@/components/theme-toggle";

type DashboardShellProps = {
  title: string;
  description: string;
  badge: string;
  cards: {
    title: string;
    text: string;
      href?: string;
  }[];
  children?: ReactNode;
};

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "U";

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function DashboardShell({
  title,
  description,
  badge,
  cards,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const user = getStoredUser();

  const fullName = user?.fullName ?? "UMURANGA user";
  const firstName = fullName.split(/\s+/).filter(Boolean)[0] ?? "there";
  const initials = getInitials(fullName);
  const dashboardLabel = getDashboardLabel(user);

  async function handleLogout() {
    const refreshToken = getRefreshToken();

    try {
      if (refreshToken) {
        await apiRequest("/auth/logout", {
          method: "POST",
          body: {
            refreshToken,
          },
        });
      }
    } catch {
      // Local logout must still happen if the API request fails.
    }

    clearAuthSession();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-white/10 bg-[#08285F] text-white">
        <div className="mx-auto flex h-[72px] max-w-[1420px] items-center justify-between gap-5 px-4 sm:px-6 lg:h-[78px] lg:px-8">
          <div className="flex min-w-0 items-center gap-6">
            <Link href="/" className="shrink-0">
              <Image
                src="/images/umuranga-logo-gold.png"
                alt="UMURANGA"
                width={424}
                height={100}
                priority
                className="h-[45px] w-auto object-contain sm:h-[49px]"
              />
            </Link>

            <div className="hidden h-7 w-px bg-white/16 lg:block" />

            <div className="hidden lg:block">
              <p className="text-[0.67rem] font-black uppercase tracking-[0.18em] text-white/52">
                Workspace
              </p>
              <p className="mt-0.5 text-sm font-bold text-white/90">
                {dashboardLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/search"
              className="hidden h-10 items-center gap-2 rounded-[8px] border border-white/20 px-4 text-sm font-bold text-white/88 transition hover:border-[#D7B16F] hover:text-white md:inline-flex"
            >
              <Search size={16} />
              Browse properties
            </Link>

            <Link
              href="/account"
              className="hidden h-10 items-center gap-2 rounded-[8px] border border-white/20 px-4 text-sm font-bold text-white/88 transition hover:border-[#D7B16F] hover:text-white sm:inline-flex"
            >
              <UserRound size={16} />
              Account
            </Link>

            <ThemeToggle />

            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sign out"
              className="hidden h-10 w-10 items-center justify-center rounded-[8px] border border-white/20 text-white/80 transition hover:border-[#D7B16F] hover:text-white sm:inline-flex"
            >
              <LogOut size={17} />
            </button>

            <button
              type="button"
              aria-label="Workspace menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/20 text-white md:hidden"
            >
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1420px] lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-78px)] border-r border-[var(--line)] px-5 py-7 lg:block">
          <div className="mb-7 flex items-center gap-3 border-b border-[var(--line)] pb-6">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D7B16F] bg-[#08285F] text-sm font-black text-white">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-black">{fullName}</p>
              <p className="mt-0.5 truncate text-xs font-semibold text-[var(--muted)]">
                {user?.email ?? "Personal account"}
              </p>
            </div>
          </div>

          <nav>
            <Link
              href="#"
              className="flex h-11 items-center gap-3 bg-[#08285F] px-3 text-sm font-black text-white shadow-[inset_3px_0_0_#D7B16F]"
            >
              <Home size={17} className="text-[#D7B16F]" />
              Overview
            </Link>

            <div className="mt-2 space-y-1">
              {cards.map((card) =>
                card.href ? (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="flex h-11 w-full items-center px-3 text-left text-sm font-bold text-[var(--muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
                  >
                    {card.title}
                  </Link>
                ) : (
                  <button
                    key={card.title}
                    type="button"
                    className="flex h-11 w-full items-center px-3 text-left text-sm font-bold text-[var(--muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
                  >
                    {card.title}
                  </button>
                ),
              )}
            </div>
          </nav>

          <div className="mt-7 border-t border-[var(--line)] pt-5">
            <Link
              href="/account"
              className="flex h-11 items-center gap-3 px-3 text-sm font-bold text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              <UserRound size={17} />
              Account
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex h-11 w-full items-center gap-3 px-3 text-sm font-bold text-[var(--danger)]"
            >
              <LogOut size={17} />
              Sign out
            </button>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-9 lg:py-9 xl:px-12">
            {children ? (
              children
            ) : (
              <>
          <section className="border-b border-[var(--line)] pb-7">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.18em] text-[#A27B36] dark:text-[#D7B16F]">
              {badge}
            </p>

            <div className="mt-3 grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-end">
              <div>
                <p className="text-sm font-bold text-[var(--muted)]">
                  Welcome back, {firstName}
                </p>

                <h1 className="mt-2 max-w-4xl text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] min-[390px]:text-[2.15rem] sm:text-[2.65rem] lg:text-[3rem] xl:text-[3.25rem]">
                  {title}
                </h1>

                <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[var(--muted)] sm:text-[0.95rem]">
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-3 border-l-2 border-[#D7B16F] pl-4">
                <Bell size={18} className="shrink-0 text-[#A27B36] dark:text-[#D7B16F]" />
                <div>
                  <p className="text-xs font-black">Activity</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[var(--muted)]">
                    Viewing requests and saved-search updates will appear here.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-6 sm:py-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-black tracking-[-0.035em] sm:text-2xl">
                  Your workspace
                </h2>
                <p className="mt-1.5 text-sm font-semibold text-[var(--muted)]">
                  The things that need your attention stay together here.
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-[var(--line)] sm:mt-5">
              {cards.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  className="group grid w-full grid-cols-[40px_minmax(0,1fr)_34px] items-start gap-3 border-b border-[var(--line)] py-4 text-left transition sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:py-5"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-[7px] border border-[var(--line)] bg-[var(--surface-soft)] text-xs font-black text-[#08285F] dark:text-[#D7B16F] sm:h-10 sm:w-10 sm:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>
                    <span className="block text-[0.98rem] font-black tracking-[-0.02em] sm:text-lg">
                      {card.title}
                    </span>
                    <span className="mt-1 block max-w-3xl text-[0.82rem] font-semibold leading-5 text-[var(--muted)] sm:text-sm sm:leading-6">
                      {card.text}
                    </span>
                  </span>

                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-[7px] border border-[var(--line)] transition group-hover:border-[#D7B16F] sm:h-9 sm:w-9">
                    <ArrowRight size={16} />
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="border-t border-[var(--line)] py-5 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-black">Looking for property?</h2>
                <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                  Continue browsing verified listings across UMURANGA.
                </p>
              </div>

              <Link
                href="/search"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[7px] border border-[#08285F] bg-[#08285F] px-5 text-sm font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition hover:bg-[#0A326F] sm:w-auto"
              >
                Browse properties
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
              </>
            )}
        </section>
      </div>
    </main>
  );
}
