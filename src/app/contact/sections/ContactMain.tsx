'use client'

import { motion } from 'framer-motion'
import { FiClock, FiMessageSquare, FiSmile } from 'react-icons/fi'
import { RADIUS_PANEL, Section, SectionHeader, compactAccentLine } from '@/components'
import { EASE } from '@/shared/lib/motion'
import ContactDetails from './ContactDetails'
import ContactForm from './ContactForm'

const REASSURANCE = [
  { icon: FiSmile, text: 'Read by a real person on our team, never a bot.' },
  { icon: FiMessageSquare, text: 'We reply on the phone number or email you give us.' },
  { icon: FiClock, text: 'Usually within one working day.' },
] as const

const ContactMain = () => {
  return (
    <>
      <Section id="contact-form" aria-labelledby="contact-form-heading" flushTop className="scroll-mt-24 bg-paper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`${RADIUS_PANEL} relative overflow-hidden bg-mb-ink-panel px-5 py-9 sm:px-10 sm:py-12 lg:px-12 lg:py-14`}
        >
          {/* decorative glows */}
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-customer/25 blur-[90px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-yellow/15 blur-[90px]" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
            <div>
              <SectionHeader
                id="contact-form-heading"
                align="left"
                eyebrow="Send a message"
                gradient="whiteSoft"
                accent="text-yellow"
                animated={false}
                marginBottom="mb-0"
                classNames={{ eyebrow: 'text-verified' }}
                lines={[{ text: 'Write to us,' }, compactAccentLine({ text: '', accent: "we'll write back." })]}
              />

              <ul className="mt-8 flex flex-col gap-4">
                {REASSURANCE.map(({ icon: Icon, text }, i) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-yellow" aria-hidden>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="pt-1.5 text-[15px] leading-snug text-white/75">{text}</span>
                  </motion.li>
                ))}
              </ul>

              <p className="mt-10 hidden -rotate-2 font-hand text-[26px] leading-snug text-white/60 lg:block">
                “Tell us like you’d tell family.”
              </p>
            </div>

            <ContactForm />
          </div>
        </motion.div>
      </Section>

      <Section id="contact-details" aria-label="Other ways to reach us" className="bg-paper">
        <ContactDetails />
      </Section>
    </>
  )
}

export default ContactMain
