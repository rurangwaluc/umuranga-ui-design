"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  BedDouble,
  Check,
  ChevronDown,
  Home,
  KeyRound,
  Map,
  MapPin,
  Mic,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { AsyncButton } from "@/components/async-button";
import { HomeHeroHeader } from "@/components/home-hero-header";
import { getPostLoginPath, useAuthUser } from "@/lib/auth";

const navLinks = [
  { label: "Buy", href: "#properties" },
  { label: "Rent", href: "#properties" },
  { label: "Land", href: "#properties" },
  { label: "Agents", href: "#agents" },
  { label: "Agencies", href: "#agencies" },
  { label: "How it works", href: "#how-it-works" },
];


const searchTabs = [
  { label: "Buy", icon: Home },
  { label: "Rent", icon: KeyRound },
  { label: "Land", icon: Map },
] as const;

const propertyTypes = [
  "All Types",
  "House",
  "Apartment",
  "Villa",
  "Land / Plot",
  "Commercial",
  "Short Stay",
];


const landTypes = [
  "Residential plot",
  "Commercial land",
  "Agricultural land",
  "Mixed-use land",
];

const bedroomOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];


const requestExamples = [
  "Budget + amenities",
  "Multiple neighborhoods",
  "Near work or school",
];

const advancedSections = [
  {
    title: "Trust",
    options: ["Verified owner", "Verified agent", "Clear documents", "Photos verified"],
  },
  {
    title: "Location",
    options: ["Near school", "Near work", "Near main road", "Quiet area"],
  },
  {
    title: "Comfort",
    options: ["Parking", "Garden", "Furnished", "Balcony"],
  },
  {
    title: "Viewing",
    options: ["Available now", "Flexible viewing", "Video tour", "Negotiable price"],
  },
];

const trustAvatars = [
  "/images/home/agent-1.webp",
  "/images/home/agent-2.webp",
  "/images/home/agent-3.webp",
];


type SearchMode = (typeof searchTabs)[number]["label"];

type SearchState = {
  mode: SearchMode;
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  requestText: string;
  advanced: string[];
};

const initialSearchState: SearchState = {
  mode: "Buy",
  location: "",
  propertyType: "All Types",
  minPrice: "",
  maxPrice: "",
  bedrooms: "Any",
  requestText: "",
  advanced: [],
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionResultEventLike = {
  results: ArrayLike<{
    0?: {
      transcript?: string;
    };
  }>;
};

type VoiceWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;

  const voiceWindow = window as VoiceWindow;

  return (
    voiceWindow.SpeechRecognition ??
    voiceWindow.webkitSpeechRecognition ??
    null
  );
}

function SearchField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2.5 block text-[0.78rem] font-black">
        {label}
      </span>
      {children}
    </label>
  );
}

function SelectInput({
  icon,
  value,
  onChange,
  options,
  ariaLabel,
}: {
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  ariaLabel: string;
}) {
  return (
    <span className="relative block">
      {icon ? (
        <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#071f4d] dark:text-[#D8D1C5]">
          {icon}
        </span>
      ) : null}

      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-[46px] w-full cursor-pointer appearance-none rounded-[11px] border border-[#dce8f8] bg-white ${
          icon ? "pl-12" : "pl-4"
        } pr-11 text-xs font-black text-[#07152f] outline-none transition duration-200 hover:border-[#071f4d] focus:border-[#071f4d] dark:border-white/12 dark:bg-[#15171C] dark:text-white sm:h-[50px] sm:rounded-[10px]`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7f9e]"
      />
    </span>
  );
}

function TextInput({
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  ariaLabel,
}: {
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "number";
  ariaLabel: string;
}) {
  return (
    <span className="relative block">
      {icon ? (
        <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#071f4d] dark:text-[#D8D1C5]">
          {icon}
        </span>
      ) : null}

      <input
        aria-label={ariaLabel}
        type={type}
        value={value}
        min={type === "number" ? "0" : undefined}
        inputMode={type === "number" ? "numeric" : undefined}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`h-[46px] w-full rounded-[11px] border border-[#dce8f8] bg-white ${
          icon ? "pl-12" : "pl-4"
        } pr-4 text-[0.9rem] font-semibold text-[#08285F] outline-none transition duration-200 placeholder:font-semibold placeholder:text-[#08285F]/72 hover:border-[#071f4d] focus:border-[#071f4d] dark:border-white/12 dark:bg-[#15171C] dark:text-white dark:placeholder:text-white/78 sm:h-[50px] sm:rounded-[10px]`}
      />
    </span>
  );
}

function BudgetInputs({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: {
  minPrice: string;
  maxPrice: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}) {
  return (
    <div className="grid h-[46px] grid-cols-[1fr_auto_1fr] items-center rounded-[11px] border border-[#dce8f8] bg-white px-4 text-xs font-semibold text-[#6b7f9e] dark:border-white/12 dark:bg-[#15171C] dark:text-white/62 sm:h-[50px] sm:rounded-[10px]">
      <input
        aria-label="Minimum price"
        type="number"
        min="0"
        inputMode="numeric"
        value={minPrice}
        placeholder="Min Price"
        onChange={(event) => onMinChange(event.target.value)}
        className="min-w-0 bg-transparent text-[0.86rem] font-semibold text-[#08285F] outline-none placeholder:font-semibold placeholder:text-[#08285F]/70 dark:text-white dark:placeholder:text-white/78"
      />

      <span className="px-3 font-semibold text-[#08285F]/55 dark:text-white/60">-</span>

      <input
        aria-label="Maximum price"
        type="number"
        min="0"
        inputMode="numeric"
        value={maxPrice}
        placeholder="Max Price"
        onChange={(event) => onMaxChange(event.target.value)}
        className="min-w-0 bg-transparent text-[0.86rem] font-semibold text-[#08285F] outline-none placeholder:font-semibold placeholder:text-[#08285F]/70 dark:text-white dark:placeholder:text-white/78"
      />
    </div>
  );
}


function MobileAdvancedSearchPortal({
  search,
  openAdvancedSection,
  setOpenAdvancedSection,
  toggleAdvancedOption,
  clearAdvancedOptions,
  onClose,
}: {
  search: SearchState;
  openAdvancedSection: string;
  setOpenAdvancedSection: (section: string) => void;
  toggleAdvancedOption: (option: string) => void;
  clearAdvancedOptions: () => void;
  onClose: () => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex w-full max-w-full items-end justify-center overflow-hidden bg-black/48 p-3 sm:items-center lg:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0"
      />

      <section className="relative w-full min-w-0 max-w-[430px] overflow-hidden rounded-[18px] border border-[#dce8f8] bg-white text-[#07152f] shadow-[0_24px_80px_rgba(7,21,47,0.22)] dark:border-white/12 dark:bg-[#15171C] dark:text-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#dce8f8] px-4 py-3 dark:border-white/12">
          <div className="min-w-0">
            <p className="text-base font-black">Filters</p>
            <p className="mt-1 text-xs font-semibold text-[#6b7f9e] dark:text-white/52">
              {search.advanced.length} selected
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#dce8f8] bg-white text-[#07152f] transition hover:border-[#071f4d] dark:border-white/12 dark:bg-[#15171C] dark:text-white"
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[66dvh] overflow-y-auto">
          <div className="border-b border-[#dce8f8] bg-[#f6f9ff] px-3 py-3 dark:border-white/12 dark:bg-[#15171C]">
            <div className="grid grid-cols-2 gap-2">
              {advancedSections.map((section) => {
                const selectedCount = section.options.filter((option) =>
                  search.advanced.includes(option)
                ).length;
                const active = openAdvancedSection === section.title;

                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => setOpenAdvancedSection(section.title)}
                    className={`flex h-10 min-w-0 items-center justify-between gap-2 rounded-[10px] border px-3 text-xs font-black transition ${
                      active
                        ? "border-[#D7B16F] bg-[#eef4ff] text-[#071f4d] dark:border-[#D7B16F] dark:bg-[#181D26] dark:text-white"
                        : "border-[#dce8f8] bg-white text-[#344766] hover:border-[#071f4d] dark:border-white/12 dark:bg-[#1B1E24] dark:text-white/78 dark:hover:border-[#08285f]"
                    }`}
                  >
                    <span className="min-w-0 truncate">{section.title}</span>

                    {selectedCount > 0 ? (
                      <span
                        className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black ${
                          active
                            ? "bg-[#071f4d] text-white"
                            : "bg-[#eef4ff] text-[#071f4d] dark:bg-[#181D26] dark:text-[#D8D1C5]"
                        }`}
                      >
                        {selectedCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4">
            {advancedSections.map((section) =>
              openAdvancedSection === section.title ? (
                <div key={section.title} className="grid gap-2 min-[380px]:grid-cols-2">
                  {section.options.map((option) => {
                    const active = search.advanced.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleAdvancedOption(option)}
                        className={`flex min-h-12 items-center justify-between gap-3 rounded-[11px] border px-4 py-3 text-left text-sm font-black transition ${
                          active
                            ? "border-[#D7B16F] bg-[#eef4ff] text-[#071f4d] dark:border-[#D7B16F] dark:bg-[#181D26] dark:text-white"
                            : "border-[#dce8f8] bg-white text-[#344766] hover:border-[#071f4d] dark:border-white/12 dark:bg-[#1B1E24] dark:text-white/78 dark:hover:border-[#08285f]"
                        }`}
                      >
                        <span className="min-w-0 truncate">{option}</span>

                        {active ? (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D7B16F] text-[#08285F]">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="h-5 w-5 shrink-0 rounded-full border border-[#dce8f8] bg-white dark:border-white/12 dark:bg-[#1B1E24]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#dce8f8] bg-[#f6f9ff] px-4 py-3 dark:border-white/12 dark:bg-[#15171C]">
          {search.advanced.length > 0 ? (
            <button
              type="button"
              onClick={clearAdvancedOptions}
              className="cursor-pointer h-10 rounded-[10px] border border-[#dce8f8] bg-white px-4 text-xs font-black text-[#344766] transition hover:border-[#071f4d] dark:border-white/12 dark:bg-[#1B1E24] dark:text-white/74"
            >
              Clear
            </button>
          ) : (
            <span className="text-xs font-semibold text-[#6b7f9e] dark:text-white/48">
              No filters
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer h-10 rounded-[10px] bg-[#071f4d] px-6 text-xs font-black text-white transition hover:bg-[#061735]"
          >
            Apply filters
          </button>
        </div>
      </section>
    </div>,
    document.body
  );
}
export function HeroSection() {
  const router = useRouter();
  const user = useAuthUser();
  const [isSearchPending, startSearchTransition] = useTransition();

  const [search, setSearch] = useState<SearchState>(initialSearchState);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [openAdvancedSection, setOpenAdvancedSection] = useState("Trust");
  const [searchMessage, setSearchMessage] = useState("");
  const [voiceListening, setVoiceListening] = useState(false);

  useEffect(() => {
    if (!advancedOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [advancedOpen]);

  const dashboardHref = user ? getPostLoginPath(user) : "/login";
  const listPropertyHref = user
    ? user.userType === "landlord" ||
      user.userType === "agency" ||
      user.userType === "agent"
      ? getPostLoginPath(user)
      : "/onboarding?role=landlord"
    : "/signup?role=landlord";

  function updateSearch<Key extends keyof SearchState>(
    key: Key,
    value: SearchState[Key]
  ) {
    setSearch((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function toggleAdvancedOption(option: string) {
    setSearch((current) => {
      const exists = current.advanced.includes(option);

      return {
        ...current,
        advanced: exists
          ? current.advanced.filter((item) => item !== option)
          : [...current.advanced, option],
      };
    });
  }

  function clearAdvancedOptions() {
    setSearch((current) => ({
      ...current,
      advanced: [],
    }));
  }

  function handleVoiceIdea() {
    const SpeechRecognition = getSpeechRecognition();

    if (!SpeechRecognition) {
      setSearch((current) => ({
        ...current,
        requestText:
          current.requestText ||
          "3 bedrooms near work, under 800k, close to school",
        bedrooms: current.bedrooms === "Any" ? "3+" : current.bedrooms,
        maxPrice: current.maxPrice || "800000",
      }));

      setSearchMessage(
        "Voice search is not available in this browser yet. We filled an example request instead."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (!transcript) {
        setSearchMessage("We could not hear a clear property request. Try again.");
        return;
      }

      setSearch((current) => ({
        ...current,
        requestText: transcript,
      }));

      setSearchMessage(
        "Voice search captured your request. Review it, then search properties."
      );
    };

    recognition.onerror = () => {
      setSearchMessage(
        "Voice search could not start. You can still type your property request."
      );
    };

    recognition.onend = () => {
      setVoiceListening(false);
    };

    setVoiceListening(true);
    setSearchMessage("Listening... say the kind of property you want.");
    recognition.start();
  }

  function goToSearch() {
    const min = Number(search.minPrice || 0);
    const max = Number(search.maxPrice || 0);

    if (min > 0 && max > 0 && min > max) {
      setSearchMessage("Minimum price cannot be higher than maximum price.");
      return;
    }

    const params = new URLSearchParams();

    params.set("purpose", search.mode.toLowerCase());

    if (search.location.trim()) {
      params.set("location", search.location.trim());
    }

    if (search.propertyType !== "All Types") {
      params.set("propertyType", search.propertyType);
    }

    if (search.minPrice) {
      params.set("minPrice", search.minPrice);
    }

    if (search.maxPrice) {
      params.set("maxPrice", search.maxPrice);
    }

    if (search.bedrooms !== "Any") {
      params.set("bedrooms", search.bedrooms);
    }

    if (search.requestText.trim()) {
      params.set("q", search.requestText.trim());
    }

    if (search.advanced.length > 0) {
      params.set("features", search.advanced.join(","));
    }

    startSearchTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goToSearch();
  }

  return (
    <>
      <HomeHeroHeader
        navLinks={navLinks}
        dashboardHref={dashboardHref}
        listPropertyHref={listPropertyHref}
        userLabel={user ? "Dashboard" : "Sign in"}
      />

      <section
        className={`relative isolate w-full max-w-full overflow-visible bg-white text-[#07152f] dark:bg-[#0A0B0E] dark:text-white ${
          advancedOpen ? "z-[2147483646]" : "z-0"
        }`}
      >

      <div className="relative -mt-[92px] min-h-[720px] overflow-hidden bg-white dark:bg-[#0A0B0E] sm:min-h-[750px] lg:-mt-[104px] lg:min-h-[700px] xl:-mt-[112px] xl:min-h-[720px]">
        <Image
          src="/images/home/herosectionbg.webp"
          alt="Modern hillside property in Rwanda"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] brightness-[0.9] saturate-[0.98] dark:brightness-[0.72] dark:saturate-[0.92] sm:object-[61%_center] lg:object-[64%_center]"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,30,0.58)_0%,rgba(5,13,30,0.38)_34%,rgba(5,13,30,0.08)_64%,rgba(5,13,30,0.18)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.34)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1540px] flex-col justify-start px-5 pb-7 pt-[152px] sm:min-h-[750px] sm:px-8 sm:pt-[166px] lg:min-h-[700px] lg:px-16 lg:pb-7 lg:pt-[210px] xl:min-h-[720px] xl:px-[120px] xl:pt-[220px]">
          <div className="max-w-[760px]">
            <h1 className="max-w-[760px] text-[2.22rem] font-semibold leading-[1.01] tracking-[-0.06em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.48)] min-[390px]:text-[2.6rem] sm:text-[3.35rem] lg:text-[4.05rem] xl:text-[4.35rem]">
              Properties That Fit Your Lifestyle In Rwanda.
            </h1>

            <p className="mt-4 max-w-[620px] text-[0.94rem] font-semibold leading-[1.55] text-white/92 drop-shadow-[0_3px_16px_rgba(0,0,0,0.45)] min-[390px]:text-[1rem] sm:text-[1.05rem] lg:max-w-[650px] lg:text-[1.08rem]">
              Homes, apartments, land, and commercial spaces with clearer
              listings, safer contacts, and a smoother process, all in one place.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-[1280px] rounded-[10px] border border-white/50 bg-white/94 p-4 text-[#07152f] shadow-[0_28px_80px_rgba(7,21,47,0.2)] backdrop-blur-xl dark:border-white/12 dark:bg-[#15171C]/96 dark:text-white dark:shadow-none sm:p-4 lg:mt-9 lg:rounded-[14px] lg:p-4"
          >
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid w-full grid-cols-3 gap-2 sm:w-auto sm:max-w-none sm:gap-3">
              {searchTabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => updateSearch("mode", tab.label)}
                  className={`flex h-[40px] cursor-pointer items-center justify-center gap-2 rounded-[9px] px-3 text-[0.84rem] font-semibold transition sm:h-[40px] sm:min-w-[108px] sm:gap-2 sm:rounded-[9px] sm:px-4 sm:text-[0.86rem] ${
                    search.mode === tab.label
                      ? "bg-[#071f4d] text-white shadow-[inset_0_-2px_0_#D7B16F] dark:bg-[#08285f]"
                      : "border border-[#e6edf7] bg-white text-[#344766] hover:border-[#D7B16F] hover:bg-[#FFF8EA] hover:text-[#08285F] dark:border-white/12 dark:bg-[#1B1E24] dark:text-white/86 dark:hover:border-[#D7B16F] dark:hover:bg-[#D7B16F]/10 dark:hover:text-white"
                  }`}
                >
                  <tab.icon size={19} />
                  {tab.label}
                </button>
              ))}
            </div>
                <button
                  type="button"
                  onClick={goToSearch}
                    className="hidden h-[40px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#dce8f8] bg-white/72 px-4 text-xs font-black text-[#071f4d] shadow-[inset_0_-2px_0_#D7B16F,0_8px_22px_rgba(7,31,77,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#D7B16F] hover:bg-[#FFF8EA] hover:text-[#08285F] dark:border-white/14 dark:bg-white/[0.06] dark:text-white/86 dark:shadow-[inset_0_-2px_0_#D7B16F] dark:hover:border-[#D7B16F] dark:hover:bg-[#D7B16F]/10 dark:hover:text-[#D7B16F] sm:inline-flex"
                >
                  <SlidersHorizontal size={15} />
                  {search.advanced.length > 0
                    ? `Filters (${search.advanced.length})`
                    : "More filters"}
                </button>
              </div>


              <div className="mt-4 grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:mt-4 lg:grid-cols-[1.45fr_1fr_1.15fr_auto]">
                <SearchField label="Location">
                  <TextInput
                    icon={<MapPin size={18} />}
                    value={search.location}
                    onChange={(value) => updateSearch("location", value)}
                    placeholder={
                      search.mode === "Land"
                        ? "Where is the land located?"
                        : "Where do you want to live?"
                    }
                    ariaLabel="Location"
                  />
                </SearchField>

                <SearchField
                  label={search.mode === "Land" ? "Land Type" : "Property Type"}
                  className="hidden sm:block"
                >
                  <SelectInput
                    value={search.propertyType}
                    onChange={(value) => updateSearch("propertyType", value)}
                    options={search.mode === "Land" ? landTypes : propertyTypes}
                    ariaLabel={search.mode === "Land" ? "Land type" : "Property type"}
                  />
                </SearchField>

                <SearchField label="Budget (RWF)" className="hidden sm:block">
                  <BudgetInputs
                    minPrice={search.minPrice}
                    maxPrice={search.maxPrice}
                    onMinChange={(value) => updateSearch("minPrice", value)}
                    onMaxChange={(value) => updateSearch("maxPrice", value)}
                  />
                </SearchField>

                <SearchField label="Bedrooms" className="hidden">
                  <SelectInput
                    icon={<BedDouble size={18} />}
                    value={search.bedrooms}
                    onChange={(value) => updateSearch("bedrooms", value)}
                    options={bedroomOptions}
                    ariaLabel="Bedrooms"
                  />
                </SearchField>

                <AsyncButton
                  type="submit"
                  loading={isSearchPending}
                  loadingText="Searching"
                  className="hidden h-[46px] cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-[#08285F] bg-[#08285F] px-7 text-[0.92rem] font-semibold text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:bg-[#0A326F] dark:border-[#08285F] dark:bg-[#08285F] dark:text-white sm:col-span-2 sm:flex lg:col-span-1"
                >
                  <Search size={20} />
                  Search
                </AsyncButton>
              </div>

              <div className="mt-2.5 rounded-[12px] border border-[#dce8f8] bg-[#f7faff]/82 p-2 dark:border-white/12 dark:bg-[#15171C] sm:p-2.5">
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={handleVoiceIdea}
                      disabled={voiceListening}
                      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[9px] border border-[#08285F] bg-[#08285F] text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:bg-[#0A326F] disabled:cursor-wait disabled:opacity-70 sm:h-8 sm:w-8"
                      aria-label={
                        voiceListening
                          ? "Listening for voice search"
                          : "Start voice search"
                      }
                    >
                      <Mic
                        size={17}
                        className={voiceListening ? "animate-pulse" : ""}
                      />
                    </button>

                    <input
                      aria-label="Describe what you need"
                      value={search.requestText}
                      onChange={(event) =>
                        updateSearch("requestText", event.target.value)
                      }
                      placeholder={
                        search.mode === "Land"
                          ? 'Describe the land you need, e.g. "plot near main road"'
                          : 'Describe what you need, e.g. "3 bedrooms under 800k near school"'
                      }
                      className="min-w-0 flex-1 bg-transparent text-[0.92rem] font-semibold leading-5 text-[#08285F] outline-none placeholder:font-semibold placeholder:text-[#08285F]/72 dark:text-white dark:placeholder:text-white/78"
                    />
                  </div>

                    <div className="hidden min-w-0 items-center gap-2.5 lg:flex lg:min-w-[360px] lg:justify-end">
                      <div className="flex shrink-0 -space-x-2">
                        {trustAvatars.map((image, index) => (
                          <span
                            key={image}
                            className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-[var(--soft)] dark:border-[#15171C] sm:h-9 sm:w-9"
                          >
                            <Image
                              src={image}
                              alt={`Trusted UMURANGA advisor ${index + 1}`}
                              fill
                              sizes="72px"
                              className="object-cover object-center" quality={95}
                            />
                          </span>
                        ))}
                      </div>

                      <p className="min-w-0 text-[0.74rem] font-semibold leading-4 text-[#08285F] dark:text-white/82 sm:text-[0.78rem] sm:leading-5">
                        Trusted by local renters, buyers, and property teams.
                      </p>
                    </div>
                </div>
              </div>

                <AsyncButton
                  type="submit"
                  loading={isSearchPending}
                  loadingText="Searching"
                  className="mt-3 flex h-[52px] w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#08285F] bg-[#08285F] px-7 text-[0.95rem] font-semibold text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:bg-[#0A326F] dark:border-[#08285F] dark:bg-[#08285F] dark:text-white sm:hidden"
                >
                  <Search size={20} />
                  Search
                </AsyncButton>

              <details className="group mt-4 sm:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-black text-[#071f4d] transition hover:text-[#061735] dark:text-[#D8D1C5] dark:hover:text-white [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex items-center gap-2">
                    <SlidersHorizontal size={17} />
                    Filters
                  </span>

                  <ChevronDown
                    size={16}
                    className="transition group-open:rotate-180"
                  />
                </summary>

                <div className="mt-4 grid gap-3 border-t border-[#dce8f8] pt-4 dark:border-white/12 min-[430px]:grid-cols-2">
                  <SearchField label={search.mode === "Land" ? "Land Type" : "Property Type"}>
                    <SelectInput
                      value={search.propertyType}
                      onChange={(value) => updateSearch("propertyType", value)}
                      options={search.mode === "Land" ? landTypes : propertyTypes}
                      ariaLabel={search.mode === "Land" ? "Land type" : "Property type"}
                    />
                  </SearchField>

                  {search.mode !== "Land" ? (
                    <SearchField label="Bedrooms">
                      <SelectInput
                        icon={<BedDouble size={18} />}
                        value={search.bedrooms}
                        onChange={(value) => updateSearch("bedrooms", value)}
                        options={bedroomOptions}
                        ariaLabel="Bedrooms"
                      />
                    </SearchField>
                  ) : null}

                  <SearchField
                    label="Budget (RWF)"
                    className={
                      search.mode === "Land" ? "" : "min-[430px]:col-span-2"
                    }
                  >
                    <BudgetInputs
                      minPrice={search.minPrice}
                      maxPrice={search.maxPrice}
                      onMinChange={(value) => updateSearch("minPrice", value)}
                      onMaxChange={(value) => updateSearch("maxPrice", value)}
                    />
                  </SearchField>
                </div>
              </details>

            {search.advanced.length > 0 && !advancedOpen ? (
              <div className="hidden">
                {search.advanced.slice(0, 8).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleAdvancedOption(option)}
                    className="inline-flex items-center gap-2 rounded-[9px] bg-[#eef4ff] px-3 py-2 text-xs font-black text-[#071f4d] transition hover:bg-[#e1ebff] dark:bg-[#181D26] dark:text-[#D8D1C5]"
                  >
                    {option}
                    <span aria-hidden="true">×</span>
                  </button>
                ))}

                {search.advanced.length > 8 ? (
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#6b7f9e] dark:bg-[#1B1E24] dark:text-white/58">
                    +{search.advanced.length - 8} more
                  </span>
                ) : null}
              </div>
            ) : null}

            {searchMessage ? (
              <div
                className="hidden"
                aria-live="polite"
              >
                {searchMessage}
              </div>
            ) : null}


            {false ? (
              <div className="mt-4 hidden rounded-[16px] border border-[#dce8f8] bg-white/70 p-4 dark:border-white/12 dark:bg-[#15171C] lg:block">
                <div className="grid gap-4 lg:grid-cols-4">
                  {advancedSections.map((section) => (
                    <div key={section.title}>
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#315384] dark:text-white/58">
                          {section.title}
                        </p>
                        <span className="text-[11px] font-black text-[#6b7f9e] dark:text-white/42">
                          {
                            section.options.filter((option) =>
                              search.advanced.includes(option)
                            ).length
                          }{" "}
                          selected
                        </span>
                      </div>

                      <div className="grid gap-2">
                        {section.options.map((option) => {
                          const active = search.advanced.includes(option);

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => toggleAdvancedOption(option)}
                              className={`flex min-h-11 items-center justify-between gap-3 rounded-[11px] border px-3 py-2 text-left text-xs font-black transition ${
                                active
                                  ? "border-[#D7B16F] bg-[#eef4ff] text-[#071f4d] dark:border-[#D7B16F] dark:bg-[#181D26] dark:text-white"
                                  : "border-[#dce8f8] bg-white text-[#344766] hover:border-[#071f4d] dark:border-white/12 dark:bg-[#1B1E24] dark:text-white/78 dark:hover:border-[#08285f]"
                              }`}
                            >
                              <span className="min-w-0 truncate">{option}</span>

                              {active ? (
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D7B16F] text-[#08285F]">
                                  <Check size={12} strokeWidth={3} />
                                </span>
                              ) : (
                                <span className="h-5 w-5 shrink-0 rounded-full border border-[#dce8f8] bg-white dark:border-white/12 dark:bg-[#1B1E24]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#dce8f8] pt-4 dark:border-white/12">
                  {search.advanced.length > 0 ? (
                    <button
                      type="button"
                      onClick={clearAdvancedOptions}
                      className="cursor-pointer h-10 rounded-[10px] border border-[#dce8f8] bg-white px-4 text-xs font-black text-[#344766] dark:border-white/12 dark:bg-[#1B1E24] dark:text-white/74"
                    >
                      Clear
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-[#6b7f9e] dark:text-white/48">
                      No filters
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setAdvancedOpen(false)}
                    className="cursor-pointer h-10 rounded-[10px] bg-[#071f4d] px-6 text-xs font-black text-white transition hover:bg-[#061735]"
                  >
                    Apply filters
                  </button>
                </div>
              </div>
            ) : null}
          </form>


              </div>

        </div>

      {advancedOpen ? (
        <MobileAdvancedSearchPortal
          search={search}
          openAdvancedSection={openAdvancedSection}
          setOpenAdvancedSection={setOpenAdvancedSection}
          toggleAdvancedOption={toggleAdvancedOption}
          clearAdvancedOptions={clearAdvancedOptions}
          onClose={() => setAdvancedOpen(false)}
        />
      ) : null}
      </section>
    </>
  );
}
