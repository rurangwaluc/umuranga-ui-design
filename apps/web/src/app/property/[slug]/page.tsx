import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Maximize2 } from "lucide-react";
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
    "Verified listing information",
  ],
  verification: [
    "Listing information reviewed before publishing",
    "Location details checked for consistency",
    "Responsible contact attached to the listing",
    "Visit request can be recorded before handoff",
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

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <HomeHeroHeader
        navLinks={navLinks}
        dashboardHref="/login"
        listPropertyHref="/signup"
        userLabel="Sign in"
      />

      <div className="mx-auto w-full max-w-[1540px] px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-16">
        <Link
          href="/search"
          className="inline-flex h-10 items-center gap-2 border border-[var(--line)] bg-[var(--card)] px-3 text-sm font-black transition hover:border-[var(--primary)]"
        >
          <ArrowLeft size={15} />
          Back to search
        </Link>

        <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-start">
          <div className="min-w-0">
            <div className="border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[var(--foreground)] px-3 py-1.5 text-xs font-black text-[var(--background)]">
                  {property.type}
                </span>
                <span className="border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-black text-[var(--foreground)]">
                  {property.verificationStatus}
                </span>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
                <div>
                  <h1 className="max-w-4xl text-3xl font-black leading-[1.03] tracking-[-0.055em] sm:text-5xl">
                    {title}
                  </h1>

                  <p className="mt-3 text-sm font-bold text-[var(--muted)]">
                    {property.location}
                  </p>
                </div>

                <div className="lg:text-right">
                  <p className="text-3xl font-black tracking-[-0.055em]">
                    {property.price}
                  </p>
                  <p className="mt-1 text-sm font-black text-[var(--muted)]">
                    {property.period}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 border-y border-[var(--line)] sm:grid-cols-4">
                {[
                  ["Bedrooms", property.beds],
                  ["Bathrooms", property.baths],
                  ["Interior", property.area],
                  ["Parking", property.parking],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border-b border-[var(--line)] py-4 sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-black text-[var(--foreground)]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <section className="mt-3 overflow-hidden border border-[var(--line)] bg-[#050505]">
              <div className="grid gap-1.5 bg-[#050505] p-1.5 lg:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.45fr)]">
                <div className="relative h-[360px] overflow-hidden bg-black sm:h-[520px] lg:h-[590px]">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    className="object-cover"
                  />

                  <button className="absolute bottom-4 right-4 inline-flex h-11 items-center gap-2 bg-white px-4 text-xs font-black text-[#11100D] shadow-[0_14px_34px_rgba(0,0,0,0.18)]">
                    <Maximize2 size={15} />
                    View all photos
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
                  {property.images.slice(1, 5).map((image, index) => (
                    <div
                      key={image}
                      className="relative h-[132px] overflow-hidden bg-black sm:h-[190px] lg:h-[144px]"
                    >
                      <Image
                        src={image}
                        alt={`${property.title} photo ${index + 2}`}
                        fill
                        sizes="(min-width: 1024px) 310px, 50vw"
                        className="object-cover transition duration-500 hover:scale-[1.035]"
                      />

                      {index === 3 ? (
                        <div className="absolute inset-0 grid place-items-center bg-black/48">
                          <span className="bg-white px-4 py-2 text-xs font-black text-[#11100D]">
                            5 photos
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-[112px]">
            <div className="border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_20px_70px_rgba(7,21,47,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                Request this property
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                Confirm availability before visiting.
              </h2>

              <p className="mt-3 text-sm font-bold leading-7 text-[var(--muted)]">
                Request a visit, ask for updated availability, or confirm the
                next step before sharing personal details.
              </p>

              <div className="mt-6 grid gap-3">
                <button className="h-12 bg-[var(--primary)] px-4 text-sm font-black text-white transition hover:bg-[var(--primary-hover)]">
                  Request a visit
                </button>

                <button className="h-12 border border-[var(--line)] bg-[var(--surface)] px-4 text-sm font-black transition hover:border-[var(--primary)]">
                  Message contact
                </button>

                <button className="h-12 border border-[var(--line)] bg-[var(--surface)] px-4 text-sm font-black transition hover:border-[var(--primary)]">
                  Call contact
                </button>
              </div>

              <div className="mt-7 border-t border-[var(--line)] pt-6">
                <p className="text-sm font-black">Before you visit</p>

                <div className="mt-4 grid gap-4">
                  {property.verification.slice(0, 3).map((item) => (
                    <p
                      key={item}
                      className="border-b border-[var(--line)] pb-4 text-xs font-bold leading-6 text-[var(--muted)] last:border-b-0 last:pb-0"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_410px]">
          <div className="min-w-0">
            <section className="border-b border-[var(--line)] pb-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                Overview
              </p>
              <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-[-0.04em]">
                A verified residence for comfortable Kigali living.
              </h2>
              <p className="mt-4 max-w-4xl text-[15px] font-bold leading-8 text-[var(--muted)]">
                {property.overview}
              </p>
            </section>

            <section className="border-b border-[var(--line)] py-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                Property details
              </p>

              <div className="mt-5 grid border-t border-[var(--line)] sm:grid-cols-2">
                {property.details.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-5 border-b border-[var(--line)] py-4 sm:odd:pr-6 sm:even:pl-6"
                  >
                    <p className="text-sm font-bold text-[var(--muted)]">
                      {label}
                    </p>
                    <p className="text-sm font-black text-[var(--foreground)]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b border-[var(--line)] py-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                Features
              </p>

              <div className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <div
                    key={feature}
                    className="border-b border-[var(--line)] pb-4 text-sm font-black text-[var(--foreground)]"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b border-[var(--line)] py-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                Verification
              </p>

              <div className="mt-5 border-t border-[var(--line)]">
                {property.verification.map((item, index) => (
                  <div
                    key={item}
                    className="grid gap-4 border-b border-[var(--line)] py-4 sm:grid-cols-[80px_1fr]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">
                      0{index + 1}
                    </p>
                    <p className="text-sm font-bold leading-6 text-[var(--foreground)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--muted)]">
                Location
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                Nyarutarama, Kigali
              </h2>

              <div className="mt-5 grid min-h-[300px] place-items-center border border-[var(--line)] bg-[var(--surface-soft)] p-8 text-center">
                <div>
                  <p className="text-sm font-black text-[var(--foreground)]">
                    Map and nearby places will appear here.
                  </p>
                  <p className="mt-3 max-w-md text-xs font-bold leading-6 text-[var(--muted)]">
                    Later this area will show the property context, nearby roads,
                    schools, hospitals, and trusted neighborhood information.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="hidden lg:block" />
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--background)]/96 p-3 backdrop-blur-md lg:hidden">
        <button className="h-12 w-full bg-[var(--primary)] px-4 text-sm font-black text-white shadow-[0_14px_40px_rgba(7,31,77,0.24)]">
          Request a visit
        </button>
      </div>
    </main>
  );
}
