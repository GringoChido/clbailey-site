# C.L. Bailey & Co. — Website

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
- **Product data**: All products live in `/data/products.json` — no database. Use typed helpers from `/lib/products.ts` (`getProduct()`, `getProductsByCategory()`, `getFeaturedProducts()`).
- **i18n**: Translations in `/messages/en.json` and `/messages/es.json`. Use `useTranslations("namespace")` hook in components. Server-side: `setRequestLocale(locale)`.
- **Routing**: `app/[locale]/` prefix for all pages. Legacy WordPress URLs redirect via `next.config.ts`.
- **Dealer system**: ZIP-based dealer finder using Haversine distance. Dealer data in `/lib/dealers.ts`. Dealer portal uses cookie-based auth.
- **Lead capture**: Form → `/api/leads/pdf-download` → validates → Resend email + Sheets log → returns download URL.
- **AI Concierge**: Floating chat widget at bottom-right. API at `/api/chat/route.ts`. System prompt includes product catalog and brand voice.

## Design system
- **Fonts**: Libre Baskerville (serif, headings) + Montserrat (sans, UI)
- **Colors**: Vellum `#F4F1EE` (bg), Ink `#121212` (text), Gold `#C5A47E` (accents), Estate `#8C8681` (warm gray)
- **Texture**: Film grain SVG overlay at 4% opacity on body
- **Aesthetic**: "Old Money Sourcebook" — cream backgrounds, subtle textures, cinematic full-bleed sections

## Environment variables
```
OPENAI_API_KEY          — AI Concierge
RESEND_API_KEY          — Email notifications
DEALER_PORTAL_PASSWORD  — Dealer dashboard auth
GOOGLE_SHEETS_ID        — Lead capture spreadsheet
GOOGLE_SERVICE_ACCOUNT_EMAIL — Sheets API auth
GOOGLE_PRIVATE_KEY      — Sheets API JWT key (base64)
```

## Commands
```bash
npm run dev       # Dev server at localhost:3000
npm run build     # Production build
npm run lint      # ESLint check
```

## Gotchas
- Product images and PDFs use base paths from `products.json` meta — use `img()` and `pdf()` helpers, don't hardcode paths
- The middleware handles both i18n routing AND dealer portal auth — be careful editing `middleware.ts`
- Google Sheets integration fails gracefully if env vars are missing — leads still get emailed
