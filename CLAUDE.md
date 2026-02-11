# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**Candle Master Landing Page** - Marketing/SEO landing page for the Candle Master trading simulator game.

## Tech Stack

- **Framework**: Astro 5.x
- **Adapter**: @astrojs/cloudflare
- **Deployment**: Cloudflare Pages
- **Output**: Static
- **i18n**: URL-based routing (English default, Thai at /th/)
- **Email Service**: Resend (for newsletter/waitlist)

## URLs

| URL | Purpose |
|-----|---------|
| https://candlemaster.app | Production - English |
| https://candlemaster.app/th/ | Production - Thai |
| https://app.candlemaster.app | Mobile App (PWA) |
| https://web.candlemaster.app | Desktop/iPad App |

## Related Repositories

| Repo | Purpose | Location |
|------|---------|----------|
| `candle-master-landing` | This repo - Landing Page | `E:\CANDLE-MASTER\PROJECT\candle-master-landing` |
| `candle-master` | Mobile App (React + Vite) | `E:\CANDLE-MASTER\PROJECT\Candle-Master-app` |
| `candle-master-web` | Desktop App | TBD |

## Common Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npx wrangler pages dev dist --port 4321  # Preview with Cloudflare (preview not supported by adapter)
```

## Project Structure

```
src/
├── components/
│   ├── HeroBackground.astro   # SVG candlestick animation
│   ├── LanguageSwitcher.astro # i18n language toggle
│   ├── TutorialSlider.astro   # Phone mockup + screenshot slider
│   ├── FAQ.astro              # Accordion FAQ section
│   └── EmailSignup.astro      # Newsletter + waitlist form
├── i18n/
│   ├── en.json                # English translations
│   ├── th.json                # Thai translations
│   └── utils.ts               # i18n helper functions
├── layouts/
│   └── Layout.astro           # Shared layout
├── pages/
│   ├── index.astro            # Landing page (English)
│   ├── install.astro          # PWA install guide (English)
│   ├── th/
│   │   ├── index.astro        # Landing page (Thai)
│   │   └── install.astro      # PWA install guide (Thai)
│   └── api/
│       └── subscribe.ts       # Email signup API (Resend)
├── styles/
│   └── theme.css              # Minimal Light theme variables
public/
├── favicon.svg                # Candle Master icon (candlesticks)
├── favicon.ico
├── og-image.webp              # Open Graph image
├── sitemap.xml                # SEO sitemap
├── robots.txt                 # Search engine rules
└── tutorial/                  # Tutorial screenshots (001-009.webp)
```

## Landing Page Sections

1. **Hero** - Animated candlestick background + main CTA
2. **Features** - 5 cards (Blind Trading, Legendary Stocks, Academy, Beautiful Themes, Crisis Event [PRO])
3. **How It Works** - 4 steps with connectors
4. **Tutorial Slider** - Phone mockup with screenshot carousel
5. **Pricing** - Free / PRO Monthly / PRO Lifetime cards
6. **FAQ** - Accordion-style questions
7. **Email Signup** - Newsletter + Desktop waitlist
8. **CTA** - Final call to action
9. **Footer**

## Design System

### Theme: Minimal Light with Gold Accents
- **Primary**: Gold/Amber (#F59E0B, #D97706)
- **Background**: White/Off-white (#FFFFFF, #F8FAFC, #F1F5F9)
- **Text**: Dark gray scale (#0F172A, #475569, #94A3B8)
- **Profit**: Green (#16A34A)
- **Loss**: Red (#DC2626)
- **Font**: Geist Sans (Claude-like), IBM Plex Sans Thai
- **Button Style**: 3D glass effect with shadows
- **Cards**: White background with subtle borders

### Game Concept: Blind Trading
- Random legendary stocks from 1980-2025
- Player doesn't know which stock until game ends
- "History Always Repeats Itself" - learn from real market history

### Pricing (Current)
| Plan | Regular | Launch Price |
|------|---------|--------------|
| Free | $0 | $0 |
| PRO Monthly | $4.99/mo | $3.99/mo (~฿140) |
| PRO Lifetime | $39.99 | $29.99 (~฿1,050) |

### Free Tier Limits
- 100 Moves per Game
- 10 Legendary Stocks
- Historical Data 1980-2025
- 3 Chart Themes

### PRO Features
- 200 Moves per Game
- 500+ Legendary Stocks worldwide
- All Chart Themes
- Candle Academy
- Position Calculator
- Crisis Event — Boss Stage (legendary market crashes)
- Lifetime updates (Lifetime plan)

## i18n Content Editing

Content is stored in JSON files:
- `src/i18n/en.json` - English
- `src/i18n/th.json` - Thai

**Thai Language Tone:**
- Hero section: สนุก/casual ("ครับโผมมม")
- Pricing section: Professional ("ขอบคุณมากครับ")
- Prices shown in both USD and THB

To edit content:
1. Open the JSON file in VS Code
2. Run `npm run dev` to preview changes
3. Edit content directly in the JSON
4. Save and see live updates at http://localhost:4321

## Email Signup (Resend)

The email signup form collects:
- Email address
- Desktop waitlist opt-in
- Newsletter opt-in

**Setup Required:**
1. Create account at https://resend.com
2. Create an Audience in Resend dashboard
3. Update `YOUR_AUDIENCE_ID` in `src/pages/api/subscribe.ts`
4. Add environment variable:
   ```bash
   # In wrangler.toml or Cloudflare dashboard
   RESEND_API_KEY = "re_xxxxx"
   ```

## Deployment

- **Platform**: Cloudflare Pages
- **Branch**: `main`
- **Auto-deploy**: Yes (push to main triggers deploy)
- **Build command**: `npm run build`
- **Output directory**: `dist`

## SEO Checklist

- [x] Title tag with keywords
- [x] Meta description
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URL
- [x] Alternate language hreflang tags
- [x] Favicon (Candle Master icon)
- [x] OG image (og-image.webp)
- [x] Sitemap (sitemap.xml)
- [x] robots.txt
- [x] Schema.org JSON-LD structured data

## Install Page (/install)

PWA installation guide page with:
- Main CTA button to open app
- Tutorial mockup with phone frame (placeholder for screenshots)
- Add to Home Screen instructions for iOS and Android
- Important warning about browser bars blocking game buttons
- Coming Soon notice for native App Store/Google Play apps

**Tutorial Image Specs:**
- Recommended size: 1080 x 2340 px (iPhone ratio 9:19.5)
- Format: .webp
- Phone mockup scales to: 260-280px width on screen

## TODO

### Landing Page
- [ ] Configure actual Stripe Payment Links (currently placeholders) — next priority
- [ ] Configure Resend API key and audience ID
- [x] Update tutorial images (9 new high-quality screenshots)
- [x] PWA installation guide page with image slider + arrow navigation
- [x] Light theme implementation (Minimal Light with Gold Accents)
- [x] Install page tutorial slider with 4 images + prev/next arrows
- [x] Updated 300+ → 500+ stocks across all pages
- [x] Added Crisis Event / Boss Stage PRO feature card
- [x] Touch swipe fix (`touch-action: pan-x` + `overscroll-behavior: contain`)
- [ ] Add testimonials when user reviews available
- [ ] Google Analytics / conversion tracking

### Affiliate / Referral Program (Future)
- [ ] Research & decide on solution (considering Refgrow + Stripe)
- [ ] Implement referral tracking system
- [ ] Create referral dashboard/page
- [ ] Set up affiliate commission structure

### Mobile App (candle-master repo)
- [ ] Stripe integration for PWA payments — next priority
- [ ] iOS deployment readiness check
- [ ] Android deployment readiness check
- [ ] Firebase integration verification
- [ ] App Store / Google Play submission prep

## Recent Changes

### v0.3.0 (2025-02-06)
- Updated 300+ → 500+ legendary stocks across all pages and i18n
- Added Crisis Event / Boss Stage PRO feature card (EN + TH)
- Updated all 9 tutorial screenshots
- Install page: real image slider with 4 images + prev/next arrow buttons
- Fixed slider swipe: `touch-action: pan-x` + `overscroll-behavior: contain` on all sliders
- FAQ section and email signup form

### v0.2.0 (2025-02-05)
- Fixed horizontal scroll issue on mobile (overflow-x hidden + page-wrapper)
- Hidden gradient orbs on mobile (< 768px) to prevent overflow
- Button color updates (Golden Yellow CTA, Dark Red Lifetime)
- Title & USP statement added

## Next Session Notes

**Priority: Stripe Integration**
- Set up Stripe products/prices for PRO Monthly ($3.99) and Lifetime ($29.99)
- Implement Stripe Checkout for PWA users
- Connect payment links on landing page pricing cards
- Sync subscription status to App via Firebase user ID

**Affiliate Program Options Being Considered:**
- **Refgrow** (https://refgrow.com) - Works with Stripe
- **Lemon Squeezy** - Payment + affiliate in one (may replace Stripe for PWA)

**App Status:**
- Location: `E:\CANDLE-MASTER\PROJECT\Candle-Master-app`
- Version: v2.1.0
- Stack: React + Vite (PWA) + Capacitor 8
- Live PWA: https://app.candlemaster.app
