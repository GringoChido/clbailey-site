# AEO Audit Report: C.L. Bailey & Co.

**Date**: 2026-03-13
**Domain**: clbailey.com
**Stack**: Next.js 16.1.6 (App Router), React 19, TypeScript, Tailwind CSS v4, next-intl v4

---

## AEO Readiness Score: 23.5 / 100 (Grade: F)

| Category | Score | Max |
|----------|-------|-----|
| Content & Citability | 5.5 | 25 |
| E-E-A-T Signals | 2 | 25 |
| Technical AEO | 12 | 25 |
| Off-Page Authority | 4 | 25 |

---

## Content & Citability: 5.5 / 25

### Summary

| Metric | Value |
|--------|-------|
| Total pages audited | 13 |
| Highly citable | 0 |
| Moderately citable | 3 |
| Not citable | 10 |
| Pages using question headers | 0 / 13 |
| Pages with FAQ sections | 0 / 13 |
| Pages with comparison tables | 1 / 13 |
| Pages addressing objections | 0 / 13 |

### Page Scores

| Page | Score | Rating |
|------|-------|--------|
| Velocity Pro Cloth | 11/25 | Moderately Citable |
| Room Size Chart | 9/25 | Moderately Citable |
| Lifetime Guarantee | 9/25 | Moderately Citable |
| Care Guide | 7/25 | Not Citable |
| About | 5/25 | Not Citable |
| Homepage | 5/25 | Not Citable |
| Product Detail Pages | 5/25 | Not Citable |
| Category Pages | 4/25 | Not Citable |
| Products Index | 3/25 | Not Citable |
| Dealer Finder | 3/25 | Not Citable |
| Catalogs | 3/25 | Not Citable |
| Contact Us | 3/25 | Not Citable |
| Privacy Policy | 6/25 | Not Citable |

### Issues

1. **Zero question-format headers**: Not a single page uses H1/H2/H3 in question format. Every header is a brand statement ("Built for Homes That Endure"), label ("Our Story"), or category name ("Pool Tables"). AI engines looking for direct answers to user queries will skip this content.

2. **Zero FAQ sections**: No page has a dedicated FAQ section. FAQs are the primary way AI chatbots extract and cite answers.

3. **Dense prose blocks**: Care Guide, About, and Guarantee pages use multi-sentence paragraphs without bullet points or numbered lists.

4. **No comparison content**: Only the Velocity Pro Cloth page has a comparison table. No tables comparing pool table models, no "which table is right for you" guides.

5. **No objection handling**: The site never proactively addresses buyer concerns like "Are C.L. Bailey tables worth the price?", "Can I buy direct?", "How do they compare to competitors?"

6. **Thin product pages**: Product descriptions average 1-2 sentences with 4 bullet features. AI engines need 200+ words of contextual content.

### Fixes

| File | Issue | Fix |
|------|-------|-----|
| `components/home/HomeSections.tsx` | All H2/H3 are brand statements | Add "Why Choose a C.L. Bailey Pool Table?" section with FAQ |
| `messages/en.json` (careGuide.*) | Dense paragraphs, no structure | Reformat as question headers + numbered step lists |
| `messages/en.json` (guarantee.*) | "What is Covered" not full question | Change to "What Does the C.L. Bailey Lifetime Guarantee Cover?" |
| `app/[locale]/room-size/page.tsx` | H1 is "Room Size Chart" | Change to "What Size Room Do I Need for a Pool Table?" |
| `app/[locale]/velocity-pro-cloth/page.tsx` | "Why Worsted Matters" is close | Change to "What Is the Difference Between Worsted and Woolen Pool Table Cloth?" |
| `data/products.json` | 1-2 sentence descriptions | Expand to 150-200 words per product with Q&A-style content |
| `app/[locale]/products/[category]/page.tsx` | SEO block just echoes description | Replace with rich "Why C.L. Bailey [Category]?" section |
| `app/[locale]/dealer/page.tsx` | Minimal content | Add "How to Buy a C.L. Bailey Table" explaining dealer model |

---

## E-E-A-T Signals: 2 / 25

### Summary

| Metric | Value |
|--------|-------|
| Pages with real author attribution | 0 / 12 |
| Pages with expert commentary/quotes | 0 / 12 |
| Pages with case studies/testimonials | 0 / 12 |
| FAQ sections with clear answers | 0 / 12 |

### Trust Signals Found

- Lifetime structural guarantee (multiple pages)
- Founded 1999 / 25+ years
- Physical address, phone, email, hours
- Organization + LocalBusiness JSON-LD
- Product JSON-LD with BreadcrumbList
- Privacy policy, cookie consent
- Bilingual EN/ES support
- Canonical URLs + hreflang

### Trust Signals Missing

| Missing Signal | Impact |
|----------------|--------|
| Industry certifications/memberships (BCA, BBB) | High |
| Third-party reviews or ratings | High |
| Named leadership team with photos | High |
| Specific statistics (tables sold, dealer count, states served) | Medium |
| Press mentions or media coverage | Medium |
| Manufacturing certifications (FSC, etc.) | Medium |

### Issues

1. **No author attribution**: Charles L. Bailey is mentioned in the About story but has no bio, headshot, title, or credentials block.

2. **No expert quotes**: The Velocity Pro page makes technical claims (87% wool) with zero attribution.

3. **No testimonials**: No customer testimonials, dealer testimonials, case studies, or social proof anywhere.

4. **No FAQ sections**: The single highest-impact gap for AEO.

### Fixes

| File | Issue | Fix |
|------|-------|-----|
| `app/[locale]/about/page.tsx` | No founder bio | Add "Leadership" section with photo, title, bio, LinkedIn |
| `app/[locale]/care-guide/page.tsx` | Anonymous advice | Add byline: "By [Name], Master Technician at C.L. Bailey" |
| `app/[locale]/velocity-pro-cloth/page.tsx` | Unsourced claims | Add expert quote from product engineer or BCA authority |
| `components/home/HomeSections.tsx` | No social proof | Add "What Our Dealers Say" testimonial section |
| `app/[locale]/lifetime-guarantee/page.tsx` | No claim stories | Add 1-2 anonymized warranty success stories |
| All content pages | No FAQ | Add 5-8 question FAQ with FAQPage schema to each |

---

## Technical AEO: 12 / 25

### Scorecard

| Check | Status | Score |
|-------|--------|-------|
| Organization schema | Present (missing @id, relative logo URL) | 2/4 |
| Product schema | Present with BreadcrumbList | 4/4 |
| Article schema | Missing on all content pages | 0/4 |
| FAQ schema | Missing everywhere | 0/2 |
| robots.txt (AI bots) | File missing entirely | 2/4 |
| Sitemap | Present (dynamic via App Router) | 1/3 |
| Content in HTML (SSR) | Excellent, all content pages are server components | 3/3 |
| Alt text | All images have descriptive alt text | 2/2 |
| llms.txt | Missing | 0/1 |
| Site architecture | Logical hierarchy, good internal linking | 2/2 |

### Issues

1. **No robots.txt**: AI crawlers have no explicit allowance. While absence means "allow all," an explicit file is best practice.

2. **No llms.txt**: No file exists to help AI systems understand the brand context.

3. **No Article schema**: Content pages (about, care guide, guarantee, velocity pro) have no structured data beyond the global Organization schema.

4. **No FAQ schema**: Even if FAQ content existed, there's no FAQPage JSON-LD.

5. **Organization schema incomplete**: Missing `@id` for entity linking; logo URL is relative, not absolute.

### Fixes

| File | Issue | Fix |
|------|-------|-----|
| `public/robots.txt` | Missing | Create with explicit Allow for GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended |
| `public/llms.txt` | Missing | Create with brand summary, product categories, key differentiators, primary URLs |
| `app/layout.tsx` | Organization schema missing @id | Add `"@id": "https://clbailey.com/#organization"`, use absolute logo URL |
| Content pages | No Article schema | Add Article/WebPage JSON-LD with headline, description, datePublished, author |
| Content pages | No FAQ schema | Add FAQPage JSON-LD alongside FAQ content |
| `app/sitemap.ts` | lastModified uses new Date() | Use actual content modification dates |

---

## Off-Page Authority: 4 / 25

### Knowledge Base Listings

| Listing | Status | Priority |
|---------|--------|----------|
| Google Business Profile | Likely exists | VERIFY and optimize |
| Wikipedia / Wikidata | Does not exist | CREATE Wikidata entry |
| LinkedIn Company Page | Not listed | CREATE (high priority) |
| Crunchbase | Does not exist | CREATE |
| Yelp | Unknown | CREATE |
| Better Business Bureau | Unknown | APPLY for accreditation |
| Houzz | Unknown | CREATE (major LLM training source) |
| BCA Directory | Unknown | JOIN |

### Social Fortress

| Platform | Status |
|----------|--------|
| Instagram | Active (in sameAs) |
| Facebook | Active (in sameAs) |
| Pinterest | Active (in sameAs) |
| LinkedIn | Missing |
| YouTube | Missing |
| Twitter/X | Missing |

### UGC Targets

| Platform | Opportunity |
|----------|-------------|
| r/billiards (~80K) | Answer "what table should I buy" threads |
| r/gamerooms (~50K) | Showcase setups, answer layout questions |
| r/woodworking (~5M) | Craftsmanship content |
| AZBilliards.com forums | Largest billiards community online |
| Quora | "Best pool table brand?", "Is slate worth it?" |

### Digital PR Angles

1. **"The Last American Pool Table Makers"**: Domestic manufacturing story. Targets: Texas Monthly, Houston Chronicle, Manufacturing.net
2. **"State of the American Game Room 2026"**: Survey-based data report. Targets: Architectural Digest, Houzz, The Spruce
3. **"25+ Years in Tomball"**: Local business longevity story. Targets: Houston Business Journal, Community Impact
4. **"What Your Pool Table Says About Home Value"**: Real estate angle. Targets: Realtor.com, Better Homes & Gardens
5. **Expert Source Registration**: HARO, Qwoted, SourceBottle for ongoing citation opportunities

### 90-Day Roadmap

**Month 1**: Verify GBP, create Wikidata entry, LinkedIn, Crunchbase, YouTube channel. Register on HARO.
**Month 2**: Begin Reddit/Quora UGC (2-3 responses/week). First YouTube video. Dealer Spotlight series. Submit to BCA + Houzz.
**Month 3**: Pitch PR stories. Launch dealer backlink kit. Submit to "Best Pool Tables" roundups. Create media page on site.

---

## Priority Actions (Ordered by Impact)

### High Impact (do first)

1. **Add FAQ sections with FAQPage JSON-LD** to 5 key pages (homepage, guarantee, care guide, room size, velocity pro). 5-8 natural questions each, translated to Spanish. This alone moves multiple pages from Not Citable to Moderately Citable.

2. **Create robots.txt** explicitly allowing AI bots (GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User) with sitemap reference.

3. **Create llms.txt** with brand summary, product catalog overview, key differentiators.

4. **Rewrite H2/H3 headers site-wide** as conversational questions. "Our Story" becomes "Who Is Behind C.L. Bailey & Co.?"

5. **Add customer/dealer testimonials** to homepage and category pages with AggregateRating schema.

### Medium Impact

6. **Add Article/WebPage schema** to content pages (about, care guide, guarantee, velocity pro cloth).

7. **Create author bios** for content pages. Attribute About page to Charles L. Bailey with photo and credentials.

8. **Expand product descriptions** in products.json to 150-200 words each.

9. **Break dense paragraphs into bullet lists** on Care Guide, Guarantee, and About pages.

10. **Fix Organization schema**: Add @id, use absolute logo URL.

### Foundation Building

11. **Create LinkedIn Company page** and YouTube channel.
12. **Create Wikidata entity** for the brand.
13. **Verify Google Business Profile** is claimed and optimized.
14. **Begin Reddit/Quora participation** on r/billiards, r/gamerooms.
15. **Add "Which Table Is Right for You?" comparison page** with feature matrix.

---

## Quick Wins (< 30 minutes each)

1. **Create `public/robots.txt`** (5 min)
2. **Create `public/llms.txt`** (15 min)
3. **Add @id to Organization schema in layout.tsx** (5 min)
4. **Fix logo URL to absolute in layout.tsx** (2 min)
5. **Add LinkedIn and YouTube to sameAs array** once profiles exist (2 min)
