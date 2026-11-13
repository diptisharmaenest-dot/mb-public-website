'use client'

import { useState } from 'react'
import type { ChefStoreDetail, StoreDish } from '@/features'
import { Section } from '@/components'
import KitchenDetailSections from './KitchenDetailSections'
import { AppDownloadModal, HowToOrderModal, GalleryModal } from './KitchenModals'

export default function KitchenDetailLayout({ store }: { store: ChefStoreDetail }) {
  const [selectedDish, setSelectedDish] = useState<StoreDish | null>(null)
  const [isAppModalOpen, setIsAppModalOpen] = useState(false)
  const [isHowToOrderOpen, setIsHowToOrderOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0)

  const handleSelectDish = (dish: StoreDish) => {
    setSelectedDish(dish)
    setIsAppModalOpen(true)
  }

  const handleOpenHowToOrder = () => {
    setIsHowToOrderOpen(true)
  }

  const handleOpenAppDownload = () => {
    setSelectedDish(null)
    setIsAppModalOpen(true)
  }

  const handleOpenGallery = (index: number = 0) => {
    setGalleryInitialIndex(index)
    setIsGalleryOpen(true)
  }

  return (
    <Section
      id="kitchen-detail-page"
      flushTop
      flushBottom
      fullWidth
      noPaddingX
      className="bg-paper min-h-screen w-full"
      innerClassName="pt-0 pb-0 px-0 w-full max-w-none"
    >
      <KitchenDetailSections
        store={store}
        onSelectDish={handleSelectDish}
        onOpenHowToOrder={handleOpenHowToOrder}
        onOpenGallery={handleOpenGallery}
        onOrderClick={handleOpenAppDownload}
      />

      <AppDownloadModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        dish={selectedDish}
        kitchenName={store.name}
      />

      <HowToOrderModal
        isOpen={isHowToOrderOpen}
        onClose={() => setIsHowToOrderOpen(false)}
      />

      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={store.galleryImages || [store.coverImageUrl || store.logoUrl]}
        initialIndex={galleryInitialIndex}
      />
    </Section>
  )
}
