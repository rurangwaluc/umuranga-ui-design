"use client";

import Image from "next/image";
import Link from "next/link";
import { CirclePlus, Menu, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const MENU_ANIMATION_MS = 260;

type HomeHeroNavLink = {
  label: string;
  href: string;
};

type HomeHeroHeaderProps = {
  navLinks: HomeHeroNavLink[];
  dashboardHref: string;
  listPropertyHref: string;
  userLabel: string;
};

export function HomeHeroHeader({
  navLinks,
  dashboardHref,
  listPropertyHref,
  userLabel,
}: HomeHeroHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleNavLinks = navLinks.filter((item) => item.label !== "How it works");

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 12);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <>
      <header
        className={`${mobileOpen ? "fixed inset-x-0 top-0" : "sticky top-0"} z-[100] border-b border-white/10 bg-[#08285f] px-3 py-2 text-white shadow-[0_8px_24px_rgba(7,21,47,0.16)] transition-colors duration-300 dark:border-white/10 dark:bg-[#08285f] sm:px-5`}
      >
        <div className="mx-auto grid h-[54px] max-w-[1420px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-1 transition sm:h-[64px] sm:px-2 lg:h-[70px] lg:px-3 xl:grid-cols-[340px_minmax(0,1fr)_390px] xl:gap-7">
          <Link href="/" className="flex w-fit min-w-0 items-center">
              <Image
                src="/images/umuranga-logo-gold.png"
                alt="UMURANGA logo"
                width={424}
                height={100}
                priority
                className="h-[46px] w-auto object-contain sm:h-[51px] lg:h-[56px]"
              />

          </Link>

          <nav className="hidden h-[40px] w-fit items-center justify-center gap-10 justify-self-center whitespace-nowrap px-4 text-[0.94rem] font-bold text-white/90 transition xl:flex">
              {visibleNavLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative inline-flex h-[40px] items-center justify-center overflow-hidden px-1 tracking-[0.005em] text-white/90 transition duration-300 ease-out hover:text-white"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute bottom-[5px] left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#D7B16F] opacity-0 transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-100" />
                </Link>
              ))}
            </nav>

          <div className="hidden items-center justify-end gap-4 xl:flex">
            <Link
              href={listPropertyHref}
              className="group inline-flex h-[42px] items-center justify-center gap-2 whitespace-nowrap rounded-[9px] border border-[#D7B16F] bg-[#D7B16F] px-5 text-[0.9rem] font-bold text-[#08285F] shadow-[inset_0_-2px_0_#08285F,0_10px_24px_rgba(0,0,0,0.14)] transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#C79A4A] hover:bg-[#C79A4A] hover:shadow-[inset_0_-2px_0_#08285F,0_14px_30px_rgba(0,0,0,0.18)] active:translate-y-0"
            >
              <CirclePlus size={21} />
              List property
            </Link>

            <Link
              href={dashboardHref}
              className="group inline-flex h-[42px] items-center justify-center gap-2 whitespace-nowrap rounded-[9px] border border-white/30 bg-white/8 px-5 text-[0.9rem] font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#D7B16F] hover:bg-white/10 active:translate-y-0"
            >
              <UserRound size={22} />
              {userLabel}
            </Link>

            <ThemeToggle />
          </div>

          <div className="flex items-center justify-end gap-2 xl:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-white/24 bg-white/12 text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:border-[#D7B16F] hover:bg-white/14 sm:h-[42px] sm:w-[42px]"
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
          className={`fixed inset-x-0 bottom-0 top-[92px] z-[80] overscroll-contain xl:hidden transition duration-[240ms] ease-out sm:top-[92px] ${
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
                {visibleNavLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex h-11 items-center justify-center border border-black/18 bg-transparent text-[0.9rem] font-black transition hover:border-[#071f4d] hover:text-[#071f4d] dark:border-white/24 dark:bg-transparent dark:hover:border-[#08285f] dark:hover:text-[#C8C0B3]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href={listPropertyHref}
                  onClick={closeMobileMenu}
                  className="inline-flex h-[48px] items-center justify-center gap-2 border border-[#D7B16F] bg-[#D7B16F] text-[0.9rem] font-bold text-[#08285F] shadow-[inset_0_-2px_0_#08285F] transition duration-200 hover:bg-[#E0BD7E] dark:border-[#D7B16F] dark:bg-[#D7B16F] dark:text-[#08285F]"
                >
                  <CirclePlus size={17} />
                  List
                </Link>

                <Link
                  href={dashboardHref}
                  onClick={closeMobileMenu}
                  className="inline-flex h-[48px] items-center justify-center gap-2 border border-[#08285F] bg-[#08285F] text-[0.86rem] font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:bg-[#0A326F]"
                >
                  <UserRound size={17} />
                  {userLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
