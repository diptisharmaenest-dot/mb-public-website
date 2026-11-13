'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Section } from '@/components'
import { amarJyoti, jagdeep } from '@/assets/images'
import { EASE } from '@/shared/lib/motion'

const FOUNDERS = [
  {
    name: 'Jagdeep Chawla',
    role: 'Co-founder',
    focus: 'Vision & product',
    image: jagdeep,
    alt: 'Jagdeep Chawla — Co-founder, Mother Bhojan',
  },
  {
    name: 'Amar Jyoti Chawla',
    role: 'Co-founder',
    focus: 'Ops & quality',
    image: amarJyoti,
    alt: 'Amar Jyoti Chawla — Co-founder, Mother Bhojan',
  },
] as const

const FoundersPortraits = () => {
  return (
    <Section
      id="founders-portraits"
      aria-label="The founders"
      
    >
      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
        {FOUNDERS.map((founder, i) => (
          <motion.figure
            key={founder.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            className="group relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden rounded-[16px] sm:rounded-[20px] border border-[#E6DDD0] bg-stone-900 shadow-[0_12px_28px_rgba(0,0,0,0.08)] ring-1 ring-inset ring-white/10 transition-[transform,shadow] duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_36px_rgba(0,0,0,0.12)]">
              <Image
                src={founder.image}
                alt={founder.alt}
                fill
                sizes="(max-width: 640px) 50vw, 50vw"
                className="object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority={i === 0}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <figcaption className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5">
                <p className="font-jakarta text-[12px] sm:text-[14px] font-bold tracking-tight text-white leading-snug">
                  {founder.name}
                </p>
                <p className="mt-0.5 font-jakarta text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.14em] text-yellow/90">
                  {founder.role}
                  <span className="mx-1.5 text-white/35" aria-hidden>
                    ·
                  </span>
                  {founder.focus}
                </p>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
    </Section>
  )
}

export default FoundersPortraits
