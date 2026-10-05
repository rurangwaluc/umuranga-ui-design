"use client";

import { useMemo, useState } from "react";
import { ListFilter, Map, PanelLeftClose, PanelsTopLeft, Rows3, X } from "lucide-react";
import {
  SearchMap,
  type SearchArea,
  type SearchMapListing,
} from "@/components/search-map";
import {
  VerifiedPropertyCard,
  type VerifiedPropertyCardItem,
} from "@/components/verified-property-card";

type SearchResultItem = VerifiedPropertyCardItem & SearchMapListing;

type SearchResultsShellProps = {
  listings: SearchMapListing[];
  resultItems: SearchResultItem[];
  location: string;
  purpose: string;
  propertyType: string;
  budgetLabel: string;
  bedrooms: string;
};

type ViewMode = "split" | "results" | "map";

function pointIsInsideArea(
  lat: number,
  lng: number,
  area: SearchArea
) {
  let inside = false;

  for (let i = 0, j = area.length - 1; i < area.length; j = i++) {
    const yi = area[i][0];
    const xi = area[i][1];
    const yj = area[j][0];
    const xj = area[j][1];

    const crossesLatitude = yi > lat !== yj > lat;

    if (!crossesLatitude) {
      continue;
    }

    const boundaryLng =
      ((xj - xi) * (lat - yi)) / (yj - yi) + xi;

    if (lng < boundaryLng) {
      inside = !inside;
    }
  }

  return inside;
}

export function SearchResultsShell({
  listings,
  resultItems,
  location,
  purpose,
  propertyType,
  budgetLabel,
  bedrooms,
}: SearchResultsShellProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [mobileMapOpen, setMobileMapOpen] = useState(false);
  const [drawnArea, setDrawnArea] = useState<SearchArea | null>(null);
  const [viewMenuOpen, setViewMenuOpen] = useState(false);

  function selectView(mode: ViewMode) {
    setViewMenuOpen(false);

    if (mode === "map" && window.innerWidth < 1024) {
      setMobileMapOpen(true);
      return;
    }

    setViewMode(mode);
  }

  const filteredListings = useMemo(() => {
    if (!drawnArea || drawnArea.length < 3) {
      return listings;
    }

    return listings.filter((item) =>
      pointIsInsideArea(item.lat, item.lng, drawnArea)
    );
  }, [drawnArea, listings]);

  const filteredResultItems = useMemo(() => {
    if (!drawnArea || drawnArea.length < 3) {
      return resultItems;
    }

    return resultItems.filter((item) =>
      pointIsInsideArea(item.lat, item.lng, drawnArea)
    );
  }, [drawnArea, resultItems]);

  const cardGridClass =
    viewMode === "results"
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      : "grid gap-4 lg:grid-cols-2";

  if (viewMode === "map") {
    return (
      <section className="relative mx-auto hidden w-full max-w-[1540px] lg:block lg:h-[calc(100vh-151px)]">
        <SearchMap
              listings={filteredListings}
              area={drawnArea}
              onAreaChange={setDrawnArea}
            />

          <div className="absolute right-5 top-5 z-[500]">
            <div className="relative">
              {viewMenuOpen ? (
                <div className="absolute right-0 top-full mt-2 w-[152px] rounded-[10px] border border-[var(--line)] bg-[var(--card)] p-1.5 shadow-[0_18px_50px_rgba(7,21,47,0.22)]">
                  <button
                    type="button"
                    onClick={() => selectView("split")}
                    className="flex h-10 w-full items-center gap-2.5 rounded-[7px] border border-transparent px-3 text-xs font-bold text-[var(--foreground)] transition hover:border-[#D7B16F]/55 hover:bg-[var(--surface-soft)]"
                  >
                    <PanelLeftClose size={15} />
                    Split
                  </button>

                  <button
                    type="button"
                    onClick={() => selectView("results")}
                    className="flex h-10 w-full items-center gap-2.5 rounded-[7px] border border-transparent px-3 text-xs font-bold text-[var(--foreground)] transition hover:border-[#D7B16F]/55 hover:bg-[var(--surface-soft)]"
                  >
                    <Rows3 size={15} />
                    Results
                  </button>

                  <button
                    type="button"
                    onClick={() => selectView("map")}
                    className="flex h-10 w-full items-center gap-2.5 rounded-[7px] border border-[#08285F] bg-[#08285F] px-3 text-xs font-bold text-white shadow-[inset_0_-2px_0_#D7B16F]"
                  >
                    <Map size={15} />
                    Map
                  </button>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setViewMenuOpen((current) => !current)}
                aria-label="Change search view"
                aria-expanded={viewMenuOpen}
                className="grid h-11 w-11 place-items-center rounded-[9px] border border-[var(--line)] bg-[var(--card)] text-[var(--foreground)] shadow-[0_12px_36px_rgba(7,21,47,0.22)] transition hover:border-[#D7B16F]/70 hover:shadow-[0_14px_38px_rgba(7,21,47,0.26),inset_0_-2px_0_#D7B16F]"
              >
                <PanelsTopLeft size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
      </section>
    );
  }

  return (
    <>
      <div
        className={
          viewMode === "results"
            ? "mx-auto grid w-full max-w-[1540px] lg:h-[calc(100vh-151px)] lg:grid-cols-1"
            : "mx-auto grid w-full max-w-[1540px] lg:h-[calc(100vh-151px)] lg:grid-cols-[minmax(0,40%)_minmax(0,60%)]"
        }
      >
        {viewMode === "split" ? (
          <aside className="hidden min-w-0 border-r border-[var(--line)] bg-[#050505] dark:bg-[#050505] lg:block">
            <div className="sticky top-[151px] h-[calc(100vh-151px)]">
              <SearchMap
              listings={filteredListings}
              area={drawnArea}
              onAreaChange={setDrawnArea}
            />
            </div>
          </aside>
        ) : null}

        <section className="min-w-0 bg-[var(--background)] lg:h-[calc(100vh-151px)] lg:overflow-y-auto">
          <div className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--background)]/97 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-7">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-black leading-5 text-[var(--foreground)]">
                  {filteredResultItems.length === 0 ? (
                    "No properties found"
                  ) : (
                    <>
                      <span className="lg:hidden">
                        Showing {Math.min(6, filteredResultItems.length)} of{" "}
                        {filteredResultItems.length}
                      </span>

                      <span className="hidden lg:inline">
                        {filteredResultItems.length} verified{" "}
                        {filteredResultItems.length === 1
                          ? "property"
                          : "properties"}
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-0.5 text-xs font-bold leading-5 text-[var(--muted)]">
                  <span className="lg:hidden">{location} / {purpose}</span>
                  <span className="hidden lg:inline">
                    {drawnArea
                      ? `${location} / ${purpose} / Drawn area`
                      : `${location} / ${purpose} / ${propertyType} / ${budgetLabel} / ${bedrooms}`}
                  </span>
                </p>
              </div>

              {filteredResultItems.length > 0 ? (
                <button className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[9px] border border-[var(--line)] bg-[var(--card)] px-3 text-xs font-black transition duration-200 hover:border-[#D7B16F]/65 hover:bg-[var(--soft)]">
                  <ListFilter size={15} />
                  Recommended
                </button>
              ) : null}
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6 lg:px-7">
            {filteredResultItems.length === 0 ? (
              <div className="max-w-[620px] pt-6 sm:pt-8">
                <div className="border-t border-[#D7B16F]/70 pt-5">
                  <h2 className="text-[1.3rem] font-semibold leading-tight tracking-[-0.035em] text-[var(--foreground)] sm:text-[1.5rem]">
                    No properties match your search
                  </h2>

                  <p className="mt-2.5 max-w-[510px] text-sm font-medium leading-6 text-[var(--muted)]">
                    {drawnArea
                      ? "We couldn’t find properties matching this area and your current filters. Try widening the area, changing the location, or relaxing a filter."
                      : "We couldn’t find properties matching your current search. Try changing the location or relaxing one of your filters."}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    {drawnArea ? (
                      <button
                        type="button"
                        onClick={() => setDrawnArea(null)}
                        className="inline-flex h-10 items-center justify-center rounded-[8px] border border-[#08285F] bg-[#08285F] px-4 text-xs font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] transition hover:bg-[#0A326F]"
                      >
                        Clear map area
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          window.location.href = "/search";
                        }}
                        className="inline-flex h-10 items-center justify-center rounded-[8px] border border-[#08285F] bg-[#08285F] px-4 text-xs font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] transition hover:bg-[#0A326F]"
                      >
                        Reset search
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={cardGridClass}>
                {filteredResultItems.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className={index >= 6 ? "hidden lg:block" : ""}
                  >
                    <VerifiedPropertyCard
                      item={item as VerifiedPropertyCardItem}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

        <div className="fixed bottom-5 right-5 z-[120]">
          <div className="relative">
            {viewMenuOpen ? (
              <div className="absolute bottom-full right-0 mb-2 w-[152px] rounded-[10px] border border-[var(--line)] bg-[var(--card)] p-1.5 shadow-[0_18px_50px_rgba(7,21,47,0.22)]">
                <button
                  type="button"
                  onClick={() => selectView("split")}
                  className={`hidden h-10 w-full items-center gap-2.5 rounded-[7px] px-3 text-xs font-bold transition lg:flex ${
                    viewMode === "split"
                      ? "border border-[#08285F] bg-[#08285F] text-white shadow-[inset_0_-2px_0_#D7B16F]"
                      : "border border-transparent text-[var(--foreground)] hover:border-[#D7B16F]/55 hover:bg-[var(--surface-soft)]"
                  }`}
                >
                  <PanelLeftClose size={15} />
                  Split
                </button>

                <button
                  type="button"
                  onClick={() => selectView("results")}
                  className={`flex h-10 w-full items-center gap-2.5 rounded-[7px] px-3 text-xs font-bold transition ${
                    viewMode === "results"
                      ? "border border-[#08285F] bg-[#08285F] text-white shadow-[inset_0_-2px_0_#D7B16F]"
                      : "border border-transparent text-[var(--foreground)] hover:border-[#D7B16F]/55 hover:bg-[var(--surface-soft)]"
                  }`}
                >
                  <Rows3 size={15} />
                  Results
                </button>

                <button
                  type="button"
                  onClick={() => selectView("map")}
                  className="flex h-10 w-full items-center gap-2.5 rounded-[7px] border border-transparent px-3 text-xs font-bold text-[var(--foreground)] transition hover:border-[#D7B16F]/55 hover:bg-[var(--surface-soft)]"
                >
                  <Map size={15} />
                  Map
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setViewMenuOpen((current) => !current)}
              aria-label="Change search view"
              aria-expanded={viewMenuOpen}
              className="grid h-11 w-11 place-items-center rounded-[9px] border border-[var(--line)] bg-[var(--card)] text-[var(--foreground)] shadow-[0_12px_36px_rgba(7,21,47,0.22)] transition hover:border-[#D7B16F]/70 hover:shadow-[0_14px_38px_rgba(7,21,47,0.26),inset_0_-2px_0_#D7B16F]"
            >
              <PanelsTopLeft size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

      {mobileMapOpen ? (
        <div className="fixed inset-0 z-[200] bg-[var(--background)] lg:hidden">
          <div className="absolute inset-x-0 top-0 z-[220] flex h-14 items-center justify-between border-b border-[var(--line)] bg-[var(--background)] px-4">
            <div>
              <p className="text-sm font-black">Map view</p>
              <p className="text-xs font-bold text-[var(--muted)]">
                {location} / {filteredResultItems.length}{" "}
                {filteredResultItems.length === 1 ? "property" : "properties"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMobileMapOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-[9px] border border-[var(--line)] bg-[var(--card)]"
              aria-label="Close map"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-full pt-14">
            <SearchMap
              listings={filteredListings}
              area={drawnArea}
              onAreaChange={setDrawnArea}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
