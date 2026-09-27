"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

const THEME_STORAGE_KEY = "umuranga-theme";

export function ThemeToggle() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }

    document.documentElement.classList.remove("dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, "light");
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");

    root.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      nextIsDark ? "dark" : "light"
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-white/24 bg-white/10 text-white shadow-[inset_0_-2px_0_#D7B16F] backdrop-blur-md transition duration-200 hover:border-[#D7B16F] hover:bg-white/12 dark:border-white/24 dark:bg-white/10 dark:text-white dark:hover:border-[#D7B16F] dark:hover:bg-white/12"
      aria-label="Toggle color mode"
    >
      <Moon size={18} className="block dark:hidden" />
      <Sun size={18} className="hidden dark:block" />
    </button>
  );
}