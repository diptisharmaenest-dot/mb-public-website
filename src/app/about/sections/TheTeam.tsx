'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  CARD_GRID_GAP,
  HEADER_TO_SUBROW_GAP,
  RADIUS_PANEL,
  Section,
  SectionHeader,
  compactAccentLine,
} from '@/components'
import { amarJyoti, dipti, jagdeep, pardeep } from '@/assets/images'
import { EASE } from '@/shared/lib/motion'

const TEAM = [
  {
    name: 'Jagdeep Chawla',
    role: 'Co-founder',
    tag: 'Vision & Product',
    bio: 'Building tech platforms that empower home cooks.',
    image: jagdeep,
  },
  {
    name: 'Amar Jyoti Chawla',
    role: 'Co-founder',
    tag: 'Ops & Quality',
    bio: 'Pioneering kitchen audits & hygiene standards.',
    image: amarJyoti,
  },
  {
    name: 'Ops lead',
    role: 'Kitchen verification',
    tag: 'Kitchen Visits',
    bio: 'Visiting every kitchen in person before it goes live.',
    image: pardeep,
  },
  {
    name: 'Partner support',
    role: 'Onboarding',
    tag: 'Partner Success',
    bio: 'Supporting women cooks from day one.',
    image: dipti,
  },
] as const

const TheTeam = () => {
  return (
    <Section
      id="the-team"
      aria-labelledby="the-team-heading"
      className="bg-paper"
    >
      <SectionHeader
        id="the-team-heading"
        align="left"
        eyebrow="The team"
        accent="text-verified-text"
        gradient="ink"
        animated={true}
        marginBottom={HEADER_TO_SUBROW_GAP}
        classNames={{
          eyebrow: 'text-verified-text',
        }}
        lines={[
          compactAccentLine({
            text: 'The people',
            accent: 'behind the kitchens.',
          }),
        ]}
      />

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${CARD_GRID_GAP}`}
      >
        {TEAM.map((member, idx) => (
          <motion.article
            key={member.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.65,
              delay: idx * 0.1,
              ease: EASE,
            }}
            className={`group relative flex flex-col overflow-hidden ${RADIUS_PANEL} border border-border p-3.5 sm:p-4 text-center shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.09)] hover:border-customer/30 bg-white transition-all duration-300 hover:-translate-y-1.5`}
          >
            {/* Polaroid White Photo Frame */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[20px] shadow-sm mb-3.5 bg-stone-50">
              <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="px-2 pb-2 flex flex-col items-center flex-1">
              <span className="inline-block rounded-full bg-customer/10 px-3 py-0.5 text-[10.5px] font-bold text-customer uppercase tracking-wider mb-1.5 transition-colors duration-200 group-hover:bg-customer group-hover:text-white">
                {member.tag}
              </span>
              <h3 className="font-jakarta text-[17.5px] sm:text-[18.5px] font-bold tracking-tight text-ink transition-colors duration-200 leading-snug">
                {member.name}
              </h3>
              <p className="mt-0.5 font-jakarta text-[13px] sm:text-[13.5px] font-semibold text-partner">
                {member.role}
              </p>
              <p className="mt-2 font-jakarta text-[12.5px] font-normal leading-relaxed text-ink/65 line-clamp-2">
                {member.bio}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

export default TheTeam
