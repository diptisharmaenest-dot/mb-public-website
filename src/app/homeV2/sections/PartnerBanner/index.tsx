import { Button, Section, SectionHeader } from '@/components'
import { ROUTES } from '@/shared/seo'

const PartnerBanner = () => {
  return (
    <Section
      id="partner"
      aria-labelledby="partner-banner-heading"
      className="bg-paper"
    >
      <div className="rounded-[28px] bg-partner px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 lg:px-16 lg:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="flex-1 text-left">
          <SectionHeader
            eyebrow="For Kitchen Partners"
            lines={[
              { text: "Turn your kitchen" },
              { text: "into a", accent: "business." }
            ]}
            id="partner-banner-heading"
            align="left"
            solid="white"
            animated={false}
            marginBottom="mb-0"
            classNames={{ eyebrow: 'text-yellow' }}
            accent="text-yellow"
          />
          <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#FFFAF2]/90 font-medium mt-4 max-w-[680px]">
            Local customers, full support, and cook at your own pace. Typical partners earn around ₹30,000 a month — earnings vary.
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-start md:justify-end">
          <Button
            href={ROUTES.join}
            variant="none"
            className="whitespace-nowrap sm:min-w-[220px] bg-paper hover:bg-white text-partner hover:text-partner-hover active:scale-[0.98] transition-all font-bold px-7 py-4 rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            Become a Kitchen Partner
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default PartnerBanner
