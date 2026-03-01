# C.L. Bailey & Co. -- Website

## Client
C.L. Bailey & Co. is a heritage billiards company founded in 1999, based in Tomball, Texas. They make solid hardwood pool tables, shuffleboards, and game room furniture sold exclusively through authorized dealers. Brand voice: quiet authority, luxury, craftsmanship. No emoji, no hype.

## Stack
- Next.js 16.1.6 (App Router), React 19, TypeScript, Tailwind CSS v4
- next-intl v4 for bilingual routing (`/en/`, `/es/`)
- AI SDK (OpenAI GPT-4o-mini) for the Showroom Concierge chatbot
- Resend for transactional email, Google Sheets for lead logging
- React Hook Form + Zod for form validation
- Radix UI for accessible dialogs

## Key architecture
- **Product data**: All products live in `/data/products.json` -- no database. Use typed helpers from `/lib/products.ts` (`getProduct()`, `getProductsByCategory()`, `getFeaturedProducts()`).
- **i18n**: Translations in `/messages/en.json` and `/messages/es.json`. Use `useTranslations("namespace")` hook in components. Server-side: `setRequestLocale(locale)`.
- **Routing**: `app/[locale]/` prefix for all pages. Legacy WordPress URLs redirect via `next.config.ts`.
- **Dealer system**: ZIP-based dealer finder using Haversine distance. Dealer data in `/lib/dealers.ts`. Dealer portal uses cookie-based auth.
- **Lead capture**: Form -> `/api/leads/pdf-download` -> validates -> Resend email + Sheets log -> returns download URL.
- **AI Concierge**: Floating chat widget at bottom-right. API at `/api/chat/route.ts`. System prompt includes product catalog and brand voice.

## Design System -- California House Style

### Aesthetic
Muted luxury inspired by californiahouse.com. Cool gray palette, no bright accent colors, generous whitespace, photography-forward. The feel is "quiet luxury showroom" -- understated, refined, premium.

### Fonts (loaded in layout.tsx via next/font/google)
- **Roboto Condensed** (`--font-roboto-condensed` / `--font-display`): Display headings, h1, h3, product titles. Always weight 300 (light) for large sizes, 400 for card titles.
- **Raleway** (`--font-raleway` / `--font-label`): Navigation links, section labels, buttons, metadata. Always uppercase with 2-3px letter-spacing.
- **Roboto** (`--font-roboto` / `--font-sans`): Body text. Weight 400, 13px base size, 26px line-height.

### Colors (defined in globals.css @theme inline)
- `--color-primary` (#231f20): Primary dark charcoal. Nav text, dark buttons, card titles.
- `--color-deep` (#1b1b1b): Footer backgrounds, darkest sections.
- `--color-mid-gray` (#7e7d84): Subheadings, section labels, secondary text.
- `--color-body` (#919199): Body paragraph text.
- `--color-silver` (#b0b2bc): Display headings (h1), borders, light accents.
- `--color-cloud` (#ebecee): Section backgrounds, borders, dividers.
- `--color-off-white` (#f6f6f7): Alternate section backgrounds.
- `--color-whisper` (#f9f9fb): Subtle card backgrounds.
- `--color-white` (#ffffff): Primary background.

### Overlays
- `--overlay-nav`: rgba(176, 178, 188, 0.85) -- semi-transparent nav bar
- `--overlay-soft`: rgba(176, 178, 188, 0.45) -- hero image overlays
- `--overlay-white`: rgba(255, 255, 255, 0.9) -- content overlays on images

### Typography Classes (globals.css)
- `.heading-display`: Roboto Condensed 300, for hero/display text
- `.heading-hero`: Roboto Condensed 300, responsive clamp sizing
- `.heading-sub`: Roboto Condensed 300, 22px, mid-gray
- `.heading-card`: Roboto Condensed 400, 19px, primary dark
- `.section-label`: Raleway 500, 12px, uppercase, 3px tracking
- `.metadata`: Raleway 600, 11px, uppercase, 2px tracking

### Button Classes (globals.css)
- `.btn-primary`: Outlined dark border, Raleway uppercase, fills on hover
- `.btn-outline`: Outlined silver border, lighter variant
- `.btn-outline-white`: White border for dark backgrounds
- `.btn-heritage`: Solid dark fill (legacy compat)

### Design Rules
DO:
- Use font-weight 300 for all large display text
- Keep colors muted and tonal (grays only, no bright accents)
- Use generous whitespace between sections (35-80px padding)
- Use Raleway uppercase + letter-spacing for labels and navigation
- Let photography do the heavy lifting for visual interest
- Use semi-transparent overlays on hero/background images
- Alternate section backgrounds between white, off-white, and cloud

DO NOT:
- Use bright or saturated accent colors (no gold, no blue, no red)
- Use heavy font weights for headings (max 400, prefer 300)
- Add drop shadows or heavy border treatments
- Use rounded corners on cards or buttons (border-radius: 0)
- Crowd content with tight spacing
- Make buttons visually dominant (they should be subtle, outlined)
- Use em dashes anywhere in content

### Layout Patterns
- **Nav**: Fixed/sticky, semi-transparent (--overlay-nav), Raleway uppercase links
- **Hero**: Full-width background image, centered text overlay, heading-hero class
- **Product Grid**: 3-column grid, square aspect ratio, edge-to-edge
- **Feature Sections**: 2-column (image + text), 50/50 split
- **Section Headers**: Centered, section-label above heading-display
- **Footer**: Dark background (--color-deep), Raleway labels

### Reference
Full visual brand kit with swatches and specimens: `/docs/california-house-brand-kit.html`

## Environment variables
```
OPENAI_API_KEY          -- AI Concierge
RESEND_API_KEY          -- Email notifications
DEALER_PORTAL_PASSWORD  -- Dealer dashboard auth
GOOGLE_SHEETS_ID        -- Lead capture spreadsheet
GOOGLE_SERVICE_ACCOUNT_EMAIL -- Sheets API auth
GOOGLE_PRIVATE_KEY      -- Sheets API JWT key (base64)
```

## Commands
```bash
npm run dev       # Dev server at localhost:3000
npm run build     # Production build
npm run lint      # ESLint check
```

## Gotchas
- Product images and PDFs use base paths from `products.json` meta -- use `img()` and `pdf()` helpers, don't hardcode paths
- The middleware handles both i18n routing AND dealer portal auth -- be careful editing `middleware.ts`
- Google Sheets integration fails gracefully if env vars are missing -- leads still get emailed
- NEVER use em dashes in any content -- use commas, periods, or colons instead
