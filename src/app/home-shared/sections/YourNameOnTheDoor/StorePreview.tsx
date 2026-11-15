'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { LuCalendarDays, LuChefHat, LuMapPin, LuShoppingBag, LuStar, LuTruck } from 'react-icons/lu'
import { mLogo } from '@/assets'
import cover from '@/assets/images/store-preview/cover.jpg'
import samosa from '@/assets/images/store-preview/samosa.jpg'
import pakora from '@/assets/images/store-preview/pakora.jpg'
import curry from '@/assets/images/store-preview/curry.jpg'
import dalRice from '@/assets/images/store-preview/dal-rice.jpg'
import riceCurry from '@/assets/images/store-preview/rice-curry.jpg'
import bhature from '@/assets/images/store-preview/bhature.jpg'

/**
 * Live store preview for "Your name on the door" — same look as the old
 * static picture, drawn in code so the kitchen name updates as people type.
 * Sample menu only (illustrative); no photos of people, no made-up ratings.
 */

/** Design size of the preview; it is scaled to fit its container. */
const W = 855
const H = 680

type Dish = { name: string; price: number; note: string; img: StaticImageData }
const MENU: { title: string; dishes: [Dish, Dish] }[] = [
  {
    title: 'Starters',
    dishes: [
      { name: 'Aloo samosa', price: 80, note: 'Crispy pastry filled with spiced potato and peas.', img: samosa },
      { name: 'Mixed pakora', price: 120, note: 'Assorted vegetable fritters.', img: pakora },
    ],
  },
  {
    title: 'Thalis',
    dishes: [
      { name: 'Paneer butter masala', price: 220, note: 'Soft paneer in a rich tomato gravy.', img: curry },
      { name: 'Dal makhani thali', price: 180, note: 'Slow-cooked black dal with rice.', img: dalRice },
    ],
  },
  {
    title: 'Curries',
    dishes: [
      { name: 'Rajma chawal', price: 150, note: 'Home-style rajma with steamed rice.', img: riceCurry },
      { name: 'Chole bhature', price: 160, note: 'Spiced chickpeas served with bhature.', img: bhature },
    ],
  },
]

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 32) || 'your-kitchen'
  )
}

export default function StorePreview({ kitchenName }: { kitchenName: string }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.6)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={boxRef} className="relative w-full" style={{ height: H * scale }}>
      <div
        className="absolute left-0 top-0 origin-top-left font-jakarta text-ink"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
        aria-hidden
      >
        {/* Browser bar */}
        <div className="flex h-[44px] items-center gap-3 bg-[#E8E2D8] px-3">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#EE5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#F4BE4F]" />
            <span className="h-3 w-3 rounded-full bg-[#7FA84A]" />
          </span>
          <span className="ml-2 text-[18px] text-ink/40">‹ &nbsp;›</span>
          <span className="mx-auto flex h-[28px] w-[360px] items-center justify-center gap-1.5 truncate rounded-full bg-white px-4 text-[15px] text-ink/80">
            <span className="text-[11px]">🔒</span>
            motherbhojan.com/kitchens/{slugify(kitchenName)}
          </span>
          <span className="w-[60px]" />
        </div>

        <div className="grid h-[636px] grid-cols-[335px_1fr]">
          {/* Store profile */}
          <div className="relative bg-white px-3 pt-4">
            <div className="relative h-[102px] overflow-hidden rounded-[14px]">
              <Image src={cover} alt="" fill sizes="320px" className="object-cover" />
            </div>
            <span className="absolute left-[18px] top-[76px] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#FBF3E8] ring-[3px] ring-white">
              <LuChefHat className="h-7 w-7 text-ink-soft" />
            </span>
            <div className="mt-6 flex items-center gap-3 pl-1">
              <p className="max-w-[230px] truncate text-[22px] font-medium">
                {kitchenName}
                <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-ink align-middle" style={{ height: 24 }} />
              </p>
              <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-verified">
                <Image src={mLogo} alt="" width={26} height={26} />
              </span>
            </div>
            <p className="mt-1 pl-1 text-[15px] text-ink/55">By you</p>
            <p className="mt-2.5 ml-1 inline-flex items-center gap-1.5 rounded-full bg-[#F1ECE4] px-3 py-1 text-[14px] text-ink/70">
              <LuStar className="h-3.5 w-3.5 fill-yellow text-yellow" /> New on Mother Bhojan
            </p>
            <p className="mt-3 pl-1 text-[15px] leading-[1.6] text-ink/85">
              Home-cooked North Indian meals made fresh to order — the kind of food you would wait for at home.
            </p>
            <p className="mt-4 flex items-center gap-1.5 pl-1 text-[15px] font-semibold">
              <LuMapPin className="h-4 w-4 text-customer" /> Home kitchen · Mohali
            </p>
            <div className="mt-2.5 flex h-[76px] items-center justify-center rounded-[12px] bg-[#E9E3D9]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-customer ring-2 ring-white">
                <LuMapPin className="h-4 w-4 text-white" />
              </span>
            </div>
            <p className="mt-3 flex items-center gap-5 pl-1 text-[15px]">
              <span className="flex items-center gap-1.5 font-semibold">
                <LuTruck className="h-4 w-4" /> Delivery
              </span>
              <span className="flex items-center gap-1.5 text-ink/45">
                <LuShoppingBag className="h-4 w-4" /> Pickup
              </span>
            </p>
            <div className="mt-3 flex h-[42px] items-center justify-center gap-2 rounded-[10px] bg-ink text-[15px] font-medium text-white">
              <LuCalendarDays className="h-4 w-4" /> View Schedule
            </div>
            <p className="mt-3 pl-1 text-[15px] font-semibold">Pre-order Now</p>
            <p className="pl-1 text-[14px] text-ink/55">Pre-order at least 90 minutes in advance.</p>
          </div>

          {/* Menu */}
          <div className="bg-[#FFF8F1] px-6 pt-5">
            <div className="flex items-center justify-between">
              <p className="text-[22px] font-medium">Menu</p>
              <span className="flex items-center gap-2 rounded-full bg-customer px-5 py-2.5 text-[15px] font-medium text-white">
                <LuShoppingBag className="h-4 w-4" /> 2 Items &nbsp;₹400
              </span>
            </div>
            <div className="mt-2 flex gap-2.5">
              {MENU.map((m, i) => (
                <span
                  key={m.title}
                  className={`rounded-full px-3.5 py-2 text-[15px] ${i === 0 ? 'bg-ink text-white' : 'bg-[#E9E3D9] text-ink/55'}`}
                >
                  {m.title}
                </span>
              ))}
            </div>
            {MENU.map((m) => (
              <div key={m.title}>
                <p className="mb-2.5 mt-3.5 text-[20px] font-medium">{m.title}</p>
                <div className="grid grid-cols-2 gap-3">
                  {m.dishes.map((d) => (
                    <div key={d.name} className="flex h-[120px] gap-2 rounded-[14px] bg-white p-4 ring-1 ring-ink/8">
                      <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-medium leading-snug">{d.name}</p>
                        <p className="mt-1 text-[15px] font-medium text-customer">₹{d.price}</p>
                        <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-ink/55">{d.note}</p>
                      </div>
                      <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[10px]">
                        <Image src={d.img} alt="" fill sizes="60px" className="object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
