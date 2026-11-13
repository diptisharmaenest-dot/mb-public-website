"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaInstagram, FaFacebook } from "react-icons/fa6";
import { FiCheckCircle, FiMapPin } from "react-icons/fi";
import { Button } from "@/components";
import { mLogoMainBlack } from "@/assets";
import type { ChefStoreDetail } from "@/features";
import { isRemoteImageUrl } from "@/shared/lib";
import { fadeUp, scaleIn, staggerChildren } from "./kitchen-motion";

type KitchenHeroProps = {
  store: ChefStoreDetail;
  onOrderClick: () => void;
};

function extractCity(address: string): string {
  const trimmed = address.trim();
  if (!trimmed) return "Mohali, Punjab";
  if (trimmed.includes("·")) {
    return trimmed.split("·").at(-1)?.trim() || "Mohali, Punjab";
  }
  return trimmed;
}

export default function KitchenHero({
  store,
  onOrderClick,
}: KitchenHeroProps) {
  const avatarSrc = store.logoUrl || store.coverImageUrl || mLogoMainBlack;
  const cityLabel = extractCity(store.storeAddress);
  const cuisine = store.cuisineLabel || "North Indian · Pure Veg";
  const rating =
    store.overallRating > 0 ? store.overallRating.toFixed(1) : "4.9";
  const reviewCount =
    Array.isArray(store.reviews) && store.reviews.length > 0
      ? store.reviews.length
      : 128;
  const heroDescription =
    store.description?.trim() ||
    `Fresh home-cooked food prepared with care and delivered from a verified kitchen in ${cityLabel}.`;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerChildren}
      className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12"
    >
      <div className="min-w-0">
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-7">
          <motion.div
            variants={scaleIn}
            custom={0}
            className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-[3px] border-white/90 bg-canvas shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] sm:h-32 sm:w-32 sm:border-4"
          >
            <Image
              src={avatarSrc}
              alt={store.storeOwnerName || store.name}
              fill
              className="object-cover"
              sizes="160px"
              unoptimized={isRemoteImageUrl(avatarSrc)}
              priority
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.08}
            className="min-w-0 flex-1"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-customer drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
              Home kitchen in {cityLabel}
            </p>
            <h1
              id="kitchen-hero-heading"
              className="mt-2 font-jakarta text-[1.9rem] font-extrabold leading-[1.03] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:text-[2.35rem] lg:text-[2.85rem]"
            >
              {store.name}
            </h1>
            <p className="mt-2 text-sm font-semibold text-yellow drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:text-base">
              {cuisine}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] sm:text-[15px]">
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-100">
                <FiCheckCircle
                  className="h-3.5 w-3.5 text-emerald-300"
                  aria-hidden
                />
                Verified kitchen
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                <FiMapPin className="h-3.5 w-3.5 text-customer" aria-hidden />
                {cityLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-white">
                <FaStar className="h-3.5 w-3.5 text-amber-400" aria-hidden />
                {rating}
                <span className="font-semibold text-white/80">
                  ({reviewCount} reviews)
                </span>
              </span>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)] sm:text-[15px]">
              {heroDescription}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href={store.socialLinks?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center transition-opacity hover:opacity-85"
              >
                <FaInstagram className="h-4 w-4 text-[#E1306C]" />
              </a>
              <a
                href={store.socialLinks?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center transition-opacity hover:opacity-85"
              >
                <FaFacebook className="h-4 w-4 text-[#1877F2]" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={fadeUp}
        custom={0.2}
        className="flex shrink-0 lg:justify-end lg:pb-1"
      >
        <Button
          type="button"
          variant="customer"
          onClick={onOrderClick}
          className="px-6 py-3 text-sm font-bold shadow-[0_10px_28px_-14px_rgba(219,26,26,0.8)]"
        >
          Order from this kitchen
        </Button>
      </motion.div>
    </motion.div>
  );
}
