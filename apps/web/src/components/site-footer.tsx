import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { CurrentYear } from "@/components/current-year";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "#properties" },
  { label: "Agents", href: "#agents" },
  { label: "List a property", href: "/signup" },
];

const secondaryLinks = [
  { label: "About UMURANGA", href: "/" },
  { label: "Find a home", href: "#properties" },
  { label: "Contact", href: "mailto:support@umuranga.rw" },
  { label: "Sign in", href: "/login" },
];

const proofItems = [
  ["Verified actors", "Landlords, agencies, and agents reviewed before visibility."],
  ["Clearer listings", "Better property details, pricing, location, and viewing context."],
  ["Rwanda-first", "Built around local search behavior, trust, and property decisions."],
];

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="currentColor"
    >
      <path d="M6.94 8.98H3.9V20h3.04V8.98ZM5.42 4C4.44 4 3.7 4.72 3.7 5.64c0 .9.72 1.63 1.68 1.63h.02c1 0 1.72-.73 1.72-1.63C7.1 4.72 6.4 4 5.42 4ZM20.3 13.68c0-3.07-1.64-4.5-3.83-4.5-1.77 0-2.55.97-2.99 1.65V8.98h-3.04C10.48 10 10.44 20 10.44 20h3.04v-6.15c0-.33.02-.66.12-.9.27-.66.87-1.34 1.88-1.34 1.33 0 1.86 1.01 1.86 2.49V20h3.04l-.08-6.32Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[var(--line)] bg-[var(--card)] text-[var(--foreground)] sm:mt-16">
      <section className="mx-auto grid w-full max-w-[1420px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:px-12 lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/images/umuranga-logo-gold-light.png"
              alt="UMURANGA — Your Property Partner"
              width={420}
              height={100}
              className="h-[48px] w-auto object-contain dark:hidden sm:h-[56px]"
            />
            <Image
              src="/images/umuranga-logo-gold.png"
              alt="UMURANGA — Your Property Partner"
              width={420}
              height={100}
              className="hidden h-[48px] w-auto object-contain dark:block sm:h-[56px]"
            />
          </Link>

          <h3 className="mt-7 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
            Find, verify, and move on Rwanda’s properties with more confidence.
          </h3>

          <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-[var(--muted)] sm:text-base">
            Built for renters, buyers, owners, landlords, agents, and agencies who need clearer listings, cleaner next steps, and better trust.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {proofItems.map(([title, text]) => (
              <div
                key={title}
                className="rounded-[14px] border border-[var(--line)] bg-[var(--soft)] p-4 dark:bg-white/[0.035]"
              >
                <p className="text-sm font-black text-[var(--foreground)]">
                  {title}
                </p>
                <p className="mt-2 text-xs font-bold leading-5 text-[var(--muted)]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-[var(--line)] bg-[var(--soft)] p-5 dark:bg-[#15171C] sm:p-6">
          <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div>
              <p className="text-sm font-black">Talk to UMURANGA</p>
              <p className="mt-1 text-xs font-bold leading-5 text-[var(--muted)]">
                Start with a property question, listing request, or partnership conversation.
              </p>
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[var(--line)] bg-[var(--card)] text-[var(--foreground)] dark:border-white/10 dark:bg-white/[0.04]">
              <ShieldCheck size={17} />
            </span>
          </div>

          <div className="mt-5 space-y-4 text-sm text-[var(--muted)]">
            <div className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--primary)] dark:text-white/70" />
              <div>
                <p className="font-black text-[var(--foreground)]">
                  Kigali, Rwanda
                </p>
                <p className="mt-1">Rwanda-first property platform</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-[var(--primary)] dark:text-white/70" />
              <div>
                <p className="font-black text-[var(--foreground)]">
                  +250 780 000 000
                </p>
                <p className="mt-1">Customer support</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-[var(--primary)] dark:text-white/70" />
              <div>
                <p className="font-black text-[var(--foreground)]">
                  support@umuranga.rw
                </p>
                <p className="mt-1">General inquiries</p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-2 sm:grid-cols-2">
            <Link
              href="mailto:support@umuranga.rw"
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[9px] border border-[var(--line)] bg-[var(--card)] px-4 text-xs font-black text-[var(--foreground)] transition duration-200 hover:-translate-y-0.5 hover:border-[#D7B16F]/65 hover:shadow-[inset_0_-2px_0_#D7B16F] dark:border-white/12 dark:bg-white/[0.04] dark:hover:border-[#D7B16F]/65 dark:hover:bg-white/[0.06]"
            >
              Contact us
            </Link>

            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[9px] border border-[#08285F] bg-[#08285F] px-4 text-xs font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0A326F] dark:border-[#08285F] dark:bg-[#08285F] dark:text-white"
            >
              Sign up
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)]">
        <div className="mx-auto grid w-full max-w-[1420px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-12">
          <nav className="grid grid-cols-2 gap-3 text-sm sm:flex sm:flex-wrap sm:gap-5">
            {primaryLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--soft)] lg:flex">
            <Home size={15} />
          </div>

          <nav className="grid grid-cols-2 gap-3 text-sm sm:flex sm:flex-wrap sm:justify-start sm:gap-5 lg:justify-end">
            {secondaryLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1420px] gap-5 px-5 py-8 text-sm text-[var(--muted)] min-[600px]:grid-cols-[1fr_auto] min-[600px]:items-center sm:px-8 lg:px-12">
        <p>
          © <CurrentYear /> UMURANGA. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center gap-4 min-[600px]:justify-end">
          <Link href="/" className="transition hover:text-[var(--foreground)]">
            Terms
          </Link>
          <Link href="/" className="transition hover:text-[var(--foreground)]">
            Privacy
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--soft)] text-[var(--foreground)] transition duration-200 hover:border-[#D7B16F]/70 hover:text-[#A77A32] dark:hover:border-[#D7B16F]/60 dark:hover:text-[#D7B16F]"
            >
              <InstagramIcon />
            </Link>

            <Link
              href="/"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--soft)] text-[var(--foreground)] transition duration-200 hover:border-[#D7B16F]/70 hover:text-[#A77A32] dark:hover:border-[#D7B16F]/60 dark:hover:text-[#D7B16F]"
            >
              <LinkedInIcon />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
