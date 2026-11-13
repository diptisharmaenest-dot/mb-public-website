"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
  Button,
  compactAccentLine,
  HEADER_TO_SUBROW_GAP,
  RADIUS_CARD,
  RADIUS_BTN,
  Section,
  SectionHeader,
} from "@/components";
import { ROUTES } from "@/shared/seo";
import { isRemoteImageUrl } from "@/shared/lib";
import { mLogo } from "@/assets";
import {
  featuredKitchens,
  type FeaturedKitchen,
} from "../../data/featured-kitchens";
import { EASE } from "@/shared/lib/motion";
import { VERIFIED_TRUST_SECTION_PROPS } from "@/shared/data/verified-kitchen";

const COVER_SIZES = "(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 33vw";
const CARD_GAP_PX = 28;

function KitchenMediaImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  className: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      unoptimized={isRemoteImageUrl(src)}
    />
  );
}

function KitchenCard({
  kitchen,
  index,
}: {
  kitchen: FeaturedKitchen;
  index: number;
}) {
  const href = `${ROUTES.kitchens}/${encodeURIComponent(kitchen.storeId)}`;

  return (
    <motion.article
      data-kitchen-card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 80px" }}
      transition={{
        duration: 0.55,
        ease: EASE,
        delay: Math.min(index, 2) * 0.06,
      }}
      className="flex h-full shrink-0 grow-0 basis-[min(300px,calc(100%-28px))] snap-start self-stretch sm:basis-[calc((100%-28px)/2)] lg:basis-[calc((100%-56px)/3)]"
    >
      <Link
        href={href}
        aria-label={`Order from ${kitchen.name}`}
        className={clsx(
          "group flex h-full w-full flex-col overflow-hidden bg-white no-underline shadow-[0_8px_28px_-12px_rgba(42,31,24,0.28)] transition-shadow duration-200 hover:shadow-[0_14px_36px_-14px_rgba(42,31,24,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customer",
          RADIUS_CARD
        )}
      >
        {/* Cover — same aspect on every card */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
          <KitchenMediaImage
            src={kitchen.image}
            alt={kitchen.imageAlt}
            sizes={COVER_SIZES}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
            aria-hidden
          />

          {/* Verified — white pill, dark label */}
          <span className="absolute left-3 top-3 z-[3] inline-flex items-center gap-1.5 rounded-full bg-white  pr-1.5 shadow-[0_4px_14px_rgba(42,31,24,0.18)]">
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-verified">
              <Image
                src={mLogo}
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5 object-contain "
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
              Verified
            </span>
          </span>

          {/* Name + avatar + area */}
          <div className="absolute inset-x-0 bottom-0 z-[2] px-4 pb-4 pt-10">
            <h3 className="m-0 line-clamp-1 font-jakarta text-[24px] font-extrabold leading-[1.1] tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(20,14,10,0.45)]">
              {kitchen.name}
            </h3>
            <div className="mt-2 flex min-h-7 items-center gap-2">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-paper ring-2 ring-white/80">
                <KitchenMediaImage
                  src={kitchen.avatar}
                  alt=""
                  sizes="36px"
                  className="object-cover object-center"
                />
              </span>
              <p className="m-0 line-clamp-1 font-jakarta text-[13px] font-normal leading-[1.4] text-white/95 drop-shadow-[0_1px_6px_rgba(20,14,10,0.4)]">
                {kitchen.area}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 bg-white px-4 pb-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <span className="font-jakarta text-[11px] font-semibold uppercase tracking-[0.16em] text-text-700">
              Her signature
            </span>
            <p className="m-0 line-clamp-1 font-jakarta text-[20px] font-extrabold leading-snug tracking-[-0.015em] text-ink">
              {kitchen.signatureDish}
            </p>
            <p className="m-0 line-clamp-1 min-h-[1.25rem] font-jakarta text-[14px] font-normal leading-[1.45] text-ink">
              {kitchen.alsoServingPrefix}{" "}
              {kitchen.alsoServingItems.map((item, i) => (
                <span key={item}>
                  {i > 0 ? <span> &amp; </span> : null}
                  <span className="font-bold">{item}</span>
                </span>
              ))}
            </p>
          </div>

          <span
            className={clsx(
              "mt-auto inline-flex w-full shrink-0 items-center justify-center gap-2 bg-customer px-4 py-3.5 font-jakarta text-[15px] font-semibold leading-none text-white transition-colors duration-200 group-hover:bg-customer-hover",
              RADIUS_BTN
            )}
          >
            Order now
            <FiArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

const FeaturedKitchens = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    const frame = requestAnimationFrame(updateScrollState);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateScrollState)
        : null;
    observer?.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      observer?.disconnect();
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-kitchen-card]");
    const amount = (card?.offsetWidth ?? 300) + CARD_GAP_PX;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <Section
      id="kitchens"
      className="relative bg-surface"
      aria-labelledby="featured-kitchens-heading"
      {...VERIFIED_TRUST_SECTION_PROPS}
    >
      <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          eyebrow="Handpicked · June 2026 · Verified home chefs"
          lines={[
            compactAccentLine({
              text: "Featured kitchens",
              accent: "of the month",
            }),
          ]}
          id="featured-kitchens-heading"
          align="left"
          marginBottom={HEADER_TO_SUBROW_GAP}
        />
        <Button
          href={ROUTES.kitchens}
          variant="customerOutline"
          className="shrink-0 self-start sm:self-center"
        >
          See all kitchens
        </Button>
      </div>

      <div className="min-w-0">
        <div
          ref={scrollerRef}
          className="flex w-full min-w-0 items-stretch snap-x snap-mandatory gap-7 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-roledescription="carousel"
          aria-label="Featured kitchens"
        >
          {featuredKitchens.map((kitchen, index) => (
            <KitchenCard
              key={kitchen.storeId}
              kitchen={kitchen}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-verified/40 bg-verified/10 shadow-md transition-all duration-200 hover:bg-verified/20 hover:border-verified focus-visible:ring-2 focus-visible:ring-verified/40 text-verified disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous kitchens"
        >
          <FiArrowLeft className="h-6 w-6" strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-verified/40 bg-verified/10 shadow-md transition-all duration-200 hover:bg-verified/20 hover:border-verified focus-visible:ring-2 focus-visible:ring-verified/40 text-verified disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next kitchens"
        >
          <FiArrowRight className="h-6 w-6" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </Section>
  );
};

export default FeaturedKitchens;
