# C.L. Bailey & Co. -- Accessories and Velocity Pro Cloth (Addendum Prompt)

> **Context:** This prompt adds two sections missing from the site rebuild: the **Accessories** product category and the **Velocity Pro Cloth** feature page. These exist on the current live site (clbailey.com) but were not included in the rebuild. This prompt should be run after Stage 1 (Design System Alignment) is complete. All styling follows the California House design system documented in `CLAUDE.md`.

---

## What is Missing

The live site at clbailey.com has two sections with no equivalent in the rebuild:

1. **Accessories category page** (`/product-category/accessories/`) containing 7 products:
   - #6 Iron Leather Pockets
   - Basic Accessory Kit
   - Deluxe Accessory Kit
   - Magnum Pool Ball Sets
   - Mali Basic Green Felt
   - Platinum Accessory Kits
   - Premium Accessory Kit

2. **Velocity Pro Cloth page** (`/velocity-pro-cloth/`) which is a dedicated feature/marketing page for C.L. Bailey's premium worsted billiard cloth. This is a branded product differentiator, not just a product listing.

Neither of these exists in the current `/data/products.json`, the routing structure, or the navigation.

---

## What Needs to Be Built

### 1. Add Accessories to Product Data

Update `/data/products.json` to include a new "Accessories" category and its products.

**New category entry:**
```json
{
  "id": "accessories",
  "name": "Accessories",
  "slug": "accessories",
  "description": "Complete your game room with premium billiard accessories, from professional-grade ball sets to handcrafted leather pockets."
}
```

**New products to add** (7 items). For each, create a product entry following the existing data structure (name, slug, category, tagline, description, images, specs). Use placeholder image paths following the existing convention (`/images/products/accessories/[slug]/hero.jpg`):

1. **#6 Iron Leather Pockets**
   - Category: accessories
   - Slug: iron-leather-pockets
   - Tagline: Handcrafted #6 iron leather pockets with reinforced construction
   - Description: Professional-grade replacement pockets featuring genuine leather construction with #6 irons. Designed to fit C.L. Bailey pool tables and most standard pocket configurations. Available in multiple leather colors to complement your table finish.
   - Specs: Material (Genuine leather with #6 irons), Compatibility (Standard pocket tables), Set includes (6 pockets)

2. **Basic Accessory Kit**
   - Category: accessories
   - Slug: basic-accessory-kit
   - Tagline: Everything you need to start playing
   - Description: A curated starter kit with the essentials for your new pool table. Includes a complete ball set, two standard cues, a triangle rack, chalk, and a table brush. An ideal addition when purchasing your first C.L. Bailey table.
   - Specs: Includes (Ball set, 2 cues, triangle rack, chalk, brush)

3. **Deluxe Accessory Kit**
   - Category: accessories
   - Slug: deluxe-accessory-kit
   - Tagline: Premium essentials for the complete game room
   - Description: Step up from the basics with higher-quality cues, a full accessory complement, and extras that elevate your playing experience. Includes premium maple cues, Magnum ball set, triangle and diamond racks, leather chalk holders, and a table cover.
   - Specs: Includes (Magnum ball set, 4 premium maple cues, triangle rack, diamond rack, chalk holders, table brush, table cover)

4. **Magnum Pool Ball Sets**
   - Category: accessories
   - Slug: magnum-pool-ball-sets
   - Tagline: Tournament-grade ball sets with superior balance and clarity
   - Description: Professional-quality phenolic resin ball sets engineered for consistent roll and lasting color vibrancy. Regulation size and weight. Each set is individually inspected for roundness and balance.
   - Specs: Material (Phenolic resin), Size (Regulation 2-1/4"), Weight (Balanced to regulation standards)

5. **Mali Basic Green Felt**
   - Category: accessories
   - Slug: mali-basic-green-felt
   - Tagline: Standard woolen cloth in classic green
   - Description: Traditional wool-blend billiard cloth suitable for recreational play. A cost-effective option for those who prefer a classic table surface. Pre-cut for standard C.L. Bailey table sizes.
   - Specs: Material (Wool-nylon blend), Color (Classic green), Construction (Standard woolen)

6. **Platinum Accessory Kits**
   - Category: accessories
   - Slug: platinum-accessory-kit
   - Tagline: The ultimate accessory collection for discerning players
   - Description: Our top-tier accessory package, curated for players who demand the best. Includes everything in the Deluxe kit plus premium cue cases, advanced cleaning supplies, and exclusive C.L. Bailey branded accessories. The complete game room solution.
   - Specs: Includes (Everything in Deluxe kit plus premium cue cases, advanced cleaning supplies, branded accessories)

7. **Premium Accessory Kit**
   - Category: accessories
   - Slug: premium-accessory-kit
   - Tagline: Upgraded essentials for serious players
   - Description: A mid-tier kit bridging the gap between Basic and Deluxe. Features better cue construction, a Magnum ball set, and additional accessories for a more complete setup.
   - Specs: Includes (Magnum ball set, 2 premium cues, triangle rack, chalk, brush, table cover)

### 2. Accessories Category Page

**Route:** `app/[locale]/products/accessories/page.tsx`

**Layout** (match existing category pages like pool-tables, shuffleboards):
- Hero section with background image and overlay
  - `.section-label`: "ACCESSORIES"
  - `.heading-display`: "Complete Your Game Room"
  - Brief intro paragraph in `--color-body`
- Product grid: 3 columns desktop, 2 tablet, 1 mobile
  - Product cards: square aspect image, `.heading-card` for name, body text tagline
  - No shadow, no border-radius, 1px `--color-cloud` border
  - Hover: subtle image scale (1.03), 300ms transition
  - Link to individual product detail page via existing `[category]/[slug]` dynamic route

### 3. Velocity Pro Cloth Feature Page

This is NOT a standard product page. It is a dedicated marketing/feature page that sells the Velocity Pro Cloth as a premium upgrade option. Think of it as a landing page within the site.

**Route:** `app/[locale]/velocity-pro-cloth/page.tsx`

**Page Structure:**

**Section 1: Hero**
- Full-width background image of a pool table surface with cloth texture visible
- `--overlay-soft` gradient
- `.section-label`: "PREMIUM TABLE CLOTH"
- `.heading-hero`: "Velocity Pro Worsted Cloth"
- Subheading in `.heading-sub`: "87% wool worsted construction for professional-grade play"
- `.btn-outline-white` CTA: "Learn More" (smooth scroll to features)

**Section 2: Why Velocity Pro**
- `--color-off-white` background
- `.section-label`: "THE DIFFERENCE"
- `.heading-display`: "Why Worsted Matters"
- Two-column layout (image left, content right on desktop, stacked on mobile):
  - Left: close-up product photography of the cloth
  - Right: 3-4 key benefit paragraphs explaining what makes worsted construction superior to standard woolen cloth. Use Roboto 400 body text. Key points to cover:
    - Tighter weave for faster, more consistent ball speed
    - Resists track and groove development that impacts accuracy
    - Naturally repels liquid spills and stains
    - Virtually eliminates pilling and fuzzing
    - Higher wool content (87%) reduces ball burns and extends cloth life

**Section 3: Comparison Table**
- White background
- `.section-label`: "SIDE BY SIDE"
- `.heading-display`: "Velocity Pro vs. Standard Cloth"
- Clean comparison table (match the portal table style):
  - Column headers in `.metadata` style
  - Bottom borders only, 1px `--color-cloud`
  - Rows:

    | Feature | Velocity Pro Worsted | Standard Woolen |
    | Construction | Worsted | Woolen |
    | Wool Content | 87% | ~60% |
    | Resists tracks and grooves | Yes | No |
    | Repels liquid spills | Yes | No |
    | Eliminates pilling/fuzzing | Yes | No |
    | Minimizes ball burns | Yes | No |
    | Ball speed | Faster, consistent | Slower, variable |
    | Longevity | Extended | Standard |

  - Use subtle checkmarks (simple SVG, `--color-primary`) for "Yes" and dashes for "No". No bright green checks or red X marks.

**Section 4: Available Colors**
- `--color-off-white` background
- `.section-label`: "COLOR OPTIONS"
- `.heading-display`: "Choose Your Surface"
- Grid of color swatches (square, no border-radius, per design system)
- Each swatch: solid color block + name label beneath in `.metadata` style
- Selected state: 2px `--color-primary` border
- Note: The actual colors available should be pulled from the felt color data already in the product configurations. If felt colors are not yet centralized in `products.json`, create a shared data structure at `/data/felt-colors.json` or add a `feltColors` array to `products.json` that both this page and the product detail pages reference.

**Section 5: Which Tables Include Velocity Pro**
- White background
- `.section-label`: "INCLUDED WITH"
- `.heading-display`: "Standard on Select Models"
- Brief paragraph explaining which C.L. Bailey models come standard with Velocity Pro cloth and which offer it as an upgrade
- Small product card grid (2-3 featured tables that include Velocity Pro) linking to their product pages

**Section 6: CTA / Contact**
- Full-bleed dark section (`--color-deep` background)
- `.heading-display` in `--color-silver`: "Upgrade Your Table"
- Brief text in `--color-body` about contacting a dealer to add Velocity Pro cloth to any order
- Two CTAs: `.btn-outline-white` "Find a Dealer" and `.btn-outline-white` "Download Spec Sheet"

### 4. Navigation Updates

**Header (`components/layout/Header.tsx`):**
- Add "Accessories" to the primary nav. The live site has it as a top-level nav item with a dropdown containing "Accessories" (general) and "Velocity Pro Cloth" (sub-item).
- Recommended approach for the rebuild: Add to `navItems` array:
  ```typescript
  { label: t("nav.accessories"), href: "/products/accessories" }
  ```
- Or, if a dropdown is preferred, create a dropdown under Accessories with two items:
  - Accessories (links to `/products/accessories`)
  - Velocity Pro Cloth (links to `/velocity-pro-cloth`)

**Footer:** Add Accessories to the product category links in the footer.

### 5. i18n Translations

Add to `/messages/en.json`:
```json
{
  "nav": {
    "accessories": "Accessories"
  },
  "accessories": {
    "label": "ACCESSORIES",
    "heading": "Complete Your Game Room",
    "description": "Premium billiard accessories, from professional-grade ball sets to handcrafted leather pockets."
  },
  "velocityPro": {
    "label": "PREMIUM TABLE CLOTH",
    "heading": "Velocity Pro Worsted Cloth",
    "subheading": "87% wool worsted construction for professional-grade play",
    "whyLabel": "THE DIFFERENCE",
    "whyHeading": "Why Worsted Matters",
    "comparisonLabel": "SIDE BY SIDE",
    "comparisonHeading": "Velocity Pro vs. Standard Cloth",
    "colorsLabel": "COLOR OPTIONS",
    "colorsHeading": "Choose Your Surface",
    "includedLabel": "INCLUDED WITH",
    "includedHeading": "Standard on Select Models",
    "ctaHeading": "Upgrade Your Table",
    "ctaDescription": "Contact your local authorized dealer to add Velocity Pro cloth to any C.L. Bailey table order.",
    "findDealer": "Find a Dealer",
    "downloadSpec": "Download Spec Sheet"
  }
}
```

Add corresponding Spanish translations to `/messages/es.json`.

### 6. Cross-linking

- **Product detail pages** for pool tables should mention Velocity Pro cloth in the felt color section, linking to `/velocity-pro-cloth` for more info.
- **Homepage FinishesSection** or a new section could reference Velocity Pro as a premium cloth option.
- **Dealer portal Product Configurator** should include Velocity Pro as a felt upgrade option in the configuration flow.

### 7. Product Images

Create placeholder directories following the existing pattern:
```
public/images/products/accessories/
├── iron-leather-pockets/
│   └── hero.jpg
├── basic-accessory-kit/
│   └── hero.jpg
├── deluxe-accessory-kit/
│   └── hero.jpg
├── magnum-pool-ball-sets/
│   └── hero.jpg
├── mali-basic-green-felt/
│   └── hero.jpg
├── platinum-accessory-kit/
│   └── hero.jpg
└── premium-accessory-kit/
    └── hero.jpg

public/images/velocity-pro/
├── hero.jpg          # Full-width hero (cloth texture or table surface)
├── detail.jpg        # Close-up of worsted weave
└── lifestyle.jpg     # Table in room setting highlighting cloth
```

Use placeholder images initially. The client will supply final photography.

---

## Where This Fits in the Staged Build

This work slots into **Stage 2 (Public Site Page Rebuilds)** of the full-site-build-prompt. Specifically:

- **2B. Product Pages:** Now includes the Accessories category alongside pool-tables, shuffleboards, cue-racks, and game-room-furniture.
- **2F. Velocity Pro Cloth (NEW):** A dedicated feature page that lives at the top level (`/velocity-pro-cloth`), not under `/products/`.

The data additions (products.json updates) should happen in **Stage 1** alongside other data/structure work, so the Accessories products are available when Stage 2 builds the category page.

---

## Technical Notes

- The Accessories category page uses the same dynamic routing pattern as other categories. The existing `app/[locale]/products/[category]/[slug]/page.tsx` handles individual product pages automatically once data is in `products.json`.
- Add a static route at `app/[locale]/products/accessories/page.tsx` matching the pattern of `pool-tables/page.tsx`, etc.
- The Velocity Pro page is a standalone page, NOT under `/products/`. Route: `app/[locale]/velocity-pro-cloth/page.tsx`.
- All product data comes from `/data/products.json` via typed helpers. Add new helper if needed: `getProductsByCategory("accessories")`.
- Felt color data should be centralized so both the Velocity Pro page and product configurator reference the same source of truth.
- No em dashes. No bright accent colors. No border-radius. No shadows.
