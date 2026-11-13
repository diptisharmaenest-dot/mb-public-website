'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { FiChevronRight, FiClock, FiSliders } from 'react-icons/fi'
import type { ChefStoreDetail, StoreDish } from '@/features'
import { Button, RADIUS_BTN } from '@/components'
import { isRemoteImageUrl } from '@/shared/lib'
import { imageForDish } from '@/app/home/data/featured-kitchens'
import { EASE } from '@/shared/lib/motion'

type KitchenOrderingRightProps = {
  store: ChefStoreDetail
  onSelectDish: (dish: StoreDish) => void
}

const CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Thalis',
  'Snacks',
  'Drinks',
] as const

type CategoryType = (typeof CATEGORIES)[number]
type DietFilter = 'all' | 'veg' | 'non-veg'
type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating'

function formatInr(price: number) {
  if (!price || price <= 0) return '₹99'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

function categoryDisplayTitle(catName: string) {
  if (catName === 'Lunch') return 'Lunch (11:30 AM – 3:00 PM)'
  if (catName === 'Breakfast') return 'Breakfast (7:30 AM – 11:00 AM)'
  if (catName === 'Dinner') return 'Dinner (6:30 PM – 10:00 PM)'
  return catName
}

function sortDishes(dishes: StoreDish[], sortBy: SortOption) {
  const next = [...dishes]
  if (sortBy === 'price-low') next.sort((a, b) => (a.price || 0) - (b.price || 0))
  else if (sortBy === 'price-high') next.sort((a, b) => (b.price || 0) - (a.price || 0))
  else if (sortBy === 'rating') next.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  return next
}

export default function KitchenOrderingRight({
  store,
  onSelectDish,
}: KitchenOrderingRightProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [dietFilter, setDietFilter] = useState<DietFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [sortOpen, setSortOpen] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const isClickScrolling = useRef(false)

  const allDishes = useMemo(() => {
    const dishList: StoreDish[] = []
    store.menuCategories.forEach((cat) => {
      cat.dishes.forEach((d) => {
        dishList.push({
          ...d,
          category: d.category || cat.categoryName,
        })
      })
    })
    return dishList
  }, [store])

  const signatureDishes = useMemo(() => {
    const signatureCat = store.menuCategories.find((c) =>
      c.categoryName.toLowerCase().includes('signature')
    )
    if (signatureCat && signatureCat.dishes.length > 0) {
      return signatureCat.dishes.slice(0, 3)
    }
    return allDishes.slice(0, 3)
  }, [store, allDishes])

  const infiniteSignatureDishes = useMemo(() => {
    if (signatureDishes.length === 0) return []
    return Array.from({ length: 6 }, () => signatureDishes).flat()
  }, [signatureDishes])

  const categorySections = useMemo(() => {
    const allCatNames = new Set<string>()
    CATEGORIES.forEach((c) => allCatNames.add(c))
    store.menuCategories?.forEach((c) => {
      if (c.categoryName) allCatNames.add(c.categoryName)
    })
    allDishes.forEach((d) => {
      if (d.category) allCatNames.add(d.category)
      if (d.shiftType) allCatNames.add(d.shiftType)
    })

    return Array.from(allCatNames).map((catName) => {
      let categoryDishes = allDishes.filter(
        (d) =>
          d.category?.toLowerCase() === catName.toLowerCase() ||
          d.shiftType?.toLowerCase() === catName.toLowerCase()
      )

      if (dietFilter === 'veg') {
        categoryDishes = categoryDishes.filter((d) => d.isVeg)
      } else if (dietFilter === 'non-veg') {
        categoryDishes = categoryDishes.filter((d) => !d.isVeg)
      }

      return {
        categoryName: catName,
        displayTitle: categoryDisplayTitle(catName),
        dishes: sortDishes(categoryDishes, sortBy),
      }
    }).filter((section) => section.dishes.length > 0)
  }, [store, allDishes, dietFilter, sortBy])

  const navCategories = useMemo(
    () =>
      categorySections.map((sec) => ({
        name: sec.categoryName,
        count: sec.dishes.length,
      })),
    [categorySections]
  )

  useEffect(() => {
    if (navCategories.length === 0) {
      setActiveCategory(null)
      return
    }
    if (!activeCategory || !navCategories.some((c) => c.name === activeCategory)) {
      setActiveCategory(navCategories[0].name)
    }
  }, [navCategories, activeCategory])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    navCategories.forEach((cat) => {
      const el = sectionRefs.current[cat.name]
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isClickScrolling.current) {
            setActiveCategory(cat.name)
          }
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [navCategories])

  const scrollToCategory = (catName: string) => {
    setActiveCategory(catName)
    const el = sectionRefs.current[catName]
    if (!el) return

    isClickScrolling.current = true
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => {
      isClickScrolling.current = false
    }, 700)
  }

  return (
    <div className="flex w-full flex-col gap-10">
      {/* Signature Dishes — full-bleed marquee */}
      <section className="w-full">
        <div className="gutter-x mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-jakarta text-[10px] font-bold uppercase tracking-[0.22em] text-customer">
              Kitchen favorites
            </p>
            <h2 className="mt-1 font-jakarta text-lg font-extrabold tracking-tight text-ink sm:text-xl">
              Signature Dishes
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-relaxed text-muted sm:block">
            The dishes this kitchen is known for — prepared fresh when you order.
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-paper to-transparent sm:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-paper to-transparent sm:w-12" />

          <div className="flex w-max gap-4 animate-mb-marquee py-2 hover:[animation-play-state:paused] sm:gap-5">
            {infiniteSignatureDishes.map((dish, i) => {
              const badge =
                dish.badge ||
                (i % 3 === 0 ? 'Bestseller' : "Chef's Pick")

              return (
                <motion.article
                  key={`sig-marquee-${dish.dishName}-${i}`}
                  onClick={() => onSelectDish(dish)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="group relative h-[280px] w-[200px] shrink-0 cursor-pointer select-none overflow-hidden rounded-[22px] bg-stone-900 shadow-[0_12px_32px_-12px_rgba(42,31,24,0.35)] hover:shadow-[0_22px_40px_-14px_rgba(42,31,24,0.5)] sm:h-[320px] sm:w-[230px]"
                >
                  <Image
                    src={imageForDish(dish.dishName, dish.dishImageUrl)}
                    alt={dish.dishName}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="230px"
                    unoptimized={isRemoteImageUrl(dish.dishImageUrl)}
                  />

                  {/* Warm vignette + bottom read for text */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/90"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent"
                  />

                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm transition-colors group-hover:bg-white/25">
                      {badge}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3.5 transition-transform duration-500 group-hover:translate-y-[-2px] sm:p-4">
                    <div>
                      <h3 className="font-jakarta text-[15px] font-extrabold leading-snug text-white line-clamp-2 sm:text-base">
                        {dish.dishName}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/70">
                        {dish.description ||
                          'A house specialty, cooked fresh for every order.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t border-white/15 pt-2.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/65">
                        <FiClock className="h-3 w-3" />
                        {dish.prepTime || '30 min'}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 font-jakarta text-sm font-extrabold text-customer shadow-sm transition-transform duration-300 group-hover:scale-105">
                        {formatInr(dish.price)}
                        <FiChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Browse Menu — header outside; sidebar aligns with category sections */}
      <section className="gutter-x w-full">
        <div className="sticky top-0 z-30 -mx-1 bg-paper px-1 pb-5 pt-5 sm:pt-6">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <div className="min-w-0">
              <h2 className="m-0 font-jakarta text-xs font-extrabold uppercase tracking-widest text-ink/70">
                Browse Menu
              </h2>
              <p className="m-0 mt-1 hidden text-[12px] leading-snug text-muted sm:block">
                {navCategories.reduce((sum, c) => sum + c.count, 0)} dishes across{' '}
                {navCategories.length} sections
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className={`inline-flex items-center gap-0.5 border border-ink/10 bg-white p-1 ${RADIUS_BTN}`}
                role="group"
                aria-label="Diet filter"
              >
                {(
                  [
                    { id: 'all', label: 'All', marker: null },
                    { id: 'veg', label: 'Veg', marker: 'veg' as const },
                    { id: 'non-veg', label: 'Non Veg', marker: 'non-veg' as const },
                  ] as const
                ).map((opt) => {
                  const isActive = dietFilter === opt.id
                  return (
                    <Button
                      key={opt.id}
                      type="button"
                      size="sm"
                      variant="none"
                      aria-pressed={isActive}
                      onClick={() => setDietFilter(opt.id)}
                      className={clsx(
                        `h-8 min-h-0 gap-1.5 px-3 py-0 text-[12.5px] font-bold shadow-none hover:translate-y-0 ${RADIUS_BTN}`,
                        isActive
                          ? 'bg-customer !text-white'
                          : 'bg-transparent !text-ink/55 hover:!text-ink'
                      )}
                    >
                      {opt.marker ? (
                        <span
                          aria-hidden
                          className={clsx(
                            'inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[2px] border bg-white',
                            opt.marker === 'veg' ? 'border-verified' : 'border-customer'
                          )}
                        >
                          <span
                            className={clsx(
                              'h-1.5 w-1.5 rounded-full',
                              opt.marker === 'veg' ? 'bg-verified' : 'bg-customer'
                            )}
                          />
                        </span>
                      ) : null}
                      {opt.label}
                    </Button>
                  )
                })}
              </div>

              <div className="relative">
                <Button
                  type="button"
                  size="sm"
                  variant="none"
                  aria-expanded={sortOpen}
                  aria-label="Sort menu"
                  onClick={() => setSortOpen((o) => !o)}
                  className={clsx(
                    `h-[40px] min-h-0 gap-1.5 border border-ink/10 bg-white px-3 py-0 text-[12.5px] font-bold shadow-none hover:translate-y-0 hover:border-ink/20 ${RADIUS_BTN}`,
                    sortOpen ? '!text-customer' : '!text-ink/70 hover:!text-ink'
                  )}
                >
                  <FiSliders className="h-3 w-3 opacity-70" strokeWidth={2} />
                  Sort
                </Button>
                {sortOpen ? (
                  <>
                    <button
                      type="button"
                      aria-label="Close sort menu"
                      className="fixed inset-0 z-10 cursor-default"
                      onClick={() => setSortOpen(false)}
                    />
                    <div
                      className={`absolute right-0 z-20 mt-2 min-w-[168px] overflow-hidden border border-ink/10 bg-white py-1 shadow-[0_12px_28px_-10px_rgba(42,31,24,0.2)] ${RADIUS_BTN}`}
                    >
                      {(
                        [
                          { id: 'popular', label: 'Popular' },
                          { id: 'rating', label: 'Top rated' },
                          { id: 'price-low', label: 'Price: Low to High' },
                          { id: 'price-high', label: 'Price: High to Low' },
                        ] as const
                      ).map((opt) => (
                        <Button
                          key={opt.id}
                          type="button"
                          variant="none"
                          size="sm"
                          onClick={() => {
                            setSortBy(opt.id)
                            setSortOpen(false)
                          }}
                          className={clsx(
                            'h-auto min-h-0 w-full justify-start rounded-none px-3.5 py-2.5 text-left text-[12.5px] shadow-none hover:translate-y-0',
                            sortBy === opt.id
                              ? 'bg-customer/5 font-bold !text-customer'
                              : 'font-medium !text-ink/70 hover:bg-stone-50 hover:!text-ink'
                          )}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* Left: category filter — top aligns with Breakfast header */}
          <aside className="w-full shrink-0 lg:sticky lg:top-[6rem] lg:z-20 lg:w-[240px] lg:self-start">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:hidden">
              {navCategories.map((cat) => (
                <button
                  key={`mobile-nav-${cat.name}`}
                  type="button"
                  onClick={() => scrollToCategory(cat.name)}
                  className={clsx(
                    'shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition-colors',
                    activeCategory === cat.name
                      ? 'bg-customer text-white'
                      : 'bg-surface text-ink/70 hover:bg-border-subtle hover:text-ink'
                  )}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            <nav
              aria-label="Menu categories"
              className="hidden overflow-hidden rounded-2xl border border-ink/10 bg-white lg:block"
            >
              <ul className="py-1">
                {navCategories.map((cat) => {
                  const isActive = activeCategory === cat.name
                  return (
                    <li key={`nav-${cat.name}`}>
                      <button
                        type="button"
                        onClick={() => scrollToCategory(cat.name)}
                        className={clsx(
                          'relative flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left text-sm transition-colors',
                          isActive
                            ? 'bg-customer/5 font-bold text-ink'
                            : 'font-medium text-ink/65 hover:bg-stone-50 hover:text-ink'
                        )}
                      >
                        {isActive ? (
                          <span
                            aria-hidden
                            className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-customer"
                          />
                        ) : null}
                        <span>{cat.name}</span>
                        <span
                          className={clsx(
                            'text-xs tabular-nums',
                            isActive ? 'font-bold text-customer' : 'text-muted'
                          )}
                        >
                          ({cat.count})
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* Right: category sections (aligned with sidebar) */}
          <div className="min-w-0 flex-1">
            {categorySections.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-paper p-8 text-center">
                <p className="text-sm text-body">No dishes found for this filter.</p>
              </div>
            ) : (
              <div className="space-y-10">
                {categorySections.map((sec) => (
                  <div
                    key={`cat-sec-${sec.categoryName}`}
                    id={`menu-cat-${sec.categoryName}`}
                    ref={(el) => {
                      sectionRefs.current[sec.categoryName] = el
                    }}
                    className="scroll-mt-32 space-y-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="shrink-0 font-jakarta text-base font-extrabold text-ink sm:text-lg">
                        {sec.displayTitle}
                      </h3>
                      <div className="w-full border-b border-border-subtle" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4">
                      {sec.dishes.map((dish, idx) => {
                        const rating =
                          dish.rating > 0 ? dish.rating.toFixed(1) : '4.8'
                        const dishImage = imageForDish(
                          dish.dishName,
                          dish.dishImageUrl
                        )
                        const badge =
                          dish.badge ||
                          (idx % 7 === 0
                            ? 'Bestseller'
                            : idx % 5 === 0
                              ? "Chef's Pick"
                              : null)

                        return (
                          <motion.button
                            key={`menu-item-${sec.categoryName}-${dish.dishName}-${idx}`}
                            type="button"
                            onClick={() => onSelectDish(dish)}
                            whileHover={{ y: -6 }}
                            whileTap={{ scale: 0.985 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border-subtle bg-white text-left shadow-[0_2px_10px_-4px_rgba(42,31,24,0.06)] hover:border-customer/25 hover:shadow-[0_16px_28px_-12px_rgba(42,31,24,0.18)]"
                          >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                              <Image
                                src={dishImage}
                                alt={dish.dishName}
                                fill
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                unoptimized={isRemoteImageUrl(dishImage)}
                              />
                              <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                              />
                              {badge ? (
                                <span className="absolute left-0 top-3 rounded-r-md bg-verified px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                                  {badge}
                                </span>
                              ) : null}
                            </div>

                            <div className="flex flex-1 flex-col gap-2 p-3.5">
                              <div className="flex items-start gap-2">
                                <span
                                  className={clsx(
                                    'mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border bg-white',
                                    dish.isVeg
                                      ? 'border-verified'
                                      : 'border-customer'
                                  )}
                                  aria-label={
                                    dish.isVeg ? 'Vegetarian' : 'Non-vegetarian'
                                  }
                                >
                                  <span
                                    className={clsx(
                                      'h-1.5 w-1.5 rounded-full',
                                      dish.isVeg ? 'bg-verified' : 'bg-customer'
                                    )}
                                  />
                                </span>
                                <h4 className="line-clamp-2 font-jakarta text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-customer">
                                  {dish.dishName}
                                </h4>
                              </div>

                              <p className="line-clamp-2 text-xs leading-snug text-muted">
                                {dish.description ||
                                  'Fresh home-cooked, prepared when you order.'}
                              </p>

                              <div className="mt-auto flex items-center gap-2 pt-1">
                                <span className="inline-flex items-center gap-1 rounded-md bg-verified px-1.5 py-0.5 text-[11px] font-bold text-white">
                                  ★ {rating}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted">
                                  <FiClock className="h-3 w-3" />
                                  {dish.prepTime || '30 min'}
                                </span>
                              </div>

                              <div className="flex items-center justify-between gap-2 pt-1">
                                <span className="font-jakarta text-base font-extrabold text-ink">
                                  {formatInr(dish.price)}
                                </span>
                                <span className="inline-flex items-center gap-0.5 rounded-lg border border-customer px-3 py-1.5 text-xs font-bold text-customer transition-all duration-300 group-hover:bg-customer group-hover:text-white group-hover:shadow-sm">
                                  order
                                  <FiChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </span>
                              </div>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
