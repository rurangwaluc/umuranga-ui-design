"use client";

import { useState } from "react";
import { ListFilter, Map, PanelLeftClose, Rows3, X } from "lucide-react";
import { SearchMap, type SearchMapListing } from "@/components/search-map";
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

  const cardGridClass =
    viewMode === "results"
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      : "grid gap-4 xl:grid-cols-2";

  if (viewMode === "map") {
    return (
      <section className="relative mx-auto hidden w-full max-w-[1540px] lg:block lg:h-[calc(100vh-151px)]">
        <SearchMap listings={listings} />

        <div className="absolute right-5 top-5 z-[500] flex items-center gap-2 rounded-[12px] border border-[var(--line)] bg-[var(--card)] p-2 shadow-[0_18px_50px_rgba(7,21,47,0.16)]">
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className="inline-flex h-10 items-center gap-2 rounded-[9px] border border-[#08285F] bg-[#08285F] px-4 text-xs font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:bg-[#0A326F]"
          >
            <PanelLeftClose size={15} />
            Split view
          </button>

          <button
            type="button"
            onClick={() => setViewMode("results")}
            className="inline-flex h-10 items-center gap-2 rounded-[9px] border border-[var(--line)] bg-[var(--card)] px-4 text-xs font-black text-[var(--foreground)] transition duration-200 hover:border-[#D7B16F]/65 hover:bg-[var(--soft)] hover:shadow-[inset_0_-2px_0_#D7B16F]"
          >
            <Rows3 size={15} />
            Results
          </button>
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
            : "mx-auto grid w-full max-w-[1540px] lg:h-[calc(100vh-151px)] lg:grid-cols-[minmax(0,54%)_minmax(500px,46%)]"
        }
      >
        {viewMode === "split" ? (
          <aside className="hidden min-w-0 border-r border-[var(--line)] bg-[#050505] dark:bg-[#050505] lg:block">
            <div className="sticky top-[151px] h-[calc(100vh-151px)]">
              <SearchMap listings={listings} />
            </div>
          </aside>
        ) : null}

        <section className="min-w-0 bg-[var(--background)] lg:h-[calc(100vh-151px)] lg:overflow-y-auto">
          <div className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--background)]/97 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-7">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-black leading-5 text-[var(--foreground)]">
                  <span className="lg:hidden">Showing 6 of {resultItems.length}</span>
                  <span className="hidden lg:inline">
                    {resultItems.length} verified properties
                  </span>
                </p>
                <p className="mt-0.5 text-xs font-bold leading-5 text-[var(--muted)]">
                  <span className="lg:hidden">{location} / {purpose}</span>
                  <span className="hidden lg:inline">
                    {location} / {purpose} / {propertyType} / {budgetLabel} / {bedrooms}
                  </span>
                </p>
              </div>

              <button className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[9px] border border-[var(--line)] bg-[var(--card)] px-3 text-xs font-black transition duration-200 hover:border-[#D7B16F]/65 hover:bg-[var(--soft)]">
                <ListFilter size={15} />
                Recommended
              </button>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6 lg:px-7">
            <div className={cardGridClass}>
              {resultItems.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className={index >= 6 ? "hidden lg:block" : ""}
                >
                  <VerifiedPropertyCard item={item as VerifiedPropertyCardItem} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-5 right-5 z-[120] flex items-center rounded-[12px] border border-[var(--line)] bg-[var(--card)] p-1.5 shadow-[0_18px_54px_rgba(7,21,47,0.24)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => setViewMode("split")}
          className={`hidden h-10 items-center gap-2 rounded-[9px] px-4 text-xs font-black transition lg:inline-flex ${
            viewMode === "split"
              ? "border border-[#08285F] bg-[#08285F] text-white shadow-[inset_0_-2px_0_#D7B16F]"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          <PanelLeftClose size={15} />
          Split
        </button>

        <button
          type="button"
          onClick={() => setViewMode("results")}
          className={`hidden h-10 items-center gap-2 rounded-[9px] px-4 text-xs font-black transition lg:inline-flex ${
            viewMode === "results"
              ? "border border-[#08285F] bg-[#08285F] text-white shadow-[inset_0_-2px_0_#D7B16F]"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          <Rows3 size={15} />
          Results
        </button>

        <button
          type="button"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setMobileMapOpen(true);
              return;
            }

            setViewMode("map");
          }}
          className="inline-flex h-10 items-center gap-2 rounded-[9px] border border-transparent px-4 text-xs font-black text-[var(--muted)] transition duration-200 hover:border-[#D7B16F]/55 hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)] hover:shadow-[inset_0_-2px_0_#D7B16F]"
        >
          <Map size={15} />
          Map
        </button>
      </div>

      {mobileMapOpen ? (
        <div className="fixed inset-0 z-[200] bg-[var(--background)] lg:hidden">
          <div className="absolute inset-x-0 top-0 z-[220] flex h-14 items-center justify-between border-b border-[var(--line)] bg-[var(--background)] px-4">
            <div>
              <p className="text-sm font-black">Map view</p>
              <p className="text-xs font-bold text-[var(--muted)]">
                {location} / {resultItems.length} properties
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
            <SearchMap listings={listings} />
          </div>
        </div>
      ) : null}
    </>
  );
}
