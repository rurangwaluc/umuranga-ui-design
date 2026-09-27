import { HomeHeroHeader } from "@/components/home-hero-header";
import { SearchFilters } from "@/components/search-filters";
import { SearchResultsShell } from "@/components/search-results-shell";
import { propertyListings } from "@/data/property-listings";

type SearchPageProps = {
  searchParams?: Promise<{
    purpose?: string;
    location?: string;
    propertyType?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    q?: string;
    features?: string;
    advanced?: string;
  }>;
};

const navLinks = [
  { label: "Buy", href: "/search?purpose=buy" },
  { label: "Rent", href: "/search?purpose=rent" },
  { label: "Land", href: "/search?purpose=land" },
  { label: "Agents", href: "/agent" },
  { label: "Agencies", href: "/agency" },
];

const listings = propertyListings;

function formatPurpose(value: string | undefined) {
  if (value === "buy") return "For sale";
  if (value === "rent") return "For rent";
  if (value === "land") return "Land";

  return "All purposes";
}

function formatPrice(value: string | undefined) {
  if (!value) return null;

  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) return null;

  return `RWF ${number.toLocaleString()}`;
}

function buildBudgetLabel(minPrice: string | null, maxPrice: string | null) {
  if (minPrice && maxPrice) return `${minPrice} - ${maxPrice}`;
  if (minPrice) return `From ${minPrice}`;
  if (maxPrice) return `Up to ${maxPrice}`;

  return "Any budget";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const purpose = formatPurpose(params?.purpose);
  const minPrice = formatPrice(params?.minPrice);
  const maxPrice = formatPrice(params?.maxPrice);
  const budgetLabel = buildBudgetLabel(minPrice, maxPrice);
  const location = params?.location || "Kigali, Rwanda";
  const propertyType = params?.propertyType || "All property";
  const bedrooms = params?.bedrooms || "Any beds";
  const resultItems = listings.concat(listings);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <HomeHeroHeader
        navLinks={navLinks}
        dashboardHref="/login"
        listPropertyHref="/signup"
        userLabel="Sign in"
      />

      <section className="sticky top-[70px] z-40 border-b border-[var(--line)] bg-[var(--background)]/97 shadow-[0_10px_30px_rgba(7,21,47,0.04)] backdrop-blur-md sm:top-[80px] lg:top-[88px]">
        <div className="mx-auto w-full max-w-[1540px] px-4 py-2.5 sm:px-6 lg:px-8">
          <SearchFilters
            location={location}
            initialPurpose={params?.purpose ?? ""}
            initialPropertyType={params?.propertyType ?? ""}
            initialMaxPrice={params?.maxPrice ?? ""}
            initialBedrooms={params?.bedrooms ?? ""}
          />
        </div>
      </section>

      <SearchResultsShell
        listings={listings}
        resultItems={resultItems}
        location={location}
        purpose={purpose}
        propertyType={propertyType}
        budgetLabel={budgetLabel}
        bedrooms={bedrooms}
      />
    </main>
  );
}
