"use client";

import { memo, useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiSearch,
  FiStar,
} from "react-icons/fi";
import { mLogo } from "@/assets";
import { Button, DownloadAppButton, Section } from "@/components";
import {
  useChefsStores,
  type ChefStore,
  type ChefStoreImage,
} from "@/features";
import { ROUTES } from "@/shared/seo";
import { isRemoteImageUrl } from "@/shared/lib";
import { getFeaturedKitchenById } from "@/app/home/data/featured-kitchens";
import { demoStoreCard } from "@/app/kitchens/demo-store";
import { SHOW_LIVE_KITCHENS } from "@/shared/data/kitchens-launch";
import KitchenFilters, {
  ALL_CUISINES,
  DEFAULT_KITCHEN_FILTERS,
  type KitchenFiltersState,
} from "./KitchenFilters";

const ITEMS_PER_PAGE = 12;
const HEADER_SCROLL_OFFSET = 96;
const MAX_CUISINE_CHIPS = 10;
const COVER_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

const DIET_TAGS = new Set(["veg", "non-veg", "nonveg", "non veg", "pure veg"]);

function storeDetailHref(storeId: string) {
  return `${ROUTES.kitchens}/${encodeURIComponent(storeId)}`;
}

function isVegStore(store: ChefStore) {
  const blob = store.categories.join(" ").toLowerCase();
  return !(
    blob.includes("non-veg") ||
    blob.includes("nonveg") ||
    blob.includes("non veg")
  );
}

/** Short place label for the card (e.g. "Sector 17" from a longer address). */
function storeAreaLabel(address: string): string {
  const first = address.trim().split(",")[0]?.trim() ?? "";
  return first.length > 24 ? `${first.slice(0, 22)}…` : first;
}

function cleanCategories(store: ChefStore): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of store.categories) {
    const c = raw.trim();
    const key = c.toLowerCase();
    if (!c || DIET_TAGS.has(key) || seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}

type CardContent = {
  cookName?: string;
  rating?: number;
  area: string;
  tags: string[];
};

function buildCardContent(store: ChefStore): CardContent {
  const featured = getFeaturedKitchenById(store.storeId);
  const tags = cleanCategories(store);
  return {
    cookName: featured?.cookName ?? store.storeOwnerName,
    rating: featured?.rating ?? store.overallRating,
    area: storeAreaLabel(featured?.area || store.address),
    tags: tags.length ? tags : (featured?.tags ?? []),
  };
}

function storeMatchesFilters(
  store: ChefStore,
  filters: KitchenFiltersState,
): boolean {
  const cats = store.categories.map((c) => c.toLowerCase().trim());

  if (
    filters.cuisine !== ALL_CUISINES &&
    !cats.includes(filters.cuisine.toLowerCase())
  )
    return false;

  const veg = isVegStore(store);
  if (filters.diet === "veg" && !veg) return false;
  if (filters.diet === "nonveg" && veg) return false;

  const q = filters.query.trim().toLowerCase();
  if (q) {
    const hay = [
      store.storeName,
      store.storeOwnerName ?? "",
      store.address,
      ...store.categories,
    ]
      .join(" ")
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function StoreImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: ChefStoreImage;
  alt: string;
  sizes: string;
  className: string;
}) {
  const remote = typeof src === "string" && isRemoteImageUrl(src);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      unoptimized={remote}
    />
  );
}

function initials(name: string) {
  return name
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Cover: her photo when she has one; otherwise a branded panel with her logo (never a stretched logo). */
function CardCover({ store }: { store: ChefStore }) {
  if (store.coverImageUrl) {
    return (
      <StoreImage
        src={store.coverImageUrl}
        alt=""
        sizes={COVER_SIZES}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#FBE3DA,transparent_60%),radial-gradient(circle_at_80%_90%,#FFF0C7,transparent_55%)] bg-paper">
      <span className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_-12px_rgba(42,31,24,0.35)] transition-transform duration-500 group-hover:scale-105">
        {store.logoUrl ? (
          <StoreImage
            src={store.logoUrl}
            alt=""
            sizes="80px"
            className="object-contain p-2"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-jakarta text-[24px] font-extrabold text-customer">
            {initials(store.storeName) || "MB"}
          </span>
        )}
      </span>
    </div>
  );
}

const StoreCard = memo(function StoreCard({
  store,
  example = false,
}: {
  store: ChefStore;
  /** The example store: labelled "Example store" instead of "Verified". */
  example?: boolean;
}) {
  const content = buildCardContent(store);
  const veg = isVegStore(store);

  return (
    <Link
      href={storeDetailHref(store.storeId)}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white no-underline shadow-[0_2px_10px_-4px_rgba(42,31,24,0.08)] outline-none transition-all duration-300 hover:-translate-y-1 hover:border-ink/[0.12] hover:shadow-[0_22px_44px_-22px_rgba(42,31,24,0.35)] focus-visible:ring-2 focus-visible:ring-customer/50 focus-visible:ring-offset-2"
      aria-label={`${store.storeName}${content.cookName ? `, by ${content.cookName}` : ""}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <CardCover store={store} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 py-1 pl-1 pr-2.5 text-[11px] font-bold text-verified-text shadow-sm backdrop-blur">
          <span className="relative flex h-[18px] w-[18px] items-center justify-center overflow-hidden rounded-full bg-verified-pill">
            <Image
              src={mLogo}
              alt=""
              width={12}
              height={12}
              className="h-3 w-3 object-contain"
            />
          </span>
          {example ? "Example store" : "Verified"}
        </span>
        {content.rating != null && content.rating > 0 ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-bold text-ink shadow-sm backdrop-blur">
            <FiStar
              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
              aria-hidden
            />
            {content.rating.toFixed(1)}
          </span>
        ) : null}
      </div>

      <div
        className={clsx(
          "relative flex flex-1 flex-col px-5 pb-5",
          store.coverImageUrl ? "pt-9" : "pt-5",
        )}
      >
        {store.coverImageUrl ? (
          <span className="absolute -top-7 left-5 h-14 w-14 overflow-hidden rounded-2xl border-[3px] border-white bg-paper shadow-[0_8px_18px_-8px_rgba(42,31,24,0.4)]">
            {store.logoUrl || store.coverImageUrl ? (
              <StoreImage
                src={store.logoUrl || store.coverImageUrl}
                alt=""
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-jakarta text-[16px] font-extrabold text-customer">
                {initials(store.storeName) || "MB"}
              </span>
            )}
          </span>
        ) : null}

        <div className="flex items-start justify-between gap-3">
          <h3 className="m-0 line-clamp-1 font-jakarta text-[17px] font-bold tracking-tight text-ink">
            {store.storeName}
          </h3>
          <span
            title={veg ? "Pure veg" : "Serves non-veg"}
            className={clsx(
              "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border-[1.5px]",
              veg ? "border-verified" : "border-partner",
            )}
          >
            <span
              className={clsx(
                "h-2 w-2 rounded-full",
                veg ? "bg-verified" : "bg-partner",
              )}
            />
            <span className="sr-only">
              {veg ? "Pure veg" : "Serves non-veg"}
            </span>
          </span>
        </div>

        <p className="m-0 mt-1 flex min-w-0 items-center gap-1.5 text-[13px] text-ink/55">
          {content.cookName ? (
            <span className="truncate font-medium text-ink/70">
              by {content.cookName}
            </span>
          ) : null}
          {content.cookName && content.area ? (
            <span aria-hidden className="text-ink/25">
              ·
            </span>
          ) : null}
          {content.area ? (
            <span className="inline-flex min-w-0 items-center gap-1">
              <FiMapPin className="h-3 w-3 shrink-0 text-ink/35" aria-hidden />
              <span className="truncate">{content.area}</span>
            </span>
          ) : null}
        </p>

        {content.tags.length ? (
          <ul className="m-0 mt-3.5 flex list-none flex-wrap gap-1.5 p-0">
            {content.tags.slice(0, 3).map((t) => (
              <li
                key={t}
                className="rounded-full bg-paper px-2.5 py-1 text-[11.5px] font-semibold text-ink/65"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-4" />
        <div className="flex items-center justify-between border-t border-ink/[0.06] pt-4">
          <span className="text-[12.5px] font-medium text-ink/45">
            See her menu
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-customer">
            View store
            <FiArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
});

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white">
      <div className="aspect-[16/10] animate-pulse bg-stone-100" />
      <div className="space-y-3 px-5 pb-5 pt-9">
        <div className="h-4 w-2/3 animate-pulse rounded bg-stone-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-stone-100" />
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-stone-100" />
      </div>
    </div>
  );
}

function OpenYourStoreBand() {
  return (
    <div className="mt-14 flex flex-col items-start gap-5 rounded-[26px] bg-mb-ink-panel px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
      <div>
        <p className="m-0 font-hand text-[22px] text-yellow">
          Do you cook at home?
        </p>
        <p className="m-0 mt-1 font-jakarta text-[22px] font-bold tracking-tight sm:text-[26px]">
          Open your own store on Mother Bhojan.
        </p>
        <p className="m-0 mt-1.5 text-[14.5px] text-white/65">
          Your name on the door, your menu, your prices.
        </p>
      </div>
      <DownloadAppButton
        source="kitchens-list-band"
        openLabel="Open the app"
        variant="customer"
        size="md"
        className="shrink-0 px-6"
      >
        Open your kitchen
      </DownloadAppButton>
    </div>
  );
}

/** Shown instead of the kitchen list while real kitchens are hidden (SHOW_LIVE_KITCHENS = false). */
function ComingSoonKitchens() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <StoreCard store={demoStoreCard} example />
      <div className="relative flex flex-col justify-center overflow-hidden rounded-[22px] border border-dashed border-ink/15 bg-white px-7 py-10 sm:px-10 lg:col-span-2">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,#FFF0C7,transparent_70%)]"
        />
        <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-verified-pill px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider text-verified-text">
          <span className="h-1.5 w-1.5 rounded-full bg-verified" aria-hidden />
          Coming soon · Mohali
        </span>
        <p className="relative m-0 mt-4 font-hand text-[22px] text-customer">
          Kitchens opening soon
        </p>
        <h3 className="relative m-0 mt-1 font-jakarta text-[22px] font-bold tracking-tight text-ink sm:text-[26px]">
          Our first home kitchens are being verified.
        </h3>
        <p className="relative m-0 mt-2 max-w-lg text-[14.5px] leading-relaxed text-ink/60">
          Every cook is visited in person and her kitchen checked before her
          store opens. Until then, take a look at an example store — and get
          the app to hear the day kitchens near you go live.
        </p>
        <div className="relative mt-6 flex flex-wrap items-center gap-3">
          <DownloadAppButton
            source="kitchens-coming-soon"
            openLabel="Open the app"
            variant="customer"
            size="md"
            className="px-6"
          >
            Get notified
          </DownloadAppButton>
          <Link
            href={storeDetailHref(demoStoreCard.storeId)}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-customer no-underline hover:underline"
          >
            See the example store
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

type StoresSectionProps = {
  initialStores?: ChefStore[];
  filters?: KitchenFiltersState;
  onFiltersChange?: (next: KitchenFiltersState) => void;
};

const StoresSection = ({
  initialStores = [],
  filters = DEFAULT_KITCHEN_FILTERS,
  onFiltersChange,
}: StoresSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { stores, loading, error, refetch } = useChefsStores(initialStores);
  const filterKey = `${filters.query}|${filters.cuisine}|${filters.diet}`;
  const [pageByFilter, setPageByFilter] = useState<Record<string, number>>({});
  const page = pageByFilter[filterKey] ?? 1;

  /** Cuisine chips from the kitchens' real categories, most common first. */
  const cuisines = useMemo(() => {
    const counts = new Map<string, { label: string; n: number }>();
    for (const s of stores) {
      for (const c of cleanCategories(s)) {
        const key = c.toLowerCase();
        const cur = counts.get(key);
        counts.set(key, { label: cur?.label ?? c, n: (cur?.n ?? 0) + 1 });
      }
    }
    return [...counts.values()]
      .sort((a, b) => b.n - a.n || a.label.localeCompare(b.label))
      .slice(0, MAX_CUISINE_CHIPS)
      .map((c) => c.label);
  }, [stores]);

  const filteredStores = useMemo(
    () => stores.filter((s) => storeMatchesFilters(s, filters)),
    [stores, filters],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStores.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const pageStores = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStores.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredStores]);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage === currentPage) return;
      setPageByFilter((prev) => ({ ...prev, [filterKey]: nextPage }));
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const top =
          el.getBoundingClientRect().top +
          window.scrollY -
          HEADER_SCROLL_OFFSET;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    },
    [currentPage, filterKey],
  );

  const hasActiveFilters =
    filters.query.trim() !== "" ||
    filters.cuisine !== ALL_CUISINES ||
    filters.diet !== "all";

  if (!SHOW_LIVE_KITCHENS) {
    return (
      <div ref={sectionRef}>
        <Section className="bg-paper" flushTop innerClassName="pb-16 md:pb-20">
          <ComingSoonKitchens />
          <OpenYourStoreBand />
        </Section>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      <Section className="bg-paper" flushTop innerClassName="pb-16 md:pb-20">
        {onFiltersChange ? (
          <KitchenFilters
            filters={filters}
            onChange={onFiltersChange}
            cuisines={cuisines}
            resultCount={filteredStores.length}
            className="mb-8"
          />
        ) : null}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[22px] border border-ink/[0.07] bg-white py-16 text-center">
            <p className="text-[15px] font-semibold text-ink">
              We couldn&apos;t load the kitchens just now.
            </p>
            <p className="mt-1 text-[13.5px] text-ink/55">
              Please check your connection and try again.
            </p>
            <Button
              type="button"
              onClick={() => void refetch()}
              variant="customerOutline"
              size="sm"
              className="mt-5"
            >
              Try again
            </Button>
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="rounded-[22px] border border-dashed border-ink/15 bg-white px-6 py-16 text-center">
            <span
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink/40"
              aria-hidden
            >
              <FiSearch className="h-6 w-6" />
            </span>
            <p className="mt-4 font-jakarta text-[17px] font-bold text-ink">
              {stores.length === 0
                ? "New kitchens are opening soon"
                : "No kitchens match that"}
            </p>
            <p className="mx-auto mt-1 max-w-sm text-[14px] text-ink/55">
              {stores.length === 0
                ? "Check back in a little while to see who is cooking near you."
                : "Try another cuisine, or clear the filters to see every kitchen."}
            </p>
            {hasActiveFilters && onFiltersChange ? (
              <Button
                type="button"
                onClick={() => onFiltersChange(DEFAULT_KITCHEN_FILTERS)}
                variant="customerOutline"
                size="sm"
                className="mt-5"
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageStores.map((store) => (
                <StoreCard key={store.storeId} store={store} />
              ))}
            </div>

            {totalPages > 1 ? (
              <nav
                className="mt-10 flex items-center justify-center gap-2 text-sm"
                aria-label="Pages"
              >
                <Button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  variant="none"
                  size="sm"
                  className="h-10 w-10 rounded-full border border-ink/10 bg-white p-0 text-ink/60 disabled:opacity-40"
                >
                  <FiChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <Button
                      key={n}
                      type="button"
                      onClick={() => handlePageChange(n)}
                      aria-current={n === currentPage ? "page" : undefined}
                      variant="none"
                      size="sm"
                      className={clsx(
                        "h-10 w-10 rounded-full p-0 text-[13px] font-semibold",
                        n === currentPage
                          ? "bg-ink text-white"
                          : "text-ink/60 hover:bg-ink/5",
                      )}
                    >
                      {n}
                    </Button>
                  ),
                )}
                <Button
                  type="button"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  variant="none"
                  size="sm"
                  className="h-10 w-10 rounded-full border border-ink/10 bg-white p-0 text-ink/60 disabled:opacity-40"
                >
                  <FiChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            ) : null}
          </>
        )}

        <OpenYourStoreBand />
      </Section>
    </div>
  );
};

export default StoresSection;
