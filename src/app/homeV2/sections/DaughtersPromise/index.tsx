"use client";

import { motion } from "framer-motion";
import { FiCheck, FiHeart } from "react-icons/fi";
import clsx from "clsx";
import {
  Button,
  DISPLAY_HEADER_CLASS_DAUGHTERS_PROMISE,
  RADIUS_BTN,
  RADIUS_CARD,
  RADIUS_SECTION,
  RADIUS_SM,
  Section,
  SectionHeader,
} from "@/components";
import { ROUTES } from "@/shared/seo";
import { VERIFIED_TRUST_SECTION_PROPS } from "@/shared/data/verified-kitchen";
import { EASE } from '@/shared/lib/motion';

function RefundProofCard() {
  return (
    <div
      className={clsx(
        "w-[400px] max-w-full -rotate-2 bg-white p-6 shadow-surface-lg relative overflow-hidden",
        RADIUS_CARD
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={clsx(
            "flex h-[46px] w-[46px] shrink-0 items-center justify-center text-white",
            RADIUS_SM,
            "bg-verified-dark"
          )}
        >
          <FiCheck className="h-6 w-6" strokeWidth={2.6} aria-hidden />
        </span>
        <div className="min-w-0">
          <b className="block text-[17px] font-bold leading-tight text-ink">
            Refund issued
          </b>
          <span className="text-[13px] text-muted">Order #00194</span>
        </div>
        <span className="ml-auto shrink-0 rounded-lg bg-customer-muted px-3 py-1.5 text-right text-[10.5px] font-bold leading-tight text-customer absolute top-6 -right-2">
          Daughter&apos;s Promise
        </span>
      </div>

      <p className="mt-5 flex items-baseline gap-2 font-jakarta text-[52px] leading-none text-ink font-extrabold">
        <span>₹460</span>
        <span className="font-jakarta text-sm font-semibold tracking-normal text-muted">
          back to your UPI
        </span>
      </p>

      <div className="mt-5 flex items-center gap-2 border-t border-dotted border-ink/15 pt-4 text-[13.5px] text-muted">
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-verified"
          aria-hidden
        />
        <span>
          Settled in <b className="font-bold text-ink">4 minutes</b> · no
          questions asked
        </span>
      </div>
    </div>
  );
}

const DaughtersPromise = () => {
  return (
    <Section
      id="promise"

      className="bg-paper"
      aria-labelledby="daughters-promise-heading"
      {...VERIFIED_TRUST_SECTION_PROPS}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: EASE }}
        className={clsx(
          "mx-auto overflow-hidden border border-ink/10 bg-[#FFFBF2] shadow-[0_18px_44px_-26px_rgba(43,40,34,0.42)]",
          RADIUS_SECTION
        )}
      >
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col px-8 py-9 sm:px-10 sm:py-12 md:px-[clamp(2.25rem,5vw,3.75rem)] md:py-[clamp(2.25rem,5vw,3.75rem)]">
            <div className="mb-5">
              <span
                className={clsx(
                  "flex h-[52px] w-[52px] items-center justify-center bg-customer/10 shadow-sm",
                  RADIUS_BTN
                )}
              >
                <FiHeart
                  className="h-[26px] w-[26px] text-customer"
                  aria-hidden
                />
              </span>
            </div>

            <SectionHeader
              eyebrow="The Daughter's Promise"
              lines={[
                { text: "ANYTHING WRONG" },
                {
                  text: "WITH YOUR",
                  accent: "order?",
                  noWrap: true,
                  accentClassName:
                    "!translate-y-1 text-[clamp(2rem,3.5vw,2.75rem)] sm:!text-[clamp(2.25rem,4vw,3rem)] md:!text-[clamp(2.5rem,4vw,3.25rem)]",
                },
              ]}
              id="daughters-promise-heading"
              align="left"
              gradient="olive"
              marginBottom="mb-0"
              animated={false}
              classNames={{ header: DISPLAY_HEADER_CLASS_DAUGHTERS_PROMISE }}
            />

            <p className="body-copy mt-4 max-w-[460px]">
              If a meal ever arrives cold, late, or not as it should be, just
              tell us. A real person from our team will look into it and make it
              right — quickly and fairly.
            </p>

            <blockquote className="font-hand mt-6 max-w-[460px] border-l-[3px] border-verified pl-4 text-[19px] italic leading-snug text-ink">
              &ldquo;We treat you the way our chef would want her own daughter
              treated.&rdquo;
            </blockquote>

            <div className="mt-7">
              <Button href={ROUTES.refunds} variant="customer" className="mr-4 sm:min-w-[200px]">
                Read the promise
              </Button>
              <Button href={ROUTES.terms} variant="customerOutline">
                Read all policies
              </Button>
            </div>
          </div>

          <div className="relative flex min-h-[360px] items-center justify-center bg-verified-dark p-10 md:min-h-[480px]">
            <RefundProofCard />
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default DaughtersPromise;
