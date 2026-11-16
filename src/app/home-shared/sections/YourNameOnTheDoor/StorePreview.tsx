'use client'

import { useEffect, useRef, useState } from 'react'
import StoreFront from '@/shared/components/sections/StoreFront/StoreFront'
import { demoPreviewMenu, demoStoreDetail } from '@/app/kitchens/demo-store'

/**
 * Home v2 "Your name on the door" preview: the new store design with the same
 * content as the Ananya's Kitchen example page it opens; the kitchen name
 * updates as people type. Rendered at a fixed design width and scaled to fit.
 */
const W = 1180

export default function StorePreview({ kitchenName }: { kitchenName: string }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.45)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const box = boxRef.current
    const inner = innerRef.current
    if (!box || !inner) return
    const update = () => {
      const s = box.clientWidth / W
      setScale(s)
      setHeight(inner.offsetHeight * s)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(box)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={boxRef} className="relative w-full overflow-hidden bg-[#FBF6F0]" style={{ height: height || undefined }} aria-hidden>
      <div ref={innerRef} className="absolute left-0 top-0 origin-top-left p-8" style={{ width: W, transform: `scale(${scale})` }}>
        <StoreFront
          mode="preview"
          name={kitchenName}
          nameCaret
          cuisine={demoStoreDetail.cuisineLabel}
          avatar={null}
          cover={demoStoreDetail.coverImageUrl}
          rating={null}
          city="Mohali"
          deliveryLabel="Home delivery"
          preorderLabel="Freshly cooked to order"
          categories={demoPreviewMenu}
        />
      </div>
    </div>
  )
}
