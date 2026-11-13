"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiMapPin, FiStar } from "react-icons/fi";
import { mLogo, mLogoMainBlack } from "@/assets";
import { Button, Loader, RADIUS_CARD, Section } from "@/components";
import {
  useChefsStores,
  type ChefStore,
  type ChefStoreImage,
} from "@/features";
import { ROUTES } from "@/shared/seo";
import { isRemoteImageUrl } from "@/shared/lib";
import { getFeaturedKitchenById } from "@/app/home/data/featured-kitchens";
import type { KitchenFiltersState } from "./KitchenFilters";
import KitchenFilters from "./KitchenFilters";

const ITEMS_PER_PAGE = 12;
const HEADER_SCROLL_OFFSET = 96;
const COVER_SIZES = "(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw";

const DIET_TAGS = new Set(["veg", "non-veg", "nonveg", "non veg"]);
const CUISINE_TAGS = new Set([
  "north indian",
  "south indian",
  "punjabi",
  "bengali",
  "gujarati",
  "bakery",
  "healthy",
]);

function storeDetailHref(storeId: string) {
  return `${ROUTES.kitchens}/${encodeURIComponent(storeId)}`;
}

function storeCardImages(store: ChefStore): {
  cover: ChefStoreImage;
  avatar: ChefStoreImage;
} {
  const { coverImageUrl: cover, logoUrl: logo } = store;
  return {
    cover: cover || logo || mLogoMainBlack,
    avatar: logo || cover || mLogoMainBlack,
  };
}

function storeDietLabel(store: ChefStore): "Veg" | "Non-Veg" {
  const blob = store.categories.join(" ").toLowerCase();
  if (
    blob.includes("non-veg") ||
    blob.includes("nonveg") ||
    blob.includes("non veg")
  ) {
    return "Non-Veg";
  }
  return "Veg";
}

/** Short place label for the card (e.g. "Mohali" from a longer address). */
function storeAreaLabel(address: string): string {
  const trimmed = address.trim();
  if (!trimmed) return "";
  const first = trimmed.split(",")[0]?.trim() ?? trimmed;
  return first.length > 22 ? `${first.slice(0, 20)}…` : first;
}

type StoreCardContent = {
  cookName?: string;
  quote?: string;
  rating?: number;
  signatureDish?: string;
  alsoServingPrefix: string;
  alsoServingItems: string[];
  cuisineTags: string[];
  area: string;
};

function buildStoreCardContent(store: ChefStore): StoreCardContent {
  const featured = getFeaturedKitchenById(store.storeId);
  const area = storeAreaLabel(featured?.area || store.address);

  if (featured) {
    return {
      cookName: featured.cookName,
      quote: featured.quote,
      rating: featured.rating,
      signatureDish: featured.signatureDish,
      alsoServingPrefix: featured.alsoServingPrefix,
      alsoServingItems: featured.alsoServingItems.slice(0, 3),
      cuisineTags: (featured.tags ?? []).slice(0, 3),
      area,
    };
  }

  const cuisineTags: string[] = [];
  const dishes: string[] = [];
  for (const cat of store.categories) {
    const key = cat.toLowerCase().trim();
    if (!key || DIET_TAGS.has(key)) continue;
    if (CUISINE_TAGS.has(key)) {
      if (cuisineTags.length < 3) cuisineTags.push(cat);
      continue;
    }
    dishes.push(cat);
  }

  return {
    cookName: store.storeOwnerName,
    rating: store.overallRating,
    signatureDish: dishes[0],
    alsoServingPrefix: "Also serving —",
    alsoServingItems: dishes.slice(1, 4),
    cuisineTags,
    area,
  };
}

function storeMatchesFilters(
  store: ChefStore,
  filters: KitchenFiltersState,
): boolean {
  const categoriesBlob = store.categories.join(" ").toLowerCase();
  const cuisineNeedle = (filters.cuisine || "")
    .replace(/^all cuisines$/i, "")
    .trim();
  const cuisineMatch =
    !cuisineNeedle ||
    categoriesBlob.includes(cuisineNeedle.toLowerCase()) ||
    store.storeName.toLowerCase().includes(cuisineNeedle.toLowerCase()) ||
    store.address.toLowerCase().includes(cuisineNeedle.toLowerCase());

  const dietMatch =
    filters.diet === "all" ||
    (filters.diet === "veg" &&
      (categoriesBlob.includes("veg") || !categoriesBlob.includes("non"))) ||
    (filters.diet === "nonveg" && categoriesBlob.includes("non"));

  return cuisineMatch && dietMatch;
}

function StoreMediaImage({
  src,
  alt,
  sizes,
  containerClassName,
  imageClassName,
}: {
  src: ChefStoreImage;
  alt: string;
  sizes: string;
  containerClassName: string;
  imageClassName: string;
}) {
  const remote = typeof src === "string" && isRemoteImageUrl(src);

  return (
    <div className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName}
        sizes={sizes}
        unoptimized={remote}
      />
    </div>
  );
}

const StoreGridCard = memo(function StoreGridCard({ store }: { store: ChefStore }) {
  const { cover, avatar } = storeCardImages(store);
  const diet = storeDietLabel(store);
  const isVeg = diet === "Veg";
  const content = buildStoreCardContent(store);

  const menuLine = content.signatureDish ? [content.signatureDish] : [];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-ink/[0.08] bg-white text-left shadow-[0_4px_18px_-6px_rgba(42,31,24,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(42,31,24,0.14)]">
      <div className="relative shrink-0">
        <div className="relative aspect-[2.4/1] w-full overflow-hidden bg-stone-100">
          <StoreMediaImage
            src={cover}
            alt={store.storeName}
            sizes={COVER_SIZES}
            containerClassName="relative h-full w-full"
            imageClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute right-2.5 top-2.5 z-[3] inline-flex items-center gap-1 rounded-full bg-verified py-0.5 pl-0.5 pr-2 shadow-[0_2px_8px_rgba(111,138,62,0.3)]">
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src={mLogo}
                alt=""
                width={12}
                height={12}
                className="h-3 w-3 object-contain"
              />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-white">
              VERIFIED
            </span>
          </span>
        </div>

        <span className="absolute bottom-0 left-3.5 z-[4] h-9 w-9 translate-y-1/2 overflow-hidden rounded-full border-2 border-white bg-paper shadow-[0_4px_12px_rgba(42,31,24,0.18)]">
          <StoreMediaImage
            src={avatar}
            alt=""
            sizes="36px"
            containerClassName="relative h-full w-full"
            imageClassName="object-cover object-center"
          />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-3.5 pt-6">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <h3 className="m-0 min-w-0 flex-1 line-clamp-1 font-jakarta text-[16px] font-bold tracking-tight text-ink">
            {store.storeName}
          </h3>
          <span
            className={clsx(
              "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold",
              isVeg
                ? "border-verified-pill-border bg-verified-pill text-verified-text"
                : "border-partner-muted-border bg-partner-muted text-partner",
            )}
          >
            {diet}
          </span>
        </div>

        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 text-[12px] text-muted">
          {content.cookName ? (
            <span className="truncate font-medium text-ink/65">by {content.cookName}</span>
          ) : null}
          {content.rating != null ? (
            <span className="inline-flex items-center gap-0.5 font-semibold text-ink/70">
              <FiStar className="h-3 w-3 fill-current text-amber-500" aria-hidden />
              {content.rating.toFixed(1)}
            </span>
          ) : null}
          {content.area ? (
            <span className="inline-flex min-w-0 items-center gap-0.5">
              <FiMapPin className="h-3 w-3 shrink-0 text-ink/30" aria-hidden />
              <span className="truncate">{content.area}</span>
            </span>
          ) : null}
        </div>

        {content.quote ? (
          <p className="mt-2 m-0 line-clamp-1 text-[12.5px] leading-snug text-ink/55">
            {content.quote}
          </p>
        ) : null}

        {content.signatureDish ? (
          <div className="mt-2.5">
            <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
              Her signature
            </p>
            <p className="m-0 mt-1 line-clamp-1 border-l-2 border-customer/70 pl-2.5 font-jakarta text-[14px] font-bold tracking-tight text-ink">
              {content.signatureDish}
            </p>
          </div>
        ) : menuLine.length > 0 ? (
          <p className="mt-2 m-0 line-clamp-1 border-l-2 border-customer/70 pl-2.5 text-[12.5px] leading-snug text-ink/60">
            {menuLine[0]}
          </p>
        ) : null}

        {content.cuisineTags.length > 0 ? (
          <p className="mt-1.5 m-0 line-clamp-1 text-[11px] font-medium text-ink/40">
            {content.cuisineTags.slice(0, 2).join(" · ")}
          </p>
        ) : null}

        <div className="mt-auto pt-3">
          <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-customer px-3 py-2.5 font-jakarta text-[13px] font-semibold text-white transition-all duration-200 group-hover:gap-2 group-hover:bg-customer-hover">
            View Kitchen
            <FiArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );
});

type StoresSectionProps = {
  initialStores?: ChefStore[];
  filters?: KitchenFiltersState;
  onFiltersChange?: (next: KitchenFiltersState) => void;
  onFilteredCountChange?: (count: number) => void;
};

const StoresSection = ({
  initialStores = [],
  filters = { cuisine: "All cuisines", diet: "all" },
  onFiltersChange,
  onFilteredCountChange,
}: StoresSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { stores, loading, error, refetch } = useChefsStores(initialStores);
  const filterKey = `${filters.cuisine}|${filters.diet}`;
  const [pageByFilter, setPageByFilter] = useState<Record<string, number>>({});
  const page = pageByFilter[filterKey] ?? 1;

  const filteredStores = useMemo(() => {
    return stores.filter((store) => storeMatchesFilters(store, filters));
  }, [stores, filters]);

  const filteredCount = filteredStores.length;

  useEffect(() => {
    onFilteredCountChange?.(filteredCount);
  }, [filteredCount, onFilteredCountChange]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStores.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);

  const pageStores = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStores.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredStores]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  const scrollToSectionTop = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage === currentPage) return;
      setPageByFilter((prev) => ({ ...prev, [filterKey]: nextPage }));
      requestAnimationFrame(scrollToSectionTop);
    },
    [currentPage, filterKey, scrollToSectionTop],
  );

  const goPrev = useCallback(
    () => handlePageChange(Math.max(1, currentPage - 1)),
    [currentPage, handlePageChange],
  );
  const goNext = useCallback(
    () => handlePageChange(Math.min(totalPages, currentPage + 1)),
    [currentPage, handlePageChange, totalPages],
  );

  const onRetry = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <div ref={sectionRef}>
      <Section>
        {onFiltersChange ? (
          <KitchenFilters
            filters={filters}
            onChange={onFiltersChange}
            resultCount={filteredCount}
            className="mb-8"
          />
        ) : null}
        {loading ? null : error ? (
          <div className="py-16 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <Button type="button" onClick={onRetry} variant="customerOutline" size="sm" className="mt-4">
              Try again
            </Button>
          </div>
        ) : stores.length === 0 ? (
          <div className="py-16 text-center">
            <p className="body-copy-compact text-muted">
              No stores were returned from the API.
            </p>
            <Button type="button" onClick={onRetry} variant="customerOutline" size="sm" className="mt-4">
              Refresh
            </Button>
          </div>
        ) : filteredStores.length === 0 ? (
          <p className="body-copy-compact py-12 text-center text-muted">
            No verified kitchens match this cuisine or diet filter.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
              {pageStores.map((store) => {
                const href = storeDetailHref(store.storeId);
                return (
                  <Link
                    key={store.storeId}
                    href={href}
                    className={clsx(
                      `block ${RADIUS_CARD} no-underline outline-none transition focus-visible:ring-2 focus-visible:ring-customer/50 focus-visible:ring-offset-2`,
                    )}
                  >
                    <StoreGridCard store={store} />
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 ? (
              <div className="mt-8 flex items-center justify-center gap-2 text-sm">
                <Button
                  type="button"
                  onClick={goPrev}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  variant="none"
                  size="sm"
                  className="h-8 w-8 rounded-full border border-ink/10 p-0 text-ink/50 disabled:opacity-40"
                >
                  <FiChevronLeft className="h-4 w-4" />
                </Button>

                {pageNumbers.map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    type="button"
                    onClick={() => handlePageChange(pageNumber)}
                    variant="none"
                    size="sm"
                    className={clsx(
                      "h-8 w-8 rounded-full p-0 text-xs",
                      pageNumber === currentPage
                        ? "bg-customer/10 font-semibold text-customer"
                        : "text-ink/60 hover:bg-ink/5",
                    )}
                  >
                    {pageNumber}
                  </Button>
                ))}

                <Button
                  type="button"
                  onClick={goNext}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  variant="none"
                  size="sm"
                  className="h-8 w-8 rounded-full border border-ink/10 p-0 text-ink/50 disabled:opacity-40"
                >
                  <FiChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ) : null}

            {/* <p className="mt-[30px] text-center text-[14px] text-muted">
              Not in your city yet?{" "}
              <Link
                href={ROUTES.contact}
                className="font-bold text-customer no-underline hover:underline"
              >
                Join the waitlist →
              </Link>
            </p> */}
          </>
        )}
      </Section>
    </div>
  );
};

export default StoresSection;
