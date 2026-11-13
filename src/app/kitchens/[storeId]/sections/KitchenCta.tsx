'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components'
import { ROUTES } from '@/shared/seo'
import { fadeUp, kitchenViewport, staggerChildren } from './kitchen-motion'

type KitchenCtaProps = {
  kitchenName: string
  onOrderClick: () => void
}

export default function KitchenCta({
  kitchenName,
  onOrderClick,
}: KitchenCtaProps) {
  const shortName = kitchenName.replace(/\s+Kitchen\.?$/i, '').trim() || kitchenName

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={kitchenViewport}
      variants={staggerChildren}
      className="mx-auto flex max-w-2xl flex-col items-center text-center"
    >
      <motion.h2
        variants={fadeUp}
        className="font-jakarta text-[1.75rem] font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[2.15rem]"
      >
        Ready to eat from{' '}
        <span className="font-hand text-[1.15em] font-normal italic text-customer mr-1">
          {shortName}
        </span>{' '}
        kitchen?
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-md text-sm leading-relaxed text-ink/65 sm:text-base"
      >
        Order fresh home-cooked meals on the Mother Bhojan app — verified
        kitchen, real chef, delivered with care.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Button
          type="button"
          variant="customer"
          size="md"
          onClick={onOrderClick}
          className="px-6 font-bold"
        >
          Order from this kitchen
        </Button>
        <Button href={ROUTES.kitchens} variant="customerOutline" size="md">
          Browse all kitchens
        </Button>
      </motion.div>
    </motion.div>
  )
}
