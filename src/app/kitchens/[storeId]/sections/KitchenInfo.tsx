'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiChevronRight, FiArrowUpRight } from 'react-icons/fi'
import type { ChefStoreDetail } from '@/features'
import { isRemoteImageUrl } from '@/shared/lib'
import { VerifiedKitchenBadge } from '@/components'
import { DEFAULT_CHEF_STORY, buildKitchenGalleryImages } from '@/app/home/data/featured-kitchens'
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  kitchenViewport,
  scaleIn,
  staggerChildren,
} from './kitchen-motion'

type KitchenInfoProps = {
  store: ChefStoreDetail
  onOpenHowToOrder: () => void
  onOpenGallery: (index?: number) => void
}

const STORY_TAGS = [
  '15 yrs cooking experience',
  'Authentic family recipes',
  'Fresh daily ingredients',
] as const

/** First sentence as hand pull-quote; remainder as readable body. */
function splitStory(story: string): { pull: string; rest: string } {
  const trimmed = story.trim()
  const match = trimmed.match(/^(.+?[.!?])\s+([\s\S]+)$/)
  if (!match) return { pull: trimmed, rest: '' }
  return { pull: match[1].trim(), rest: match[2].trim() }
}

export default function KitchenInfo({
  store,
  onOpenHowToOrder,
  onOpenGallery,
}: KitchenInfoProps) {
  const chefStory = store.chefStory || DEFAULT_CHEF_STORY
  const { pull, rest } = splitStory(chefStory)
  const chefName = store.storeOwnerName || store.name

  const galleryImages = buildKitchenGalleryImages(store.galleryImages)
  const thumbnails = galleryImages.slice(0, 4)
  const remainingCount = Math.max(0, galleryImages.length - 4)

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Her story */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={kitchenViewport}
        variants={fadeLeft}
        custom={0}
        className="flex flex-col lg:col-span-5"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <VerifiedKitchenBadge variant="full" iconSize={32} />
          <button
            type="button"
            onClick={onOpenHowToOrder}
            className="inline-flex cursor-pointer items-center gap-1 font-jakarta text-sm font-bold text-customer transition-colors hover:text-customer/80"
          >
            How to order
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-5 font-jakarta text-[11px] font-extrabold uppercase tracking-[0.18em] text-olive">
          Her story
        </p>

        <blockquote className="relative mt-3">
          <span
            aria-hidden
            className="absolute -left-1 top-0 font-hand text-5xl leading-none text-customer/25"
          >
            &ldquo;
          </span>
          <p className="pl-5 font-hand text-[1.25rem] leading-snug text-ink sm:text-[1.35rem]">
            {pull}
          </p>
          {rest ? (
            <p className="mt-3 font-jakarta text-sm leading-relaxed text-ink/70 sm:text-[15px]">
              {rest}
            </p>
          ) : null}
          <footer className="mt-3 flex items-center gap-3">
            <span className="h-px w-8 bg-customer/50" aria-hidden />
            <span className="font-jakarta text-sm font-semibold text-ink/60">
              {chefName}
            </span>
          </footer>
        </blockquote>

        <div className="mt-5 flex flex-wrap gap-2">
          {STORY_TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-verified-pill-border bg-verified-pill px-3 py-1 text-xs font-semibold text-verified-text"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Kitchen gallery */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={kitchenViewport}
        variants={staggerChildren}
        className="lg:col-span-7"
      >
        <motion.div
          variants={fadeRight}
          custom={0}
          className="mb-3 flex items-center justify-between gap-3"
        >
          <p className="font-jakarta text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted">
            Kitchen gallery
          </p>
          <button
            type="button"
            onClick={() => onOpenGallery(0)}
            className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-customer transition-colors hover:text-customer/80"
          >
            View all
            <FiArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>

        <div className="grid grid-cols-12 grid-rows-[130px_130px] gap-2 sm:grid-rows-[150px_150px] sm:gap-2.5 md:grid-rows-[170px_170px]">
          {thumbnails[0] && (
            <motion.button
              type="button"
              variants={scaleIn}
              onClick={() => onOpenGallery(0)}
              className="group relative col-span-7 row-span-2 cursor-pointer overflow-hidden rounded-[18px] bg-stone-200"
            >
              <Image
                src={thumbnails[0]}
                alt={`${chefName}'s kitchen`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 58vw, 32vw"
                unoptimized={isRemoteImageUrl(thumbnails[0])}
              />
            </motion.button>
          )}

          {thumbnails[1] && (
            <motion.button
              type="button"
              variants={fadeUp}
              onClick={() => onOpenGallery(1)}
              className="group relative col-span-5 cursor-pointer overflow-hidden rounded-[18px] bg-stone-200"
            >
              <Image
                src={thumbnails[1]}
                alt="Kitchen photo 2"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 42vw, 22vw"
                unoptimized={isRemoteImageUrl(thumbnails[1])}
              />
            </motion.button>
          )}

          {thumbnails[2] && (
            <motion.button
              type="button"
              variants={fadeUp}
              onClick={() => onOpenGallery(2)}
              className="group relative col-span-2 cursor-pointer overflow-hidden rounded-[18px] bg-stone-200"
            >
              <Image
                src={thumbnails[2]}
                alt="Kitchen photo 3"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 17vw, 9vw"
                unoptimized={isRemoteImageUrl(thumbnails[2])}
              />
            </motion.button>
          )}

          <motion.button
            type="button"
            variants={fadeUp}
            onClick={() => onOpenGallery(3)}
            className="group relative col-span-3 cursor-pointer overflow-hidden rounded-[18px] bg-stone-200"
          >
            <Image
              src={thumbnails[3] || thumbnails[0]}
              alt="More kitchen photos"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 25vw, 14vw"
              unoptimized={isRemoteImageUrl(thumbnails[3] || thumbnails[0])}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ink/55 transition-colors group-hover:bg-ink/65">
              <span className="font-jakarta text-lg font-extrabold text-white sm:text-xl">
                +{remainingCount > 0 ? remainingCount : 3}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/85">
                More
              </span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
