'use client'

import { useId, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import {
  Button,
  compactAccentLine,
  RADIUS_BTN,
  RADIUS_CARD,
  RADIUS_PANEL,
  Section,
  SectionHeader,
} from '@/components'
import StorePreview from './StorePreview'
import ClassicPreview from './ClassicPreview'
import { ROUTES } from '@/shared/seo'

const DEFAULT_KITCHEN_NAME = "Ananya's Kitchen"

/**
 * Shown only once a real kitchen is live (the page passes `exampleStoreHref`,
 * the first real kitchen's page). "See your store" opens that real store.
 */
const YourNameOnTheDoor = ({
  exampleStoreHref = ROUTES.join,
  design = 'classic',
}: {
  exampleStoreHref?: string
  /** 'classic' = main Home (profile-left card); 'v2' = Home v2 (new store design). */
  design?: 'classic' | 'v2'
}) => {
  const inputId = useId()
  const [kitchenName, setKitchenName] = useState(DEFAULT_KITCHEN_NAME)
  const displayName = kitchenName.trim() || DEFAULT_KITCHEN_NAME

  return (
    <Section
      id="your-name-on-the-door"
      aria-labelledby="your-name-on-the-door-heading"
      flushTop
    >
      <div
        className={`${RADIUS_PANEL} bg-mb-ink-panel px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-14 xl:py-16`}
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-14">
          <div className="min-w-0 lg:pr-2">
            <SectionHeader
              eyebrow="For the woman who cooks"
              id="your-name-on-the-door-heading"
              align="left"
              gradient="whiteSoft"
              marginBottom="mb-0"
              animated={false}
              classNames={{
                eyebrow: 'text-verified',
                description: ' !text-white/70',
              }}
              description="Every cook on Mother Bhojan gets her own branded online store — her name, her menu, her prices. One link, shared with pride."
              lines={[
                { text: 'Your kitchen' },
                compactAccentLine({
                  text: 'Your name',
                  accent: 'on the door',
                }),
              ]}
            />

            <form
              className="mt-8 sm:mt-9"
              onSubmit={(event) => {
                event.preventDefault()
                window.location.assign(exampleStoreHref)
              }}
            >
              <label htmlFor={inputId} className="sr-only">
                Your kitchen name
              </label>
              <div className="flex items-center gap-2 rounded-xl bg-white p-1.5 pl-5 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.45)]">
                <input
                  id={inputId}
                  type="text"
                  value={kitchenName}
                  onChange={(event) => setKitchenName(event.target.value)}
                  placeholder={DEFAULT_KITCHEN_NAME}
                  autoComplete="organization"
                  className="min-w-0 flex-1 border-0 bg-transparent py-2.5 font-jakarta text-[15px] font-semibold text-ink outline-none placeholder:text-ink/35 sm:text-base"
                />
                <Button
                  href={exampleStoreHref}
                  variant="customer"
                  size="sm"
                  className={`shrink-0 !min-h-11 whitespace-nowrap px-4 ${RADIUS_BTN}`}
                >
                  See your store
                  <FiArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </form>

            <p className="mt-3.5 font-jakarta text-[12px] font-medium leading-snug text-yellow sm:text-[13px]">
              Type your kitchen&apos;s name — the store on the right becomes
              yours, live.
            </p>
          </div>

          <div
            className={`mx-auto w-full max-w-[520px] overflow-hidden bg-white shadow-device-frame lg:mx-0 lg:ml-auto lg:max-w-[560px] border-1 border-partner ${RADIUS_CARD}`}
          >
            {design === 'v2' ? <StorePreview kitchenName={displayName} /> : <ClassicPreview kitchenName={displayName} />}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default YourNameOnTheDoor
