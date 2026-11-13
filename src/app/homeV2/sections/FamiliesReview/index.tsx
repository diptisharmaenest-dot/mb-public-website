"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import {
  compactAccentLine,
  PROSE_MAX_WIDTH,
  RADIUS_SECTION,
  Section,
  SectionHeader,
} from "@/components";
import { customerReviews, reviewStats } from "../../data/reviews";
import { EASE } from "@/shared/lib/motion";
import "./families-review.css";

function ReviewCard({
  name,
  area,
  initial,
  text,
  className,
}: (typeof customerReviews)[number] & { className?: string }) {
  return (
    <article
      className={clsx(
        `group relative flex h-full flex-col ${RADIUS_SECTION} border border-white/10 bg-[#2A1F18] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-350 sm:p-7 lg:p-8 families-review-card`,
        className,
      )}
    >
      {/* Decorative double quote icon in background */}
      <span className="absolute right-6 top-4 font-serif text-[120px] font-bold leading-none text-white/[0.04] pointer-events-none select-none">
        “
      </span>

      {/* Cream testimonial text */}
      <p className="flex-1 text-[17px] leading-[1.65] text-[#FFFAF2]/90 sm:text-[18px]">
        &ldquo;{text}&rdquo;
      </p>

      {/* Profile info with warm white/cream text and muted subtext */}
      <div className="mt-6 flex items-center gap-3.5 border-t border-white/10 pt-4 sm:mt-7">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-verified to-verified-dark font-jakarta text-[15px] font-extrabold text-white shadow-[0_2px_8px_rgba(141,165,82,0.3)] ring-2 ring-[#2A1F18]">
          {initial}
        </div>
        <div className="min-w-0 text-left">
          <div className="flex items-center gap-2">
            <p className="font-jakarta text-[15px] font-bold text-[#FFFAF2] leading-tight">
              {name}
            </p>
          </div>
          <p className="mt-0.5 font-jakarta text-[12px] font-medium text-[#CBC3B4]">
            {area}
          </p>
        </div>
      </div>
    </article>
  );
}

const FamiliesReview = () => {
  // Duplicate all reviews 3 times to ensure seamless scrolling loops
  const repeatedReviews = [
    ...customerReviews,
    ...customerReviews,
    ...customerReviews,
  ];

  return (
    <Section
      id="reviews"
      className="bg-surface"
      aria-labelledby="customer-reviews-heading"
      innerClassName="mx-auto flex min-h-[90svh] w-full flex-col justify-center gap-6 sm:gap-7 lg:gap-8"
    >
      <SectionHeader
        eyebrow="Loved by homes nearby"
        lines={[
          compactAccentLine({ text: "WHAT FAMILIES", accent: "are saying" }),
        ]}
        id="customer-reviews-heading"
        align="center"
        gradient="olive"
        accent="text-partner"
        marginBottom="mb-0"
        className={`mx-auto ${PROSE_MAX_WIDTH} shrink-0`}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="mx-auto flex shrink-0 justify-center"
      >
        <div className="flex items-center rounded-full border border-[#F5E8C5] bg-[#FFFBF2] px-6 py-3.5">
          <span className="font-jakarta text-base font-medium text-ink">
            {reviewStats.orders} orders delivered warm
          </span>
        </div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="families-carousel-bleed"
      >
        <div className="families-marquee-container">
          {/* Single-row scrolling right-to-left */}
          <div
            className="families-marquee-row"
            role="region"
            aria-label="Customer reviews carousel"
          >
            <div className="families-marquee-track families-marquee-track-left">
              {repeatedReviews.map((review, index) => (
                <ReviewCard
                  key={`review-${review.name}-${index}`}
                  {...review}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default FamiliesReview;
