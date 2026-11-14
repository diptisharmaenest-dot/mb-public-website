"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import {
  compactAccentLine,
  Section,
  SectionHeader,
} from "@/components";
import { VERIFIED_TRUST_SECTION_PROPS } from "@/shared/data/verified-kitchen";
import { EASE } from "@/shared/lib/motion";
import youngMotherImg from "@/assets/images/young-indian-mother.png";

function RefundProofCard() {
  return (
    <div className="-rotate-3 absolute bottom-6 left-6 z-[2] sm:bottom-16 sm:left-15 w-[calc(100%-48px)] max-w-[360px] rounded-2xl bg-white p-5 sm:p-6 shadow-[0_20px_45px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6B8E3D] text-white">
          <FiCheck className="h-5 w-5 stroke-[2.5]" aria-hidden />
        </span>
        <div className="min-w-0">
          <b className="block text-[15px] font-bold leading-tight text-ink">
            Refund issued
          </b>
          <span className="text-[12px] font-medium text-ink/50">
            Order #00194
          </span>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-customer-100 px-2.5 py-1 text-[10.5px] font-bold text-partner">
          Daughter&apos;s Promise
        </span>
      </div>

      <p className="mt-4 flex items-baseline gap-2 text-4xl sm:text-[42px] font-extrabold leading-none text-ink">
        <span>₹460</span>
        <span className="text-xs font-medium text-ink/60">
          back to your UPI
        </span>
      </p>

      <div className="mt-4 flex items-center gap-2 border-t border-ink/10 pt-3.5 text-[11.5px] text-ink/60">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#6B8E3D]" aria-hidden />
        <span>
          Resolved by <b className="font-bold text-ink">our support team</b>
        </span>
      </div>
    </div>
  );
}

const DaughtersPromise = () => {
  return (
    <Section
      id="promise"
      fullWidth
      noPaddingX
      noPaddingY
      className="relative w-full overflow-hidden bg-surface"
      aria-labelledby="daughters-promise-heading"
      {...VERIFIED_TRUST_SECTION_PROPS}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: EASE }}
        className="w-full overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-gradient-to-r from-partner-hover via-partner to-partner-hover py-12 sm:py-16 lg:py-20 text-white">
            <div className="w-full max-w-[700px] lg:ml-auto px-6 sm:px-10 lg:px-12">
              <SectionHeader
                eyebrow="The Daughter's Promise"
                id="daughters-promise-heading"
                align="left"
                gradient="whiteSoft"
                accent="text-verified"
                marginBottom="mb-0"
                animated={false}
                classNames={{
                  eyebrow: "text-white/80",
                  description: "!max-w-[480px] !text-white/90",
                }}
                description="If a meal arrives cold, late or not as it should be, just tell us. A real person from our team will look into it and make it right — quickly and fairly."
                lines={[
                  compactAccentLine({
                    text: "Anything Wrong With Your",
                    accent: "Order?",
                  }),
                ]}
              />

              <blockquote className="mt-6 max-w-[480px] rounded-r-lg border-l-[3px] border-[#7B9945] bg-white/10 p-4">
                <p className="font-hand text-[18px] sm:text-[20px] leading-snug text-white">
                  “We treat you the way our chef would want her own daughter treated.”
                </p>
              </blockquote>

              {/* "Read the promise" hidden for now — /refunds page not live yet (re-add Link + ROUTES imports).
              <div className="mt-8">
                <Link
                  href={ROUTES.refunds}
                  className="inline-flex items-center justify-center rounded-[12px] border border-white/90 bg-transparent px-6.5 py-2.5 text-[15px] font-medium !text-white visited:!text-white transition-all hover:bg-white/10 active:scale-95 no-underline"
                >
                  Read the promise
                </Link>
              </div>
              */}
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[560px] w-full overflow-hidden bg-stone-900">
            <Image
              src={youngMotherImg}
              alt="Young Indian mother looking at phone and smiling"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <RefundProofCard />
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default DaughtersPromise;
