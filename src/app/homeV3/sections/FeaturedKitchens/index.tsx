"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
  Button,
  compactAccentLine,
  HEADER_TO_SUBROW_GAP,
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
  const cookName = kitchen.cookName || kitchen.name;

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
      className="flex h-full shrink-0 grow-0 w-[280px] min-w-[280px] sm:w-[320px] sm:min-w-[320px] lg:w-[340px] lg:min-w-[340px] snap-start self-stretch"
    >
      <Link
        href={href}
        aria-label={`Order from ${kitchen.name}`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-white no-underline shadow-[0_8px_24px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-partner"
      >
        <div className="relative aspect-[1.25/1] w-full shrink-0 overflow-hidden bg-stone-100">
          <KitchenMediaImage
            src={kitchen.image}
            alt={kitchen.imageAlt}
            sizes={COVER_SIZES}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/25 to-transparent"
            aria-hidden
          />

          <span className="absolute right-3 top-3 z-[3] inline-flex items-center gap-1.5 rounded-full bg-white px-1 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">

            <Image
              src={mLogo}
              alt=""
              width={14}
              height={14}
              className="h-3.5 w-3.5 object-contain"
            />

            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-verified-text">
              VERIFIED
            </span>
          </span>

          <div className="absolute inset-x-0 bottom-0 z-[2] flex items-center gap-2.5 p-3.5 pt-8">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white bg-paper shadow-md ring-1 ring-black/10">
              <KitchenMediaImage
                src={kitchen.avatar}
                alt={cookName}
                sizes="44px"
                className="object-cover object-center"
              />
            </span>
            <div className="min-w-0">
              <h3 className="m-0 line-clamp-1 text-[15px] font-bold leading-tight text-white drop-shadow-sm">
                {cookName}
              </h3>
              <p className="m-0 line-clamp-1 text-[11.5px] font-normal leading-tight text-white/80 drop-shadow-sm">
                {kitchen.area}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-3.5 bg-white p-4 pt-3.5">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/50">
              HER SIGNATURE
            </span>
            <p className="m-0 line-clamp-1 text-[18px] font-bold leading-snug tracking-tight text-ink">
              {kitchen.signatureDish}
            </p>
          </div>

          <span className={`inline-flex min-h-[42px] w-full shrink-0 items-center justify-center ${RADIUS_BTN} border-t border-white/25 bg-gradient-to-b from-customer to-partner text-[13.5px] font-semibold text-white shadow-[0_4px_12px_-2px_rgba(219,26,26,0.35)] transition-all duration-200 group-hover:brightness-105`}>
            Order from her
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
    const amount = (card?.offsetWidth ?? 340) + CARD_GAP_PX;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <Section
      id="kitchens"
      className="relative bg-[#FAF6F0]"
      aria-labelledby="featured-kitchens-heading"
      {...VERIFIED_TRUST_SECTION_PROPS}
    >
      <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          gradient="ink"
          lines={[
            compactAccentLine({
              text: "Cooking near you",
              accent: "this week",
            }),
          ]}
          id="featured-kitchens-heading"
          align="left"
          marginBottom={HEADER_TO_SUBROW_GAP}
        />
        <Button
          href={ROUTES.kitchens}
          variant="partnerOutline"
          className="shrink-0 self-start sm:self-center"
        >
          See all kitchens
        </Button>
      </div>

      <div className="min-w-0">
        <div
          ref={scrollerRef}
          className="flex w-full min-w-0 items-stretch snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-verified/40 bg-verified/10 text-verified shadow-md transition-all duration-200 hover:border-verified hover:bg-verified/20 focus-visible:ring-2 focus-visible:ring-verified/40 disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous kitchens"
        >
          <FiArrowLeft className="h-6 w-6" strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-verified/40 bg-verified/10 text-verified shadow-md transition-all duration-200 hover:border-verified hover:bg-verified/20 focus-visible:ring-2 focus-visible:ring-verified/40 disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next kitchens"
        >
          <FiArrowRight className="h-6 w-6" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </Section>
  );
};

export default FeaturedKitchens;
