# C.L. Bailey & Co. -- Dealer Portal Build-Out (Claude Code Prompt)

## Project Context

You are working on the C.L. Bailey & Co. website, a heritage billiards company manufacturing solid hardwood pool tables, shuffleboards, and game room furniture, sold exclusively through an authorized dealer network. The site is built with Next.js 16.1.6 (App Router, Turbopack), React 19, TypeScript, and Tailwind CSS v4. Deployed on Netlify. The site supports English and Spanish (next-intl v4 with `/en/` and `/es/` routes).

The brand aesthetic follows the **California House design system**: muted luxury, cool gray palette, generous whitespace, photography-forward. The feel is "quiet luxury showroom," understated, refined, premium. All design decisions are documented in `CLAUDE.md` and the visual brand kit at `/docs/california-house-brand-kit.html`.

### Design System Reference

**Fonts** (loaded in `layout.tsx` via `next/font/google`):
- **Roboto Condensed** (`--font-display`): Display headings, h1, h3, product titles. Weight 300 (light) for large sizes, 400 for card titles.
- **Raleway** (`--font-label`): Navigation links, section labels, buttons, metadata. Always uppercase with 2-3px letter-spacing.
- **Roboto** (`--font-sans`): Body text. Weight 400, 13px base, 26px line-height.

**Core Colors** (defined in `globals.css` via `@theme inline`):
- `--color-primary` (#231f20): Nav text, dark buttons, card titles
- `--color-deep` (#1b1b1b): Footer, darkest sections
- `--color-mid-gray` (#7e7d84): Subheadings, section labels
- `--color-body` (#919199): Body paragraph text
- `--color-silver` (#b0b2bc): Display headings, borders, light accents
- `--color-cloud` (#ebecee): Section backgrounds, borders, dividers
- `--color-off-white` (#f6f6f7): Alternate section backgrounds
- `--color-whisper` (#f9f9fb): Subtle card backgrounds

**Overlays:**
- `--overlay-nav`: rgba(176, 178, 188, 0.85) -- semi-transparent nav
- `--overlay-soft`: rgba(176, 178, 188, 0.45) -- hero image overlays
- `--overlay-white`: rgba(255, 255, 255, 0.9) -- content overlays

**Typography Classes** (from `globals.css`):
- `.heading-display`: Roboto Condensed 300
- `.heading-hero`: Roboto Condensed 300, responsive clamp sizing
- `.heading-sub`: Roboto Condensed 300, 22px, mid-gray
- `.heading-card`: Roboto Condensed 400, 19px, primary dark
- `.section-label`: Raleway 500, 12px, uppercase, 3px tracking
- `.metadata`: Raleway 600, 11px, uppercase, 2px tracking

**Button Classes** (from `globals.css`):
- `.btn-primary`: Outlined dark border, Raleway uppercase, fills on hover
- `.btn-outline`: Outlined silver border, lighter variant
- `.btn-outline-white`: White border for dark backgrounds
- `.btn-heritage`: Solid dark fill (legacy compat)

**Design Rules:**
- Font-weight 300 for all large display text
- Colors must stay muted and tonal (cool grays only, no bright accents)
- Generous whitespace between sections (35-80px padding)
- Raleway uppercase + letter-spacing for all labels and navigation
- No drop shadows, no rounded corners (border-radius: 0)
- Buttons should be subtle and outlined, never visually dominant
- NEVER use em dashes anywhere in content, use commas, periods, or colons instead

---

## Current Dealer Portal State

The existing dealer portal (`/en/dealer-portal`) has three tabs:

1. **Overview** -- Summary stat cards (Product Lines, Active Models, Spec Sheets, Price Lists), an Announcements feed with dated entries, and Quick Links
2. **Downloads** -- Organized sections for Pool Table Spec Sheets (Skylar, Viking, Dutchess, Tunbridge, Duke, Norwich, Elayna, Adrian), Shuffleboard Spec Sheets (Viking, Skylar, Tunbridge), Marketing Materials (2026 Product Catalog, Brand Guidelines, Dealer Display Kit), and Price Lists (2026 MSRP, 2026 Dealer Cost Sheet)
3. **Account** -- Dealer Information (managed by C.L. Bailey), Support Contact info, Territory section, and a Contact Support button

There is also an "Open Showroom Manager" button and a Sign Out button. Authentication currently uses a simple gated system (cookie-based auth via middleware).

### Product Lines

- **Pool Tables:** Skylar, Viking, Dutchess, Tunbridge, Duke, Norwich, Elayna, Adrian (+ upcoming Addison Q2 2026)
- **Shuffleboards:** Viking, Skylar, Tunbridge
- **Game Room Furniture:** Various items
- **Cue Racks:** Various items

Each pool table model has customization options including felt colors and wood finishes.

---

## What Needs to Be Built

### Architecture Goal

Build a Salesforce-ready dealer portal where all dynamic data flows through a service layer that currently returns mock/static data, but is structured so that swapping in real Salesforce API calls requires only changing the service implementations, no component changes needed.

### Technical Architecture

#### Salesforce Service Layer

Create a service abstraction layer at `lib/salesforce/`:

```
lib/salesforce/
├── client.ts              # SF REST API client (JWT Bearer auth, token refresh)
├── types.ts               # All Salesforce object type definitions
├── services/
│   ├── dealer.service.ts     # Dealer account, profile, territory data
│   ├── order.service.ts      # Orders, order lines, order status
│   ├── inventory.service.ts  # Product availability, stock levels
│   ├── lead.service.ts       # Lead routing, lead status
│   ├── analytics.service.ts  # Sales performance, territory rankings
│   ├── warranty.service.ts   # Warranty claims, registration tracking
│   └── support.service.ts    # Support tickets, case management
├── mock/
│   ├── dealer.mock.ts        # Mock dealer data for development
│   ├── order.mock.ts         # Mock order data
│   ├── inventory.mock.ts     # Mock inventory data
│   ├── lead.mock.ts          # Mock lead data
│   ├── analytics.mock.ts     # Mock analytics data
│   ├── warranty.mock.ts      # Mock warranty data
│   └── support.mock.ts       # Mock support ticket data
└── index.ts               # Exports with environment-based switching
```

The service layer should:
- Export a unified interface that components import from `@/lib/salesforce`
- Use environment variable `SALESFORCE_ENABLED=true|false` to toggle between mock and live data
- When `SALESFORCE_ENABLED=false`, return realistic mock data that demonstrates the full UI
- When `SALESFORCE_ENABLED=true`, make real API calls using JWT Bearer flow
- All API calls go through Next.js API routes (`app/api/dealer/`), never expose SF credentials client-side
- Include proper TypeScript interfaces for all Salesforce objects

Environment variables to scaffold (with placeholder values):

```env
SALESFORCE_ENABLED=false
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_CLIENT_ID=your_connected_app_client_id
SALESFORCE_CLIENT_SECRET=your_connected_app_secret
SALESFORCE_USERNAME=integration_user@clbailey.com
SALESFORCE_PRIVATE_KEY_PATH=./certs/salesforce-key.pem
```

#### API Routes

```
app/api/dealer/
├── profile/route.ts          # GET dealer profile, territory, tier
├── orders/route.ts           # GET orders list, POST new order
├── orders/[id]/route.ts      # GET single order detail + status timeline
├── inventory/route.ts        # GET product availability
├── leads/route.ts            # GET routed leads, PATCH lead status
├── analytics/route.ts        # GET sales performance data
├── quote/route.ts            # POST generate quote PDF
├── warranty/route.ts         # GET/POST warranty claims
├── support/route.ts          # GET/POST support tickets
└── notifications/route.ts    # GET dealer notifications/announcements
```

All routes should validate the dealer session/auth before returning data.

---

## Portal Sections to Build

### 1. Enhanced Overview Dashboard

Replace the current static stat cards with a personalized, Salesforce-driven dashboard.

**Top Section -- Dealer Welcome:**
- "Welcome back, [Dealer Name]" using `.heading-sub` (Roboto Condensed 300)
- Dealer tier badge (Gold, Silver, Bronze, Platinum) using `.metadata` styling (Raleway uppercase)
- Territory: [Territory Name] | Regional Rep: [Rep Name] in `--color-body` text
- Quick action buttons using `.btn-primary` (outlined dark, Raleway uppercase)

**KPI Cards Row (4 cards):**
- Cards use `--color-whisper` background, 1px `--color-cloud` border, no border-radius, no shadow
- Large number in Roboto Condensed 300, `--color-primary`
- Label beneath in `.section-label` style (Raleway 500, 12px, uppercase, `--color-mid-gray`)
- Cards: YTD Sales (with trend arrow), Open Orders (clickable), Territory Rank, Pending Leads

**Announcements Section (keep existing but enhance):**
- Announcement categories: Product Update, Pricing, Operations, Marketing
- Category indicators using subtle `--color-silver` and `--color-mid-gray` tones (no bright colors)
- Make announcements actionable, e.g., "New Addison Model" links to pre-order or spec sheet
- Date stamps in `.metadata` style

**Quick Links Section (keep existing but add):**
- Add links to: Place Order, Product Configurator, Marketing Assets, Support Ticket
- Links styled as `.btn-outline` or as Raleway uppercase text links

### 2. Orders Tab (NEW)

Order management hub, the highest-value addition.

**Order List View:**
- Clean table with bottom borders only (1px `--color-cloud`), no heavy grid lines
- Column headers in `.metadata` style (Raleway 600, 11px, uppercase, 2px tracking)
- Columns: Order #, Date, Models/Qty Summary, Status, Total, ETA
- Status badges: subtle pill-shaped with very light background tints using diluted palette colors (e.g., 10% opacity of `--color-mid-gray` for neutral, 10% opacity of `--color-primary` for active). No bright colors.
  - Draft, Submitted, Confirmed, In Production, Shipped, Delivered
- Filter by status, date range
- Sort by date, status, amount
- "Place New Order" using `.btn-primary`

**Order Detail View:**
- Order header: Order # in `.heading-card`, status badge, date in `.metadata`
- Status Timeline: horizontal stepper with `--color-silver` track, `--color-primary` for completed steps, `--color-cloud` for pending. Steps: Submitted, Confirmed, In Production, Shipped, Delivered, with dates at each completed step.
- Line items table matching the list view style
- Shipping info: Carrier, tracking #, estimated delivery
- Customer-Shareable Tracking Link: button (`.btn-outline`) to generate a public tracking page (no auth required) the dealer can send to their end customer
- Order notes / communication thread

**Place Order Flow:**
- Step 1: Select products from catalog (grid of product cards with images, `.heading-card` titles)
- Step 2: Configure each item (model, finish, felt color, accessories)
- Step 3: Review cart with pricing (dealer cost, not MSRP)
- Step 4: Confirm and submit (generates order in Salesforce)
- Use a slide-out panel or multi-step modal, not a separate page
- Progress indicator using `.section-label` step labels

### 3. Product Configurator and Quote Builder (NEW)

The standout feature: turns the portal into a sales tool.

**Configurator Interface:**
- Select product type (Pool Table, Shuffleboard, Game Room Furniture)
- Select model from visual grid with product images
- Choose customizations:
  - **Wood Finish:** Swatches with names (Espresso, Natural Walnut, Weathered Oak). Swatches should be square (no rounded corners, per design system), with a 2px `--color-primary` border on selected state.
  - **Felt Color:** Championship cloth color swatches, same square treatment
  - **Size:** Available sizes for that model
  - **Accessories:** Matching cue rack, cover, accessory kit
- Live preview area showing selected configuration (placeholder image area that swaps based on selections)
- Running price calculation: show both dealer cost and MSRP
- Price labels in `.section-label` style, amounts in Roboto Condensed 300

**Quote Generator:**
- Button: "Generate Customer Quote" (`.btn-primary`)
- Modal with dealer info pre-filled
- Dealer can add: customer name, personalized note, delivery fee, installation fee
- Generates a branded PDF quote:
  - C.L. Bailey logo and California House brand styling
  - Configuration details with product image
  - MSRP pricing (not dealer cost)
  - Dealer's showroom info and contact
  - Quote number and expiration date (30 days)
  - Terms and conditions footer
  - Typography: Roboto Condensed for headings, Raleway for labels, Roboto for body
  - Colors: `--color-primary` and `--color-silver` tones only
- PDF uses server-side generation (`@react-pdf/renderer` or `pdf-lib`)
- Download button + "Email to Customer" button

### 4. Inventory and Availability (NEW)

Real-time stock visibility, the #2 most-requested feature by dealers.

**Inventory Dashboard:**
- Grid or table view of all products
- For each product/configuration: Available stock, Estimated restock date, Lead time
- Availability indicators using tonal approach: In Stock (`--color-mid-gray` with subtle indicator), Low Stock (`--color-silver` with caution label), Out of Stock/Made to Order (`--color-primary` with label). Avoid bright green/yellow/red; keep within the muted palette.
- Filter by product line, availability status
- "Notify me when available" button (`.btn-outline`) for out-of-stock items

**Regional Warehouse View (if applicable):**
- Show what's available in the dealer's regional warehouse vs. central warehouse
- Estimated shipping time from each location

### 5. Lead Management (NEW)

For dealers receiving leads from C.L. Bailey's national marketing efforts.

**Lead Inbox:**
- List of leads routed to this dealer from the "Find a Dealer" page or national campaigns
- Each lead shows: Name, Location, Source (website, trade show, referral), Date, Status
- Status options: New, Contacted, Qualified, Quote Sent, Won, Lost
- Status labels in `.metadata` style
- Click into a lead to see details and update status

**Lead Detail View:**
- Customer info: Name, email, phone, location
- Interest: Product they inquired about, room size, budget range (if provided)
- Activity log: When lead was created, status changes, notes
- Quick actions: Mark as Contacted, Create Quote (links to configurator), Mark as Won/Lost
- Data syncs back to Salesforce for C.L. Bailey to track dealer follow-through

**Lead Response Templates (NEW -- value add):**
- Pre-written email templates dealers can use to respond to leads quickly
- Templates for: Initial outreach, Follow-up, Quote accompaniment, Post-visit thank you
- Templates use the C.L. Bailey brand voice and can be customized before sending
- Reduces lead response time and ensures brand consistency

### 6. Enhanced Downloads Tab (UPGRADE)

Keep the existing Downloads tab structure but add:

**Marketing Asset Library (new section):**
- Social media templates (Instagram, Facebook) with product images
- Email campaign templates
- Print-ready flyers and brochures
- Co-op advertising templates with space for dealer's logo/info
- Assets organized by campaign or season
- Search/filter by product line or asset type
- Asset cards using `.heading-card` titles, `.metadata` for file details

**Showroom Materials:**
- Point-of-sale display templates
- Product comparison charts
- Room size guide printables
- Warranty registration cards

**Seasonal Campaign Kits (NEW -- value add):**
- Pre-packaged marketing kits for key selling seasons (holiday, Father's Day, back-to-school, Super Bowl)
- Each kit includes: social posts, email templates, in-store signage, ad copy
- Download entire kit as a ZIP or browse individual assets

### 7. Enhanced Account Tab (UPGRADE)

Replace the current static Account tab with Salesforce-driven data:

**Dealer Profile:**
- Business name, address, primary contact pulled from Salesforce
- Dealer tier status with benefits description (`.heading-sub` for tier name, body text for benefits)
- Territory map or territory name with boundaries
- Assigned regional sales manager with direct contact
- "Request Profile Update" form (submits to Salesforce case)

**Performance Summary:**
- YTD sales vs. target, displayed as a clean progress bar (`--color-primary` fill on `--color-cloud` track)
- Monthly sales trend chart (Recharts line or bar chart)
- Top-selling models for this dealer
- Tier progress: "You're $XX,XXX away from Platinum status"

**Notification Preferences:**
- Toggle notifications for: New leads, Order updates, Product launches, Price changes
- Email and/or in-portal notification options
- Clean toggle switches consistent with the design system (no rounded, use square toggles)

### 8. Notification System (NEW)

Portal-wide notification system:

- Bell icon in the portal header with unread count badge (small, `--color-primary` background)
- Notification dropdown with recent items, clean list with `--color-cloud` dividers
- Notification types: New lead assigned, Order status change, New announcement, Price list update, New product launch
- Mark as read/unread
- Link each notification to relevant portal section
- Persist read/unread state

### 9. Warranty Registration and Claims Portal (NEW -- value add)

A dedicated warranty management section that saves dealers phone calls and emails.

**Warranty Registration:**
- Form for dealers to register products on behalf of customers at time of delivery
- Fields: Customer name, delivery address, product model, serial number, delivery date, installer name
- Auto-generates a warranty certificate PDF with C.L. Bailey branding
- Confirmation email sent to both dealer and end customer

**Warranty Claims:**
- Submit a warranty claim with: Product info, issue description, photos (upload), requested resolution
- Claim status tracking: Submitted, Under Review, Approved, Parts Shipped, Resolved
- Status timeline matching the order detail pattern
- Communication thread for back-and-forth with C.L. Bailey support

**Warranty Lookup:**
- Search by serial number or customer name to check warranty status
- View warranty expiration dates and coverage details

### 10. Support Ticket System (NEW -- value add)

Replaces the current "Contact Support" button with a proper ticketing system.

**Submit a Ticket:**
- Category selection: Order Issue, Warranty Claim, Product Question, Marketing Request, Portal Help, Other
- Priority: Standard, Urgent
- Description field with file upload support
- Auto-routes to appropriate C.L. Bailey team member

**Ticket History:**
- List of all submitted tickets with status: Open, In Progress, Awaiting Response, Resolved
- Click into ticket for full conversation thread
- Response notifications via the portal notification system

### 11. Dealer Training and Resources Hub (NEW -- value add)

Helps dealers sell more effectively with product knowledge and sales training.

**Product Knowledge Base:**
- Detailed selling guides for each product line
- Common customer questions and recommended answers
- Technical specifications and installation guides
- Wood finish and felt color galleries with descriptions

**Sales Training:**
- Video tutorials on product features and selling points
- Objection handling guides (price justification, competitor comparisons)
- Room measurement and sizing guides dealers can use with customers

**Onboarding Checklist (for new dealers):**
- Step-by-step setup guide: Set up showroom display, Complete product training, First order walkthrough
- Progress tracking with completion status

---

## Component Architecture

### Shared Components to Create

```
components/dealer-portal/
├── DealerPortalLayout.tsx        # Main layout with tab navigation + notifications
├── DealerDashboard.tsx           # Overview tab content
├── OrdersPanel.tsx               # Orders tab
├── OrderDetail.tsx               # Single order view
├── OrderForm.tsx                 # Place new order flow
├── ProductConfigurator.tsx       # Configurator + quote builder
├── QuotePreview.tsx              # Quote preview modal
├── InventoryPanel.tsx            # Inventory tab
├── LeadManagement.tsx            # Leads tab
├── LeadDetail.tsx                # Single lead view
├── LeadResponseTemplates.tsx     # Email templates for lead follow-up
├── DownloadsPanel.tsx            # Enhanced downloads (upgrade existing)
├── AccountPanel.tsx              # Enhanced account (upgrade existing)
├── WarrantyPanel.tsx             # Warranty registration + claims
├── WarrantyClaimDetail.tsx       # Single warranty claim view
├── SupportPanel.tsx              # Support ticket system
├── SupportTicketDetail.tsx       # Single ticket conversation view
├── TrainingHub.tsx               # Training and resources
├── NotificationBell.tsx          # Header notification icon + dropdown
├── StatusBadge.tsx               # Reusable status pill component
├── StatusTimeline.tsx            # Order/warranty status stepper
├── KPICard.tsx                   # Dashboard metric card
├── ProductCard.tsx               # Product grid card for configurator
├── SwatchSelector.tsx            # Color/finish swatch picker (square, no radius)
├── DealerTierBadge.tsx           # Gold/Silver/Bronze/Platinum badge
├── FileUploader.tsx              # Drag-and-drop file upload for claims/tickets
└── ProgressBar.tsx               # Tier progress, sales-to-target bar
```

---

## Design System Notes

- Follow the **California House design system** documented in `CLAUDE.md` and `globals.css`
- All headings use **Roboto Condensed** weight 300. Card titles use weight 400.
- All labels, navigation, buttons, and metadata use **Raleway** uppercase with 2-3px letter-spacing
- All body text uses **Roboto** weight 400, 13px, 26px line-height
- Colors stay within the cool gray palette: `--color-primary`, `--color-mid-gray`, `--color-body`, `--color-silver`, `--color-cloud`, `--color-off-white`, `--color-whisper`. **No bright or saturated accent colors.**
- Use the existing tab pattern (Overview | Downloads | Account) and extend it: **Overview | Orders | Configurator | Inventory | Leads | Downloads | Account**
- Stat/KPI cards: large number in Roboto Condensed 300, small label in `.section-label`, `--color-whisper` background, 1px `--color-cloud` border, no shadow, no border-radius
- Tables: clean with bottom borders only (1px `--color-cloud`), column headers in `.metadata` style
- Buttons: Primary = outlined dark border that fills on hover (`.btn-primary`), Secondary = outlined silver border (`.btn-outline`)
- Status badges: subtle pill-shaped with very light background tints using diluted palette grays. No bright green/yellow/red.
- Swatches: square (border-radius: 0), 2px `--color-primary` border on selected state, no shadow
- All modals/slide-outs should use smooth animation consistent with the existing site transitions (300ms ease)
- Charts (Recharts) should use the brand palette: `--color-primary` (#231f20), `--color-mid-gray` (#7e7d84), `--color-silver` (#b0b2bc), `--color-cloud` (#ebecee). **No gold, brass, or bright accent colors.**
- Alternate section backgrounds between `--color-white`, `--color-off-white`, and `--color-whisper`
- All text content must avoid em dashes. Use commas, periods, or colons instead.

---

## Mock Data Requirements

Create comprehensive mock data that demonstrates every feature. The mock data should feel realistic for a pool table dealer network:

**Mock Dealer:**
- Pacific Billiards & Games, San Diego, CA
- Gold Tier dealer
- Territory: Southern California, Coastal
- Regional rep: Sarah Mitchell, sarah.mitchell@clbailey.com

**Mock Orders (5-8 orders):**
- Mix of statuses: 1 Delivered, 2 Shipped, 1 In Production, 1 Confirmed, 1 Submitted, 1 Draft
- Realistic product mixes (e.g., "2x Skylar Pool Table, Espresso/Navy felt + 1x Viking Shuffleboard, Natural Walnut")
- Realistic pricing ($2,000-$8,000 per table wholesale)

**Mock Inventory:**
- Show realistic availability across all models
- Some items in stock, some low stock, a couple out of stock with restock dates

**Mock Leads (6-10 leads):**
- Mix of statuses and sources
- Realistic customer names and San Diego area zip codes
- Various product interests

**Mock Analytics:**
- YTD sales: ~$340,000
- Prior year comparison showing 12% growth
- Territory rank: #3 of 18 dealers
- Monthly trend data for past 12 months

**Mock Warranty Claims (3-4 claims):**
- Mix of statuses: 1 Resolved, 1 Approved/parts shipped, 1 Under Review, 1 Submitted
- Realistic issues (felt tear, leveling adjustment, finish blemish)

**Mock Support Tickets (3-5 tickets):**
- Mix of categories and statuses
- Realistic dealer support scenarios

---

## Implementation Priority

Build in this order:

1. **Salesforce service layer + mock data** -- Foundation for everything else
2. **Enhanced Overview Dashboard** -- Immediate visual impact
3. **Orders Tab with Order Detail** -- Highest value feature
4. **Product Configurator + Quote Builder** -- Biggest differentiator
5. **Inventory Panel** -- High demand from dealers
6. **Lead Management + Response Templates** -- Completes the sales workflow
7. **Warranty Registration and Claims** -- Reduces support overhead
8. **Enhanced Downloads and Account tabs** -- Upgrades to existing
9. **Notification System** -- Polish feature
10. **Support Ticket System** -- Replaces email-based support
11. **Training and Resources Hub** -- Dealer enablement
12. **Place Order flow** -- Complex; can be a later phase

---

## Technical Notes

- This is a **Next.js 16.1.6 App Router** project with Turbopack, React 19, TypeScript, Tailwind CSS v4
- The site has i18n routing (`/en/` and `/es/`) via next-intl v4. All new components must support both languages. Use `useTranslations("namespace")` hook in components. Server-side: `setRequestLocale(locale)`.
- Translations live in `/messages/en.json` and `/messages/es.json`
- Product data lives in `/data/products.json`. Use typed helpers from `/lib/products.ts` (`getProduct()`, `getProductsByCategory()`, `getFeaturedProducts()`).
- Deployed on Netlify. Use Next.js API routes for server-side logic.
- For PDF generation, use `@react-pdf/renderer` for the quote builder and warranty certificates
- For charts, use `recharts`, it is lightweight and React-native
- For accessible dialogs/modals, use Radix UI (already in the project)
- For form validation, use React Hook Form + Zod (already in the project)
- Do NOT install heavy component libraries (no Material UI, no Ant Design). Build components that match the California House design system.
- All mock data should be clearly separated so it is easy to identify what gets replaced with Salesforce calls
- Write thorough TypeScript types for all Salesforce objects and API responses
- Include loading states, empty states, and error states for all data-driven components
- Loading states: use subtle skeleton screens with `--color-cloud` placeholder blocks, no spinners
- Empty states: centered message in `.heading-sub` with a relevant `.btn-primary` CTA
- The existing "Open Showroom Manager" button should remain functional
- The middleware (`middleware.ts`) handles both i18n routing AND dealer portal auth. Be careful editing it.

---

## Environment and Connection Notes for Salesforce

When the client is ready to connect Salesforce, they will need:

1. Connected App in Salesforce with JWT Bearer Flow enabled
2. Integration User with API access and appropriate object permissions
3. Digital Certificate uploaded to the Connected App
4. Salesforce Objects that should map to portal features:
   - `Account` -- Dealer profile, tier, territory
   - `Contact` -- Dealer primary contact
   - `Order` / `Opportunity` -- Orders
   - `Product2` + `PricebookEntry` -- Product catalog + pricing
   - `Lead` -- Inbound leads
   - `Case` -- Support tickets, warranty claims, profile update requests
   - Custom objects as needed for: Inventory, Territory Rankings, Notifications, Warranty Registrations

Include a `SALESFORCE_SETUP.md` file documenting exactly what Salesforce configuration is needed, what objects/fields are expected, and how to set up the Connected App. This will be the handoff document for whoever configures Salesforce.

---

## Summary

Build a world-class dealer portal that transforms C.L. Bailey's dealer relationship from "download spec sheets" to a full sales enablement platform. Every feature should work beautifully with mock data today, and be ready for Salesforce tomorrow with only service-layer changes. The UI must maintain the California House muted luxury aesthetic throughout: cool gray palette, Roboto Condensed/Raleway/Roboto typography, generous whitespace, no bright accents, no em dashes.
