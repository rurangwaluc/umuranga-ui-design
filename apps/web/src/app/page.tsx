import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { HeroSection } from "@/components/home-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { VerifiedPropertyCard } from "@/components/verified-property-card";

const categories = [
  "All",
  "Homes",
  "Apartments",
  "Villas",
  "Duplexes",
  "Land",
  "Commercial",
];

const propertyCards = [
  {
    images: ["/images/home/property-1.webp", "/images/home/property-2.webp", "/images/home/property-3.webp"],
    title: "Modern Luxury House with Pool",
    price: "RWF 2,400,000",
    location: "KG 12 Ave, Kigali, Rwanda",
    beds: "3 beds",
    baths: "2 baths",
    area: "320 sqm",
    extra: "Parking",
    status: "Verified",
    type: "For Sale",
    href: "/property/modern-luxury-house-with-pool",
  },
  {
    images: ["/images/home/property-2.webp", "/images/home/property-5.webp", "/images/home/property-1.webp"],
    title: "Bright Villa Near Nyarutarama",
    price: "RWF 2,400,000",
    location: "Nyarutarama, Kigali",
    beds: "4 beds",
    baths: "3 baths",
    area: "410 sqm",
    extra: "Parking",
    status: "Verified",
    type: "For Sale",
    href: "/property/bright-villa-near-nyarutarama",
  },
  {
    images: ["/images/home/property-3.webp", "/images/home/property-6.webp", "/images/home/property-4.webp"],
    title: "Modern Home at Dusk",
    price: "RWF 2,400,000",
    location: "Kacyiru, Kigali",
    beds: "5 beds",
    baths: "4 baths",
    area: "460 sqm",
    extra: "Parking",
    status: "Verified",
    type: "For Sale",
    href: "/property/modern-home-at-dusk",
  },
  {
    images: ["/images/home/property-4.webp", "/images/home/property-1.webp", "/images/home/property-5.webp"],
    title: "Waterfront Inspired Residence",
    price: "RWF 2,400,000",
    location: "Lake view concept",
    beds: "3 beds",
    baths: "2 baths",
    area: "285 sqm",
    extra: "Garden",
    status: "Verified",
    type: "For Sale",
    href: "/property/waterfront-inspired-residence",
  },
  {
    images: ["/images/home/property-5.webp", "/images/home/property-3.webp", "/images/home/property-2.webp"],
    title: "Family Home with Garden",
    price: "RWF 2,400,000",
    location: "Kibagabaga, Kigali",
    beds: "4 beds",
    baths: "3 baths",
    area: "360 sqm",
    extra: "Garden",
    status: "Verified",
    type: "For Sale",
    href: "/property/family-home-with-garden",
  },
  {
    images: ["/images/home/property-6.webp", "/images/home/property-4.webp", "/images/home/property-3.webp"],
    title: "Premium Green Residence",
    price: "RWF 2,400,000",
    location: "Kimihurura, Kigali",
    beds: "5 beds",
    baths: "4 baths",
    area: "520 sqm",
    extra: "Parking",
    status: "Verified",
    type: "For Sale",
    href: "/property/premium-green-residence",
  },
];

const agents = [
  {
    image: "/images/home/agent-1.webp",
    name: "Alex Burden",
    role: "Residential Agent",
    location: "Kigali",
    focus: "Family homes",
  },
  {
    image: "/images/home/agent-2.webp",
    name: "Alen Cuber",
    role: "Property Advisor",
    location: "Gasabo",
    focus: "Rentals",
  },
  {
    image: "/images/home/agent-3.webp",
    name: "Sarah Mutesi",
    role: "Luxury Specialist",
    location: "Nyarutarama",
    focus: "Premium homes",
  },
];


const operatorCards = [
  {
    icon: BadgeCheck,
    title: "Landlords",
    label: "Verified owners",
  },
  {
    icon: Building2,
    title: "Agencies",
    label: "Managed teams",
  },
  {
    icon: UsersRound,
    title: "Agents",
    label: "Trusted operators",
  },
];


const managementCards = [
  {
    label: "Listing file",
    title: "Listings",
    text: "Price, status, availability, owner details, and viewing readiness stay clear.",
  },
  {
    label: "Tenant file",
    title: "Tenants",
    text: "Contacts, documents, lease notes, rent status, and property history stay together.",
  },
  {
    label: "Rent follow-up",
    title: "Rent",
    text: "Expected rent, paid rent, late balances, and follow-up notes stay visible.",
  },
  {
    label: "Work log",
    title: "Maintenance",
    text: "Requests, responsible people, progress, and communication history stay organized.",
  },
];


export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="w-full">
        <HeroSection />

        <div className="mx-auto w-full max-w-[1420px] px-5 pb-14 pt-6 sm:px-8 sm:pb-16 sm:pt-8 lg:px-10 lg:pb-20 lg:pt-10 xl:px-12">

        <ScrollReveal className="mt-8 sm:mt-10" staggerChildren>
          <section id="properties">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    Featured verified listings
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    Verified homes, land, and commercial spaces with clear pricing, location, and key details.
                  </p>
              </div>

              <Link
                href="/search"
                className="inline-flex h-10 w-fit items-center justify-center whitespace-nowrap rounded-[8px] border border-[#08285F] bg-[#08285F] px-4 text-xs font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:-translate-y-px hover:bg-[#0A326F] dark:border-[#08285F] dark:bg-[#08285F] dark:text-white"
              >
                View all listings
              </Link>
            </div>

            <div className="mb-6 flex flex-wrap gap-2 sm:gap-2.5">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`min-h-9 rounded-[9px] px-3.5 py-2 text-xs font-black transition sm:px-4 ${
                    index === 0
                      ? "bg-[var(--primary)] text-white shadow-[inset_0_-2px_0_#D7B16F] dark:bg-[var(--primary)] dark:text-white"
                      : "border border-[var(--line)] bg-[var(--soft)] text-[var(--muted)] hover:border-[#D7B16F]/50 hover:bg-[var(--card)] hover:text-[var(--foreground)] hover:shadow-[inset_0_-2px_0_#D7B16F]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {propertyCards.map((item) => (
                <VerifiedPropertyCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal className="mt-10 sm:mt-12" staggerChildren>
            <section
              id="management"
              className="border-t border-b border-[var(--line)] py-12 sm:py-14 lg:py-16"
            >
              <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center xl:gap-16">
                <div className="reveal-child">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#A77A32] dark:text-[#D7B16F]">
                    Property operations
                  </p>

                  <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
                    Manage property work without losing track.
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                    UMURANGA helps property teams keep the daily work clear: what is listed,
                    who is renting, what has been paid, and what still needs attention.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/signup"
                      className="inline-flex h-12 items-center justify-center rounded-[9px] border border-[#08285F] bg-[#08285F] px-5 text-sm font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0A326F] dark:border-[#08285F] dark:bg-[#08285F] dark:text-white"
                    >
                      List or manage property
                    </Link>
                    <Link
                      href="/search"
                      className="inline-flex h-12 items-center justify-center rounded-[9px] border border-[var(--line)] bg-transparent px-5 text-sm font-bold text-[var(--foreground)] transition duration-200 hover:-translate-y-0.5 hover:border-[#D7B16F]/65 hover:bg-[var(--card)] hover:shadow-[inset_0_-2px_0_#D7B16F] dark:border-white/12 dark:hover:border-[#D7B16F]/65 dark:hover:bg-white/[0.05] dark:hover:text-white"
                    >
                      Search properties
                    </Link>
                  </div>
                </div>

                <div className="reveal-child rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-4 shadow-[0_18px_55px_rgba(7,21,47,0.055)] transition duration-300 hover:border-[#D7B16F]/35 dark:bg-[#15171C] dark:shadow-none dark:hover:border-[#D7B16F]/30 sm:p-5">
                  <div className="border-b border-[var(--line)] px-2 pb-5 pt-1 sm:px-3">
                    <p className="text-sm font-black tracking-[-0.01em]">
                      Property operations file
                    </p>
                    <p className="mt-1 text-xs font-bold leading-5 text-[var(--muted)]">
                      A clearer structure for the work owners and property teams handle every day.
                    </p>
                  </div>

                  <div className="divide-y divide-[var(--line)]">
                    {managementCards.map((item) => (
                      <div
                        key={item.title}
                        className="grid gap-4 px-2 py-5 transition hover:bg-[var(--soft)] dark:hover:bg-white/[0.035] sm:grid-cols-[170px_minmax(0,1fr)] sm:px-3"
                      >
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#A77A32] dark:text-[#D7B16F]">
                            {item.label}
                          </p>
                          <p className="mt-2 text-lg font-black tracking-[-0.03em]">
                            {item.title}
                          </p>
                        </div>

                        <p className="max-w-[520px] text-sm font-bold leading-6 text-[var(--muted)]">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-8 sm:mt-10" staggerChildren>
            <section className="border-t border-[var(--line)] pt-10 sm:pt-12 lg:pt-14">
              <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-stretch">
                <div className="reveal-child">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#A77A32] dark:text-[#D7B16F]">
                    Before you visit
                  </p>

                  <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
                    Know what is real before you take the next step.
                  </h2>

                  <div className="relative mt-7 h-[340px] overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--soft)] shadow-[0_22px_70px_rgba(7,21,47,0.08)] dark:shadow-none sm:h-[420px] xl:h-[480px]">
                    <Image
                      src="/images/home/trust-property-real.webp"
                      alt="Verified property listing on UMURANGA"
                      fill
                      sizes="(max-width: 1280px) 100vw, 42vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />


                  </div>
                </div>

                <div className="grid content-start gap-4">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {operatorCards.map((item) => (
                      <div
                        key={item.title}
                        className="reveal-child rounded-[14px] border border-[var(--line)] bg-[var(--card)] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#D7B16F]/45 hover:shadow-[0_16px_42px_rgba(7,21,47,0.07)] dark:bg-[#15171C] dark:hover:border-[#D7B16F]/35 dark:hover:shadow-none sm:p-5"
                      >
                        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#D7B16F]/35 bg-[var(--soft)] text-[#08285F] transition dark:border-[#D7B16F]/25 dark:bg-white/[0.04] dark:text-[#D7B16F]">
                          <item.icon size={17} />
                        </div>
                        <p className="text-sm font-black tracking-[-0.03em] sm:text-2xl sm:tracking-[-0.04em]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[10px] font-bold leading-4 text-[var(--muted)] sm:text-sm">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="reveal-child rounded-[18px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_20px_70px_rgba(7,21,47,0.06)] dark:bg-[#15171C] dark:shadow-none sm:p-8 lg:p-10">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#A77A32] dark:text-[#D7B16F]">
                      Before visibility
                    </p>

                    <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-[1.1] tracking-[-0.045em] sm:text-3xl lg:text-4xl">
                      Clearer property decisions start with better information.
                    </h3>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                      UMURANGA helps people understand who is involved, what is being offered,
                      and what to do next before they visit or commit.
                    </p>

                    <div className="mt-7 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                      {[
                        ["Actor clarity", "Know whether you are dealing with an owner, landlord, agent, or agency."],
                        ["Listing quality", "See cleaner pricing, location, property details, and viewing context."],
                        ["Next step confidence", "Understand the next step before calling, visiting, or paying."],
                      ].map(([title, text]) => (
                        <div key={title} className="grid gap-2 py-4 sm:grid-cols-[160px_minmax(0,1fr)]">
                          <p className="text-sm font-black tracking-[-0.02em]">
                            {title}
                          </p>
                          <p className="text-sm font-bold leading-6 text-[var(--muted)]">
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/signup"
                      className="mt-8 inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-[9px] border border-[#08285F] bg-[#08285F] px-5 text-sm font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0A326F] dark:border-[#08285F] dark:bg-[#08285F] dark:text-white"
                    >
                      Start with UMURANGA
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
</div>

          <SiteFooter />
      </div>
    </main>
  );
}
