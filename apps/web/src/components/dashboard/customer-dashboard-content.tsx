"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  MapPin,
  Search,
} from "lucide-react";
import { propertyListings } from "@/data/property-listings";
import { useAuthUser } from "@/lib/auth";

const savedPropertySlugs = [
  "modern-luxury-house-with-pool",
  "bright-villa-near-nyarutarama",
  "family-home-with-garden",
];

const savedProperties = savedPropertySlugs
  .map((slug) => propertyListings.find((property) => property.slug === slug))
  .filter((property): property is (typeof propertyListings)[number] => Boolean(property));

const savedSearches = [
  {
    title: "Apartments in Nyarutarama",
    detail: "2–3 beds / Up to RWF 2,500,000",
    update: "3 new matches",
    href: "/search?purpose=rent&location=Nyarutarama&bedrooms=2",
  },
  {
    title: "Land in Gasabo",
    detail: "For sale / 400–800 sqm",
    update: "View search",
    href: "/search?purpose=land&location=Gasabo",
  },
];

export function CustomerDashboardContent() {
  const user = useAuthUser();
  const firstName =
    user?.fullName?.trim().split(/\s+/).filter(Boolean)[0] ?? "there";

  return (
    <div>
      <section className="border-b border-[var(--line)] pb-7 sm:pb-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[var(--muted)]">
              Welcome back, {firstName}
            </p>

            <h1 className="mt-2 text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[2.65rem] lg:text-[3rem]">
              Pick up where you left off.
            </h1>

            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[var(--muted)] sm:text-[0.95rem]">
              Your saved homes, viewing plans and property searches stay
              together here.
            </p>
          </div>

          <Link
            href="/search"
            className="inline-flex h-11 w-fit max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-[7px] border border-[#08285F] bg-[#08285F] px-5 text-sm font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition hover:bg-[#0A326F]"
          >
            <Search size={16} />
            Continue searching
          </Link>
        </div>
      </section>

      <section id="saved-properties" className="py-7 sm:py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-black tracking-[-0.035em] sm:text-2xl">
              Saved properties
            </h2>
            <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
              Homes you want to keep an eye on.
            </p>
          </div>

          <Link
            href="/search"
            className="hidden items-center gap-1.5 text-sm font-black text-[#08285F] transition hover:text-[#A27B36] dark:text-[#D7B16F] sm:inline-flex"
          >
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <Link
            href={savedProperties[0].href}
            className="group overflow-hidden border border-[var(--line)] bg-[var(--card)] transition hover:border-[#D7B16F]/55"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-soft)] sm:aspect-[16/8]">
              <Image
                src={savedProperties[0].image}
                alt={savedProperties[0].title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />

              <div className="absolute inset-x-3 bottom-3 border border-white/15 bg-[#07152F]/88 p-3.5 text-white backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:p-4">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/72">
                  {savedProperties[0].type}
                </p>

                <h3 className="mt-1 text-xl font-black tracking-[-0.035em] sm:text-2xl">
                  {savedProperties[0].title}
                </h3>

                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-white/80">
                  <MapPin size={13} />
                  {savedProperties[0].location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div>
                <p className="text-lg font-black tracking-[-0.03em]">
                  {savedProperties[0].price}
                </p>

                <p className="mt-1 text-xs font-semibold text-[var(--muted)]">
                  {savedProperties[0].beds} / {savedProperties[0].baths} /{" "}
                  {savedProperties[0].area}
                </p>
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-black">
                View property
                <ArrowRight size={15} />
              </span>
            </div>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {savedProperties.slice(1).map((property) => (
              <Link
                key={property.slug}
                href={property.href}
                className="group grid grid-cols-[112px_minmax(0,1fr)] overflow-hidden border border-[var(--line)] bg-[var(--card)] transition hover:border-[#D7B16F]/55 sm:grid-cols-1 lg:grid-cols-[138px_minmax(0,1fr)]"
              >
                <div className="relative min-h-[132px] overflow-hidden bg-[var(--surface-soft)] sm:aspect-[16/10] lg:aspect-auto">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 50vw, 180px"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex min-w-0 flex-col justify-center p-3.5">
                  <p className="truncate text-sm font-black tracking-[-0.02em]">
                    {property.title}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[var(--muted)]">
                    <MapPin size={11} />
                    <span className="truncate">{property.location}</span>
                  </p>

                  <p className="mt-3 text-sm font-black">{property.price}</p>

                  <p className="mt-1 text-[11px] font-semibold text-[var(--muted)]">
                    {property.beds} / {property.baths}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/search"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-[#08285F] dark:text-[#D7B16F] sm:hidden"
        >
          View all saved properties
          <ArrowRight size={15} />
        </Link>
      </section>

      <div className="grid border-t border-[var(--line)] lg:grid-cols-[1fr_0.92fr]">
        <section
          id="viewing-requests"
          className="border-b border-[var(--line)] py-7 lg:border-b-0 lg:border-r lg:pr-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">
                Next viewing
              </h2>
              <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                Your nearest scheduled property visit.
              </p>
            </div>

            <CalendarDays
              size={20}
              className="shrink-0 text-[#A27B36] dark:text-[#D7B16F]"
            />
          </div>

          <div className="mt-5 border-l-2 border-[#D7B16F] pl-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#A27B36] dark:text-[#D7B16F]">
              Saturday / 10:00
            </p>

            <Link
              href={savedProperties[0].href}
              className="mt-2 block text-base font-black tracking-[-0.02em] hover:underline"
            >
              {savedProperties[0].title}
            </Link>

            <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
              {savedProperties[0].location}
            </p>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-xs font-black text-[var(--foreground)]">
                Confirmed
              </span>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-black text-[#08285F] dark:text-[#D7B16F]"
              >
                View details
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>

        <section
          id="saved-searches"
          className="py-7 lg:pl-8"
        >
          <h2 className="text-lg font-black tracking-[-0.03em] sm:text-xl">
            Saved searches
          </h2>

          <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
            Searches you want UMURANGA to keep watching.
          </p>

          <div className="mt-4 border-t border-[var(--line)]">
            {savedSearches.map((search) => (
              <Link
                key={search.title}
                href={search.href}
                className="group grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-[var(--line)] py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-black">
                    {search.title}
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold text-[var(--muted)]">
                    {search.detail}
                  </p>

                  <p className="mt-2 text-[11px] font-black text-[#A27B36] dark:text-[#D7B16F]">
                    {search.update}
                  </p>
                </div>

                <span className="grid h-8 w-8 place-items-center self-center border border-[var(--line)] transition group-hover:border-[#D7B16F]">
                  <ChevronRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="border-t border-[var(--line)] py-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-black tracking-[-0.03em]">
              Recent activity
            </h2>

            <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
              The latest changes around your property search.
            </p>
          </div>

          <div className="w-full max-w-xl border-t border-[var(--line)] sm:w-[55%]">
            {[
              ["Viewing confirmed", "Modern Luxury House with Pool"],
              ["New match", "Nyarutarama apartments"],
              ["Saved property", "Bright Villa Near Nyarutarama"],
            ].map(([label, detail]) => (
              <div
                key={`${label}-${detail}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-[var(--line)] py-3.5"
              >
                <div>
                  <p className="text-sm font-black">{label}</p>
                  <p className="mt-0.5 text-xs font-semibold text-[var(--muted)]">
                    {detail}
                  </p>
                </div>

                <span className="text-[11px] font-bold text-[var(--muted)]">
                  Recent
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
