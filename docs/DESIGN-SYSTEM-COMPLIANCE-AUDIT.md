# Mother Bhojan — Design System Compliance Audit

> **Status:** Point-in-time audit snapshot (June 18, 2026). The homepage and shared component inventory have since been refactored (June 22, 2026). Sections referenced below that no longer exist include `HowItWorks`, `CitiesStrip`, `PricingSection`, `CommunitySection`, `Carousel`, and `shared/theme/brand-colors.ts`. For the current architecture, see `docs/project-knowledge-base.md`.

**Audit scope:** Wireframes v2 specification (`Mother Bhojan Wireframes v2.dc.html`) vs. `MB-Public-Website` source code at audit time  
**Audit mode:** Read-only analysis — no code modified  
**Reference date:** June 18, 2026

---

## Executive Summary

The codebase has **strong foundational alignment** with the wireframe v2 brand system: core palette tokens, dual-red CTA semantics, paper/surface hierarchy, and the `Button` / `VerifiedSeal` primitives are largely faithful. However, the **implemented UI has materially drifted** from the wireframes in typography, hero layout choice, section treatments, and several page-level structures.

The implementation reads as a **visually enriched production build** (extra display fonts, motion, gradients, glass navigation) built on top of wireframe tokens — not a pixel- or structure-faithful wireframe reproduction.

| Dimension | Match Score |
|---|---|
| **Overall Match Score** | **63%** |
| Typography Match | 48% |
| Color Match | 78% |
| Spacing Match | 58% |
| Layout Match | 52% |
| Component Match | 61% |

---

## CHECK 1 — Typography Compliance

### Fully aligned

- Primary sans family: **Plus Jakarta Sans** (`layout.tsx`, `globals.css`)
- Weights loaded: 400, 500, 600, 700, 800 (matches wireframe)
- Fallback stack: `ui-sans-serif, system-ui, sans-serif`
- Body default smoothing: `antialiased`
- Button typography: `text-sm font-semibold` (~14px / 600)

### Non-compliant deviations

| Component | Expected | Actual | Severity | File Location |
|---|---|---|---|---|
| Global heading system | **Plus Jakarta Sans only** for all headings | **Antonio** (`--font-antonio`) and **Aguafina Script** (`--font-aguafina`) used on hero/display titles | **Critical** | `layout.tsx`, `globals.css`, `SectionHeading.tsx` |
| Hero H1 (Home) | `38px / 800 / letter-spacing: -1px / line-height: 1.06` — “Verified home food, delivered warm.” | `clamp` up to `7.2rem` (~115px) with Antonio + script accent animation | **Critical** | `home/sections/Hero.tsx`, `SectionHeading.tsx` |
| Section titles (wireframe) | `22–24px / 800` (e.g. “How it works”, “Verified kitchens near you”) | Display scale `2.25rem–5.9rem` with gradient + script accents via `SectionHeader` | **High** | `SectionHeader.tsx`, `SectionHeading.tsx` |
| Wireframe type scale | H1 40px bold; H2 24px semibold; body 16–17px regular | Body often `text-base font-semibold` (16px/600); headings dramatically oversized | **High** | Multiple section files |
| Nav links | `14px / 500`, plain text links | `14px` inside **rounded pill** nav chips with borders/backdrop | **Medium** | `Header.tsx` |
| Nav brand wordmark | Text: `19px / 800 / letter-spacing: -0.3px` “Mother Bhojan” | Image wordmark only (`logoWhite` / `logoDark`) | **Medium** | `Header.tsx` |
| Trust strip labels | `12.5px / 700` | `12.5px–15px / bold` — close, but on wrong background treatment | **Low** | `home/sections/TrustStrip.tsx` |
| Footer brand | `17px / 800` | `text-[17px] font-extrabold` — compliant | — | `Footer.tsx` |
| Cities strip | Label `13px`, cities `18px / 700` | `13px` + `text-lg font-bold` (18px) — compliant | — | `CitiesStrip.tsx` |
| Hero script line | Not in wireframe home hero | Hindi tagline in Aguafina Script at `20px` | **Medium** | `home/sections/Hero.tsx` |

---

## CHECK 2 — Color System Compliance

### Fully aligned (token-level)

| Token | Expected HEX | Actual HEX | Status |
|---|---|---|---|
| Partner / business red | `#DB1A1A` | `#DB1A1A` | ✅ |
| Customer red | `#E1574C` | `#E1574C` | ✅ |
| Verified green | `#8DA552` | `#8DA552` | ✅ |
| Yellow / selection | `#F6C238` | `#F6C238` | ✅ |
| Paper | `#FFFAF2` | `#FFFAF2` | ✅ |
| Ink | `#2A1F18` | `#2A1F18` | ✅ |
| Body text | `#29323A` | `#29323A` (`--color-body`) | ✅ |
| Muted | `#858A8E` | `#858A8E` | ✅ |
| Surface | `#F4F1EA` | `#F4F1EA` | ✅ |
| Border | `#DCD6CC` | `#DCD6CC` | ✅ |
| Verified pill | `#EEF2E3` | `#EEF2E3` | ✅ |
| Customer muted | `#FBE9E7` | `#FBE9E7` | ✅ |
| Footer text | `#EFE7DC` | `#EFE7DC` | ✅ |
| Partner hover | — | `#b81616` | ✅ (reasonable extension) |
| Customer hover | — | `#c94a40` | ✅ (reasonable extension) |

### Non-compliant deviations

| Component | Expected | Actual | Severity | File Location |
|---|---|---|---|---|
| Trust Strip background | `#F4F1EA` (surface) + subtle borders | `bg-yellow` (`#F6C238`) | **Critical** | `home/sections/TrustStrip.tsx` |
| Partner Banner background | Solid ink `#2A1F18` | Partner red gradient `bg-mb-partner-panel` (`#DB1A1A → #b81616`) | **High** | `home/sections/PartnerBanner.tsx` |
| Home Hero layout scrim | Split hero on paper; full-bleed noted as “higher risk” variant B | Full-bleed video + black scrim overlays | **High** | `home/sections/Hero.tsx` |
| Hero partner CTA | Outline: `1.5px solid #DB1A1A`, text `#DB1A1A` | Solid partner button (`bg-partner`, white text) | **High** | `home/sections/Hero.tsx`, `Button.tsx` |
| Partner muted (join steps) | `#FBE0E0` in wireframes | `#FBE2E0` (`partner-muted`) — 2-digit hex drift | **Low** | `brand-colors.ts`, `globals.css` |
| Company closing entity card | Surface/paper tones | Hardcoded `#FAFAFA` (not in token system) | **Medium** | `about/sections/CompanyClosing.tsx` |
| Header (home/about) | Paper/light sticky bar | Transparent / glass `bg-black/45`, white text | **High** | `Header.tsx` |
| Body page canvas | Wireframe doc shell `#E7E3DB`; frames `#FFFAF2` | Body `background: paper` — frame-correct, canvas token unused | **Low** | `globals.css` |
| `--color-background` | Not specified separately in wireframes | `#ffffff` defined but page uses paper | **Low** | `globals.css` |
| Kitchen detail verification band | `#EEF2E3` band, `#5f7a33` text, `#E1E7D2` borders | **Missing entirely** | **Critical** | `kitchens/[storeId]/sections/StoreDetailHero.tsx` |

---

## CHECK 3 — Spacing System Compliance

### Aligned patterns

- Button height: wireframe **44px** → `h-11 min-h-11` (44px) ✅
- Footer grid gap: wireframe **26px** → `lg:gap-[26px]` ✅
- Cities strip: wireframe `padding: 30px 36px` → `py-[30px]` with container padding ✅

### Non-compliant deviations

| Component | Expected | Actual | Severity | File Location |
|---|---|---|---|---|
| Section horizontal padding | Wireframe frames consistently **36px** | Responsive `px-4 → px-16` via `SectionContainer` | **Medium** | `SectionContainer.tsx` |
| Section vertical rhythm | Hero `44px`, How It Works `40px`, Featured `38px` | `py-12 md:py-16 lg:py-24` (48–96px) — larger | **Medium** | `SectionContainer.tsx`, multiple sections |
| Max container width | Wireframe frames imply content column ~full frame | `max-w-[1500px]` (not specified in wireframes) | **Low** | `SectionContainer.tsx` |
| Home hero | Two-column split with `gap: 34px` | Single-column full-bleed, `py-24–32` | **High** | `home/sections/Hero.tsx` |
| How It Works | 3-column grid `gap: 20px`, compact | Timeline layout `space-y-12–16`, `max-w-[1080px]` | **High** | `home/sections/HowItWorks.tsx` |
| Featured kitchen cards | `gap: 18px`, card radius **12px** | `gap: 5–6` (20–24px), `rounded-2xl` (16px) | **Medium** | `FeaturedKitchens.tsx` |
| Header height | Wireframe slim nav `padding: 14–18px` | `h-16 md:h-20` (64–80px) | **Medium** | `Header.tsx` |

---

## CHECK 4 — Border System Compliance

### Aligned

- Primary border token `#DCD6CC` used consistently
- Card borders `#E7E1D6` via `border-card` token
- Button radius **8px** (`rounded-lg`) matches wireframe
- Outline secondary buttons: wireframe `1.5px solid #2A1F18` → `border-ink/20` (close)

### Non-compliant

| Component | Expected | Actual | Severity | File Location |
|---|---|---|---|---|
| Kitchen cards | `border-radius: 12px` | `rounded-2xl` (16px) | **Medium** | `FeaturedKitchens.tsx`, `Stores.tsx` |
| Nav links | No pill borders | `rounded-full border` on each link | **Medium** | `Header.tsx` |
| Partner hero secondary CTA | `1.5px solid #DB1A1A` | No `partnerOutline` variant exists | **High** | `Button.tsx` |
| Verified explainer cards | `border-radius: 10px` | `rounded-[0.625rem]` (10px) — compliant | — | `VerifiedExplainer.tsx` |
| Kitchen detail avatar | Circular `110px` chef photo | Square/rounded-rect cover image | **High** | `StoreDetailHero.tsx` |
| Verification band borders | `#E1E7D2` top/bottom | Missing section | **Critical** | Kitchen detail pages |

---

## CHECK 5 — Shadow System Compliance

Wireframes specify minimal elevation; implementation adds a rich custom shadow layer.

### Tokenized shadows (present, not in wireframe spec)

- `--shadow-surface-sm/md/lg`, `--shadow-soft-lg`, `--shadow-device-frame`, etc. in `globals.css`

### Non-compliant / undocumented shadows

| Component | Expected | Actual | Severity | File Location |
|---|---|---|---|---|
| Cards (general) | Flat or `1px solid` borders | `shadow-[0_8px_24px_rgba(42,31,24,0.06)]` + hover elevation | **Medium** | `FeaturedKitchens.tsx`, `Stores.tsx` |
| How It Works cards | Simple numbered circles, no card shadows | `shadow-[0_14px_42px…]` with hover intensification | **High** | `HowItWorks.tsx` |
| Header scrolled | Minimal/no shadow in wireframe | `shadow-[0_10px_30px_rgba(0,0,0,0.25)]` | **Medium** | `Header.tsx` |
| Trust strip icons | Emoji-only, no elevation | `shadow-[0_4px_12px_rgba(111,138,62,0.28)]` rings | **Low** | `TrustStrip.tsx` |

---

## CHECK 6 — Layout Compliance

### Aligned

- Home page section order mostly matches wireframe flow: Hero → Trust → How It Works → Featured → Partner → Cities → Footer
- Footer 4-column grid `1.4fr 1fr 1fr 1.2fr` preserved
- About problem/solution 2-column split preserved
- Verified explainer 4-column grid preserved

### Non-compliant

| Component | Expected | Actual | Severity | File Location |
|---|---|---|---|---|
| Home Hero | **Variant A: Split hero** (recommended) | **Variant B: Full-bleed video** | **Critical** | `home/sections/Hero.tsx` |
| Home page | 6 sections + footer | **Extra `SupportSection`** appended | **Medium** | `HomePage.tsx` |
| About page | Mission-centered layout, no full-bleed hero | Founder full-bleed hero + extra `WhoWeServe` section | **High** | `about/page.tsx`, `about/sections/Hero.tsx` |
| Kitchens browse | Title “Verified kitchens near you” + filter chips | “STORES BY Mother Bhojan” + search + grid/list toggle | **Critical** | `kitchens/components/StoreHero.tsx` |
| Kitchens filters | City · Veg/Non-veg · Cuisine chips | **Not implemented** | **Critical** | `kitchens/components/Stores.tsx` |
| Kitchen detail | Chef + badge + CTA single row; sticky order bar | Centered/stacked layout; tabs (Menu/Location/Reviews/News); no sticky CTA | **Critical** | `StoreDetailHero.tsx`, `StoreDetailTabs.tsx` |
| Partners page | Business-red split hero, benefits grid, join steps | Different solution-showcase structure with animated plants | **High** | `partners/sections/SolutionsHero.tsx` |
| Section container | Wireframe inline `36px` padding | `max-w-[1500px]` centered shell | **Medium** | `SectionContainer.tsx` |
| Mobile nav | Single hamburger drawer | Implemented ✅ | — | `Header.tsx` |

---

## CHECK 7 — Component Compliance

| Component | Expected Design | Actual Implementation | Match % |
|---|---|---|---:|
| **Navbar** | Sticky paper bar; logo + wordmark; About/Kitchens/For Partners/FAQ; persistent customer-red Order CTA | Glass/transparent header on home/about; image logo; **includes Home**; pill-style nav chips; Order CTA correct | **72%** |
| **Hero (Home)** | Verified pill badge; split layout; headline + subhead; customer solid + **partner outline** CTAs | Full-bleed video; no verified badge; script/animated headline; **both CTAs solid** | **48%** |
| **Trust Strip** | 4 items on surface bg: ID verified, cooked to order, tri-city, women-led | 3 items on **yellow** bg: verified kitchens, FSSAI, real home cooks | **52%** |
| **How It Works** | Centered 3-step grid with numbered customer-muted circles | Animated alternating timeline cards with gradients/icons | **45%** |
| **Kitchen Cards** | Image + **“✓ Verified” green pill** top-left; chef name; veg/non-veg tags; `12px` radius | Placeholder + **M-logo only** (no “Verified” text); enhanced card chrome; `16px` radius | **68%** |
| **Buttons** | 44px, 8px radius; customer / outline / partner semantics | Core specs met; **no partner-outline variant** | **85%** |
| **Footer** | Ink bg, 4 columns, dual CTAs, entity details | Highly faithful reproduction | **92%** |
| **Partner Banner** | Ink bg; headline + single partner CTA | Red gradient panel + perks + “Learn more” secondary | **55%** |
| **Cities Strip** | “Now serving” + tri-city names | Matches wireframe copy and hierarchy | **95%** |
| **Verified Seal** | Green pill + M mark + “✓ Verified” | Check icon + “Verified” text; **M mark not integrated in pill** | **75%** |
| **About — Mission** | Centered mission headline with green eyebrow | Replaced by founder cinematic hero | **40%** |
| **About — Verified Explainer** | Title + subtitle + 4 emoji/icon cards on surface | Structure matches; missing subtitle “single most important page…” | **82%** |
| **About — Team** | 3 circular founder photos | 4 rectangular placeholder portraits | **65%** |
| **About — Closing** | Single ink band, centered dual CTAs | Split gradient customer/partner panels | **50%** |
| **Kitchens Browse** | Filters + result count + 3-col grid | Search + pagination + different title; no filters | **42%** |
| **Kitchen Detail** | Chef row + verification receipt + about/menu split + sticky order bar | Cover image hero + tabs + real pricing; no verification band | **38%** |
| **Search** | City/cuisine filter chips (kitchens) | `SearchField` for store name search | **55%** |
| **FAQ** | Tabbed audience accordion | Generic `FAQs` component | **~70%** (est.) |

---

## CHECK 8 — Brand Compliance

### Preserved ✅

- **Trust-first positioning:** “Verified” language in hero, kitchens, about explainer
- **Homemade food positioning:** “Real kitchens. Real cooks.” copy retained
- **Dual-audience color routing:** Customer red vs partner red largely respected
- **Chef naming:** Fallback data uses “Chef [Name]'s Kitchen” — no “aunty”
- **Tri-city honesty:** Cities strip and footer name Mohali · Chandigarh · Panchkula
- **Verification badge intent:** `VerifiedSeal` component exists; green `#8DA552` used for trust

### Violations ⚠️

| Violation | Impact | Severity |
|---|---|---|
| Home hero chose **emotional full-bleed** over **trust-first split hero** | Delays “verified in seconds” proof; spec called split “safest conversion bet” | **High** |
| Trust strip background switched to **yellow** instead of calm **surface** | Shifts page from “reassurance” to “alert/warning” visual weight | **High** |
| Featured kitchen cards missing explicit **“✓ Verified” pill** on every card | Weakens non-negotiable wireframe trust rule | **Critical** |
| Kitchen detail missing **verification receipt band** | “Verified” promise not substantiated at peak-trust moment | **Critical** |
| Display typography (Antonio + script) adds **marketing flair** over wireframe’s “plain, kind, specific” body voice | Brand feels more campaign-like than homely/trustworthy | **High** |
| Extra motion/gradients throughout | Increases visual noise vs wireframe’s restrained MVP fidelity | **Medium** |
| Kitchen browse renamed “STORES BY Mother Bhojan” | Dilutes “Verified kitchens near you” claim in H1 | **High** |
| `SupportSection` on home | Not in wireframe funnel; adds secondary CTA noise | **Medium** |

---

## CHECK 9 — Design Token Compliance

### Tokens correctly implemented

`partner`, `customer`, `verified`, `yellow`, `ink`, `body`, `muted`, `paper`, `surface`, `border`, `border-subtle`, `border-card`, `verified-pill`, `customer-muted`, `partner-muted`, `footer-text`, `annotation`, placeholder/skeleton tokens, gradient panels, hero scrim tokens.

### Missing tokens (in wireframes, absent in codebase)

| Token | Wireframe HEX | Notes |
|---|---|---|
| Partner hero tint | `#FFF6F6` | Partners page hero background |
| Partner step circle bg | `#FBE0E0` | Close to `#FBE2E0` but not exact |
| Verification band border | `#E1E7D2` | Kitchen detail receipt band |
| Partner tag bg | `#FFF1F1` | Partners page chips |
| Canvas (applied) | `#E7E3DB` | Defined but body uses `paper` |
| Footer placeholder text | `#8a7d6e` | Wireframe footer chrome only |

### Incorrect / drifted tokens

| Token | Expected | Actual |
|---|---|---|
| `partner-muted` | `#FBE0E0` | `#FBE2E0` |
| Trust strip surface | Should use `--color-surface` | Uses `--color-yellow` |

### Unused tokens

- `--color-canvas` (defined, not applied to `body`)
- `--color-background: #ffffff`
- `annotation-muted`, `annotation-border` (minimal usage)
- `chrome-border` (limited usage)

### Duplicate tokens

- `brand-colors.ts` mirrors `globals.css @theme` — intentional duplication for TS access ✅

### Extra tokens (not in wireframe spec)

- `--font-antonio` (Antonio), `--font-aguafina` (Aguafina), `--font-instrument` (Instrument Serif)
- 8+ custom shadow tokens
- 7+ gradient background tokens
- Multiple animation keyframes (`plantFloat`, `mbBeadPulse`, loader animations, etc.)

---

## CHECK 10 — Implementation Quality

### Hardcoded colors (outside token system)

| Location | Value | Issue |
|---|---|---|
| `CompanyClosing.tsx` | `#FAFAFA` | Should use `paper`/`surface` token |
| `SectionHeading.tsx` | Multiple inline gradient hex values | Acceptable for gradients, but not centralized |
| `HowItWorks.tsx` | `rgba(141, 165, 82, 0.08)`, `rgba(219, 26, 26, 0.06)` | Inline radial gradients |
| `Header.tsx` | `rgba(0,0,0,0.25)`, `gray-600`, `black/10` | Generic Tailwind neutrals vs brand muted tokens |
| `PricingSection.tsx` | `#0000001A` shadow stack | Legacy multi-layer shadows |

### Hardcoded font sizes

- Widespread arbitrary values: `text-[12.5px]`, `text-[2.75rem]`, `text-[1.65rem]`, `clamp(...)` in `SectionHeading`, `PartnerBanner`, `StoreDetailHero`
- No centralized typography scale beyond Tailwind defaults + ad-hoc brackets

### Duplicate styles

- Trust strip duplicated: `home/sections/TrustStrip.tsx` ≈ `about/sections/TrustStrip.tsx`
- Shadow patterns repeated across cards (`0_8px_24px`, `0_8px_28px`) without shared utility
- `ctaStyles` in `brand-colors.ts` partially duplicates `Button.tsx` variant styles

### Inconsistent styling

- Header: light/glass on home/about vs standard elsewhere
- Section headings: wireframe `section` variant (22px) vs default `display` variant (36–90px) used almost everywhere
- Partner CTAs: sometimes solid-on-dark, sometimes gradient panel — no single partner-surface rule
- Verification badge: `VerifiedSeal` on detail page, raw `mLogo` on featured cards

### Design system violations (summary)

1. **Typography system extended beyond spec** (2 extra font families)
2. **Hero layout variation mismatch** (non-recommended option)
3. **Missing partner-outline button variant**
4. **Inconsistent verified badge implementation**
5. **Token bypass via hardcoded hex/rgba**
6. **Page-level structural drift** (kitchens, kitchen detail, about, partners)

---

## Fully Compliant Areas

1. **Core brand palette tokens** in `globals.css` / `brand-colors.ts` — partner, customer, verified, yellow, paper, ink, surface, borders
2. **Button height and radius** (44px / 8px) in `Button.tsx`
3. **Selection highlight** — yellow bg, ink text (`globals.css`)
4. **Footer** — layout, colors, copy, entity block, dual CTAs (`Footer.tsx`)
5. **Cities Strip** — copy, hierarchy, spacing (`CitiesStrip.tsx`)
6. **Dual-red CTA semantics** — customer actions use `#E1574C`; partner actions use `#DB1A1A` in most places
7. **Featured kitchen fallback data** — chef naming, veg/non-veg tags align with wireframe examples
8. **About problem/solution split** — structure and color semantics (problem=partner tone, solution=verified tone)
9. **Verified explainer 4-step grid** — identity, inspection, hygiene, reviews
10. **`::selection` and scroll behavior** — match wireframe globals

---

## Non-Compliant Areas (Prioritized)

### Critical

1. **Home Hero layout** — implemented Variant B (full-bleed), spec recommends Variant A (split)
2. **Trust Strip background** — yellow instead of surface `#F4F1EA`
3. **Kitchen card verified badge** — M-logo only; missing mandatory “✓ Verified” pill
4. **Kitchen detail verification receipt band** — missing
5. **Kitchens browse** — wrong H1, no City/Veg/Cuisine filters
6. **Typography** — Antonio + Aguafina Script not in wireframe spec

### High

7. **Hero partner CTA** — solid partner button instead of partner-red outline
8. **Partner Banner** — red gradient instead of ink `#2A1F18`
9. **Header treatment** — glass/transparent vs paper sticky bar
10. **How It Works layout** — timeline vs 3-column grid
11. **Kitchen detail** — no sticky order bar; no “Order from this kitchen” CTA
12. **About page** — mission section replaced; closing band structure changed
13. **Missing `partnerOutline` button variant**

### Medium

14. Card border-radius 16px vs 12px
15. Section padding larger than wireframe frames
16. Extra `SupportSection` on home
17. Hardcoded `#FAFAFA` in about closing
18. `WhoWeServe` section not in wireframe
19. Kitchen detail shows live prices vs wireframe `₹—` + in-app note

### Low

20. `partner-muted` hex drift (`#FBE0E0` vs `#FBE2E0`)
21. Nav includes “Home” link
22. Image wordmark vs text wordmark
23. Canvas token unused

---

## Design System Drift Analysis

| Drift Vector | Spec / Wireframe | Implementation Trend |
|---|---|---|
| **Typography** | Single-family Jakarta; modest scale | Multi-font display system with script accents and 2–3× oversized heroes |
| **Layout fidelity** | Annotated MVP wireframes with recommended variants marked | Creative/production interpretation; frequently chose non-recommended layouts |
| **Color application** | Semantic, restrained surfaces | Correct tokens but **wrong surface assignments** (yellow trust strip, red partner banner) |
| **Trust UX** | Badge + receipt + filter-visible verification everywhere | Trust **copy** present; trust **UI patterns** inconsistently applied |
| **Motion / elevation** | Static wireframe fidelity | Framer Motion animations, hover lifts, glow shadows throughout |
| **Information architecture** | Kitchens = browse + filter; Detail = chef-first + menu preview | Kitchens = search + views; Detail = tabbed store page |
| **Token discipline** | Inline styles in wireframe HTML | Strong central `@theme` block, but bypassed by ~40+ inline hex/rgba values in components |

---

## Recommended Corrections

*Listed only — not implemented.*

### Typography

1. Remove or restrict Antonio/Aguafina to out-of-spec marketing-only contexts; default all headings to Plus Jakarta Sans.
2. Introduce wireframe type scale tokens: `--text-h1: 2.375rem`, `--text-h2: 1.5rem`, `--text-body: 1rem/1.0625rem`.
3. Use `SectionHeading variant="section"` (22px/800) for wireframe section titles instead of `display` variant.
4. Restore nav links to plain `14px / 500` without pill chrome.

### Color

5. Change Trust Strip to `bg-surface border-y border-border-subtle`.
6. Change Partner Banner to `bg-ink text-footer-text` per wireframe.
7. Add `--color-partner-hero: #FFF6F6` and `--color-verified-band-border: #E1E7D2` tokens.
8. Replace `#FAFAFA` in `CompanyClosing.tsx` with `bg-surface` or `bg-paper`.
9. Align `partner-muted` to `#FBE0E0` if strict hex parity required.

### Components

10. Rebuild Home Hero as **split layout** (copy left, image right) with verified pill badge above headline.
11. Add `partnerOutline` button variant: `border-[1.5px] border-partner text-partner bg-transparent`.
12. Use `VerifiedSeal` (with integrated M mark per wireframe) on **every** kitchen card — replace `VerifiedBadge` logo-only pattern.
13. Restore Trust Strip to **4 wireframe items** with emoji/icon + `12.5px/700` labels.
14. Simplify How It Works to centered 3-column grid with `46px` customer-muted numbered circles.
15. Rebuild Kitchens page hero as “Verified kitchens near you” with City/Veg/Cuisine filter chips + result count.
16. Add kitchen detail **verification receipt band** (`bg-verified-pill`, four check items).
17. Add kitchen detail **sticky order bar** with customer CTA.
18. Replace kitchen detail square cover with circular chef avatar treatment.
19. Remove or relocate `SupportSection` from home page funnel.
20. Restore About mission section; demote founder hero to secondary or merge into mission block.
21. Simplify About closing to single ink band with centered dual CTAs (wireframe pattern).

### Layout / Spacing

22. Normalize section padding to wireframe values (`py-9`–`py-11` / `px-9`) on desktop.
23. Set kitchen card radius to `rounded-xl` (12px).
24. Make header sticky on `bg-paper` with bottom border `border-border-subtle` across all pages.

### Tokens / Quality

25. Create shared shadow utilities from `globals.css` tokens; remove repeated inline `rgba(42,31,24,...)` shadows.
26. Consolidate duplicate TrustStrip into one shared component.
27. Audit and replace hardcoded hex/rgba with `@theme` tokens.
28. Document and enforce when to use `body` (`#29323A`) vs `ink` (`#2A1F18`) for text hierarchy.

---

## Summary Scorecard

| Check | Result |
|---|---|
| CHECK 1 — Typography | **48%** — correct base font; critical display-font drift |
| CHECK 2 — Colors | **78%** — tokens excellent; surface application errors |
| CHECK 3 — Spacing | **58%** — button/footer good; section scale enlarged |
| CHECK 4 — Borders | **70%** — colors right; radius and partner-outline gaps |
| CHECK 5 — Shadows | **45%** — heavy undocumented elevation system |
| CHECK 6 — Layout | **52%** — footer/about splits good; hero/kitchens/detail diverge |
| CHECK 7 — Components | **61%** — footer/cities/buttons strong; hero/cards/detail weak |
| CHECK 8 — Brand | **72%** — messaging intact; trust UI inconsistently enforced |
| CHECK 9 — Tokens | **82%** — strong foundation; missing wireframe-specific tokens |
| CHECK 10 — Quality | **55%** — hardcoded values, duplication, inconsistent patterns |

---

## Bottom Line

The implementation is **brand-token compliant at the foundation** but **wireframe-noncompliant at the composition layer**. The largest gaps are hero layout choice, trust-surface color assignments, kitchen verification UI patterns, and typography system expansion. Restoring compliance is primarily a **layout and component-pattern realignment** exercise — not a full palette rebuild.

---

*Generated from audit of `Mother Bhojan Wireframes v2.dc.html` against `MB-Public-Website` source — June 18, 2026.*
