"use client";

import Image from "next/image";
import { ArrowLeft, Heart, Maximize2, Share2 } from "lucide-react";
import { useRef, useState } from "react";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export function PropertyGallery({
  images,
  title,
}: PropertyGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  function handleScroll() {
    const scroller = scrollerRef.current;

    if (!scroller || scroller.clientWidth === 0) {
      return;
    }

    const index = Math.round(
      scroller.scrollLeft / scroller.clientWidth
    );

    setActiveImage(
      Math.max(0, Math.min(index, images.length - 1))
    );
  }

  return (
    <section className="relative -mx-4 mt-3 sm:-mx-6 sm:mt-4 lg:mx-0 lg:mt-5">
      {/* Mobile / tablet: smooth swipe gallery */}
      <div className="relative overflow-hidden lg:hidden">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative h-[260px] w-full shrink-0 snap-center snap-always overflow-hidden bg-[var(--surface-soft)] min-[390px]:h-[290px] sm:h-[420px] md:h-[480px]"
            >
              <Image
                src={image}
                alt={`${title} photo ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 pt-3">
          <a
            href="/search"
            aria-label="Back to search"
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#08285F] shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          >
            <ArrowLeft size={19} />
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Share property"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#08285F] shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              <Share2 size={18} />
            </button>

            <button
              type="button"
              aria-label="Save property"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#08285F] shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center">
          <div className="flex items-center gap-1.5 rounded-full bg-black/25 px-2 py-1.5 backdrop-blur-sm">
            {images.map((_, index) => (
              <span
                key={index}
                className={`block rounded-full transition-all duration-200 ${
                  activeImage === index
                    ? "h-1.5 w-4 bg-white"
                    : "h-1.5 w-1.5 bg-white/55"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
      {/* Desktop: 1 large + 4 supporting images */}
      <div className="relative hidden overflow-hidden rounded-[8px] lg:block">
        <div className="grid h-[clamp(400px,43vh,455px)] grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] grid-rows-2 gap-1 bg-[var(--background)]">
          <div className="relative col-span-1 row-span-2 overflow-hidden rounded-[8px] bg-[var(--surface-soft)]">
            <Image
              src={images[0]}
              alt={title}
              fill
              priority
              sizes="(min-width: 1320px) 640px, 50vw"
              className="object-cover"
            />
          </div>

          {images.slice(1, 5).map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative overflow-hidden rounded-[8px] bg-[var(--surface-soft)]"
            >
              <Image
                src={image}
                alt={`${title} photo ${index + 2}`}
                fill
                sizes="(min-width: 1320px) 320px, 25vw"
                className="object-cover transition duration-500 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="absolute bottom-4 right-4 inline-flex h-10 items-center gap-2 rounded-[7px] border border-white/35 bg-white/96 px-3.5 text-xs font-bold text-[#08285F] shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-200 hover:bg-white"
        >
          <Maximize2 size={15} />
          View all {images.length} photos
        </button>
      </div>
    </section>
  );
}
