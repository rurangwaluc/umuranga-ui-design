"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type SearchFiltersProps = {
  location: string;
  initialPurpose?: string;
  initialPropertyType?: string;
  initialMaxPrice?: string;
  initialBedrooms?: string;
};

const purposeOptions: Option[] = [
  { label: "For sale", value: "buy" },
  { label: "For rent", value: "rent" },
  { label: "Land", value: "land" },
  { label: "Any purpose", value: "" },
];

const priceOptions: Option[] = [
  { label: "Any price", value: "" },
  { label: "Under RWF 500K", value: "500000" },
  { label: "Under RWF 1M", value: "1000000" },
  { label: "Under RWF 2M", value: "2000000" },
  { label: "Under RWF 5M", value: "5000000" },
];

const bedroomOptions: Option[] = [
  { label: "Any beds", value: "" },
  { label: "1+ bed", value: "1" },
  { label: "2+ beds", value: "2" },
  { label: "3+ beds", value: "3" },
  { label: "4+ beds", value: "4" },
  { label: "5+ beds", value: "5" },
];

const propertyTypeOptions: Option[] = [
  { label: "Any type", value: "" },
  { label: "House", value: "House" },
  { label: "Apartment", value: "Apartment" },
  { label: "Villa", value: "Villa" },
  { label: "Land", value: "Land" },
  { label: "Commercial", value: "Commercial" },
];

function labelFor(options: Option[], value: string) {
  return options.find((item) => item.value === value)?.label ?? options[0].label;
}

function FilterButton({
  label,
  name,
  value,
  options,
  open,
  onOpen,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: Option[];
  open: boolean;
  onOpen: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative min-w-0">
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        onClick={onOpen}
        className={`flex h-11 w-full items-center justify-between gap-3 rounded-[10px] border bg-[var(--card)] px-3 text-left text-sm font-black text-[var(--foreground)] transition duration-200 hover:border-[#D7B16F]/65 ${
          open
            ? "border-[#D7B16F] shadow-[inset_0_-2px_0_#D7B16F]"
            : "border-[var(--line)]"
        }`}
      >
        <span className="min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
            {label}
          </span>
          <span className="mt-0.5 block truncate">
            {labelFor(options, value)}
          </span>
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-[var(--muted)] transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[90] overflow-hidden rounded-[12px] border border-[var(--line)] bg-[var(--card)] p-1.5 shadow-[0_18px_50px_rgba(7,21,47,0.14)] dark:bg-[#15171C]">
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onChange(option.value)}
                className="flex h-10 w-full items-center justify-between rounded-[9px] px-3 text-left text-sm font-black text-[var(--foreground)] transition hover:bg-[var(--soft)]"
              >
                {option.label}
                {selected ? <Check size={15} strokeWidth={3} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function SearchFilters({
  location,
  initialPurpose = "",
  initialPropertyType = "",
  initialMaxPrice = "",
  initialBedrooms = "",
}: SearchFiltersProps) {
  const [purpose, setPurpose] = useState(initialPurpose || "buy");
  const [propertyType, setPropertyType] = useState(initialPropertyType);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [bedrooms, setBedrooms] = useState(initialBedrooms);
  const [open, setOpen] = useState<
    "purpose" | "price" | "beds" | "type" | null
  >(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggle(value: "purpose" | "price" | "beds" | "type") {
    setOpen((current) => (current === value ? null : value));
  }

  const filterFields = (
    <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:w-auto lg:items-center">
      <FilterButton
        label="Purpose"
        name="purpose"
        value={purpose}
        options={purposeOptions}
        open={open === "purpose"}
        onOpen={() => toggle("purpose")}
        onChange={(value) => {
          setPurpose(value);
          setOpen(null);
        }}
      />

      <FilterButton
        label="Price"
        name="maxPrice"
        value={maxPrice}
        options={priceOptions}
        open={open === "price"}
        onOpen={() => toggle("price")}
        onChange={(value) => {
          setMaxPrice(value);
          setOpen(null);
        }}
      />

      <FilterButton
        label="Beds"
        name="bedrooms"
        value={bedrooms}
        options={bedroomOptions}
        open={open === "beds"}
        onOpen={() => toggle("beds")}
        onChange={(value) => {
          setBedrooms(value);
          setOpen(null);
        }}
      />

      <FilterButton
        label="Type"
        name="propertyType"
        value={propertyType}
        options={propertyTypeOptions}
        open={open === "type"}
        onOpen={() => toggle("type")}
        onChange={(value) => {
          setPropertyType(value);
          setOpen(null);
        }}
      />
    </div>
  );

  return (
    <form action="/search" className="relative">
      <div className="grid gap-2 lg:hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <label className="flex h-11 min-w-0 items-center gap-2 rounded-[10px] border border-[var(--line)] bg-[var(--card)] px-3 text-sm font-black text-[var(--foreground)]">
            <Search size={16} className="shrink-0 text-[var(--muted)]" />
            <input
              name="location"
              defaultValue={location}
              placeholder="Kigali, Rwanda"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--muted)]"
            />
            <MapPin size={15} className="shrink-0 text-[var(--muted)]" />
          </label>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-[10px] border border-[#08285F] bg-[#08285F] px-4 text-xs font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:bg-[#0A326F]"
          >
            Search
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setFiltersOpen((value) => !value);
            setOpen(null);
          }}
          className="flex h-11 w-full items-center justify-between rounded-[10px] border border-[var(--line)] bg-[var(--card)] px-3 text-sm font-black text-[var(--foreground)] shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:border-[#D7B16F]/65"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal size={15} />
            Filters
          </span>
          <span className="text-xs font-bold text-[var(--muted)]">
            {labelFor(purposeOptions, purpose)} / {labelFor(priceOptions, maxPrice)}
          </span>
        </button>

        {filtersOpen ? (
          <div className="absolute inset-x-0 top-[calc(100%+8px)] z-[90] rounded-[14px] border border-[var(--line)] bg-[var(--card)] p-3 shadow-[0_18px_50px_rgba(7,21,47,0.18)] dark:bg-[#15171C]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-black">Filters</p>

              <button
                type="button"
                onClick={() => {
                  setFiltersOpen(false);
                  setOpen(null);
                }}
                className="grid h-8 w-8 place-items-center rounded-[8px] border border-[var(--line)] bg-[var(--soft)]"
                aria-label="Close filters"
              >
                <X size={15} />
              </button>
            </div>

            {filterFields}

            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="flex h-11 items-center gap-2 rounded-[10px] border border-[var(--line)] bg-[var(--soft)] px-3 text-xs font-black">
                <input
                  type="checkbox"
                  name="verifiedOnly"
                  value="true"
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                Verified only
              </label>

              <label className="flex h-11 items-center gap-2 rounded-[10px] border border-[var(--line)] bg-[var(--soft)] px-3 text-xs font-black">
                <input
                  type="checkbox"
                  name="viewing"
                  value="true"
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                Viewing
              </label>
            </div>

            <button
              type="submit"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-[10px] border border-[#08285F] bg-[#08285F] text-sm font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:bg-[#0A326F]"
            >
              Apply filters
            </button>
          </div>
        ) : null}
      </div>

      <div className="hidden gap-2 lg:flex">
        <label className="flex h-11 min-w-[260px] flex-1 items-center gap-2 rounded-[10px] border border-[var(--line)] bg-[var(--card)] px-3 text-sm font-black text-[var(--foreground)] lg:max-w-[360px]">
          <Search size={17} className="shrink-0 text-[var(--muted)]" />
          <input
            name="location"
            defaultValue={location}
            placeholder="Kigali, Rwanda"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--muted)]"
          />
          <MapPin size={16} className="shrink-0 text-[var(--muted)]" />
        </label>

        {filterFields}

        <button
          type="button"
          className="inline-flex h-11 min-w-[138px] items-center justify-center gap-2 rounded-[10px] border border-[var(--line)] bg-[var(--card)] px-4 text-sm font-black text-[var(--foreground)] shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:border-[#D7B16F]/65"
        >
          <SlidersHorizontal size={16} />
          More filters
          <ChevronDown size={16} />
        </button>

        <button
          type="submit"
          className="inline-flex h-11 min-w-[118px] items-center justify-center rounded-[10px] border border-[#08285F] bg-[#08285F] px-5 text-sm font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:bg-[#0A326F]"
        >
          Search
        </button>

        <button
          type="button"
          className="inline-flex h-11 min-w-[124px] items-center justify-center rounded-[10px] border border-[var(--line)] bg-[var(--card)] px-5 text-sm font-black text-[var(--foreground)] transition duration-200 hover:border-[#D7B16F]/65 hover:shadow-[inset_0_-2px_0_#D7B16F]"
        >
          Save search
        </button>
      </div>
    </form>
  );
}
