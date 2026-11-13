# Mother Bhojan — Project Knowledge Base

Single reference for **day-to-day MB development** and **scaffolding a new app** from this template.

**Last updated:** 2026-07-02

---

## New app? Attach this file to Cursor

```
Scaffold a new Next.js 16 static-export marketing site using the attached
docs/project-knowledge-base.md exactly.

Requirements:
- Match folder structure, routes, and layer conventions (§2–§5)
- All routes + dynamic routes with placeholder sections
- Shared layout (Header, Footer, MainLayout)
- SEO setup (metadata, sitemap, robots, JSON-LD)
- TypeScript path aliases as specified
- No Mother Bhojan branding — use "NewApp" as placeholder name
- Each section: SectionContainer + placeholder heading + lorem text
```

For a new app, use placeholder content only — do not copy MB copy or assets. See **§10 Scaffold a new app**.

---

## 1) Tech stack and runtime

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) + React 18 + TypeScript |
| Output | Static export (`output: "export"` in `next.config.ts`); `images.unoptimized: true` |
| Styling | Tailwind CSS v4 + tokens in `src/app/globals.css` |
| Animation | Framer Motion (`EASE` curve in `src/shared/lib/motion.ts`) |
| Icons | react-icons |
| Utils | clsx |
| Package manager | Yarn 4 (`packageManager` in `package.json`) |

**Scripts:** `yarn dev` · `yarn build` · `yarn start` · `yarn lint` · `yarn ci`

### Environment variables (two files only)

| File | When it loads |
|------|----------------|
| `.env.development.local` | `yarn dev` (local) |
| `.env.production` | `yarn build` (production / static export) |

Both are gitignored. Required keys:

- `NEXT_PUBLIC_SITE_URL` — canonical URL for SEO (`http://localhost:3000` locally; live domain in production)
- `NEXT_PUBLIC_API_BASE_URL` — API host (no trailing slash)
- `NEXT_PUBLIC_PUBLIC_WEBSITE_BEARER_TOKEN` — public website JWT (no `Bearer ` prefix)

Do **not** use a generic `.env` or `.env.local` alongside `.env.production` — Next.js would let `.env.local` override production values on build.

---

## 2) Root project layout

```
mother-bhojan/
├── .gitignore
├── .yarnrc.yml
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── yarn.lock
├── docs/
│   ├── project-knowledge-base.md   # this file
│   ├── TYPOGRAPHY.md
│   └── DESIGN-SYSTEM-COMPLIANCE-AUDIT.md
├── public/
│   └── icon.svg
└── src/
    ├── app/                        # Next.js routes + page sections
    ├── assets/                     # image + video imports
    ├── features/                   # domain logic + API (chefData)
    ├── providers/                  # app-level React providers
    ├── shared/                     # reusable UI, SEO, lib, data, theme
    └── types/
```

---

## 3) Path aliases (`tsconfig.json`)

Use **`@/`** for all imports. Legacy aliases (`@assets`, `@shared`, `@providers`, `@features`, `@components`) have been removed.

| Alias | Resolves to |
|--------|-------------|
| `@/*` | `./src/*` |
| `@/components` | `./src/shared/components/index.ts` |
| `@/components/*` | `./src/shared/components/*` |

**Common import paths:**

| Import | Example |
|--------|---------|
| Shared UI | `import { Button, Section } from '@/components'` |
| Assets | `import { mLogo } from '@/assets'` |
| SEO | `import { ROUTES } from '@/shared/seo'` |
| Lib | `import { isRemoteImageUrl } from '@/shared/lib'` |
| Motion | `import { EASE } from '@/shared/lib/motion'` |
| Providers | `import { AppProviders } from '@/providers'` |
| Features | `import { useChefsStores } from '@/features'` |

---

## 4) Full `src/` folder tree

```
src/
├── app/
│   ├── layout.tsx                 # Root: fonts, SEO, AppProviders, MainLayout
│   ├── page.tsx                   # Home → imports home/HomePage
│   ├── globals.css
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   │
│   ├── home/
│   │   ├── HomePage.tsx
│   │   ├── sections/
│   │   │   ├── index.ts           # barrel re-exports all home sections
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustStrip.tsx
│   │   │   ├── FeaturedKitchens.tsx
│   │   │   ├── FamiliesReview.tsx
│   │   │   ├── CareTimeline.tsx
│   │   │   ├── DaughtersPromise.tsx
│   │   │   ├── PartnerBanner.tsx
│   │   │   ├── PartnerExpertSupport.tsx
│   │   │   ├── HomeFAQ.tsx
│   │   │   ├── SupportSection.tsx # home-only CTA (not shared)
│   │   │   └── PlatformFeatures/
│   │   │       ├── index.tsx              # section component
│   │   │       ├── PlatformFeatureVisuals.tsx
│   │   │       └── visuals/               # feature mock visuals
│   │   │           ├── index.ts
│   │   │           ├── FeatureVisual.tsx
│   │   │           ├── AiPhotoEnhancer.tsx
│   │   │           ├── PublicKitchenStore.tsx
│   │   │           ├── PaymentsVisual.tsx
│   │   │           └── ReviewsVisual.tsx
│   │   └── data/
│   │       ├── ai-photo-compare.ts
│   │       ├── care-timeline.ts
│   │       ├── featured-kitchens.ts
│   │       ├── home-faqs.ts       # uses FAQItem from shared/data/faqs
│   │       ├── platform-features.ts
│   │       └── reviews.ts
│   │
│   ├── about/
│   │   ├── page.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── ProblemSolution.tsx
│   │       ├── VerifiedExplainer.tsx
│   │       ├── WhoWeServe.tsx
│   │       ├── TheTeam.tsx
│   │       └── CompanyClosing.tsx
│   │
│   ├── partners/
│   │   ├── page.tsx
│   │   └── sections/
│   │       ├── SolutionsHero.tsx
│   │       ├── SolutionShowcase.tsx
│   │       ├── SoloKitchen.tsx
│   │       ├── ScaleOperation.tsx
│   │       └── Flexibility.tsx
│   │
│   ├── kitchens/
│   │   ├── page.tsx
│   │   ├── KitchensPageClient.tsx
│   │   ├── sections/
│   │   │   ├── StoreHero.tsx
│   │   │   ├── KitchenFilters.tsx
│   │   │   └── Stores.tsx
│   │   └── [storeId]/
│   │       ├── page.tsx           # generateStaticParams + generateMetadata
│   │       └── sections/
│   │           ├── StoreDetailHero.tsx
│   │           ├── StoreDetailTabs.tsx
│   │           ├── StoreDetailOrderBar.tsx
│   │           └── StoreVerificationBand.tsx
│   │
│   └── faq/
│       └── page.tsx
│
├── assets/
│   ├── index.ts
│   ├── fonts/                     # self-hosted woff2 (Plus Jakarta, Antonio, Aguafina)
│   ├── images/
│   │   └── index.ts               # re-exports live image assets only
│   └── videos/
│       ├── hero_bg.mp4
│       └── index.ts
│
├── providers/
│   ├── index.ts
│   ├── AppProviders.tsx
│   └── ThemeProvider.tsx
│
├── features/
│   ├── index.ts                   # re-exports chefData only
│   └── chefData/
│       ├── index.ts
│       ├── hooks/
│       │   └── useChefsStores.ts
│       ├── models/
│       │   ├── index.ts
│       │   └── chef-store.model.ts
│       └── services/
│           ├── index.ts
│           └── stores.api.ts
│
├── shared/
│   ├── seo/
│   │   ├── index.ts
│   │   ├── site.ts                # SITE_NAME, ROUTES, getSiteUrl, absoluteUrl
│   │   ├── metadata.ts            # createRootMetadata, createPageMetadata
│   │   └── json-ld.tsx
│   ├── lib/
│   │   ├── index.ts
│   │   ├── httpClient.ts
│   │   ├── api-url.ts
│   │   ├── image.ts               # isRemoteImageUrl()
│   │   └── motion.ts              # shared Framer Motion EASE curve
│   ├── theme/
│   │   └── fonts.ts               # next/font + self-hosted font variables
│   ├── data/
│   │   ├── index.ts
│   │   ├── faqs.ts                # FAQItem type + platformFaqs (/faq page)
│   │   ├── hero-phrases.ts
│   │   └── verified-kitchen.ts
│   └── components/
│       ├── index.ts
│       ├── layout/
│       │   ├── index.ts
│       │   ├── MainLayout.tsx     # server component: Header + main + Footer
│       │   ├── Header.tsx
│       │   ├── Footer.tsx
│       │   └── VerifiedKitchenFloat.tsx
│       ├── ui/
│       │   ├── index.ts
│       │   ├── Button.tsx
│       │   ├── Section.tsx        # Section + SectionContainer alias
│       │   ├── SectionHeading.tsx
│       │   ├── SectionHeader.tsx
│       │   ├── SectionSpacing.ts
│       │   ├── AnimatedText.tsx
│       │   ├── VerifiedSeal.tsx
│       │   ├── VerifiedKitchenBadge.tsx
│       │   ├── SearchField.tsx
│       │   ├── Loader.tsx
│       │   ├── IphoneFrame.tsx
│       │   └── ImageCompareSlider.tsx
│       └── sections/
│           ├── index.ts
│           └── FAQs.tsx           # /faq page accordion
│
└── types/
    └── media.d.ts
```

---

## 5) Routes and pages

| Route | File | Sections / notes |
|-------|------|------------------|
| `/` | `app/page.tsx` → `home/HomePage.tsx` | Hero, TrustStrip, FeaturedKitchens, FamiliesReview, CareTimeline, DaughtersPromise, PartnerBanner, PartnerExpertSupport, PlatformFeatures, HomeFAQ, SupportSection |
| `/about` | `app/about/page.tsx` | Hero, ProblemSolution, VerifiedExplainer, WhoWeServe, TheTeam, CompanyClosing |
| `/kitchens` | `app/kitchens/page.tsx` | StoreHero + KitchenFilters + Stores grid (client) |
| `/kitchens/[storeId]` | `app/kitchens/[storeId]/page.tsx` | StoreDetailHero, StoreDetailTabs, StoreVerificationBand, StoreDetailOrderBar |
| `/partners` | `app/partners/page.tsx` | SolutionsHero, SolutionShowcase, SoloKitchen, ScaleOperation, Flexibility |
| `/faq` | `app/faq/page.tsx` | Shared `FAQs` component with `platformFaqs` |
| 404 | `app/not-found.tsx` | Custom not-found |

**SEO routes (no UI):** `app/robots.ts`, `app/sitemap.ts`

**Header nav:** Home, About, Kitchens, For Partners, FAQ

**ROUTES not yet implemented as pages** (linked from footer): `/join`, `/contact`, `/privacy`, `/terms`, `/refunds`

### Architecture layers

```
┌─────────────────────────────────────────────────────────┐
│  app/                                                   │
│  Routes (page.tsx) — metadata + compose sections only   │
├─────────────────────────────────────────────────────────┤
│  app/{route}/sections/                                  │
│  Page-specific UI sections                              │
├─────────────────────────────────────────────────────────┤
│  app/{route}/data/                                      │
│  Page-specific static data (faqs, reviews, etc.)        │
├─────────────────────────────────────────────────────────┤
│  shared/components/                                     │
│  Reusable layout, UI primitives, cross-page sections    │
├─────────────────────────────────────────────────────────┤
│  features/                                              │
│  Domain logic: API services, models, hooks              │
├─────────────────────────────────────────────────────────┤
│  providers/                                             │
│  App-level React context (AppProviders, ThemeProvider)  │
├─────────────────────────────────────────────────────────┤
│  shared/seo + shared/lib + shared/theme                 │
│  Metadata, JSON-LD, HTTP client, env URLs, fonts, motion  │
└─────────────────────────────────────────────────────────┘
```

---

## 6) Component and composition conventions

### Route page pattern

```tsx
// app/about/page.tsx
import { createPageMetadata, ROUTES } from '@/shared/seo'
import AboutHero from './sections/Hero'
import ProblemSolution from './sections/ProblemSolution'

export const metadata = createPageMetadata({
  title: 'About',
  description: '...',
  path: ROUTES.about,
})

export default function Page() {
  return (
    <>
      <AboutHero />
      <ProblemSolution />
      {/* other page sections */}
    </>
  )
}
```

### Home page pattern

```tsx
// app/home/HomePage.tsx
import { Hero, TrustStrip, PlatformFeatures, HomeFAQ, SupportSection } from './sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      {/* ... */}
      <PlatformFeatures />
      <HomeFAQ />
      <SupportSection />
    </>
  )
}
```

### Rules

- **Naming conventions** (see §6.1).
- **Home is special:** `app/page.tsx` = metadata only; `app/home/HomePage.tsx` = section composition via `./sections` barrel.
- **One section = one file** in `{route}/sections/`. Use `Section` or `SectionContainer` + `SectionHeader`.
- **Shared vs page-specific:**

  | Shared (`shared/components/sections/`) | Page-specific (`app/{route}/sections/`) |
  |----------------------------------------|----------------------------------------|
  | `FAQs` (platform `/faq` page) | Hero blocks, storytelling, home-only sections (`SupportSection`, `HomeFAQ`) |

- **Co-located submodules:** when a section has multiple visual subcomponents (e.g. `PlatformFeatures/visuals/`), keep them in a `PascalCase/` subfolder under that section — do **not** nest another `sections/` folder inside a section.
- **Data:** static content → `app/{route}/data/*.ts`; cross-page → `shared/data/*.ts`; API → `features/{domain}/services/*.api.ts`.
- **FAQ types:** use `FAQItem` from `@/shared/data/faqs` — do not redefine locally.
- **Layout shell:**

  ```
  RootLayout (app/layout.tsx)
    └── AppProviders (@/providers)
          └── MainLayout (Header + main + Footer)
                └── {page sections}
  ```

  `MainLayout` is a **server component** (no `'use client'`). `Header` is `'use client'` and uses `useHeroHeader(pathname)` for transparent styling on home and about heroes.

- **Dynamic routes (static export):** `kitchens/[storeId]` needs `generateStaticParams()`. `sitemap.ts` lists static paths and store URLs when API is available at build.
- **SEO config** (`shared/seo/site.ts`): `SITE_NAME`, `SITE_TAGLINE`, `ROUTES`, `getSiteUrl()`, `absoluteUrl()`.
- **Shared components first:** `Section`, `SectionContainer`, `SectionHeading`, `SectionHeader`, `Button`, `SearchField`, `Loader`, `VerifiedSeal`.
- **Motion:** import `EASE` from `@/shared/lib/motion` — do not redeclare locally.
- **Spacing:** import rhythm constants from `@/components` (`SectionSpacing.ts`) — do not redeclare locally.
- **Remote images:** import `isRemoteImageUrl` from `@/shared/lib`.
- **Barrel exports:** maintain `index.ts` re-exports in `shared/`, `features/`, and route `sections/` folders when adding files.

### 6.1) Naming conventions

| Kind | Convention | Examples |
|------|------------|----------|
| Route folders | `lowercase` | `home/`, `about/`, `kitchens/`, `[storeId]/` |
| Page composers | `PascalCase.tsx` | `HomePage.tsx`, `KitchensPageClient.tsx` |
| Section components | `PascalCase.tsx` | `Hero.tsx`, `CareTimeline.tsx`, `StoreDetailHero.tsx` |
| Section subfolders | `PascalCase/` with `index.tsx` or `visuals/` | `PlatformFeatures/`, `PlatformFeatures/visuals/` |
| Shared UI + layout tokens | `PascalCase.tsx` in `ui/` | `SectionSpacing.ts`, `SectionHeader.tsx` |
| Static data | `kebab-case.ts` | `home-faqs.ts`, `care-timeline.ts` |
| Shared UI components | `PascalCase.tsx` | `Button.tsx`, `Loader.tsx`, `SectionHeader.tsx` |
| Shared lib / hooks | `camelCase.ts` | `httpClient.ts`, `useChefsStores.ts` |
| API / models | `kebab-case` suffix | `stores.api.ts`, `chef-store.model.ts` |
| Feature folders | `camelCase` | `chefData/` |

**Do not** mix `components/` and `sections/` for the same purpose — all route-level UI blocks live in `{route}/sections/`. Utilities and spacing helpers live in `{route}/lib/`, not inside `sections/`.

### Section vs SectionContainer

Both are exported from `shared/components/ui/Section.tsx`:

- **`Section`** — full-width `<section>` with default vertical padding + inner max-width shell.
- **`SectionContainer`** — alias for `<Section as="div">` (single shell, no outer section padding). Use in header, footer, and hero inner layouts.

---

## 7) Styling rules (global-first)

- Colors/gradients/shadows → CSS custom properties in `src/app/globals.css`.
- Avoid hardcoded color literals in section TSX when a token exists.
- Use Tailwind + CSS variables: `bg-[var(--color-token)]`, `border-[var(--color-token)]`.
- Box shadows: add `--shadow-*` under `@theme`; use `shadow-surface-md`, `shadow-device-frame`.
- Prefer standard Tailwind scale over arbitrary px unless design-critical.
- Section spacing rhythm: import from `@/components` (re-exported from `SectionSpacing.ts`).
- Typography: follow `docs/TYPOGRAPHY.md` — use `body-copy*` utilities, not ad-hoc font weights on paragraphs.

---

## 8) Asset and import conventions

- Import images via **`@/assets`** (`src/assets/images/index.ts` re-exports live assets only).
- Keep `width`, `height`, `alt` explicit; use `object-cover` when matching existing behavior.
- Public static files live in `public/` (e.g. `public/icon.svg` in root layout metadata).
- Large design exports (PNG/PDF screenshots) go in `docs/exports/` — that folder is gitignored.
- Do not commit unused asset variants (extra hero videos, duplicate PNGs, unreferenced exports).

---

## 9) Change workflow

When implementing UI changes:

1. Reuse existing section/component patterns before new structure.
2. Add/update tokens in `globals.css` first.
3. Apply tokens in section/component files.
4. Keep responsive behavior aligned with neighboring sections.
5. Run lint on touched files (`yarn lint`).

### Pre-merge checklist

- No unintended hardcoded color literals in TSX.
- New design values tokenized in `globals.css`.
- Breakpoints align with existing section patterns.
- Touched files pass lint.
- Changes do not alter unrelated sections.
- Static export: no request-time Node server patterns unless explicitly in scope.
- Update this doc when routes, folder structure, or shared components change.

---

## 10) Scaffold a new app

1. Init Next.js + TypeScript + Tailwind + path aliases (§1, §3)
2. Create `shared/seo`, `shared/lib`, `shared/components/layout`
3. Create `providers/` + root `layout.tsx`
4. Scaffold all routes with placeholder sections (§4, §5)
5. Wire Header/Footer nav
6. Add `robots.ts`, `sitemap.ts`, `not-found.tsx`
7. Add `[storeId]` with `generateStaticParams`
8. Fill design/content page by page

**Leave empty in a new app:** section JSX (placeholders only), `data/*.ts` mocks, placeholder logo, mock API, new tokens in `globals.css`.

---

## 11) Documentation maintenance

| File | Purpose | Update when |
|------|---------|-------------|
| `project-knowledge-base.md` | Living architecture reference (this file) | Routes, folders, env, shared components change |
| `TYPOGRAPHY.md` | Font and type-scale rules | Typography tokens or heading components change |
| `DESIGN-SYSTEM-COMPLIANCE-AUDIT.md` | Point-in-time wireframe audit (June 2026) | Do not rewrite unless re-auditing against wireframes |

**After a major architectural change:**

1. Edit the affected section(s) in this file.
2. Bump **Last updated** at the top.
3. Mention the doc update in the PR when the change is structural.
