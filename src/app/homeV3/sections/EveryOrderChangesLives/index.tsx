"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";
import {
  compactAccentLine,
  Section,
  SectionHeader,
} from "@/components";
import { EASE } from "@/shared/lib/motion";

const TWO_SIDES_STORIES = [
  {
    id: "priya-sunita",
    review: {
      stars: 5,
      text: "“Tastes like my own mother’s dal. I reordered three times this week.”",
      author: "PRIYA S. · MOHALI",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop",
    },
    impact: {
      eyebrow: "WHAT IT MEANT FOR HER",
      text: "For Sunita, Priya’s reorders were ₹4,200 this month — her first month covering her daughter’s school fees.",
    },
  },
  {
    id: "arjun-meena",
    review: {
      stars: 5,
      text: "“Knowing every kitchen is verified means I order without a second thought.”",
      author: "ARJUN M. · MOHALI",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop",
    },
    impact: {
      eyebrow: "WHAT IT MEANT FOR HER",
      text: "Arjun is one of 38 regulars who turned Meena’s cooking into a steady weekly income.",
    },
  },
];

export default function EveryOrderChangesLives() {
  return (
    <Section id="every-order" aria-labelledby="two-sides-heading">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto flex w-full flex-col items-center"
      >
        <SectionHeader
          eyebrow="What families say — and what it means"
          id="two-sides-heading"
          align="center"
          marginBottom="mb-8"
          className="mb-8"
          classNames={{ eyebrow: "text-verified-text" }}
          gradient="ink"
          lines={[
            compactAccentLine({
              text: "Every order has",
              accent: "two sides.",
            }),
          ]}
        />

        <div className="flex w-full flex-col gap-5 sm:gap-6">
          {TWO_SIDES_STORIES.map((pair, idx) => (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: idx * 0.1 }}
              className="grid grid-cols-1 items-stretch gap-4 sm:gap-6 md:grid-cols-[1fr_auto_1fr]"
            >
              <div className="flex h-full flex-col justify-between rounded-[20px] border border-[#EBE3D5] bg-[#FFF9EE] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-7">
                <div>
                  <div
                    className="text-[13px] tracking-[3px] text-[#D97706]"
                    aria-label="5 stars"
                  >
                    ★★★★★
                  </div>
                  <p className="mt-3.5 font-hand text-[17px] font-normal leading-[1.6] text-ink sm:text-[18.5px]">
                    {pair.review.text}
                  </p>
                </div>

                <div className="mt-2 flex items-center gap-2.5">
                  <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/80 bg-stone-200 shadow-sm">
                    <Image
                      src={pair.review.avatar}
                      alt={pair.review.author}
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
                    {pair.review.author}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center py-1 md:py-0">
                <FaArrowRightLong
                  className="h-5 w-8 shrink-0 rotate-90 text-partner md:rotate-0"
                  aria-hidden
                />
              </div>

              <div className="flex h-full flex-col justify-around rounded-[20px] border border-[#D5E2BC] bg-[#E8F0D6] p-6 sm:p-7">
                <span className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                  {pair.impact.eyebrow}
                </span>
                <p className="m-0 text-[14.5px] font-normal leading-[1.65] text-ink/80 sm:text-[15.5px]">
                  {pair.impact.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-center font-hand text-2xl font-normal text-partner sm:mt-12 sm:text-[28px]">
          <span>Could that be your kitchen?</span>
          <FaArrowDownLong
            className="h-6 w-4 shrink-0 text-partner"
            aria-hidden
          />
        </p>
      </motion.div>
    </Section>
  );
}
