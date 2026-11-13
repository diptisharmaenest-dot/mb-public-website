'use client'

import Image from 'next/image'
import { Section, SectionHeader } from '@/components'
import { VERIFIED_TRUST_SECTION_PROPS } from '@/shared/data/verified-kitchen'
import { youngSunitaSharma } from '@/assets/images'

const WhyMotherBhojanExists = () => {
  return (
    <Section
      id="why-mother-bhojan-exists"
      aria-labelledby="why-mother-bhojan-heading"
      flushTop
      flushBottom
      className="bg-[#FAF6F0]"
      innerClassName="py-14 sm:py-16 lg:py-20"
      {...VERIFIED_TRUST_SECTION_PROPS}
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-sm sm:aspect-[5/6] lg:col-span-5 lg:aspect-auto lg:h-[520px] xl:h-[560px]">
          <Image
            src={youngSunitaSharma}
            alt="Sunita Sharma — home cook on Mother Bhojan"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="flex flex-col items-start text-left lg:col-span-7">
          <SectionHeader
            id="why-mother-bhojan-heading"
            as="div"
            align="left"
            eyebrow="The hands behind your meal"
            marginBottom="mb-0"
            animated={false}
            classNames={{
              eyebrow: 'text-verified-text !mb-0',
              header: 'sr-only',
            }}
            lines={[{ text: 'Why Mother Bhojan exists' }]}
          />

          <blockquote className="mt-5 border-l-[3px] border-partner pl-4 font-hand text-2xl font-normal leading-[1.65] tracking-[0.01em] text-partner sm:mt-6 sm:pl-5 sm:text-[28px] lg:text-[30px]">
            “I cook rajma the way my mother taught me. Now 40 families in Mohali
            eat it every week.”
          </blockquote>

          <div className="mt-6 sm:mt-8">
            <h3 className="font-[500] text-xl tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]">
              Sunita Sharma
            </h3>
            <p className="mt-1.5 text-[14px] font-medium text-ink/80 sm:text-sm">
              Home cook · Mohali · On Mother Bhojan since 2025
            </p>
            <p className="mt-4 leading-[1.65] text-ink sm:text-base">
              Sunita is one of 120 women cooking on Mother Bhojan. You will meet
              her again on this page — in her audit, her kitchen, her reviews,
              and her own online store.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default WhyMotherBhojanExists
