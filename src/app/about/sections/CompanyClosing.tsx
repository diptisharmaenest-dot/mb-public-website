'use client'

import { motion } from 'framer-motion'
import { compactAccentLine, RADIUS_PANEL, Section, SectionHeader } from '@/components'
import { EASE } from '@/shared/lib/motion'

const CompanyClosing = () => {
  return (
    <Section
      id="company"
      aria-labelledby="company-heading"
    >
      {/* Expanding Document Unfold Motion */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`${RADIUS_PANEL} border border-border bg-paper px-6 py-8 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-16 lg:py-16 text-left shadow-sm hover:shadow-md transition-shadow duration-500`}
      >
        <SectionHeader
          id="company-heading"
          align="left"
          eyebrow="Company Information"
          accent="text-partner"
          gradient="ink"
          animated={true}
          marginBottom="mb-6"
          classNames={{
            eyebrow: 'text-customer',
          }}
          lines={[
            compactAccentLine({
              text: 'Mother Bhojan is operated by',
              accent: 'Womro Solutions',
            }),
            {
              text: '',
              accent: 'Private Limited.',
            },
          ]}
        />

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-ink/80 font-normal"
        >
          Womro Solutions Private Limited is a technology company incorporated
          in India under the Companies Act 2013. Mother Bhojan is our first
          product — a women-led verified home-food platform. Future products will
          continue our mission of building technology platforms that create
          economic opportunity for Indian women.
        </motion.p>

        {/* Two-Column Information Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12 lg:gap-x-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="flex flex-col space-y-7"
          >
            {/* Registered Office */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50 mb-2">
                Registered Office
              </p>
              <p className="text-[14.5px] sm:text-[15px] font-semibold text-ink leading-snug">
                Plot No. D-199, 2nd Floor, Phase 8B, Industrial Area
                <br />
                Mohali, SAS Nagar, Punjab — 160055
              </p>
            </div>

            {/* CIN and GSTIN rows hidden until the real numbers are confirmed —
                the previous values (U72900PB2025PTC000000 / 03ABCDE1234F1Z5) were placeholders. */}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="flex flex-col space-y-7"
          >
            {/* FSSAI aggregator licence row hidden until the licence is issued —
                the previous value (12345678900000, "to be issued — Q1 2026") was a placeholder. */}

            {/* Trademark */}
            <div className="border-b border-[#E6DDD0] pb-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50 mb-2">
                Trademark
              </p>
              <p className="text-[14.5px] sm:text-[15px] font-semibold text-ink leading-snug">
                &quot;Mother Bhojan&quot; is a trademark of Womro Solutions Pvt Ltd
              </p>
              <p className="text-[13.5px] font-normal text-ink/70 mt-1">
                (application filed under classes 9, 35, 42, 43)
              </p>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink/50 mb-2">
                Contact
              </p>
              <a
                href="mailto:hello@motherbhojan.com"
                className="text-[14.5px] sm:text-[15px] font-semibold text-customer hover:underline"
              >
                hello@motherbhojan.com
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}

export default CompanyClosing
