"use client";

import Image from "next/image";
import Link from "next/link";
import { CirclePlus, Menu, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const MENU_ANIMATION_MS = 260;

type AuthShellProps = {
  title: string;
  description: string;
  activePage: "login" | "signup";
  children: React.ReactNode;
};

const navLinks = [
  ["Buy", "/search?purpose=buy"],
  ["Rent", "/search?purpose=rent"],
  ["Land", "/search?type=land"],
  ["Agents", "/agent"],
  ["Agencies", "/agency"],
];

export function AuthShell({
  title,
  description,
  activePage,
  children,
}: AuthShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const headerAction =
    activePage === "login"
      ? { label: "Create account", href: "/signup" }
      : { label: "Sign in", href: "/login" };

  useEffect(() => {
    if (!mobileMounted) return;

    const body = document.body;
    const root = document.documentElement;
    const originalRootOverflow = root.style.overflow;
    const originalBodyOverflow = body.style.overflow;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      root.style.overflow = originalRootOverflow;
      body.style.overflow = originalBodyOverflow;
    };
  }, [mobileMounted]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function openMobileMenu() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setMobileMounted(true);
    window.requestAnimationFrame(() => setMobileOpen(true));
  }

  function closeMobileMenu() {
    setMobileOpen(false);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setMobileMounted(false);
    }, MENU_ANIMATION_MS);
  }

  function toggleMobileMenu() {
    if (mobileOpen) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="grid min-h-screen lg:h-screen lg:grid-cols-[0.8fr_1.2fr] lg:overflow-hidden">
        <aside className="relative hidden overflow-hidden bg-[#071F4D] lg:block">
          <Image
            src="/images/home/herosectionbg.webp"
            alt="UMURANGA property"
            fill
            priority
            sizes="42vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#071F4D]/78" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#071F4D]/18 to-[#020817]/82" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <Link href="/" className="inline-flex w-fit items-center">
              <Image
                src="/images/umuranga-logo-gold.png"
                alt="UMURANGA"
                width={424}
                height={100}
                className="h-[48px] w-auto object-contain"
              />
            </Link>

            <div className="max-w-[480px]">
              <p className="text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-white xl:text-5xl">
                Property access should start with a trusted identity.
              </p>

              <p className="mt-5 max-w-sm text-sm font-semibold leading-7 text-white/66">
                Rwanda-first access for buyers, renters, owners, agencies, agents, and trusted partners.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-h-screen flex-col lg:h-screen">
          <header
            className={`${mobileOpen ? "fixed inset-x-0 top-0" : "sticky top-0"} z-[100] border-b border-white/10 bg-[#08285f] px-3 py-2 text-white shadow-[0_8px_24px_rgba(7,21,47,0.16)] transition-colors duration-300 dark:border-white/10 dark:bg-[#08285f] sm:px-5 lg:relative lg:inset-auto lg:border-[var(--line)] lg:bg-[var(--background)] lg:text-[var(--foreground)] lg:shadow-none lg:dark:bg-[#0A0B0E]`}
          >
            <div className="mx-auto grid h-[54px] max-w-[1420px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-1 transition sm:h-[64px] sm:px-2 lg:h-[70px] lg:grid-cols-[minmax(0,1fr)_auto] lg:px-3">
              <Link href="/" className="flex w-fit min-w-0 items-center lg:hidden">
                <Image
                  src="/images/umuranga-logo-gold.png"
                  alt="UMURANGA logo"
                  width={424}
                  height={100}
                  priority
                  className="h-[40px] w-auto object-contain sm:h-[46px]"
                />
              </Link>

              <nav className="hidden h-[40px] w-fit items-center justify-center gap-7 whitespace-nowrap px-1 text-[0.82rem] font-black transition lg:flex">
                {navLinks.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="group relative inline-flex h-[40px] items-center justify-center overflow-hidden px-0.5 tracking-[0.01em] text-[var(--foreground)]/78 transition duration-300 ease-out hover:text-[var(--foreground)]"
                  >
                    <span className="relative z-10">{label}</span>
                    <span className="absolute bottom-[5px] left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#D7B16F] opacity-0 transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-100" />
                  </Link>
                ))}
              </nav>

              <div className="flex items-center justify-end gap-2">
                <ThemeToggle variant="adaptive" />

                <Link
                  href={headerAction.href}
                  className="hidden h-[40px] items-center justify-center whitespace-nowrap rounded-[9px] border border-[#08285F] bg-[#08285F] px-4 text-[0.82rem] font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#0A326F] active:translate-y-0 sm:inline-flex"
                >
                  {headerAction.label}
                </Link>

                <button
                  type="button"
                  onClick={toggleMobileMenu}
                  className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-white/24 bg-white/12 text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:border-[#D7B16F] hover:bg-white/14 sm:h-[42px] sm:w-[42px] lg:hidden"
                  aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileOpen}
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </header>

          {mobileMounted ? (
            <div
              className={`fixed inset-x-0 bottom-0 top-[78px] z-[80] overscroll-contain transition duration-[240ms] ease-out sm:top-[92px] lg:hidden ${
                mobileOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMobileMenu}
                className="absolute inset-0 bg-black/10 backdrop-blur-[1px] dark:bg-black/34"
              />

              <div
                className={`absolute inset-x-3 top-3 border border-black/18 bg-white px-5 pb-5 pt-3 text-[#07152f] transition duration-[240ms] ease-out dark:border-white/22 dark:bg-[#090A0C] dark:text-white sm:inset-x-8 sm:top-4 ${
                  mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                }`}
              >
                <div className="mx-auto max-w-[520px]">
                  <div className="mx-auto mb-4 h-px w-12 bg-black/20 dark:bg-white/24" />

                  <div className="mb-4">
                    <p className="text-[0.7rem] font-black uppercase tracking-[0.26em] text-black/50 dark:text-white/50">
                      Menu
                    </p>
                  </div>

                  <nav className="grid grid-cols-2 gap-2">
                    {navLinks.map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={closeMobileMenu}
                        className="flex h-11 items-center justify-center border border-black/18 bg-transparent text-[0.9rem] font-black transition hover:border-[#071f4d] hover:text-[#071f4d] dark:border-white/24 dark:bg-transparent dark:hover:border-[#08285f] dark:hover:text-[#C8C0B3]"
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href="/signup"
                      onClick={closeMobileMenu}
                      className="inline-flex h-[48px] items-center justify-center gap-2 border border-[#071f4d] bg-white text-[0.86rem] font-black text-[#071f4d] transition hover:bg-[#f6f9ff] dark:border-[#08285f] dark:bg-white dark:text-[#071f4d]"
                    >
                      <CirclePlus size={17} />
                      Create
                    </Link>

                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="inline-flex h-[48px] items-center justify-center gap-2 bg-[#071f4d] text-[0.86rem] font-black text-white transition hover:bg-[#061735]"
                    >
                      <UserRound size={17} />
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex flex-1 items-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="mx-auto w-full max-w-[420px] lg:max-w-[430px] lg:-mt-6">
              <h1 className="text-[clamp(1.85rem,6.9vw,3.05rem)] font-semibold leading-[1.02] tracking-[-0.055em] lg:whitespace-nowrap lg:text-[clamp(2.2rem,2.85vw,3.05rem)]">
                {title}
              </h1>

              <p className="mt-3 text-sm font-bold leading-6 text-[var(--muted)]">
                {description}
              </p>

              <div className="mt-7">{children}</div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
