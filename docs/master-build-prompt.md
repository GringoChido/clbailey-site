# C.L. Bailey & Co. -- Master Build Prompt

> **How to use this prompt:** Open this repo in Claude Code. The `CLAUDE.md` file loads automatically with the full California House design system. Feed Claude Code one stage at a time. Each stage builds on the previous and can be verified before moving on. The Salesforce integration runs entirely on mock data until you drop in your API credentials.

---

## Project Overview

**Client:** C.L. Bailey & Co., heritage billiards company founded in 1999, Tomball, Texas. Solid hardwood pool tables, shuffleboards, game room furniture. Sold exclusively through authorized dealers.

**Brand voice:** Quiet authority, luxury, craftsmanship. No emoji, no hype, no em dashes.

**Design system:** California House. Full spec in `CLAUDE.md`, visual reference at `/docs/california-house-brand-kit.html`.

**Stack:** Next.js 16.1.6 (App Router), React 19, TypeScript, Tailwind CSS v4, next-intl v4, Netlify.

---

## Layout Philosophy: Breaking the Grid

The current site feels flat because every section uses the same pattern: centered label, centered heading, symmetrical content, repeat. To make this feel like a high-end showroom rather than a template, apply these layout principles throughout:

### Core Techniques (CSS-only, no JavaScript animation libraries)

**1. Asymmetric Splits**
Stop defaulting to 50/50. Use 60/40, 65/35, or even 70/30 for image-text sections. The larger side gets the image. The text side uses generous internal padding to create breathing room.
```
/* Instead of grid-cols-2 */
grid-template-columns: 1.6fr 1fr;    /* 62/38 split */
grid-template-columns: 1fr 1.4fr;    /* 42/58 split, flip direction */
```

**2. Overlapping Elements**
Images and content blocks should cross section boundaries. Use negative margins or CSS Grid named areas to pull elements 60-100px into the adjacent section. This breaks the "stacked boxes" feel.
```
/* Image extends 80px into the section below */
margin-bottom: -80px;
position: relative;
z-index: 10;
```

**3. Staggered / Offset Grids**
Product grids should not be uniform. Mix a large feature card (spanning 2 columns or 2 rows) with smaller cards. Or offset every other card by 40-60px vertically to create a masonry-like rhythm without JavaScript.
```
/* Offset every other card */
.card:nth-child(even) { transform: translateY(48px); }
```

**4. Varied Content Widths**
Alternate between full-bleed sections (100vw), wide contained (max-w-[90rem]), medium (max-w-5xl), and narrow (max-w-2xl). The rhythm of wide-narrow-wide keeps the eye moving and creates visual contrast without changing colors.

**5. Pull Quotes and Oversized Typography**
Break up text-heavy sections with one large typographic element. A single sentence at 48-64px in Roboto Condensed 300 / `--color-silver` acts as a visual anchor between body text sections. These should never be centered if the surrounding content is left-aligned.

**6. Edge-Breaking Images**
Some images should extend beyond their text container. For a contained text block at max-w-5xl, let the image span max-w-7xl or full-bleed, then pull the text back to its narrower width. This creates depth without needing shadows.

**7. Vertical Rhythm Variation**
Not every section needs the same padding. Alternate between tight (py-16), standard (py-24 lg:py-32), and expansive (py-32 lg:py-44). Photography sections can be shorter (min-h-[50vh]) or taller (min-h-[90vh]) to create visual breathing.

**8. Split-Screen Heroes**
Instead of always layering text on top of a background image, use side-by-side: image takes 55-60% of the viewport, content sits on a solid-color background on the other side. The image can go full height while content is vertically centered.

**9. Text Alignment Variety**
Not everything centered. Section headers can be left-aligned with a thin vertical rule accent (1px `--color-silver`, 40px tall) to the left of the label. Some headings right-aligned on desktop with the content block beneath them left-aligned. This creates diagonal reading paths.

**10. Bento Grid Layouts**
For category navigation and feature highlights, use a bento grid (mixed-size cards in a CSS Grid) rather than uniform columns:
```
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(2, 1fr);
/* First card spans 2 cols + 2 rows, rest fill 1x1 */
.featured { grid-column: 1 / 3; grid-row: 1 / 3; }
```

### Rules for These Techniques
- Never use more than 2 layout tricks in a single section. Restraint is luxury.
- Every layout decision should serve the photography. The product is the star.
- On mobile, all asymmetric layouts collapse to single-column stacked. No horizontal scrolling disasters.
- Test at 1440px wide minimum for desktop layouts.
- Maintain the California House muted palette. Dynamic layout, quiet color.

---

## Stage 1: Design System Alignment and Global Components

**Goal:** Consistent California House styling across all existing components. Foundation for everything.

### 1A. Global Layout Updates

**Header (`components/layout/Header.tsx`):**
- Nav links: Raleway uppercase, 2px letter-spacing (`heritage-label` class mapped to `--font-label`)
- Scrolled state: `--overlay-nav` background (rgba(176, 178, 188, 0.85)) with backdrop-blur. Currently using the logo image with drop-shadow glow for transparent state, keep this.
- "Find a Dealer" CTA: `.btn-primary` on solid, `.btn-outline-white` on transparent
- Announcement bar: `--color-deep` background, Raleway uppercase, `--color-silver` text

**Footer (`components/layout/Footer.tsx`):**
- Background: `--color-deep`
- Section headings: `.section-label` (`--color-silver`)
- Links: Roboto 400, `--color-body`, hover `--color-silver`
- Bottom bar: 1px `--color-primary` top border, `.metadata` copyright

**New shared UI components:**
- `SectionHeader.tsx`: Accepts `align` prop ("center" | "left"). Left-aligned variant includes a thin vertical accent line (1px `--color-silver`, 40px) to the left of the `.section-label`.
- `Container.tsx`: `max-w-[90rem] mx-auto px-6 lg:px-10`, plus `narrow` (max-w-5xl) and `tight` (max-w-2xl) variants.
- `Divider.tsx`: 1px `--color-cloud` rule.
- `OverlapImage.tsx`: Image wrapper that accepts a `bleed` prop to extend beyond its parent container bounds via negative margins.

### 1B. Typography, Color, and Legacy Alias Verification

- Verify all legacy aliases (`.heritage-label`, `.text-ink`, `.text-muted`, `.bg-light`, `.bg-vellum-dark`, `.border-border`) map correctly to California House variables in `globals.css`.
- No hardcoded hex colors in any component.
- Three fonts loading correctly in `layout.tsx` with CSS variables on body.

### 1C. Button and Input Audit

- `.btn-primary`: 1px `--color-primary` border, transparent bg, Raleway 500 uppercase 2px tracking, fills on hover. No border-radius.
- `.btn-outline`: 1px `--color-silver` border, same treatment.
- `.btn-outline-white`: 1px white border, white text, fills white on hover.
- Form inputs: 1px `--color-cloud` border, Roboto 400, no radius. Focus: `--color-silver` border.

### 1D. Add Accessories to Product Data

Update `/data/products.json` with new "Accessories" category and 7 products:
- #6 Iron Leather Pockets (slug: `iron-leather-pockets`)
- Basic Accessory Kit (slug: `basic-accessory-kit`)
- Deluxe Accessory Kit (slug: `deluxe-accessory-kit`)
- Magnum Pool Ball Sets (slug: `magnum-pool-ball-sets`)
- Mali Basic Green Felt (slug: `mali-basic-green-felt`)
- Platinum Accessory Kit (slug: `platinum-accessory-kit`)
- Premium Accessory Kit (slug: `premium-accessory-kit`)

Each entry follows the existing data structure (name, slug, category, tagline, description, images, specs). Image paths: `/images/products/accessories/[slug]/hero.jpg`. Use placeholder images initially.

Also centralize felt color data: add a `feltColors` array to `products.json` (or `/data/felt-colors.json`) so both the Velocity Pro page and product detail pages reference the same source.

**Deliverable:** Consistent styling, no regressions, data ready. `npm run build` passes.

---

## Stage 2: Public Site Page Rebuilds

**Goal:** Every public page rebuilt with California House styling and dynamic layouts. Photography-forward, varied rhythm, editorial feel.

### 2A. Homepage

The homepage is the showcase for the layout philosophy. Each section should feel distinct from the one before it.

**Hero (`components/home/Hero.tsx`):** Currently empty. Build as a **split-screen hero**:
- Left 58%: full-height lifestyle photograph, edge-to-edge vertically
- Right 42%: `--color-off-white` background, vertically centered content
  - `.section-label`: "MODERN HERITAGE BILLIARDS"
  - `.heading-hero`: Main headline (Roboto Condensed 300, clamp-sized)
  - Body text in `--color-body`
  - Two CTAs stacked: `.btn-primary` "Explore Collection", `.btn-outline` "Find a Dealer"
- On mobile: image stacks on top (60vh), text below
- Subtle scroll indicator at bottom of image side (thin line + chevron, `--color-silver`)

**CategoryNav:** Replace the current uniform 4-column grid with a **bento grid**:
- Desktop: 4-column, 2-row CSS Grid
- First card (Pool Tables) spans 2 columns and 2 rows (large feature card)
- Remaining 3 cards fill 1x1 cells
- All cards keep the 3:4 aspect ratio on their individual cells
- Gradient overlays, `.section-label` names at bottom
- On mobile: horizontal scroll (keep existing behavior)

**EditorialFeature (Catalog CTA):** Change from centered text overlay to **asymmetric overlay**:
- Full-bleed image stays
- Content block positioned bottom-left (not centered), max-w-md, with `--overlay-white` (rgba(255,255,255,0.9)) backdrop
- Padding: 48px inside the overlay block
- `.section-label` + `.heading-display` + CTA, all left-aligned
- The overlay block should sit 60px from the left edge and overlap the bottom of the image by extending 40px into the next section

**FeaturedProducts:** Change from uniform horizontal scroll to a **staggered grid**:
- Desktop: 3-column grid. Every other card offset 48px vertically (translateY)
- Cards: 4:5 aspect ratio images (taller, more editorial), `.heading-card` below, tagline below that
- "Explore All" link stays top-right, aligned with the header block
- Left-aligned section header (not centered) with vertical accent line

**ShuffleboardBlock:** Change from standard left-aligned text over image to a **reverse split**:
- Image takes right 60%, content sits on `--color-deep` background left 40%
- Content vertically centered with generous padding (px-12 lg:px-16)
- `.section-label` in `--color-silver`, `.heading-display` in white, body in `--color-body`
- On mobile: image stacks on top, dark content block below

**FinishesSection:** Instead of centered circle swatches, use a **horizontal specimen strip**:
- Full-width row of large square swatches (100px x 100px desktop, edge-to-edge with 2px gaps)
- Finish name centered below each swatch in `.metadata`
- Swatches are square (no border-radius), 2px `--color-cloud` border, 2px `--color-primary` on hover
- Above the strip: left-aligned section header at max-w-5xl with a brief paragraph
- The swatch strip breaks outside the container to full-bleed, creating visual contrast with the contained text above

**FurnitureBlock:** Mirror the ShuffleboardBlock but **flip the layout**:
- Image left 60%, content right 40% on `--color-off-white` background
- This creates an alternating rhythm: split-left, image-break, split-right

**HeritageSection:** Replace centered block with a **narrow editorial column**:
- max-w-2xl, left-aligned text (not centered)
- Large pull quote in Roboto Condensed 300, 40px, `--color-silver`, taking up 70% width
- Body text wraps below the pull quote at full column width
- CTAs left-aligned
- This section should feel like the end of a magazine article

**New Section: Velocity Pro Cloth Teaser** (add between Finishes and Furniture):
- Horizontal band, shorter than other sections (py-16)
- `--color-deep` background
- Two-column: left has `.section-label` "PREMIUM CLOTH" + "Velocity Pro Worsted" in `.heading-sub` (white) + one-line description + `.btn-outline-white` "Learn More" linking to `/velocity-pro-cloth`
- Right side: close-up cloth texture image, edge-to-edge on the right, bleeding off-screen
- This acts as a visual palette cleanser between the lighter sections

### 2B. Product Pages

**Category listing pages** (`/products/pool-tables`, `/products/shuffleboards`, `/products/accessories`, etc.):
- Hero: 50vh background image with `--overlay-soft`, left-aligned text (not centered)
- Below hero: **asymmetric product grid**
  - For categories with 4+ products: first product is a large feature card (2 columns wide), remaining products fill standard 1-column cards in a 3-column grid
  - For smaller categories (3 or fewer): use an offset grid with every other card shifted down 40px
  - Cards: no shadow, no radius, 1px `--color-cloud` border. `.heading-card` title, body text tagline.

**Product detail page** (`/products/[category]/[slug]`):
- **Split layout, not full-width hero:**
  - Left 55%: large product image, full-height of the viewport, sticky on scroll (CSS `position: sticky; top: 0`)
  - Right 45%: scrollable content column with generous padding
    - `.heading-display` product name
    - `.heading-sub` tagline
    - Wood finish swatches (square, labeled, 2px `--color-primary` border on selected)
    - Felt color swatches (same treatment, with "Learn about Velocity Pro" link on pool tables)
    - Dimensions and specs table (bottom borders only, `.metadata` headers)
    - "Find a Dealer" + "Download Spec Sheet" CTAs
- Below the fold: full-width lifestyle gallery (2-3 images in a broken grid, not uniform)
- Related products in staggered grid at bottom

### 2C. Accessories and Velocity Pro Cloth

**Accessories category page** (`/products/accessories`):
- Follows the same category listing pattern from 2B above
- Hero with lifestyle image of accessories on/around a table
- 7 product cards in the asymmetric grid pattern

**Velocity Pro Cloth feature page** (`/velocity-pro-cloth`):

This is a standalone marketing page. Every section should use a different layout pattern.

**Section 1 -- Hero:** Split-screen (not full-bleed overlay)
- Left 55%: macro cloth texture photography, full-height
- Right 45%: `--color-off-white` background, vertically centered
  - `.section-label`: "PREMIUM TABLE CLOTH"
  - `.heading-hero`: "Velocity Pro Worsted Cloth"
  - `.heading-sub`: "87% wool worsted construction for professional-grade play"
  - `.btn-primary` "Learn More" (smooth scrolls)

**Section 2 -- Why Worsted Matters:** Asymmetric two-column (65/35)
- Left 65%: close-up detail photography
- Right 35%: stacked benefit blocks
  - Each benefit: `.metadata` label (e.g., "ACCURACY") + one-sentence description in Roboto 400
  - 5 benefits stacked with generous spacing (32px between)
  - Benefits: tighter weave (consistent ball speed), resists tracks/grooves, repels spills, eliminates pilling, higher wool content (87%) extends cloth life

**Section 3 -- Comparison Table:** Narrow centered layout
- max-w-4xl, centered
- `.section-label`: "SIDE BY SIDE"
- `.heading-display`: "Velocity Pro vs. Standard Cloth"
- Table: column headers in `.metadata`, bottom borders 1px `--color-cloud`
- Checkmarks in `--color-primary` (simple SVG), dashes for "No". No bright colors.
- Rows: Construction, Wool Content, Resists tracks/grooves, Repels spills, Eliminates pilling, Minimizes ball burns, Ball speed, Longevity

**Section 4 -- Color Swatches:** Full-bleed swatch strip
- Same pattern as the homepage FinishesSection: swatches break to full-width
- Colors pulled from centralized felt color data
- Above the strip: left-aligned header at contained width

**Section 5 -- Included With:** Staggered product cards
- 2-3 pool table cards showing models that include Velocity Pro standard
- Offset grid with product images linking to detail pages

**Section 6 -- CTA:** Dark full-bleed band
- `--color-deep` background
- Asymmetric: text left-aligned (max-w-lg), two CTAs inline
- `.heading-display` in `--color-silver`, body in `--color-body`
- CTAs: `.btn-outline-white` "Find a Dealer" + "Download Spec Sheet"

**Navigation update:** Add Accessories to header nav with Velocity Pro Cloth as dropdown sub-item. Add to footer product links.

### 2D. Content Pages

**About page** (`/about`):
- Open with a **narrow text column** (max-w-2xl), left-aligned heritage intro
- Then: **alternating asymmetric image-text blocks** (65/35, flipping sides each row)
  - Block 1: Workshop photography left, founding story right
  - Block 2: Wood selection story left, close-up image right
  - Block 3: Craftsman at work left, quality narrative right
- Between blocks: a **full-bleed horizontal image strip** (3 images side by side, 100vw, 35vh, no gaps), acting as a visual break
- Close with a pull quote in Roboto Condensed 300, 40px, `--color-silver`, max-w-3xl

**Contact page** (`/contact-us`):
- **Asymmetric split**: form 58% left, company info 42% right on `--color-off-white`
- Form: React Hook Form + Zod. Fields: Name, Email, Phone, Subject dropdown, Message. `.btn-primary` submit.
- Right column: address, phone, email. Map embed or static map below. Generous top padding to vertically offset from the form (don't align tops).

**Catalogs page** (`/catalogs`):
- Large featured catalog card (spanning full width, image left 60%, content right 40%)
- Below: smaller catalog cards in a 2-column offset grid
- Lead-gated PDF download via existing `/api/leads/pdf-download`

**Care Guide** (`/care-guide`):
- Magazine-style editorial: narrow column (max-w-2xl), prose-heavy
- Illustrated tips with small images floated or placed in a sidebar column
- Pull quotes between sections for visual rhythm

**Lifetime Guarantee** (`/lifetime-guarantee`):
- Open with bold statement: `.heading-hero` size, centered, `--color-silver`
- Then a **two-column comparison**: "What Is Covered" left, "What Is Not Covered" right
- Below: "How to File a Claim" in numbered steps, left-aligned narrow column

**Room Size Guide** (`/room-size`):
- **Interactive feel via layout**: large diagram/illustration spanning full width
- Below: recommendation table (table size, min room, ideal room)
- Sidebar callout with "Not sure? Find a dealer for a consultation" CTA

### 2E. Dealer Finder (`/dealer`)

- Split-screen: search + results on left 55%, map on right 45% (sticky)
- Search: ZIP input + `.btn-primary`, clean and compact
- Results: card list. Each card: `.heading-card` dealer name, address, phone, distance badge. 1px `--color-cloud` border, `--color-whisper` bg.
- Map: Google Maps embed or placeholder. Stays visible while results scroll.
- On mobile: search on top, results list, map below (or hidden behind "Show Map" toggle)

### 2F. i18n

All new text in `/messages/en.json` and `/messages/es.json`. No hardcoded strings. `useTranslations()` client, `getTranslations()` server.

**Deliverable:** Every public page dynamic and editorial. No two sections use the same layout pattern back-to-back. `npm run build` clean.

---

## Stage 3: Dealer Portal Foundation

**Goal:** Salesforce-ready service layer, mock data, upgraded portal shell.

### 3A. Salesforce Service Layer

```
lib/salesforce/
├── client.ts              # JWT Bearer auth, token refresh
├── types.ts               # All type definitions
├── services/
│   ├── dealer.service.ts     # Account, profile, territory
│   ├── order.service.ts      # Orders, lines, status
│   ├── inventory.service.ts  # Availability, stock
│   ├── lead.service.ts       # Lead routing, status
│   ├── analytics.service.ts  # Performance, rankings
│   ├── warranty.service.ts   # Claims, registration
│   └── support.service.ts    # Tickets, cases
├── mock/
│   ├── dealer.mock.ts
│   ├── order.mock.ts
│   ├── inventory.mock.ts
│   ├── lead.mock.ts
│   ├── analytics.mock.ts
│   ├── warranty.mock.ts
│   └── support.mock.ts
└── index.ts               # SALESFORCE_ENABLED toggle
```

Components import from `@/lib/salesforce`. Toggle via `SALESFORCE_ENABLED=true|false`. Mock data when false, real API when true. All calls through Next.js API routes.

**Environment variables** (`.env.local.example`):
```env
SALESFORCE_ENABLED=false
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_CLIENT_ID=your_connected_app_client_id
SALESFORCE_CLIENT_SECRET=your_connected_app_secret
SALESFORCE_USERNAME=integration_user@clbailey.com
SALESFORCE_PRIVATE_KEY_PATH=./certs/salesforce-key.pem
```

### 3B. API Routes

```
app/api/dealer/
├── profile/route.ts
├── orders/route.ts
├── orders/[id]/route.ts
├── inventory/route.ts
├── leads/route.ts
├── analytics/route.ts
├── quote/route.ts
├── warranty/route.ts
├── support/route.ts
└── notifications/route.ts
```

### 3C. Mock Data

Realistic mock data for a pool table dealer:
- **Dealer:** Pacific Billiards & Games, San Diego, CA. Gold Tier. Territory: Southern California, Coastal. Rep: Sarah Mitchell.
- **Orders (7):** Mix of Draft, Submitted, Confirmed, In Production, Shipped, Delivered. $2k-$8k per table wholesale.
- **Inventory:** All models, mix of in stock / low stock / out of stock.
- **Leads (8):** Mix of statuses and sources. San Diego area.
- **Analytics:** YTD $340k, 12% growth, rank #3 of 18, 12-month trend.
- **Warranty Claims (4):** Mix of statuses.
- **Support Tickets (4):** Mix of categories.

### 3D. Portal Shell

- Tabs: **Overview | Orders | Configurator | Inventory | Leads | Downloads | Account**
- Tab bar: Raleway uppercase, 2px tracking, `--color-mid-gray` default, `--color-primary` active + 2px bottom border
- Notification bell top-right with unread badge
- Background: `--color-off-white`, cards on `--color-white` with 1px `--color-cloud` border

**Deliverable:** Service layer done, mock data flowing, portal shell working. `npm run build`.

---

## Stage 4: Portal Core Features

### 4A. Enhanced Dashboard

- **Dealer Welcome:** `.heading-sub`, `.metadata` tier badge, territory/rep in `--color-body`
- **KPI Cards (4):** `--color-whisper` bg, 1px `--color-cloud` border, no radius/shadow. Roboto Condensed 300 number, `.section-label` label. Cards: YTD Sales, Open Orders, Territory Rank, Pending Leads.
- **Announcements:** Category-tagged (Product Update, Pricing, Operations, Marketing). Tonal dots. Actionable links. `.metadata` timestamps.
- **Quick Links:** Place Order, Configurator, Marketing Assets, Support.

### 4B. Orders

- **List:** Table with bottom borders (1px `--color-cloud`). `.metadata` headers. Status badges: subtle pills with diluted gray tints. Filter/sort. "Place New Order" `.btn-primary`.
- **Detail:** `.heading-card` order #, status badge, `.metadata` date. Horizontal timeline (`--color-silver` track, `--color-primary` completed). Line items table. Shipping info. Customer-shareable tracking link. Notes thread.
- **Place Order (later phase):** Slide-out multi-step. Product grid, configure, review, submit.

### 4C. Configurator and Quote Builder

- **Configurator:** Product type, model grid, customizations (wood swatches, felt swatches including Velocity Pro upgrade, size, accessories). Square swatches, 2px `--color-primary` selected border. Live preview. Running price.
- **Quote PDF:** Branded PDF with California House styling (Roboto Condensed headings, Raleway labels, Roboto body, `--color-primary` + `--color-silver`). MSRP pricing, dealer info, 30-day expiration, T&C. `@react-pdf/renderer` or `pdf-lib`. Download + email.

**Deliverable:** Dashboard, orders, configurator with mock data. Quote PDF generates.

---

## Stage 5: Portal Extended Features

### 5A. Inventory
Grid/table of products. Tonal availability indicators (no bright green/yellow/red). Filter by product/status. "Notify when available" `.btn-outline`.

### 5B. Lead Management
Lead inbox (list with status labels), detail view (customer info, interest, activity log, quick actions). Pre-written response templates in brand voice (Initial outreach, Follow-up, Quote accompaniment, Post-visit thank you).

### 5C. Warranty Registration and Claims
Registration form (customer, product, serial, delivery date). Auto-generates warranty certificate PDF. Claims with photo upload, status timeline, communication thread. Warranty lookup by serial number.

### 5D. Support Tickets
Category dropdown, priority, description, file upload. Auto-routes. Ticket history with status badges and conversation threads.

### 5E. Enhanced Downloads
Keep existing structure. Add: Marketing Asset Library (social templates, email templates, flyers, co-op ads). Showroom Materials (POS, comparison charts, room size printables). Seasonal Campaign Kits (holiday, Father's Day, Super Bowl).

### 5F. Enhanced Account
Salesforce-driven profile, tier status, territory, regional rep. Performance summary: progress bar, Recharts trend chart (brand palette only), top models, tier progress. Notification preferences with square toggles.

### 5G. Notifications
Bell icon, unread badge, dropdown. Types: lead, order status, announcement, price update, product launch. Read/unread. Deep links.

### 5H. Training Hub
Product knowledge base, selling guides, common Q&A. Sales training videos, objection handling. New dealer onboarding checklist.

**Deliverable:** All portal features functional with mock data.

---

## Stage 6: Polish, Performance, Deployment

### 6A. States
- Loading: skeleton screens (`--color-cloud` blocks). No spinners.
- Empty: `.heading-sub` message + `.btn-primary` CTA.
- Error: clean message + retry.

### 6B. Responsive
375px, 768px, 1440px+. Asymmetric layouts collapse to single-column on mobile. Portal tabs: horizontal scroll on mobile. Tables become cards on mobile. Sticky sidebar layouts unpin on mobile.

### 6C. Accessibility
`aria-label` on interactives. WCAG AA contrast. Keyboard navigation. Screen reader form validation.

### 6D. Performance
Next.js `<Image>` with `sizes`. `img()` helper for product paths. Lazy load below-fold. Portal data client-fetched with loading states.

### 6E. SEO
`<Metadata>` on every public page. OG and Twitter cards for products. JSON-LD structured data. Verify `app/sitemap.ts` includes all pages including accessories and velocity-pro-cloth.

### 6F. i18n Final
All strings in en.json and es.json. Portal translations. Locale-aware date/currency formatting.

### 6G. Salesforce Setup Docs
`SALESFORCE_SETUP.md` with: Connected App setup, object/field mapping (Account, Contact, Order, Product2, PricebookEntry, Lead, Case, custom objects), JWT Bearer config, integration user permissions, how to flip the switch, troubleshooting.

**Deliverable:** Production-ready. `npm run build` clean. Responsive. Accessible.

---

## Connecting Salesforce (When Ready)

1. Open `.env.local`
2. Set `SALESFORCE_ENABLED=true`
3. Fill in:
   ```
   SALESFORCE_LOGIN_URL=https://login.salesforce.com
   SALESFORCE_CLIENT_ID=your_actual_client_id
   SALESFORCE_CLIENT_SECRET=your_actual_secret
   SALESFORCE_USERNAME=your_integration_user@clbailey.com
   SALESFORCE_PRIVATE_KEY_PATH=./certs/salesforce-key.pem
   ```
4. Place JWT certificate at `./certs/salesforce-key.pem`
5. Restart dev server

Everything switches from mock to live. No component changes.

---

## Component Architecture

```
components/
├── layout/
│   ├── Header.tsx                    # Global nav (update)
│   └── Footer.tsx                    # Global footer (update)
├── home/
│   ├── Hero.tsx                      # Split-screen hero (rebuild)
│   ├── HomeSections.tsx              # All homepage sections (rebuild)
│   ├── DealerLocator.tsx             # Existing
│   └── MuseumGrid.tsx                # Existing
├── ui/
│   ├── SectionHeader.tsx             # New: center/left variants with accent line
│   ├── Container.tsx                 # New: wide/narrow/tight variants
│   ├── Divider.tsx                   # New: horizontal rule
│   ├── OverlapImage.tsx              # New: images that bleed past containers
│   ├── PullQuote.tsx                 # New: large typographic accent element
│   ├── ProductCard.tsx               # Update to design system
│   ├── SectionLabel.tsx              # Existing
│   ├── ScrollReveal.tsx              # Existing
│   ├── BackToTop.tsx                 # Existing
│   ├── DealerSearch.tsx              # Update
│   ├── LeadModal.tsx                 # Update
│   ├── PdfGateModal.tsx              # Update
│   └── AIConcierge.tsx               # Existing
└── dealer-portal/
    ├── DealerPortalLayout.tsx
    ├── DealerDashboard.tsx
    ├── OrdersPanel.tsx
    ├── OrderDetail.tsx
    ├── OrderForm.tsx
    ├── ProductConfigurator.tsx
    ├── QuotePreview.tsx
    ├── InventoryPanel.tsx
    ├── LeadManagement.tsx
    ├── LeadDetail.tsx
    ├── LeadResponseTemplates.tsx
    ├── DownloadsPanel.tsx
    ├── AccountPanel.tsx
    ├── WarrantyPanel.tsx
    ├── WarrantyClaimDetail.tsx
    ├── SupportPanel.tsx
    ├── SupportTicketDetail.tsx
    ├── TrainingHub.tsx
    ├── NotificationBell.tsx
    ├── StatusBadge.tsx
    ├── StatusTimeline.tsx
    ├── KPICard.tsx
    ├── ProductCard.tsx
    ├── SwatchSelector.tsx
    ├── DealerTierBadge.tsx
    ├── FileUploader.tsx
    └── ProgressBar.tsx
```

---

## Technical Constraints

- Product data from `/data/products.json` via typed helpers. No database.
- `img()` and `pdf()` helpers for asset paths. Never hardcode.
- i18n: `useTranslations()` client, `getTranslations()` + `setRequestLocale(locale)` server.
- Middleware handles i18n + dealer auth. Edit carefully.
- Radix UI for dialogs, React Hook Form + Zod for forms (already installed).
- Recharts for charts, `@react-pdf/renderer` for PDFs (install as needed).
- No Material UI, Ant Design, or heavy component libraries.
- No em dashes. No bright accent colors. No border-radius. No drop shadows.
- Font-weight 300 for large display text, max 400 for headings.
- No JavaScript animation libraries. All layout dynamism comes from CSS Grid, negative margins, translateY offsets, and sticky positioning.
