import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Heart,
  Maximize2,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { HomeHeroHeader } from "@/components/home-hero-header";

type PropertyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const navLinks = [
  { label: "Buy", href: "/search?purpose=buy" },
  { label: "Rent", href: "/search?purpose=rent" },
  { label: "Land", href: "/search?purpose=land" },
  { label: "Agents", href: "/agent" },
  { label: "Agencies", href: "/agency" },
];

const property = {
  price: "RWF 2,400,000",
  period: "per month",
  title: "Modern Luxury House with Pool",
  location: "Kigali, Nyarutarama",
  type: "For rent",
  verificationStatus: "Verified listing",
  beds: "3 beds",
  baths: "2 baths",
  area: "320 sqm",
  parking: "2 parking spaces",
  images: [
    "/images/home/property-1.webp",
    "/images/home/featured-villa.webp",
    "/images/home/property-3.webp",
    "/images/home/property-5.webp",
    "/images/home/property-6.webp",
  ],
  overview:
    "A refined private residence in one of Kigali’s established residential neighborhoods, designed for comfortable family living, quiet hosting, and convenient access to key roads, schools, offices, and lifestyle services.",
  details: [
    ["Property type", "House"],
    ["Listing type", "For rent"],
    ["Neighborhood", "Nyarutarama"],
    ["Availability", "By request"],
    ["Furnishing", "To confirm"],
    ["Minimum stay", "To confirm"],
  ],
  features: [
    "Private compound",
    "Swimming pool",
    "Modern kitchen",
    "Bright living room",
    "Parking available",
    "Secure neighborhood",
    "Easy road access",
  ],
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const title = slug ? titleFromSlug(slug) : property.title;

  const facts = [
    ["Bedrooms", property.beds],
    ["Bathrooms", property.baths],
    ["Interior", property.area],
    ["Parking", property.parking],
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <HomeHeroHeader
        navLinks={navLinks}
        dashboardHref="/login"
        listPropertyHref="/signup"
        userLabel="Sign in"
      />

      <div className="mx-auto w-full max-w-[1540px] px-4 pb-28 pt-4 sm:px-6 lg:px-8 lg:pb-20 lg:pt-6">
        {/* Utility row */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/search"
            className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-[var(--line)] bg-[var(--card)] px-3 text-sm font-black transition duration-200 hover:border-[#D7B16F]/60"
          >
            <ArrowLeft size={15} />
            Back to search
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Save property"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--card)] transition duration-200 hover:border-[#D7B16F]/60"
            >
              <Heart size={17} />
            </button>

            <button
              type="button"
              aria-label="Share property"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--card)] transition duration-200 hover:border-[#D7B16F]/60"
            >
              <Share2 size={17} />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <section className="relative mt-5 overflow-hidden rounded-[14px] bg-[#050505]">
          <div className="grid gap-1.5 bg-[#050505] p-1.5 lg:h-[620px] lg:grid-cols-[minmax(0,1.58fr)_minmax(390px,0.72fr)]">
            <div className="relative h-[370px] overflow-hidden rounded-[10px] bg-black sm:h-[540px] lg:h-full">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                priority
                sizes="(min-width: 1024px) 69vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5 lg:grid-rows-2">
              {property.images.slice(1, 5).map((image, index) => (
                <div
                  key={image}
                  className="relative h-[145px] overflow-hidden rounded-[10px] bg-black sm:h-[210px] lg:h-auto"
                >
                  <Image
                    src={image}
                    alt={`${property.title} photo ${index + 2}`}
                    fill
                    sizes="(min-width: 1024px) 23vw, 50vw"
                    className="object-cover transition duration-500 hover:scale-[1.02]"
                  />

                  {index === 3 ? (
                    <div className="absolute inset-0 grid place-items-center bg-black/42">
                      <span className="text-xs font-black text-white">
                        5 photos
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="absolute bottom-4 right-4 inline-flex h-11 items-center gap-2 rounded-[8px] border border-white/30 bg-white px-4 text-xs font-black text-[#08285F] shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5"
          >
            <Maximize2 size={15} />
            View all photos
          </button>
        </section>

        {/* Property heading */}
        <section className="mt-6 grid gap-4 border-b border-[var(--line)] pb-7 sm:mt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8">
          <div>
            <p className="text-xs font-bold text-[var(--muted)] sm:text-sm">
              {property.type}
            </p>

            <h1 className="mt-2 max-w-[960px] text-[clamp(2.1rem,5vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.06em]">
              {title}
            </h1>

            <p className="mt-4 text-sm font-bold text-[var(--muted)] sm:text-base">
              {property.location}
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 lg:block lg:text-right">
            <div>
              <p className="text-2xl font-black tracking-[-0.045em] sm:text-3xl lg:text-4xl">
                {property.price}
              </p>
              <p className="mt-1 text-xs font-bold text-[var(--muted)] sm:text-sm">
                {property.period}
              </p>
            </div>
          </div>
        </section>

        {/* Facts */}
        <section className="grid grid-cols-2 border-b border-[var(--line)] sm:grid-cols-4">
          {facts.map(([label, value], index) => (
            <div
              key={label}
              className={`py-5 sm:px-5 ${
                index !== facts.length - 1
                  ? "sm:border-r sm:border-[var(--line)]"
                  : ""
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--muted)]">
                {label}
              </p>
              <p className="mt-1.5 text-sm font-black">{value}</p>
            </div>
          ))}
        </section>

        {/* Main content */}
        <section className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="min-w-0">
            <section className="border-b border-[var(--line)] pb-10">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                About this property
              </h2>

              <p className="mt-5 max-w-4xl text-[15px] font-semibold leading-8 text-[var(--muted)]">
                {property.overview}
              </p>
            </section>

            <section className="border-b border-[var(--line)] py-10">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                Property details
              </h2>

              <div className="mt-5 border-t border-[var(--line)]">
                {property.details.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid min-h-[58px] grid-cols-[1fr_auto] items-center gap-6 border-b border-[var(--line)] py-3"
                  >
                    <p className="text-sm font-bold text-[var(--muted)]">
                      {label}
                    </p>
                    <p className="text-right text-sm font-black">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b border-[var(--line)] py-10">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                Features
              </h2>

              <div className="mt-5 grid gap-x-10 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <div
                    key={feature}
                    className="border-b border-[var(--line)] py-4 text-sm font-black"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </section>

            <section className="py-10">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                Location
              </h2>

              <div className="mt-5 border-y border-[var(--line)] py-5">
                <p className="text-base font-black">
                  Nyarutarama, Kigali
                </p>

                <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-[var(--muted)]">
                  Exact property location can be confirmed when arranging a viewing.
                </p>
              </div>
            </section>
          </div>

          {/* Desktop inquiry */}
          <aside className="hidden lg:sticky lg:top-[112px] lg:block">
            <div className="border-t border-[#D7B16F]/70 bg-[var(--card)] px-5 pb-5 pt-6">
              <h2 className="text-2xl font-semibold leading-tight tracking-[-0.04em]">
                Interested in this property?
              </h2>

              <div className="mt-5 border-y border-[var(--line)] py-5">
                <p className="text-2xl font-black tracking-[-0.035em]">
                  {property.price}
                </p>
                <p className="mt-1 text-xs font-bold text-[var(--muted)]">
                  {property.period}
                </p>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[9px] border border-[#08285F] bg-[#08285F] px-4 text-sm font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:bg-[#0A326F]"
              >
                <CalendarDays size={17} />
                Request a viewing
              </button>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 border border-[var(--line)] bg-transparent px-3 text-xs font-black transition duration-200 hover:border-[#D7B16F]/60"
                >
                  <MessageCircle size={15} />
                  Message
                </button>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 border border-[var(--line)] bg-transparent px-3 text-xs font-black transition duration-200 hover:border-[#D7B16F]/60"
                >
                  <Phone size={15} />
                  Call
                </button>
              </div>

              <p className="mt-5 border-t border-[var(--line)] pt-4 text-xs font-bold leading-5 text-[var(--muted)]">
                Listing information reviewed by UMURANGA before publishing.
              </p>
            </div>
          </aside>
        </section>
      </div>

      {/* Mobile decision bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--background)]/96 px-3 py-2.5 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black">{property.price}</p>
            <p className="text-[11px] font-bold text-[var(--muted)]">
              {property.period}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[8px] border border-[#08285F] bg-[#08285F] px-5 text-xs font-black text-white shadow-[inset_0_-2px_0_#D7B16F]"
          >
            <CalendarDays size={15} />
            Request viewing
          </button>
        </div>
      </div>
    </main>
  );
}
