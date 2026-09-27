"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Bath,
  BedDouble,
  Car,
  Expand,
  MapPin,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { KeyboardEvent, MouseEvent, useState } from "react";

export type VerifiedPropertyCardItem = {
  images: string[];
  title: string;
  price: string;
  location: string;
  beds: string;
  baths: string;
  area: string;
  extra: string;
  status: string;
  type: string;
  href: string;
};

type VerifiedPropertyCardProps = {
  item: VerifiedPropertyCardItem;
};

export function VerifiedPropertyCard({ item }: VerifiedPropertyCardProps) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const imageCount = item.images.length;

  function openProperty() {
    router.push(item.href);
  }

  function openPropertyWithKeyboard(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProperty();
    }
  }

  function stopCardClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
  }

  function previousImage() {
    setActiveImage((current) => (current === 0 ? imageCount - 1 : current - 1));
  }

  function nextImage() {
    setActiveImage((current) => (current === imageCount - 1 ? 0 : current + 1));
  }

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`Open ${item.title}`}
      onClick={openProperty}
      onKeyDown={openPropertyWithKeyboard}
      className="reveal-child group cursor-pointer overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--card)] p-2.5 shadow-[0_18px_55px_rgba(7,21,47,0.06)] outline-none transition duration-300 hover:-translate-y-0.5 hover:border-[#D7B16F]/45 hover:shadow-[0_24px_70px_rgba(7,21,47,0.12)] focus-visible:ring-2 focus-visible:ring-[#D7B16F]/45 dark:shadow-none dark:hover:border-[#D7B16F]/35 dark:hover:shadow-none"
    >
      <div className="relative h-[232px] overflow-hidden rounded-[12px] bg-[var(--soft)] sm:h-[252px]">
        {item.images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`${item.title} photo ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover object-center transition-[opacity,transform] duration-500 ease-out ${
              activeImage === index
                ? "opacity-100 scale-100 group-hover:scale-[1.03]"
                : "opacity-0 scale-[1.015]"
            }`}
          />
        ))}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
          <div className="inline-flex items-center gap-1.5 rounded-[7px] border border-white/12 bg-[#08285F]/94 px-2.5 py-1.5 text-[10px] font-bold tracking-[0.01em] text-white shadow-[0_10px_26px_rgba(7,21,47,0.18)] backdrop-blur-md">
            <ShieldCheck size={12} className="text-[#B8893F]" />
            {item.status}
          </div>

          <div className="inline-flex items-center rounded-[6px] border border-[#D7B16F]/65 bg-[#F7F3EA]/96 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.045em] text-[#08285F] shadow-[0_4px_12px_rgba(7,21,47,0.07)] backdrop-blur-md">
            
              {item.type}
          </div>
        </div>

        {imageCount > 1 ? (
          <>
            <button
              type="button"
              aria-label={`Previous image for ${item.title}`}
              onClick={(event) => {
                  stopCardClick(event);
                  previousImage();
                }}
              className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-[#07152F]/62 text-white opacity-100 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-200 hover:border-[#D7B16F] hover:bg-[#D7B16F] hover:text-[#08285F] sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft size={20} strokeWidth={2.4} />
            </button>

            <button
              type="button"
              aria-label={`Next image for ${item.title}`}
              onClick={(event) => {
                  stopCardClick(event);
                  nextImage();
                }}
              className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-[#07152F]/62 text-white opacity-100 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-200 hover:border-[#D7B16F] hover:bg-[#D7B16F] hover:text-[#08285F] sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight size={20} strokeWidth={2.4} />
            </button>

          </>
        ) : null}
      </div>

      <div className="px-2.5 pb-2.5 pt-3.5">
        <div className="min-w-0">
          <h3 className="line-clamp-1 text-[0.95rem] font-black tracking-[-0.015em] text-[var(--foreground)]">
            {item.title}
          </h3>
          <p className="mt-1 inline-flex max-w-full items-center gap-1.5 truncate text-[11px] font-semibold text-[var(--muted)]">
            <MapPin size={12} />
            <span className="truncate">{item.location}</span>
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="min-w-0 text-[1.1rem] font-black tracking-[-0.035em] text-[var(--foreground)] sm:text-[1.16rem]">
            {item.price}
            <span className="ml-1 text-[11px] font-bold text-[var(--muted)]">
              /month
            </span>
          </p>

          <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-[7px] border border-[#08285F] bg-[#08285F] px-3 text-[11px] font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:-translate-y-px hover:bg-[#0A326F] dark:border-[#08285F] dark:bg-[#08285F] dark:text-white">
            View
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--line)] pt-3 text-[11px] font-bold text-[var(--muted)] sm:grid-cols-4">
          <span className="inline-flex min-w-0 items-center gap-1.5 truncate rounded-md bg-[var(--soft)] px-2 py-1.5">
            <BedDouble size={13} /> {item.beds}
          </span>
          <span className="inline-flex min-w-0 items-center gap-1.5 truncate rounded-md bg-[var(--soft)] px-2 py-1.5">
            <Bath size={13} /> {item.baths}
          </span>
          <span className="inline-flex min-w-0 items-center gap-1.5 truncate rounded-md bg-[var(--soft)] px-2 py-1.5">
            <Ruler size={13} /> {item.area}
          </span>
          <span className="inline-flex min-w-0 items-center gap-1.5 truncate rounded-md bg-[var(--soft)] px-2 py-1.5">
            {item.extra.toLowerCase().includes("parking") ? <Car size={13} /> : <Expand size={13} />}
            {item.extra}
          </span>
        </div>
      </div>
    </article>
  );
}
