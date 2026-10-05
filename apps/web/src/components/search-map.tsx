"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

export type SearchMapListing = {
  image: string;
  title: string;
  slug: string;
  location: string;
  price: string;
  beds: string;
  baths: string;
  type: string;
  verified: boolean;
  tag: string;
  lat: number;
  lng: number;
};

export type SearchArea = [number, number][];

type SearchMapProps = {
  listings: SearchMapListing[];
  area?: SearchArea | null;
  onAreaChange?: (area: SearchArea | null) => void;
};

const SearchMapInner = dynamic(() => import("./search-map-inner"), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Loading map"
      className="h-full min-h-full w-full bg-[var(--surface-soft)]"
    >
      <Skeleton className="h-full min-h-full w-full rounded-none" />
    </div>
  ),
});

export function SearchMap({
  listings,
  area = null,
  onAreaChange,
}: SearchMapProps) {
  return (
    <div className="h-full min-h-full w-full">
      <SearchMapInner
        listings={listings}
        area={area}
        onAreaChange={onAreaChange}
      />
    </div>
  );
}
