
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  LocateFixed,
  Star,
  TrendingUp,
  ArrowUpRight,
  LoaderCircle,
  UtensilsCrossed,
} from "lucide-react";

type Restaurant = {
  id: string;
  name: string;
  slug: string;
  location: string;
  category: string | null;
  heroImageUrl: string | null;
  logoUrl: string | null;
  avgRating: number;
  reviewCount: number;
  isFeatured: boolean;
  lat: number | null;
  lng: number | null;
  recentReviewCount: number;
};

type Props = {
  restaurants: Restaurant[];
  areas: string[];
};

type Tab = "nearby" | "top" | "trending";

type VisitorLocation = {
  lat: number;
  lng: number;
};

function distanceKm(a: VisitorLocation, b: VisitorLocation) {
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const value =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) *
      Math.cos(toRad(b.lat)) *
      Math.sin(dLng / 2) ** 2;

  return (
    6371 *
    2 *
    Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))
  );
}

function getArea(location: string) {
  return location.split(",")[0]?.trim().toLowerCase() || "";
}

function RestaurantImage({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const [failed, setFailed] = useState(false);
  const src = restaurant.heroImageUrl || restaurant.logoUrl;

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400">
        <UtensilsCrossed size={34} strokeWidth={1.2} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={restaurant.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

export default function RestaurantDiscovery({
  restaurants,
  areas,
}: Props) {
  const [tab, setTab] = useState<Tab>("nearby");
  const [visitorLocation, setVisitorLocation] =
    useState<VisitorLocation | null>(null);
  const [locationRequested, setLocationRequested] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [selectedArea, setSelectedArea] = useState(areas[0] || "Colombo");

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Location is not supported by this browser.");
      setLocationRequested(true);
      return;
    }

    setLocationRequested(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setVisitorLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError("");
      },
      (error) => {
        setVisitorLocation(null);

        setLocationError(
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied. Choose an area instead."
            : error.code === error.TIMEOUT
              ? "Getting your location took too long. Choose an area or try again."
              : "Your location is unavailable. Choose an area or try again."
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  useEffect(() => {
    if (tab === "nearby" && !locationRequested) {
      requestLocation();
    }
  }, [tab, locationRequested, requestLocation]);

  const visibleRestaurants = useMemo(() => {
    const approved = [...restaurants];

    if (tab === "nearby" && visitorLocation) {
      return approved
        .filter((r) => r.lat != null && r.lng != null)
        .map((r) => ({
          ...r,
          distance: distanceKm(visitorLocation, {
            lat: r.lat!,
            lng: r.lng!,
          }),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 6);
    }

    if (tab === "nearby") {
      return approved
        .filter((r) => getArea(r.location) === selectedArea.toLowerCase())
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 6);
    }

    if (tab === "top") {
      return approved
        .filter((r) => r.reviewCount > 0)
        .sort((a, b) => {
          const scoreA =
            (a.avgRating * a.reviewCount + 4 * 3) /
            (a.reviewCount + 3);
          const scoreB =
            (b.avgRating * b.reviewCount + 4 * 3) /
            (b.reviewCount + 3);

          return scoreB - scoreA || b.reviewCount - a.reviewCount;
        })
        .slice(0, 6);
    }

    return approved
      .filter((r) => r.recentReviewCount > 0)
      .sort(
        (a, b) =>
          b.recentReviewCount - a.recentReviewCount ||
          b.avgRating - a.avgRating
      )
      .slice(0, 6);
  }, [restaurants, tab, visitorLocation, selectedArea]);

  const tabs: {
    id: Tab;
    label: string;
    icon: typeof MapPin;
  }[] = [
    { id: "nearby", label: "Near me", icon: MapPin },
    { id: "top", label: "Top rated", icon: Star },
    { id: "trending", label: "Trending", icon: TrendingUp },
  ];

  return (
    <section
      id="trending"
      className="bg-light py-[88px] max-sm:py-[56px]"
    >
      <div className="mx-auto max-w-[1240px] px-[32px] max-lg:px-[20px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-ink/50">
              Discover local favourites
            </p>
            <h2 className="max-w-[17ch] font-display text-[clamp(2rem,3.5vw,3.2rem)] font-bold leading-[0.98] tracking-[-0.035em]">
              Great restaurants, closer to you.
            </h2>
            <p className="mt-3 max-w-[48ch] text-base text-ink/60">
              Explore nearby spots, trusted favourites, and places
              everyone is talking about.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-bold transition-all hover:gap-3"
          >
            Explore all restaurants
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="tablist">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  tab === id
                    ? "border-black bg-black text-white shadow-lg shadow-black/10"
                    : "border-black/10 bg-white text-ink/70 hover:border-black/40 hover:text-black"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {tab === "nearby" && (
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="restaurant-area" className="text-xs text-ink/60">
                {visitorLocation ? "GPS active" : "Choose area"}
              </label>

              <select
                id="restaurant-area"
                value={selectedArea}
                onChange={(e) => {
                  setSelectedArea(e.target.value);
                  setVisitorLocation(null);
                  setLocationError("");
                }}
                className="max-w-[190px] rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-black"
              >
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={requestLocation}
                aria-label="Use my current location"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-black hover:text-white"
              >
                <LocateFixed size={17} />
              </button>
            </div>
          )}
        </div>

        {tab === "nearby" && locationError && (
          <p className="mb-5 text-sm text-neutral-500" role="status">
            {locationError}
          </p>
        )}

        {tab === "nearby" && !visitorLocation && !locationRequested && (
          <p className="mb-5 text-sm text-neutral-500">
            Allow location access to find the closest restaurants.
          </p>
        )}

        {tab === "nearby" && visitorLocation && (
          <p className="mb-5 text-sm text-neutral-500">
            Sorted by distance from your current location.
          </p>
        )}

        {tab === "nearby" &&
          locationRequested &&
          !visitorLocation &&
          !locationError && (
            <div className="mb-5 flex items-center gap-2 text-sm text-neutral-500">
              <LoaderCircle size={16} className="animate-spin" />
              Getting your location...
            </div>
          )}

        {visibleRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleRestaurants.map((restaurant) => {
              const distance =
                "distance" in restaurant
                  ? restaurant.distance
                  : null;

              return (
                <Link
                  key={restaurant.id}
                  href={`/restaurant/${restaurant.slug}`}
                  className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl hover:shadow-black/[0.06]"
                >
                  <div className="relative h-[220px] overflow-hidden bg-neutral-100">
                    <RestaurantImage restaurant={restaurant} />

                    {restaurant.isFeatured && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
                        Featured
                      </span>
                    )}

                    {"distance" in restaurant &&
                    typeof restaurant.distance === "number" && (
                      <span>
                        {restaurant.distance < 1
                          ? `${Math.round(restaurant.distance * 1000)} m away`
                          : `${restaurant.distance.toFixed(1)} km away`}
                      </span>
                    )}

                    <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-xl font-bold tracking-tight text-black">
                          {restaurant.name}
                        </h3>
                        <p className="mt-1 truncate text-sm text-neutral-500">
                          {restaurant.category || "Restaurant"}
                          {" · "}
                          {restaurant.location}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1.5 text-sm font-bold text-black">
                        <Star size={13} fill="currentColor" />
                        {restaurant.reviewCount > 0
                          ? restaurant.avgRating.toFixed(1)
                          : "New"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-black/[0.07] pt-4 text-xs text-neutral-500">
                      <span>
                        {restaurant.reviewCount}{" "}
                        {restaurant.reviewCount === 1 ? "review" : "reviews"}
                      </span>
                      <span className="font-semibold text-black transition-all group-hover:translate-x-1">
                        View restaurant →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-16 text-center">
            <UtensilsCrossed
              size={32}
              strokeWidth={1.3}
              className="mx-auto mb-4 text-neutral-400"
            />
            <h3 className="text-lg font-bold text-black">
              {tab === "nearby"
                ? "No nearby restaurants found"
                : tab === "top"
                  ? "No rated restaurants yet"
                  : "Nothing trending just yet"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
              {tab === "nearby"
                ? "Try another area or choose your current location to discover available restaurants."
                : "As more restaurants and customer reviews arrive, they will appear here."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
