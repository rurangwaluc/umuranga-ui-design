"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Camera,
  CheckCircle2,
  ChevronDown,
  LockKeyhole,
  LogOut,
  Settings2,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { HomeHeroHeader } from "@/components/home-hero-header";
import {
  getDashboardLabel,
  getPostLoginPath,
  useAuthUser,
} from "@/lib/auth";

const navLinks = [
  { label: "Buy", href: "/search?purpose=buy" },
  { label: "Rent", href: "/search?purpose=rent" },
  { label: "Land", href: "/search?purpose=land" },
  { label: "Agents", href: "/agent" },
  { label: "Agencies", href: "/agency" },
];

const accountSections = [
  {
    label: "Profile",
    icon: UserRound,
    active: true,
  },
  {
    label: "Security",
    icon: LockKeyhole,
  },
  {
    label: "Verification",
    icon: ShieldCheck,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
  {
    label: "Preferences",
    icon: Settings2,
  },
  {
    label: "Teams & businesses",
    icon: UsersRound,
  },
];

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

export default function AccountPage() {
  const user = useAuthUser();

  const fullName = user?.fullName ?? "Your name";
  const email = user?.email ?? "name@example.com";
  const dashboardHref = user ? getPostLoginPath(user) : "/login";
  const dashboardLabel = getDashboardLabel(user);
  const initials = getInitials(fullName);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <HomeHeroHeader
        navLinks={navLinks}
        dashboardHref={dashboardHref}
        listPropertyHref={
          user &&
          (user.userType === "landlord" ||
            user.userType === "agency" ||
            user.userType === "agent")
            ? dashboardHref
            : "/onboarding?role=landlord"
        }
        userLabel={user ? "Dashboard" : "Sign in"}
      />

      <section className="relative isolate overflow-hidden border-b border-[var(--line)]">
        <div className="absolute inset-0">
          <Image
            src="/images/home/herosectionbg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_52%] opacity-55 dark:opacity-42"
          />
          <div className="absolute inset-0 bg-[#07152F]/62 dark:bg-[#050608]/70" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4 py-6 text-white sm:px-6 sm:py-7 lg:px-7 lg:py-8">
          <div className="flex items-center gap-2 text-xs font-bold text-white/64">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Account</span>
          </div>

          <h1 className="mt-3 text-[clamp(2rem,4vw,3.15rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
            My Account
          </h1>

          <p className="mt-2.5 max-w-2xl text-sm font-semibold leading-6 text-white/82 sm:text-[0.95rem]">
            Manage your personal information, security and preferences.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-4 py-7 sm:px-6 sm:py-9 lg:px-7 lg:py-10">
        <div className="mb-5 lg:hidden">
          <p className="mb-2 text-[0.7rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
            Account section
          </p>

          <div className="flex h-12 items-center justify-between rounded-[9px] border border-[var(--line)] bg-[var(--card)] px-4 shadow-[0_8px_24px_rgba(7,21,47,0.04)]">
            <div className="flex items-center gap-3">
              <UserRound size={18} className="text-[#D7B16F]" />
              <span className="text-sm font-black">Profile</span>
            </div>

            <ChevronDown size={17} className="text-[var(--muted)]" />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-[100px] border border-[var(--line)] bg-[var(--card)] p-3">
              <nav className="space-y-1">
                {accountSections.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className={`relative flex h-12 items-center gap-3 px-3 text-sm font-bold ${
                        item.active
                          ? "bg-[#08285F] text-white shadow-[inset_3px_0_0_#D7B16F]"
                          : "text-[var(--foreground)]"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          item.active
                            ? "text-[#D7B16F]"
                            : "text-[var(--muted)]"
                        }
                      />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-[var(--line)] pt-4">
                <button
                  type="button"
                  className="flex h-11 w-full items-center gap-3 px-3 text-sm font-bold text-[var(--danger)]"
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </div>
            </div>
          </aside>

          <div className="border border-[var(--line)] bg-[var(--card)]">
            <div className="px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8">
              <div className="border-b border-[var(--line)] pb-7">
                <h2 className="text-[1.8rem] font-semibold tracking-[-0.045em] sm:text-[2rem]">
                  Profile
                </h2>

                <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[var(--muted)]">
                  Your personal information is used across UMURANGA for a consistent account experience.
                </p>

                <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative w-fit">
                    <div className="grid h-24 w-24 place-items-center rounded-full border-2 border-[#D7B16F] bg-[#08285F] text-2xl font-black text-white sm:h-28 sm:w-28">
                      {initials}
                    </div>

                    <button
                      type="button"
                      aria-label="Change profile photo"
                      className="absolute -bottom-1 -right-1 grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--card)] shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
                    >
                      <Camera size={17} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xl font-black tracking-[-0.03em]">
                      {fullName}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                      Personal account
                    </p>

                    <button
                      type="button"
                      className="mt-4 inline-flex h-10 items-center gap-2 rounded-[8px] border border-[var(--line)] bg-transparent px-4 text-sm font-bold transition hover:border-[#D7B16F]"
                    >
                      <Camera size={15} />
                      Change photo
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-x-5 gap-y-5 py-7 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-black">
                    Full name
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    readOnly
                    className="h-12 w-full rounded-[8px] border border-[var(--line)] bg-[var(--background)] px-4 text-sm font-semibold outline-none transition focus:border-[#D7B16F]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black">
                    Email address
                  </span>

                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="h-12 w-full rounded-[8px] border border-[var(--line)] bg-[var(--background)] px-4 pr-28 text-sm font-semibold outline-none"
                    />

                    <span className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 text-xs font-black text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={15} />
                      Verified
                    </span>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black">
                    Phone number
                  </span>
                  <input
                    type="tel"
                    placeholder="Add phone number"
                    className="h-12 w-full rounded-[8px] border border-[var(--line)] bg-[var(--background)] px-4 text-sm font-semibold outline-none transition placeholder:text-[var(--muted)] focus:border-[#D7B16F]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black">
                    Account type
                  </span>

                  <div className="flex h-12 items-center justify-between rounded-[8px] border border-[var(--line)] bg-[var(--surface-soft)] px-4">
                    <span className="text-sm font-semibold">
                      {dashboardLabel}
                    </span>
                    <span className="text-xs font-bold text-[var(--muted)]">
                      UMURANGA access
                    </span>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black">
                    Country
                  </span>
                  <div className="flex h-12 items-center rounded-[8px] border border-[var(--line)] bg-[var(--background)] px-4 text-sm font-semibold text-[var(--muted)]">
                    Not added
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black">
                    City
                  </span>
                  <div className="flex h-12 items-center rounded-[8px] border border-[var(--line)] bg-[var(--background)] px-4 text-sm font-semibold text-[var(--muted)]">
                    Not added
                  </div>
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-black">
                    About you
                    <span className="ml-1 font-semibold text-[var(--muted)]">
                      (optional)
                    </span>
                  </span>

                  <textarea
                    rows={4}
                    placeholder="Add a short introduction about yourself."
                    className="w-full resize-none rounded-[8px] border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-sm font-semibold leading-6 outline-none transition placeholder:text-[var(--muted)] focus:border-[#D7B16F]"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-5 max-[340px]:grid-cols-1 sm:flex sm:justify-end">
                <button
                  type="button"
                  className="h-11 w-full whitespace-nowrap rounded-[8px] border border-[var(--line)] bg-transparent px-3 text-sm font-bold transition hover:border-[#D7B16F] sm:w-auto sm:px-5"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="h-11 w-full whitespace-nowrap rounded-[8px] border border-[#08285F] bg-[#08285F] px-3 text-sm font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition hover:bg-[#0A326F] sm:w-auto sm:px-6"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
