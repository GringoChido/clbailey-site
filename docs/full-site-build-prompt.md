# C.L. Bailey & Co. -- Complete Site Rebuild and Dealer Portal (Staged Build Prompt)

> **How to use this prompt:** Open this repo in Claude Code. The `CLAUDE.md` file loads automatically and contains the full California House design system (colors, fonts, typography classes, button styles, layout rules). Feed Claude Code one stage at a time. Each stage is self-contained, builds on the previous, and can be verified before moving on. The Salesforce integration is designed as a plug-and-play system: everything runs on mock data until you add your API credentials to `.env.local`.

---

## Project Overview

**Client:** C.L. Bailey & Co., a heritage billiards company founded in 1999 in Tomball, Texas. Solid hardwood pool tables, shuffleboards, and game room furniture sold exclusively through authorized dealers.

**Brand voice:** Quiet authority, luxury, craftsmanship. No emoji, no hype, no em dashes.

**Design system:** California House (muted luxury, cool gray palette, photography-forward). Full spec in `CLAUDE.md` and visual reference at `/docs/california-house-brand-kit.html`.

**Stack:** Next.js 16.1.6 (App Router), React 19, TypeScript, Tailwind CSS v4, next-intl v4, deployed on Netlify.

**What exists today:**
- Homepage with Hero, CategoryNav, EditorialFeature, FeaturedProducts, ShuffleboardBlock, FinishesSection, FurnitureBlock, HeritageSection
- Product pages: pool-tables, shuffleboards, cue-racks, game-room-furniture, plus dynamic `[category]/[slug]` routes
- Content pages: about, contact-us, catalogs, care-guide, lifetime-guarantee, room-size
- Dealer finder (`/dealer`) with ZIP-based Haversine search
- Basic dealer portal (`/dealer-portal`) with Overview, Downloads, Account tabs
- AI Concierge chatbot (floating widget, GPT-4o-mini via AI SDK)
- Lead capture with Resend email + Google Sheets logging
- i18n: `/en/` and `/es/` with translation files in `/messages/`
- Product data in `/data/products.json` with typed helpers in `/lib/products.ts`

---

## Stage 1: Design System Alignment and Global Components

**Goal:** Make sure every existing component uses the California House design system consistently. This is the foundation for everything else.

### 1A. Audit and Update Global Layout

- **Header (`components/layout/Header.tsx`):**
  - Nav links should use Raleway uppercase with 2px letter-spacing (the existing `heritage-label` class). Verify it maps to `--font-label`.
  - When solid (scrolled), background should use `--overlay-nav` (rgba(176, 178, 188, 0.85)) with backdrop-blur, not `bg-white/95`.
  - Wordmark should use `--font-display` (Roboto Condensed), weight 300, `--color-primary`.
  - "Find a Dealer" CTA pill: use `.btn-primary` on solid, `.btn-outline-white` on transparent.
  - Mobile overlay: white background, nav links in Roboto Condensed 300, utility links in Raleway.
  - Announcement bar: `--color-deep` background, Raleway uppercase text in `--color-silver`.

- **Footer (`components/layout/Footer.tsx`):**
  - Background: `--color-deep` (#1b1b1b)
  - Section headings: `.section-label` (Raleway 500, 12px, uppercase, 3px tracking, `--color-silver`)
  - Links: Roboto 400, `--color-body`, hover to `--color-silver`
  - Company description: Roboto 400, `--color-body`
  - Bottom bar: 1px `--color-primary` top border, `.metadata` style for copyright

- **Create missing shared UI components:**
  - `components/ui/SectionHeader.tsx`: Centered layout with `.section-label` above `.heading-display`. Accepts label and heading props.
  - `components/ui/Container.tsx`: `max-w-[90rem] mx-auto px-6 lg:px-10` wrapper.
  - `components/ui/Divider.tsx`: 1px `--color-cloud` horizontal rule with vertical margin.

### 1B. Typography and Color Verification

- Run through `globals.css` and confirm all legacy class names (`.heritage-label`, `.text-ink`, `.text-muted`, `.bg-light`, `.bg-vellum-dark`, `.border-border`) properly alias to California House variables.
- Ensure no component uses hardcoded hex colors. Everything should reference CSS variables or Tailwind theme tokens.
- Verify the three fonts load correctly in `layout.tsx` and the CSS variables (`--font-roboto`, `--font-roboto-condensed`, `--font-raleway`) are applied to the body.

### 1C. Button and Interactive Element Audit

- `.btn-primary`: 1px `--color-primary` border, transparent background, Raleway 500 uppercase 2px tracking, fills `--color-primary` with white text on hover. No border-radius.
- `.btn-outline`: 1px `--color-silver` border, same Raleway treatment, fills `--color-silver` on hover.
- `.btn-outline-white`: 1px white border, white text, fills white with `--color-primary` text on hover.
- Form inputs (used in lead capture, contact, dealer search): 1px `--color-cloud` border, Roboto 400, `--color-primary` text, no border-radius. Focus state: `--color-silver` border.

**Deliverable:** All existing pages render with consistent California House styling. No visual regressions. Run `npm run build` to confirm no errors.

---

## Stage 2: Public Site Page Rebuilds

**Goal:** Rebuild each public-facing page to match the California House aesthetic. Photography-forward, generous whitespace, muted luxury.

### 2A. Homepage (`app/[locale]/page.tsx`)

The homepage already has good bones (CategoryNav, EditorialFeature, FeaturedProducts, etc.). Updates needed:

- **Hero (`components/home/Hero.tsx`):** Currently empty (0 lines). Build a full-bleed hero:
  - Full-viewport-height background image with `--overlay-soft` gradient overlay
  - Centered text: `.heading-hero` for main headline, `.heading-sub` for subheadline
  - Two CTAs: `.btn-outline-white` for "Explore Collection" and "Find a Dealer"
  - Subtle scroll indicator at bottom (thin animated chevron, `--color-silver`)
  - Image source: use the best lifestyle shot from `/public/images/`

- **CategoryNav:** Already good. Verify grid cards use 3:4 aspect ratio, gradient overlay from black, `.section-label` for category names.

- **FinishesSection:** Currently uses rounded swatches (`rounded-full`). Change to square swatches (border-radius: 0) per design system. Add 2px `--color-cloud` border, 2px `--color-primary` border on hover.

- **Section spacing:** Verify all sections use `py-24 lg:py-32` (the 96-128px range).

- **Background alternation:** Sections should alternate between `--color-white`, `--color-off-white`/`bg-light`, and full-bleed image breaks.

### 2B. Product Pages

- **Category listing pages** (`/products/pool-tables`, etc.):
  - Hero banner with category image and overlay
  - `.section-label` for "Pool Tables" / "Shuffleboards" label
  - `.heading-display` for page title
  - Product grid: 3 columns on desktop, 1 on mobile. Cards with square aspect images, `.heading-card` for product name, body text for tagline. No shadow, no radius, 1px `--color-cloud` border.

- **Product detail page** (`/products/[category]/[slug]`):
  - Large hero image (full-width or 60/40 split with details)
  - Product name in `.heading-display`, tagline in `.heading-sub`
  - Specs table: clean, bottom-borders only, `.metadata` headers, Roboto body text
  - Wood finish swatches: square, labeled, interactive (highlight selected)
  - Felt color swatches: same treatment
  - Dimensions section with room size recommendation
  - "Find a Dealer" and "Download Spec Sheet" CTAs using `.btn-primary` and `.btn-outline`
  - Related products carousel at bottom
  - All product data pulled from `/data/products.json` via `getProduct()` helper

### 2C. Content Pages

- **About page** (`/about`):
  - Heritage narrative layout: alternating image + text sections (50/50 split)
  - Timeline or milestone markers for key dates (founded 1999, etc.)
  - `.heading-display` for section titles, body text in Roboto 400
  - Full-bleed workshop/craftsman photography between sections

- **Contact page** (`/contact-us`):
  - Two-column layout: form on left, company info on right
  - Form uses React Hook Form + Zod validation (already in project)
  - Form fields: Name, Email, Phone, Subject dropdown, Message textarea
  - Submit button: `.btn-primary`
  - Right column: address, phone, email in Roboto 400, map embed or static image

- **Catalogs page** (`/catalogs`):
  - Grid of catalog covers with download CTAs
  - Uses existing lead-gated PDF download system (`/api/leads/pdf-download`)
  - Cards: catalog image, title in `.heading-card`, `.btn-outline` download button

- **Care Guide** (`/care-guide`):
  - Clean editorial layout, prose-heavy
  - Section headers in `.heading-display`, content in Roboto 400
  - Illustrated tips with small product images

- **Lifetime Guarantee** (`/lifetime-guarantee`):
  - Bold guarantee statement in `.heading-hero`
  - Terms and coverage details in structured body text
  - Trust-building layout: what is covered, what is not, how to file a claim

- **Room Size Guide** (`/room-size`):
  - Interactive or static guide showing table sizes vs. room dimensions
  - Diagram with measurements
  - Recommendation table: table size, minimum room size, ideal room size

### 2D. Dealer Finder (`/dealer`)

- **Hero:** `.heading-display` title, `.heading-sub` description
- **Search:** ZIP code input field + `.btn-primary` search button
- **Results:** Clean list or card layout. Each dealer card shows: name (`.heading-card`), address, phone, distance. 1px `--color-cloud` border, `--color-whisper` background.
- **Map:** Optional Google Maps embed or static map area
- Existing Haversine logic in `/lib/dealers.ts` stays as-is

### 2E. i18n Verification

- All new text content must have corresponding entries in `/messages/en.json` and `/messages/es.json`
- Use `useTranslations("namespace")` in client components, `getTranslations()` in server components
- Verify no hardcoded English strings in any component

**Deliverable:** Every public page matches the California House aesthetic. Photography-forward, muted grays, proper typography hierarchy. Run `npm run build` and visually review all pages.

---

## Stage 3: Dealer Portal Foundation

**Goal:** Build the Salesforce-ready service layer and upgrade the portal shell.

### 3A. Salesforce Service Layer

Create the abstraction layer at `lib/salesforce/`:

```
lib/salesforce/
├── client.ts              # SF REST API client (JWT Bearer auth, token refresh)
├── types.ts               # All Salesforce object type definitions
├── services/
│   ├── dealer.service.ts     # Dealer account, profile, territory
│   ├── order.service.ts      # Orders, order lines, status
│   ├── inventory.service.ts  # Product availability, stock levels
│   ├── lead.service.ts       # Lead routing, lead status
│   ├── analytics.service.ts  # Sales performance, territory rankings
│   ├── warranty.service.ts   # Warranty claims, registration
│   └── support.service.ts    # Support tickets, case management
├── mock/
│   ├── dealer.mock.ts
│   ├── order.mock.ts
│   ├── inventory.mock.ts
│   ├── lead.mock.ts
│   ├── analytics.mock.ts
│   ├── warranty.mock.ts
│   └── support.mock.ts
└── index.ts               # Environment-based switching
```

**Key rules:**
- Components always import from `@/lib/salesforce` (the unified interface)
- `SALESFORCE_ENABLED=false` returns mock data. `SALESFORCE_ENABLED=true` makes real API calls.
- All Salesforce calls go through Next.js API routes, never client-side
- Full TypeScript interfaces for every object

**Environment variables** (add to `.env.local.example`):

```env
# Salesforce Integration
# Set SALESFORCE_ENABLED=true when ready to connect. Everything works on mock data until then.
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
├── profile/route.ts          # GET dealer profile, territory, tier
├── orders/route.ts           # GET orders, POST new order
├── orders/[id]/route.ts      # GET single order + status timeline
├── inventory/route.ts        # GET product availability
├── leads/route.ts            # GET leads, PATCH lead status
├── analytics/route.ts        # GET sales performance
├── quote/route.ts            # POST generate quote PDF
├── warranty/route.ts         # GET/POST warranty claims
├── support/route.ts          # GET/POST support tickets
└── notifications/route.ts    # GET notifications
```

All routes validate dealer session/auth before returning data.

### 3C. Mock Data

Create comprehensive, realistic mock data:

**Mock Dealer:**
- Pacific Billiards & Games, San Diego, CA
- Gold Tier, Territory: Southern California, Coastal
- Regional rep: Sarah Mitchell, sarah.mitchell@clbailey.com

**Mock Orders (7 orders):** Mix of Draft, Submitted, Confirmed, In Production, Shipped, Delivered. Realistic product mixes and pricing ($2,000-$8,000 per table wholesale).

**Mock Inventory:** All models with realistic availability. Some in stock, some low stock, a couple out of stock with restock dates.

**Mock Leads (8 leads):** Mix of statuses (New, Contacted, Qualified, Quote Sent, Won, Lost) and sources (website, trade show, referral). San Diego area zip codes.

**Mock Analytics:** YTD sales ~$340,000, 12% growth, territory rank #3 of 18, 12 months of trend data.

**Mock Warranty Claims (4 claims):** Resolved, Approved, Under Review, Submitted.

**Mock Support Tickets (4 tickets):** Mix of categories and statuses.

### 3D. Portal Layout Upgrade

- Extend the tab navigation: **Overview | Orders | Configurator | Inventory | Leads | Downloads | Account**
- Tab bar: Raleway uppercase, 2px letter-spacing, `--color-mid-gray` default, `--color-primary` active with 2px bottom border
- Add notification bell icon to portal header (top-right, next to Sign Out)
- Keep existing "Open Showroom Manager" button functional
- Portal background: `--color-off-white`, content cards on `--color-white` with 1px `--color-cloud` border

**Deliverable:** Service layer complete with mock data. Portal shell updated with new tabs. All API routes return mock data. Run `npm run build`.

---

## Stage 4: Portal Core Features

**Goal:** Build the three highest-value dealer portal features.

### 4A. Enhanced Overview Dashboard

**Dealer Welcome:** `.heading-sub` greeting, `.metadata` tier badge, territory and rep info in `--color-body`.

**KPI Cards (4):** `--color-whisper` background, 1px `--color-cloud` border, no radius, no shadow. Large number in Roboto Condensed 300 `--color-primary`, label in `.section-label`.
- YTD Sales (with trend arrow)
- Open Orders (clickable to Orders tab)
- Territory Rank
- Pending Leads

**Announcements:** Category-tagged feed (Product Update, Pricing, Operations, Marketing). Category dots using `--color-silver` and `--color-mid-gray` tones. Actionable links. Date stamps in `.metadata`.

**Quick Links:** Place Order, Product Configurator, Marketing Assets, Support Ticket.

### 4B. Orders Tab

**Order List:** Clean table, bottom borders only (1px `--color-cloud`). Column headers in `.metadata`. Status badges: subtle pill-shaped with diluted gray tints (no bright colors). Filter by status and date range. Sort by date, status, amount. "Place New Order" `.btn-primary`.

**Order Detail:** Order # in `.heading-card`, status badge, date in `.metadata`. Horizontal status timeline (`--color-silver` track, `--color-primary` completed, `--color-cloud` pending). Line items table. Shipping info. Customer-shareable tracking link (`.btn-outline`, generates public page). Order notes thread.

**Place Order Flow (later phase):** Multi-step slide-out panel. Product selection grid, configuration, cart review, confirm and submit. Progress indicator with `.section-label` step labels.

### 4C. Product Configurator and Quote Builder

**Configurator:** Product type selection, model grid with images, customization options (wood finish swatches, felt color swatches, size, accessories). Swatches: square, no radius, 2px `--color-primary` border on selected. Live preview area. Running price in Roboto Condensed 300, labels in `.section-label`.

**Quote Generator:** "Generate Customer Quote" `.btn-primary`. Modal with dealer info pre-filled + customer name, note, delivery/installation fees. Generates branded PDF:
- C.L. Bailey logo, California House styling
- Typography: Roboto Condensed headings, Raleway labels, Roboto body
- Colors: `--color-primary` and `--color-silver` only
- MSRP pricing, dealer showroom info, quote number, 30-day expiration, T&C footer
- Use `@react-pdf/renderer` or `pdf-lib`
- Download + "Email to Customer" buttons

**Deliverable:** Dashboard, orders, and configurator fully functional with mock data. Quote PDF generates correctly.

---

## Stage 5: Portal Extended Features

**Goal:** Complete the remaining portal sections.

### 5A. Inventory Panel

Grid/table of all products with: available stock, restock date, lead time. Availability indicators using tonal approach (no bright green/yellow/red): In Stock (`--color-mid-gray`), Low Stock (`--color-silver` + caution label), Out of Stock (`--color-primary` + label). Filter by product line, status. "Notify me when available" `.btn-outline`.

### 5B. Lead Management

**Lead Inbox:** List with Name, Location, Source, Date, Status. Status labels in `.metadata`. Click to detail view.

**Lead Detail:** Customer info, product interest, activity log, quick actions (Mark as Contacted, Create Quote, Mark as Won/Lost).

**Lead Response Templates:** Pre-written email templates (Initial outreach, Follow-up, Quote accompaniment, Post-visit thank you) in C.L. Bailey brand voice. Customizable before sending.

### 5C. Warranty Registration and Claims

**Registration form:** Customer name, delivery address, product model, serial number, delivery date. Auto-generates warranty certificate PDF.

**Claims:** Submit with product info, issue description, photo uploads, requested resolution. Status timeline matching order detail pattern. Communication thread.

**Warranty Lookup:** Search by serial number or customer name.

### 5D. Support Ticket System

**Submit a Ticket:** Category dropdown (Order Issue, Warranty Claim, Product Question, Marketing Request, Portal Help, Other), priority, description, file uploads. Auto-routes to appropriate team.

**Ticket History:** List with status badges. Click into full conversation thread. Response notifications.

### 5E. Enhanced Downloads

Keep existing structure. Add:
- **Marketing Asset Library:** Social templates, email templates, print flyers, co-op ad templates. Organized by campaign/season. Search/filter by product line.
- **Showroom Materials:** POS display templates, comparison charts, room size printables, warranty cards.
- **Seasonal Campaign Kits:** Pre-packaged kits for holiday, Father's Day, Super Bowl, etc. Download as ZIP or browse individually.

### 5F. Enhanced Account Tab

**Dealer Profile:** Salesforce-driven data. Tier status with benefits. Territory info. Regional sales manager contact. "Request Profile Update" form.

**Performance Summary:** YTD sales vs. target progress bar (`--color-primary` on `--color-cloud`). Monthly trend chart (Recharts, brand palette only). Top-selling models. Tier progress message.

**Notification Preferences:** Toggles for leads, order updates, product launches, price changes. Square toggle switches (no rounded).

### 5G. Notification System

Bell icon in header with unread count badge (`--color-primary` background, small). Dropdown with recent notifications, `--color-cloud` dividers. Types: lead assigned, order status, announcement, price update, product launch. Mark read/unread. Link to relevant section.

### 5H. Dealer Training Hub

**Product Knowledge Base:** Selling guides per product line, common Q&A, tech specs, installation guides, finish/felt galleries.

**Sales Training:** Video tutorials, objection handling guides, room measurement guides.

**New Dealer Onboarding:** Step-by-step checklist with completion tracking.

**Deliverable:** All portal features functional with mock data. Full end-to-end flows testable.

---

## Stage 6: Polish, Performance, and Deployment

**Goal:** Production-ready quality.

### 6A. Loading, Empty, and Error States

- **Loading:** Skeleton screens using `--color-cloud` placeholder blocks. No spinners.
- **Empty:** Centered message in `.heading-sub` with relevant `.btn-primary` CTA.
- **Error:** Clean error message with retry button. Graceful degradation.

### 6B. Responsive Design Pass

- Verify every page and portal section works on mobile (375px), tablet (768px), and desktop (1440px+)
- Portal tabs should collapse to a horizontal scroll or dropdown on mobile
- Tables should become card-based layouts on mobile
- Configurator swatches should wrap naturally

### 6C. Accessibility

- All interactive elements have proper `aria-label` attributes
- Color contrast meets WCAG AA for all text on all backgrounds
- Keyboard navigation works through all portal flows
- Form validation errors are announced to screen readers

### 6D. Performance

- All images use Next.js `<Image>` with proper `sizes` attribute
- Product images loaded from `/data/products.json` paths via `img()` helper
- Lazy load below-fold content
- Portal data fetched client-side with proper loading states (no blocking server fetches on portal pages)

### 6E. SEO and Metadata

- Every public page has proper `<Metadata>` export with title, description, canonical URL, and language alternates
- OpenGraph and Twitter card meta for product pages
- Structured data (JSON-LD) for products where applicable
- Sitemap already exists at `app/sitemap.ts`, verify it includes all pages

### 6F. i18n Final Pass

- Every new string in both `/messages/en.json` and `/messages/es.json`
- Portal-specific translations (order statuses, form labels, notification messages)
- Date and currency formatting respects locale

### 6G. Salesforce Setup Documentation

Create `SALESFORCE_SETUP.md` with:
- Step-by-step Connected App setup instructions
- Required Salesforce objects and fields mapping:
  - `Account` -> Dealer profile, tier, territory
  - `Contact` -> Dealer primary contact
  - `Order` / `Opportunity` -> Orders
  - `Product2` + `PricebookEntry` -> Product catalog + pricing
  - `Lead` -> Inbound leads
  - `Case` -> Support tickets, warranty claims
  - Custom objects for: Inventory, Territory Rankings, Notifications, Warranty Registrations
- JWT Bearer Flow configuration
- Integration User permissions
- How to flip `SALESFORCE_ENABLED=true` and test
- Troubleshooting guide

**Deliverable:** Production-ready site. `npm run build` passes clean. All pages responsive and accessible. Salesforce docs ready for handoff.

---

## Connecting Salesforce (When Ready)

When you have your Salesforce credentials, the process is:

1. Open `.env.local`
2. Set `SALESFORCE_ENABLED=true`
3. Fill in the five Salesforce variables:
   ```
   SALESFORCE_LOGIN_URL=https://login.salesforce.com
   SALESFORCE_CLIENT_ID=your_actual_client_id
   SALESFORCE_CLIENT_SECRET=your_actual_secret
   SALESFORCE_USERNAME=your_integration_user@clbailey.com
   SALESFORCE_PRIVATE_KEY_PATH=./certs/salesforce-key.pem
   ```
4. Place your JWT certificate at `./certs/salesforce-key.pem`
5. Restart the dev server

That is it. The service layer automatically switches from mock data to live Salesforce calls. No component changes needed.

---

## Component Architecture (Full List)

```
components/
├── layout/
│   ├── Header.tsx                    # Global nav (update)
│   └── Footer.tsx                    # Global footer (update)
├── home/
│   ├── Hero.tsx                      # Homepage hero (rebuild)
│   ├── HomeSections.tsx              # Homepage sections (update)
│   ├── DealerLocator.tsx             # Existing
│   └── MuseumGrid.tsx                # Existing
├── ui/
│   ├── SectionHeader.tsx             # New: section-label + heading-display
│   ├── Container.tsx                 # New: max-width wrapper
│   ├── Divider.tsx                   # New: horizontal rule
│   ├── ProductCard.tsx               # Update to design system
│   ├── SectionLabel.tsx              # Existing
│   ├── ScrollReveal.tsx              # Existing
│   ├── BackToTop.tsx                 # Existing
│   ├── DealerSearch.tsx              # Update to design system
│   ├── LeadModal.tsx                 # Update to design system
│   ├── PdfGateModal.tsx              # Update to design system
│   └── AIConcierge.tsx               # Existing (floating chatbot)
└── dealer-portal/
    ├── DealerPortalLayout.tsx        # Tab nav + notifications
    ├── DealerDashboard.tsx           # Overview tab
    ├── OrdersPanel.tsx               # Orders list
    ├── OrderDetail.tsx               # Single order
    ├── OrderForm.tsx                 # Place new order
    ├── ProductConfigurator.tsx       # Configurator + quote builder
    ├── QuotePreview.tsx              # Quote modal
    ├── InventoryPanel.tsx            # Inventory tab
    ├── LeadManagement.tsx            # Leads list
    ├── LeadDetail.tsx                # Single lead
    ├── LeadResponseTemplates.tsx     # Email templates
    ├── DownloadsPanel.tsx            # Enhanced downloads
    ├── AccountPanel.tsx              # Enhanced account
    ├── WarrantyPanel.tsx             # Warranty registration + claims
    ├── WarrantyClaimDetail.tsx       # Single claim
    ├── SupportPanel.tsx              # Support tickets
    ├── SupportTicketDetail.tsx       # Single ticket
    ├── TrainingHub.tsx               # Training + resources
    ├── NotificationBell.tsx          # Bell icon + dropdown
    ├── StatusBadge.tsx               # Reusable status pill
    ├── StatusTimeline.tsx            # Horizontal stepper
    ├── KPICard.tsx                   # Dashboard metric card
    ├── ProductCard.tsx               # Configurator product card
    ├── SwatchSelector.tsx            # Color/finish picker (square)
    ├── DealerTierBadge.tsx           # Tier badge
    ├── FileUploader.tsx              # Drag-and-drop upload
    └── ProgressBar.tsx               # Sales/tier progress
```

---

## Technical Constraints

- All product data from `/data/products.json` via typed helpers. No database.
- Use `img()` and `pdf()` helpers from `/lib/products.ts` for asset paths. Never hardcode.
- i18n: `useTranslations()` client-side, `getTranslations()` + `setRequestLocale(locale)` server-side
- The middleware handles both i18n routing AND dealer portal auth. Edit carefully.
- Google Sheets integration fails gracefully if env vars are missing.
- Radix UI for accessible dialogs (already installed)
- React Hook Form + Zod for form validation (already installed)
- Recharts for charts (install as needed, lightweight)
- `@react-pdf/renderer` for PDF generation (install as needed)
- Do NOT install Material UI, Ant Design, or any heavy component library
- No em dashes anywhere in content. Use commas, periods, or colons.
- No bright or saturated accent colors. Stay within the cool gray palette.
- No border-radius on cards, buttons, or swatches.
- No drop shadows.
- Font-weight 300 for all large display text, never heavier than 400 for headings.
