# Mother Bhojan — Typography Guide

**Source of truth:** Wireframes v2 + MVP spec v1.3  
**Implementation:** `src/app/globals.css`, `src/app/layout.tsx`, `src/shared/components/ui/SectionHeading.tsx`

Use this document when adding or editing any page, section, or component. Do **not** hand-roll font families or body weights — use the tokens and components below.

---

## Font families

| Family | CSS variable | Tailwind class | When to use |
|---|---|---|---|
| **Plus Jakarta Sans** | `--font-jakarta` | `font-jakarta` (default on `body`) | Everything unless listed below |
| **Antonio** | `--font-antonio` | `font-antonio` | Display section titles via `SectionHeading` / `SectionHeader` only |
| **Aguafina Script** | `--font-aguafina` | `font-aguafina` | Script accents in headings + hero Hindi tagline only |
| **Instrument Serif** | `--font-instrument` | `font-instrument` | Editorial italic emphasis in body copy (e.g. operating-standard subheads) |

### Hard rules

1. **Never** put `font-antonio`, `font-aguafina`, or `font-instrument` on body paragraphs, cards, nav, buttons, or form fields — except deliberate editorial emphasis (`font-instrument italic`).
2. **Never** use Antonio/Aguafina outside `SectionHeading`, `SectionHeader`, or the hero script pill (`Hero.tsx`).
3. **Always** prefer `body-copy*` utility classes over raw `text-sm font-medium` on paragraphs.
4. On colored/dark surfaces, use the **on-dark** or **inverse** token — not plain `body-copy`.

---

## Type scale (wireframe-aligned)

| Role | Size | Weight | Line-height | Color | How to apply |
|---|---|---|---|---|---|
| **Body** | 16px | 400 | 1.5 | `#29323A` (`text-body`) | `body-copy` |
| **Caption / subtitle** | 13px | 400 | 1.5 | `#858A8E` (`text-muted`) | `body-copy-muted` |
| **Body on dark / scrim** | 16px | 600 | 1.5 | white 95% | `body-copy-on-dark` |
| **Ink-band secondary** | 14px | 500 | 1.5 | `#EFE7DC` 85% | `body-copy-inverse` |
| **Compact meta** | 12.5px | 400 | 1.5 | context | `body-copy-compact` |
| **Compact on dark cards** | 12.5px | 500 | 1.5 | context | `body-copy-compact-on-dark` |
| **UI labels** | 12.5px | 700 | 1.5 | context | `body-copy-label` |
| **Section title (simple)** | 22px | 800 | — | `text-ink` | `SectionHeading variant="section"` |
| **Card / step title** | 15px | 700 | 1.5 | `text-ink` | `font-jakarta text-[15px] font-bold` |
| **Cities line** | 18px | 700 | — | `text-ink` | `font-jakarta text-lg font-bold` (footer city chips) |
| **Display section title** | 36–70px | 800 | — | gradient | `SectionHeader` (default display) |
| **Hero title** | 32–115px | 700–800 | — | gradient | `SectionHeading variant="hero"` |

Weights loaded in `layout.tsx`: Jakarta 400, 500, 600, 700, 800.

---

## Body copy utilities (`globals.css`)

```html
<!-- Paragraph on paper -->
<p class="body-copy">…</p>

<!-- Muted subtitle under a section header -->
<p class="body-copy-muted">…</p>

<!-- White text on video, green band, FAQ answers -->
<p class="body-copy-on-dark">…</p>

<!-- Partner ink band subcopy -->
<p class="body-copy-inverse">…</p>

<!-- Card meta, addresses, footer links -->
<p class="body-copy-compact text-muted">…</p>

<!-- Trust strip items, verification step labels -->
<p class="body-copy-label text-ink">…</p>

<!-- Descriptions on red/colored audience cards -->
<p class="body-copy-compact-on-dark text-white/90">…</p>
```

### Do not

- Stack `body-copy` with `text-sm sm:text-base` — it overrides the token.
- Use `font-medium` or `font-semibold` on body paragraphs (use the token weight).
- Use `leading-7`, `leading-8`, or `leading-relaxed` on body copy (use 1.5 via tokens).

---

## Section headings

### Display sections (home, about, partners)

Use `SectionHeader` with accent lines. Default pairing:

```tsx
<SectionHeader
  lines={[{ text: 'HOW IT', accent: 'works' }]}
  gradient="olive"           // main line — verified green gradient
  accentColor="text-partner" // script accent — partner red
  align="center"             // or "left"
/>
```

| Prop | Default | Purpose |
|---|---|---|
| `gradient` | `"olive"` | Antonio title gradient (`HOW IT`, `VERIFIED KITCHENS`, etc.) |
| `accentColor` | `"text-partner"` | Aguafina script accent (`works`, `near you`, etc.) |

**Exceptions (intentional):**

- **Support section** on green: `gradient="whiteSoft"` + `accentColor="text-yellow …"`
- **Hero**: `SectionHeading variant="hero"` directly (not `SectionHeader`)

### Simple page / section titles (wireframe 22px)

Use Jakarta only — no Antonio:

```tsx
<SectionHeading
  as="h1"
  variant="section"
  align="center"
  lines={[{ text: 'Verified kitchens near you' }]}
/>
```

Examples: kitchens browse hero, placeholder pages, menu category headers (`22px font-extrabold`).

---

## Locked custom headers (do not change without approval)

These are product decisions, not wireframe defaults:

| Location | Treatment |
|---|---|
| Home hero | `SectionHeading variant="hero"` — customer gradient + yellow script |
| Care timeline | `HOW WE` (olive) + `care` (red script) — replaces former How It Works |
| Featured kitchens | Display `VERIFIED KITCHENS` + `near you` |
| Partner banner | Display `Cook from home` + script accents |
| Full-bleed video hero layout | Variant B — white/scrim subcopy uses `body-copy-on-dark` |

---

## Component cheat sheet

| UI element | Font | Class / component |
|---|---|---|
| Site body default | Jakarta | `body` → `font-jakarta` |
| Nav links | Jakarta 500 | `text-[14px] font-medium` |
| Buttons | Jakarta 600 | `Button` component |
| Kitchen card name | Jakarta 700, 15px | `font-jakarta text-[15px] font-bold` |
| Kitchen card meta | Jakarta 400, 13px | `body-copy-muted` |
| Trust strip (yellow) | Jakarta 700, 12.5–15px | `text-[12.5px] font-bold` (custom icons) |
| Care timeline step title | Jakarta 700, 15px | `font-jakarta text-[15px] font-bold` |
| FAQ question | Jakarta 700 | `font-jakarta text-lg font-bold … md:text-[22px]` |
| FAQ answer (open) | Jakarta 600 | `body-copy-on-dark` |
| Footer links | Jakarta 400, 12.5px | `body-copy-compact-on-dark` |
| Verified seal pill | Jakarta 700, 11.5px | `VerifiedSeal` component |

---

## Color pairing for text

| Surface | Body text | Subcopy |
|---|---|---|
| Paper `#FFFAF2` | `text-body` / `body-copy` | `text-muted` / `body-copy-muted` |
| Surface `#F4F1EA` | `text-body` | `text-muted` |
| Ink `#2A1F18` | `text-footer-text` / `body-copy-inverse` | opacity 80–85% |
| Video / dark scrim | `body-copy-on-dark` | — |
| Customer / partner cards | `body-copy-compact-on-dark` | white 80–90% |

---

## Adding new pages — checklist

- [ ] Page title: `SectionHeading variant="section"` or `SectionHeader` (display)?
- [ ] Body paragraphs: `body-copy` or `body-copy-muted`?
- [ ] Dark band copy: `body-copy-on-dark` or `body-copy-inverse`?
- [ ] Card titles: `15px font-bold font-jakarta`?
- [ ] Section header: `gradient="olive"` + `accentColor="text-partner"` unless on colored panel?
- [ ] No `font-antonio` / `font-aguafina` outside heading components?
- [ ] No `font-semibold` / `font-medium` on `<p>` body text?

---

## File reference

| File | Role |
|---|---|
| `src/app/globals.css` | `body-copy*` utilities, font CSS variables |
| `src/app/layout.tsx` | Google font loading |
| `src/shared/components/ui/SectionHeading.tsx` | Display + hero + section title logic |
| `src/shared/components/ui/SectionHeader.tsx` | Section header wrapper + description |
| `docs/DESIGN-SYSTEM-COMPLIANCE-AUDIT.md` | Full layout/color compliance audit |

---

*Last updated: June 2026 — after homepage refactor and typography normalization.*
