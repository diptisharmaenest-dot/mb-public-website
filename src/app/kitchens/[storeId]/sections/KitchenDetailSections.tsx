'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ChefStoreDetail, StoreDish } from '@/features'
import { Section } from '@/components'
import KitchenHero from './KitchenHero'
import KitchenInfo from './KitchenInfo'
import KitchenOrderingRight from './KitchenOrderingRight'
import KitchenCta from './KitchenCta'
import Link from 'next/link'
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi'
import { ROUTES } from '@/shared/seo'
import { isRemoteImageUrl } from '@/shared/lib'
import { EASE } from '@/shared/lib/motion'
import { fadeIn, kitchenViewport } from './kitchen-motion'

type LayoutProps = {
  store: ChefStoreDetail
  onSelectDish: (dish: StoreDish) => void
  onOpenHowToOrder: () => void
  onOpenGallery: (index?: number) => void
  onOrderClick: () => void
}

export default function KitchenDetailSections({
  store,
  onSelectDish,
  onOpenHowToOrder,
  onOpenGallery,
  onOrderClick,
}: LayoutProps) {
  const heroCoverSrc =
    store.coverImageUrl ||
    store.galleryImages?.[0] ||
    store.logoUrl

  return (
    <div className="w-full flex flex-col ">
      {/* SECTION 1: Hero — soft cover background */}
      <Section
        id="kitchen-hero-section"
        aria-labelledby="kitchen-hero-heading"
        flushTop
        flushBottom
        className="relative min-h-[48vh] overflow-hidden border-b border-border-subtle bg-ink md:min-h-[52vh]"
        innerClassName="relative z-10 flex w-full items-end pt-24 pb-10 md:pt-28 md:pb-14"
        decorations={
          heroCoverSrc ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.15, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={heroCoverSrc}
                  alt=""
                  fill
                  priority
                  className="object-cover object-[center_70%] sm:object-[center_65%]"
                  sizes="100vw"
                  unoptimized={isRemoteImageUrl(heroCoverSrc)}
                />
              </motion.div>
              {/* Strong left wash so white hero text stays readable on bright covers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-ink/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/62 to-ink/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25" />
                <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-black/55 via-black/28 to-transparent" />
              </motion.div>
            </div>
          ) : (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 bg-ink/80"
            />
          )
        }
      >
        <KitchenHero store={store} onOrderClick={onOrderClick} />
      </Section>

      {/* SECTION 2: Breadcrumb */}
      <Section
        id="kitchen-breadcrumb-section"
        className="bg-surface border-b border-ink/8"
        innerClassName="py-2 sm:py-2.5"
        flushTop
        flushBottom
      >
        <motion.nav
          aria-label="Breadcrumb"
          initial="hidden"
          whileInView="show"
          viewport={kitchenViewport}
          variants={fadeIn}
          className="flex min-h-[24px] flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-muted sm:min-h-[26px] sm:text-xs"
        >
          <div className="flex items-center gap-2">
            <Link href={ROUTES.home} className="font-semibold transition-colors hover:!text-customer">Home</Link>
            <FiChevronRight className="h-3.5 w-3.5 text-muted/50" />
            <Link href={ROUTES.kitchens} className="font-semibold transition-colors hover:!text-customer">Kitchens</Link>
            <FiChevronRight className="h-3.5 w-3.5 text-muted/50" />
            <span className="max-w-[200px] truncate font-bold text-ink sm:max-w-none">{store.name}</span>
          </div>
          <Link href={ROUTES.kitchens} className="inline-flex cursor-pointer items-center gap-1 font-jakarta text-[11px] font-bold text-customer hover:!underline hover:!text-customer sm:text-xs">
            <FiArrowLeft className="h-3 w-3 stroke-[2.5]" />
            <span>Back to kitchens</span>
          </Link>
        </motion.nav>
      </Section>

      {/* SECTION 3: Kitchen Overview */}
      <Section
        id="kitchen-info-section"
        className="border-b border-border-subtle bg-paper"
      >
        <KitchenInfo
          store={store}
          onOpenHowToOrder={onOpenHowToOrder}
          onOpenGallery={onOpenGallery}
        />
      </Section>

      {/* SECTION 4: Menu & Ordering — full-bleed */}
      <Section
        id="kitchen-ordering-section"
        fullWidth
        noPaddingX
        flushTop
        flushBottom
        className="border-b border-border-subtle bg-paper"
        innerClassName="max-w-none py-12 md:py-16"
      >
        <KitchenOrderingRight store={store} onSelectDish={onSelectDish} />
      </Section>

      {/* SECTION 5: Bottom CTA */}
      <Section
        id="kitchen-cta-section"
        flushTop
        flushBottom
        className="border-t border-border-subtle bg-yellow/10"
        innerClassName="py-14 md:py-20"
      >
        <KitchenCta kitchenName={store.name} onOrderClick={onOrderClick} />
      </Section>
    </div>
  )
}
