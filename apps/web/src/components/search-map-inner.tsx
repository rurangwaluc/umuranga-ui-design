"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { SearchArea, SearchMapListing } from "./search-map";

const kigaliSearchBoundary: [number, number][] = [
  [-1.9192, 30.0258],
  [-1.9098, 30.0814],
  [-1.9254, 30.1417],
  [-1.9618, 30.1534],
  [-1.9896, 30.1218],
  [-1.9822, 30.0624],
  [-1.9584, 30.0196],
];

function FitListings({ listings }: { listings: SearchMapListing[] }) {
  const map = useMap();

  useEffect(() => {
    if (listings.length === 0) return;

    const bounds = L.latLngBounds(
      listings.map((item) => [item.lat, item.lng])
    );

    map.fitBounds(bounds, {
      padding: [54, 54],
      maxZoom: 14,
    });
  }, [listings, map]);

  return null;
}

function DrawAreaEvents({
  active,
  onAddPoint,
}: {
  active: boolean;
  onAddPoint: (point: [number, number]) => void;
}) {
  const map = useMapEvents({
    click(event) {
      if (!active) return;

      onAddPoint([event.latlng.lat, event.latlng.lng]);
    },
  });

  useEffect(() => {
    if (!active) {
      return;
    }

    const draggingWasEnabled = map.dragging.enabled();
    const doubleClickZoomWasEnabled = map.doubleClickZoom.enabled();

    map.dragging.disable();
    map.doubleClickZoom.disable();

    return () => {
      if (draggingWasEnabled) {
        map.dragging.enable();
      }

      if (doubleClickZoomWasEnabled) {
        map.doubleClickZoom.enable();
      }
    };
  }, [active, map]);

  return null;
}

function createPropertyIcon(label: string, active: boolean) {
  return L.divIcon({
    className: "",
    html: active
      ? `
        <div class="umuranga-map-marker umuranga-map-marker-active">
          ${label}
          <span class="umuranga-map-marker-tail"></span>
        </div>
      `
      : `
        <div class="umuranga-map-marker-dot">
          <span></span>
        </div>
      `,
    iconSize: active ? [78, 36] : [22, 22],
    iconAnchor: active ? [39, 36] : [11, 11],
    popupAnchor: active ? [0, -36] : [0, -16],
  });
}

function shortPrice(price: string) {
  const amount = Number(price.replace(/[^0-9]/g, ""));

  if (!Number.isFinite(amount) || amount <= 0) {
    return price.replace("RWF ", "");
  }

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `RWF ${
      millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)
    }M`;
  }

  if (amount >= 1_000) {
    return `RWF ${Math.round(amount / 1_000)}K`;
  }

  return `RWF ${amount}`;
}

function MarkerWithPopup({
  item,
  active,
  onSelect,
}: {
  item: SearchMapListing;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  const markerRef = useRef<L.Marker | null>(null);

  const icon = useMemo(
    () => createPropertyIcon(shortPrice(item.price), active),
    [active, item.price]
  );

  return (
    <Marker
      ref={markerRef}
      position={[item.lat, item.lng]}
      icon={icon}
      zIndexOffset={active ? 1000 : 0}
      eventHandlers={{
        mouseover: () => {
          onSelect(item.slug);
        },
        click: () => {
          onSelect(item.slug);
          markerRef.current?.openPopup();
        },
      }}
    >
      <Popup closeButton={false} autoPan>
        <Link
          href={`/property/${item.slug}`}
          className="block bg-[var(--surface)] text-[var(--foreground)]"
        >
          <div className="relative h-[104px] bg-[var(--surface-soft)]">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
            />

            <span className="absolute left-3 top-3 rounded-md bg-white/94 px-2.5 py-1 text-[11px] font-black text-[#1A1A16]">
              {item.tag}
            </span>

            {item.verified ? (
              <span className="absolute right-3 top-3 rounded-md border border-white/15 bg-[#071F4D] px-2.5 py-1 text-[10px] font-black text-white shadow-[0_8px_20px_rgba(7,31,77,0.24)]">
                Verified
              </span>
            ) : null}
          </div>

          <div className="p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[15px] font-black tracking-[-0.025em] text-[var(--foreground)]">
                  {item.price}
                </p>

                <h3 className="mt-1 truncate text-sm font-black text-[var(--foreground)]">
                  {item.title}
                </h3>
              </div>
            </div>

            <p className="mt-2 text-xs font-bold text-[var(--muted)]">
              {item.location}
            </p>

            <div className="mt-3 flex items-center gap-3 border-t border-[var(--border)] pt-3 text-xs font-bold text-[var(--muted)]">
              <span>{item.beds}</span>
              <span>{item.baths}</span>
              <span>{item.type}</span>
            </div>
          </div>
        </Link>
      </Popup>
    </Marker>
  );
}

export default function SearchMapInner({
  listings,
  area,
  onAreaChange,
}: {
  listings: SearchMapListing[];
  area?: SearchArea | null;
  onAreaChange?: (area: SearchArea | null) => void;
}) {
  const center: [number, number] = [-1.9441, 30.0619];

  const [selectedSlug, setSelectedSlug] = useState(
    listings[0]?.slug ?? ""
  );

  const [drawing, setDrawing] = useState(false);
  const [draftArea, setDraftArea] = useState<SearchArea>([]);

  function beginDrawing() {
    setDraftArea([]);
    setDrawing(true);
  }

  function cancelDrawing() {
    setDraftArea([]);
    setDrawing(false);
  }

  function finishDrawing() {
    if (draftArea.length < 3) return;

    onAreaChange?.(draftArea);
    setDraftArea([]);
    setDrawing(false);
  }

  function clearArea() {
    setDraftArea([]);
    setDrawing(false);
    onAreaChange?.(null);
  }

  return (
    <div
      className={[
        "relative h-full min-h-full w-full overflow-hidden bg-[var(--surface-soft)]",
        drawing ? "umuranga-map-drawing" : "",
      ].join(" ")}
    >
      <div className="absolute right-3 top-3 z-[600]">
        {!drawing ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={beginDrawing}
              className="inline-flex h-11 items-center justify-center rounded-[8px] border border-[#08285F] bg-[#08285F] px-4 text-xs font-bold text-white shadow-[inset_0_-2px_0_#D7B16F,0_10px_28px_rgba(7,31,77,0.24)] transition duration-200 hover:bg-[#0A326F]"
            >
              {area ? "Redraw area" : "Draw area"}
            </button>

            {area ? (
              <button
                type="button"
                onClick={clearArea}
                className="inline-flex h-11 items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--card)] px-3.5 text-xs font-bold text-[var(--foreground)] shadow-[0_10px_28px_rgba(7,21,47,0.16)] transition duration-200 hover:border-[#D7B16F]/70"
              >
                Clear
              </button>
            ) : null}
          </div>
        ) : (
          <div className="w-[min(238px,calc(100vw-24px))] rounded-[10px] border border-[var(--line)] bg-[var(--card)] p-3.5 text-[var(--foreground)] shadow-[0_18px_48px_rgba(7,21,47,0.24)]">
            <p className="text-xs font-bold">
              Draw your search area
            </p>

            <p className="mt-1.5 text-[11px] font-medium leading-4 text-[var(--muted)]">
              Tap at least 3 points around the area you want to search.
            </p>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={finishDrawing}
                disabled={draftArea.length < 3}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-[7px] bg-[#08285F] px-3 text-xs font-bold text-white shadow-[inset_0_-2px_0_#D7B16F] transition disabled:cursor-not-allowed disabled:opacity-35"
              >
                Finish area
              </button>

              <button
                type="button"
                onClick={cancelDrawing}
                className="inline-flex h-11 items-center justify-center rounded-[7px] border border-[var(--line)] bg-[var(--card)] px-3 text-xs font-bold text-[var(--foreground)] transition hover:border-[#D7B16F]/70"
              >
                Cancel
              </button>
            </div>

            <p className="mt-2.5 text-[10px] font-semibold text-[var(--muted)]">
              {draftArea.length < 3
                ? `${draftArea.length} of at least 3 points`
                : `${draftArea.length} points / ready to finish`}
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .leaflet-container {
          height: 100% !important;
          min-height: calc(100vh - 73px) !important;
          width: 100%;
          background: var(--surface-soft);
          font-family: inherit;
        }

        .umuranga-map-drawing .leaflet-container,
        .umuranga-map-drawing .leaflet-container * {
          cursor: crosshair !important;
        }

        .leaflet-control-attribution {
          font-size: 10px;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 14px;
          background: var(--surface);
          color: var(--foreground);
          border: 1px solid var(--border);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.24);
          overflow: hidden;
          padding: 0;
        }

        .leaflet-popup-content {
          margin: 0;
          width: 238px !important;
        }

        .leaflet-popup-tip {
          background: var(--surface);
          border: 1px solid var(--border);
        }

        .umuranga-map-marker-dot {
          position: relative;
          display: grid;
          width: 22px;
          height: 22px;
          place-items: center;
          border-radius: 999px;
          border: 2px solid rgba(255, 255, 255, 0.96);
          background: #071f4d;
          box-shadow:
            0 8px 20px rgba(7, 31, 77, 0.24),
            0 0 0 3px rgba(7, 31, 77, 0.12);
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .umuranga-map-marker-dot span {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #ffffff;
          opacity: 0.92;
        }

        .leaflet-marker-icon:hover .umuranga-map-marker-dot {
          transform: scale(1.18);
          box-shadow:
            0 12px 26px rgba(7, 31, 77, 0.3),
            0 0 0 5px rgba(7, 31, 77, 0.14);
        }

        .umuranga-map-marker-active {
          position: relative;
          display: inline-flex;
          min-width: 78px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: #071f4d;
          color: #ffffff;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: -0.02em;
          line-height: 1;
          box-shadow:
            0 16px 36px rgba(7, 31, 77, 0.34),
            0 0 0 4px rgba(7, 31, 77, 0.12);
          transition:
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .umuranga-map-marker-tail {
          position: absolute;
          left: 50%;
          top: 100%;
          width: 10px;
          height: 10px;
          transform: translate(-50%, -5px) rotate(45deg);
          border-right: 1px solid rgba(255, 255, 255, 0.18);
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          background: #071f4d;
        }

        .leaflet-marker-icon:hover .umuranga-map-marker-active {
          transform: translateY(-2px);
          box-shadow:
            0 20px 44px rgba(7, 31, 77, 0.42),
            0 0 0 5px rgba(7, 31, 77, 0.14);
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        className="h-full min-h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon
          positions={kigaliSearchBoundary}
          pathOptions={{
            color: "#071F4D",
            weight: 2,
            opacity: 0.92,
            fillColor: "#071F4D",
            fillOpacity: 0.08,
          }}
        />

        <FitListings listings={listings} />

        <DrawAreaEvents
          active={drawing}
          onAddPoint={(point) =>
            setDraftArea((current) => [...current, point])
          }
        />

        {area && area.length >= 3 ? (
          <Polygon
            positions={area}
            pathOptions={{
              color: "#D7B16F",
              weight: 3,
              opacity: 1,
              fillColor: "#08285F",
              fillOpacity: 0.14,
            }}
          />
        ) : null}

        {draftArea.length >= 2 ? (
          <Polyline
            positions={draftArea}
            pathOptions={{
              color: "#D7B16F",
              weight: 3,
              opacity: 1,
              dashArray: "7 6",
            }}
          />
        ) : null}

        {draftArea.length >= 3 ? (
          <Polygon
            positions={draftArea}
            pathOptions={{
              color: "#D7B16F",
              weight: 2,
              opacity: 0.7,
              fillColor: "#D7B16F",
              fillOpacity: 0.1,
              dashArray: "7 6",
            }}
          />
        ) : null}

        {draftArea.map((point, index) => (
          <CircleMarker
            key={`${point[0]}-${point[1]}-${index}`}
            center={point}
            radius={5}
            pathOptions={{
              color: "#FFFFFF",
              weight: 2,
              fillColor: "#D7B16F",
              fillOpacity: 1,
            }}
          />
        ))}

        {listings.map((item) => (
          <MarkerWithPopup
            key={item.slug}
            item={item}
            active={item.slug === selectedSlug}
            onSelect={setSelectedSlug}
          />
        ))}
      </MapContainer>
    </div>
  );
}
