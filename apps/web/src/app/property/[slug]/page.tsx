import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Heart,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { HomeHeroHeader } from "@/components/home-hero-header";
import { PropertyGallery } from "@/components/property-gallery";
import { propertyListings } from "@/data/property-listings";

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

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;

  const property = propertyListings.find((item) => item.slug === slug);

  if (!property) {
    notFound();
  }

  const period = property.type === "For rent" ? "per month" : null;

  const facts = [
    ["Bedrooms", property.beds],
    ["Bathrooms", property.baths],
    ["Interior", property.area],
    ["Additional", property.extra],
  ];

  const details = [
    ["Listing type", property.type],
    ["Location", property.location],
    ["Bedrooms", property.beds],
    ["Bathrooms", property.baths],
    ["Interior", property.area],
    ["Additional", property.extra],
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <HomeHeroHeader
        navLinks={navLinks}
        dashboardHref="/login"
        listPropertyHref="/signup"
        userLabel="Sign in"
      />

      <div className="mx-auto w-full max-w-[1320px] px-4 pb-28 pt-4 sm:px-6 lg:px-7 lg:pb-20 lg:pt-5">
        <div className="hidden items-center justify-between gap-3 lg:flex">
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

          <PropertyGallery
            images={property.images}
            title={property.title}
          />

        <section className="mt-5 grid gap-4 border-b border-[var(--line)] pb-5 sm:mt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8">
          <div>
            <p className="text-xs font-bold text-[var(--muted)] sm:text-sm">
              {property.type}
            </p>

            <h1 className="mt-2 max-w-[960px] text-[clamp(1.9rem,3vw,2.7rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
              {property.title}
            </h1>

            <p className="mt-2.5 text-sm font-bold text-[var(--muted)] sm:text-base">
              {property.location}
            </p>
          </div>

          <div className="lg:text-right">
            <p className="text-2xl font-black tracking-[-0.04em] sm:text-3xl lg:text-[1.8rem]">
              {property.price}
            </p>

            {period ? (
              <p className="mt-1 text-xs font-bold text-[var(--muted)] sm:text-sm">
                {period}
              </p>
            ) : null}
          </div>
        </section>

        <section className="grid grid-cols-2 border-b border-[var(--line)] sm:grid-cols-4">
          {facts.map(([label, value], index) => (
            <div
              key={label}
              className={`py-4 sm:px-5 ${
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

        <section className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start xl:gap-12">
          <div className="min-w-0">
            <section className="border-b border-[var(--line)] pb-10">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                About this property
              </h2>

              <p className="mt-5 max-w-4xl text-[15px] font-semibold leading-8 text-[var(--muted)]">
                {property.title} is listed {property.type.toLowerCase()} in{" "}
                {property.location}, with {property.beds}, {property.baths},
                and {property.area} of interior space. The listing also notes{" "}
                {property.extra.toLowerCase()}.
              </p>
            </section>

            <section className="border-b border-[var(--line)] py-10">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                Property details
              </h2>

              <div className="mt-5 border-t border-[var(--line)]">
                {details.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid min-h-[58px] grid-cols-[1fr_auto] items-center gap-6 border-b border-[var(--line)] py-3"
                  >
                    <p className="text-sm font-bold text-[var(--muted)]">
                      {label}
                    </p>

                    <p className="text-right text-sm font-black">
                      {value}
                    </p>
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
                  {property.location}
                </p>

                <p className="mt-2 text-sm font-semibold text-[var(--muted)]">
                  Location shown from the listing information.
                </p>
              </div>
            </section>
          </div>

          <aside className="hidden lg:sticky lg:top-[112px] lg:block">
            <div className="border-t border-[#D7B16F]/70 bg-[var(--card)] px-5 pb-5 pt-6">
              <h2 className="text-2xl font-semibold leading-tight tracking-[-0.04em]">
                Interested in this property?
              </h2>

              <div className="mt-5 border-y border-[var(--line)] py-5">
                <p className="text-2xl font-black tracking-[-0.035em]">
                  {property.price}
                </p>

                {period ? (
                  <p className="mt-1 text-xs font-bold text-[var(--muted)]">
                    {period}
                  </p>
                ) : null}
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
                {property.status} listing.
              </p>
            </div>
          </aside>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--background)]/96 p-2.5 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex w-full max-w-xl items-center gap-2">
          <button
            type="button"
            aria-label="Message contact"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--card)] text-[var(--foreground)]"
          >
            <MessageCircle size={17} />
          </button>

          <button
            type="button"
            aria-label="Call contact"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--card)] text-[var(--foreground)]"
          >
            <Phone size={17} />
          </button>

          <button
            type="button"
            className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-[8px] border border-[#08285F] bg-[#08285F] px-3 text-xs font-black text-white shadow-[inset_0_-2px_0_#D7B16F]"
          >
            <CalendarDays size={15} className="shrink-0" />
            <span className="whitespace-nowrap">Request viewing</span>
          </button>
        </div>
      </div>
    </main>
  );
}
