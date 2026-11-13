"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { compactAccentLine, Section, SectionHeader } from "@/components";
import { EASE } from "@/shared/lib/motion";
import { mother, family } from "@/assets/images";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay },
  }),
};

export default function EveryOrderChangesLives() {
  return (
    <Section
      id="every-order"
      fullWidth
      aria-labelledby="every-order-heading"
      className="relative bg-[#1C1410] text-white"
      innerClassName="p-0"
    >
      {/* 100vh container */}
      <div className="flex min-h-screen flex-col">

        {/* ── Top headline strip ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={0}
          className="flex flex-col items-center justify-center px-6 pb-10 text-center"
        >
          <SectionHeader
            eyebrow="One Meal"
            id="every-order-heading"
            align="center"
            lines={[
              compactAccentLine({
                text: "EVERY ORDER ",
                accent: "changes two lives.",
              }),
            ]}
            animated={false}
            marginBottom="mb-0"
          />
          <p className="mt-6 text-[14px] text-white/50 font-medium tracking-wide ">
            When you order from Mother Bhojan, you&apos;re part of a bigger story.
          </p>
        </motion.div>

        {/* ── Side-by-side photo cards — fill the rest of the viewport ── */}
        <div className="flex flex-1 flex-col md:flex-row gap-3 px-4 pb-4 sm:px-6 sm:pb-6">

          {/* ─ Left card — Family ─ */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.1}
            variants={fadeUp}
            className="group relative flex-1 overflow-hidden rounded-[20px] min-h-[320px]"
          >
            <Image
              src={family.src}
              alt="A family receiving a warm home-cooked meal"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            {/* Dark scrim gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-partner mb-2">
                01 / Receives Care
              </span>
              <h2 className="font-antonio text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold uppercase leading-[1.08] text-white mb-2">
                Nourishing a home.
              </h2>
              <p className="text-[13px] leading-relaxed text-white/70 max-w-[360px]">
                Warm, healthy, home-cooked food delivered to local families every day.
              </p>
            </div>
          </motion.div>

          {/* ─ Right card — Mother ─ */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.2}
            variants={fadeUp}
            className="group relative flex-1 overflow-hidden rounded-[20px] min-h-[320px]"
          >
            <Image
              src={mother.src}
              alt="A mother preparing food in her own kitchen"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-partner mb-2">
                02 / Earns with Pride
              </span>
              <h2 className="font-antonio text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold uppercase leading-[1.08] text-white mb-2">
                Empowering a mother.
              </h2>
              <p className="text-[13px] leading-relaxed text-white/70 max-w-[360px]">
                Your order directly funds a home cook&apos;s independent culinary business.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}
