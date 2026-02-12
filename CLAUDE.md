# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**Candle Master Landing Page** — Marketing/SEO landing page for the Candle Master trading simulator game. Built with Astro, deployed on Cloudflare Pages, bilingual (EN/TH).

## Tech Stack

- **Framework**: Astro 5.x
- **Adapter**: @astrojs/cloudflare
- **Deployment**: Cloudflare Pages (auto-deploy on push to `main`)
- **Output**: Static
- **i18n**: URL-based routing (EN default `/`, Thai `/th/`)
- **Email Service**: Resend (newsletter/waitlist)
- **Payments**: Stripe (checkout handled by PWA app, not landing page)

## URLs

| URL | Purpose |
|-----|---------|
| https://candlemaster.app | Production — English |
| https://candlemaster.app/th/ | Production — Thai |
| https://app.candlemaster.app | Mobile App (PWA) |
| https://web.candlemaster.app | Desktop/iPad App |

## Related Repositories

| Repo | Purpose | Location |
|------|---------|----------|
| `candle-master-landing` | This repo — Landing Page | `E:\CANDLE-MASTER\PROJECT\candle-master-landing` |
| `candle-master` | Mobile App (React + Vite + Capacitor 8) | `E:\CANDLE-MASTER\PROJECT\Candle-Master-app` |

## Common Commands

```bash
npm run dev      # Start dev server (http://localhost:4321)
npm run build    # Build for production — ALWAYS run before commit
```

## Project Structure

```
src/
├── components/
│   ├── HeroBackground.astro   # SVG candlestick animation
│   ├── LanguageSwitcher.astro  # i18n language toggle
│   ├── TutorialSlider.astro   # Phone mockup + screenshot slider
│   ├── FAQ.astro              # Accordion FAQ section
│   └── EmailSignup.astro      # Newsletter + waitlist form
├── i18n/
│   ├── en.json                # English translations (SINGLE SOURCE OF TRUTH for EN content)
│   ├── th.json                # Thai translations (SINGLE SOURCE OF TRUTH for TH content)
│   └── utils.ts               # useTranslations() helper
├── pages/
│   ├── index.astro            # Landing page (EN)
│   ├── why.astro              # "Why I Built This" page (EN)
│   ├── install.astro          # PWA install guide (EN)
│   ├── privacy.astro          # Privacy Policy
│   ├── terms.astro            # Terms of Service
│   ├── support.astro          # Support page
│   ├── th/
│   │   ├── index.astro        # Landing page (TH)
│   │   ├── why.astro          # "Why I Built This" page (TH)
│   │   └── install.astro      # PWA install guide (TH)
│   └── api/
│       └── subscribe.ts       # Email signup API (Resend)
├── styles/
│   └── theme.css              # Minimal Light theme variables
public/
├── favicon-32.png             # Uncle mascot favicon (32x32)
├── favicon.ico                # Uncle mascot favicon (ICO)
├── apple-touch-icon.png       # Uncle mascot (180x180)
├── uncle-thumbsup.webp        # Uncle Tang — default/thumbsup pose
├── uncle-rich.webp            # Uncle Tang — rich (suit + martini)
├── uncle-poor.webp            # Uncle Tang — poor (tank top + noodles)
├── app-icon-uncle.webp        # Uncle mascot for install page icon
├── mascot-teacher.webp        # Uncle teaching (main page)
├── og-image.webp              # Open Graph image
├── sitemap.xml                # SEO sitemap
├── robots.txt                 # Search engine rules
└── tutorial/                  # Tutorial screenshots (001-009.webp + install-01~04.webp)
```

## Landing Page Sections (in order)

1. **Hero** — Animated candlestick background + main CTA
2. **Features** — 5 cards: Blind Trading, Legendary Stocks, Academy, Beautiful Themes, Crisis Event [PRO]
3. **Uncle Tang** — "Meet Uncle Tang" mascot showcase (rich/poor states, 160px images)
4. **How It Works** — 4 steps with connectors
5. **Landscape Mode** — Desktop/iPad showcase
6. **Tutorial Slider** — Phone mockup with screenshot carousel
7. **Pricing** — Free / PRO Monthly / PRO Yearly cards
8. **FAQ** — Accordion-style questions
9. **Email Signup** — Newsletter + Desktop waitlist
10. **Creator Story** — Mini card with Uncle Tang thumbsup + quote + link to /why
11. **CTA** — Final call to action
12. **Footer**

## Uncle Tang (ลุงแท่ง) — Mascot

Uncle Tang is the game's mascot/mentor character. The name is a wordplay: "แท่ง" (tang) means "bar/stick" — as in แท่งเทียน (candlestick). He has 3 states:
- **Thumbsup** (`uncle-thumbsup.webp`) — Default, used in Creator Story card
- **Rich** (`uncle-rich.webp`) — Suit + martini, "trade well" state
- **Poor** (`uncle-poor.webp`) — Tank top + instant noodles, "trade badly" state

Used on: Landing page (Uncle Tang section + Creator Story), Why page (/why)

## Design System

### Theme: Minimal Light with Gold Accents
- **Primary**: Gold/Amber (`#F59E0B`, `#D97706`)
- **Background**: White/Off-white (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`)
- **Text**: Dark gray scale (`#0F172A`, `#475569`, `#94A3B8`)
- **Profit**: Green (`#16A34A`)
- **Loss**: Red (`#DC2626`)
- **Font**: Geist Sans (display), IBM Plex Sans Thai
- **Button Style**: 3D glass effect with shadows
- **Cards**: White background with subtle borders

### CSS Convention
- **Each page has its own inline `<style>` block** — CSS is duplicated between EN and TH pages (project convention, not shared stylesheets)
- When updating CSS, **always update both** `index.astro` and `th/index.astro` (same for `why.astro`/`th/why.astro`)
- CSS custom properties defined in `src/styles/theme.css`

## Game Concept: Blind Trading

- Random legendary stocks from **1970-2025**
- Player doesn't know which stock until game ends
- "History Always Repeats Itself" — learn from real market history

## Pricing (Current — Updated Feb 2026)

| Plan | Regular | Launch Price |
|------|---------|--------------|
| Free | $0 | $0 |
| PRO Monthly | $4.99/mo | **$3.99/mo** (~฿140) |
| PRO Yearly | $47.88/yr | **$19.99/yr** (~฿700) |

### Free Tier
- 100 Moves per Game
- **20 Legendary Stocks**
- Historical Data 1970-2025
- 3 Chart Themes

### PRO Features
- 200 Moves per Game
- 500+ Legendary Stocks worldwide
- All Chart Themes
- Full Academy Access
- Crisis Event — Boss Stage
- All Future Updates

### Stripe (Live Mode)
- Monthly: `price_1SzX9500THgK6a8eMmajk8sQ`
- Yearly: `price_1SzX9X00THgK6a8eQ6GfnYnn`
- Flow: Landing page CTA → redirect to PWA app → Stripe Checkout Session

## i18n Content Editing

All user-facing text lives in JSON files — **edit JSON, not .astro HTML**:
- `src/i18n/en.json` — English
- `src/i18n/th.json` — Thai

When changing content (pricing, feature descriptions, FAQ, etc.), update **both** JSON files. The .astro files reference translations via `{t.section.key}`.

**Thai Language Tone:**
- Hero section: สนุก/casual
- Pricing section: Professional
- Prices shown in both USD and THB in Thai version

**Key i18n blocks:**
- `meta` — SEO title, description
- `hero` — Hero section text + stats
- `features` — Feature cards
- `pricing` — Plans, prices, features per tier
- `faq` — Questions & answers
- `why.uncle` — Uncle Tang section (title, description, labels)
- `creatorStory` — Creator Story card on landing page

## Email Signup (Resend)

Collects: email, desktop waitlist opt-in, newsletter opt-in

**Setup:**
1. Resend account → Create Audience
2. Update `YOUR_AUDIENCE_ID` in `src/pages/api/subscribe.ts`
3. Environment variable: `RESEND_API_KEY = "re_xxxxx"` in Cloudflare dashboard

## Deployment

- **Platform**: Cloudflare Pages
- **Branch**: `main`
- **Auto-deploy**: Push to main → automatic build + deploy
- **Build command**: `npm run build`
- **Output directory**: `dist`

## Workflow Conventions

1. **Always build before commit**: `npm run build` — verify no errors
2. **Update both languages**: EN + TH pages have duplicated CSS/HTML structure
3. **Commit message style**: Descriptive, 1-2 line summary of what changed
4. **Push = Deploy**: Every push to main triggers Cloudflare auto-deploy

## Recent Changes

### v0.5.0 (2026-02-12)
- **Uncle Tang full section**: Moved from Creator Story card to dedicated section below Features (title + description + 160px images)
- **Data range**: Updated 1980-2025 → **1970-2025** across all pages
- **Free tier stocks**: Updated 10 → **20** legendary stocks
- **Why page**: Added with creator's personal story (EN + TH)
- **Creator Story card**: Added on landing page with Uncle Tang thumbsup + quote + link to /why

### v0.4.0 (2026-02-11)
- Pricing migration: Lifetime → Yearly ($19.99/yr) across all pages
- Checkout buttons redirect to PWA app instead of Stripe Payment Links
- Uncle mascot favicon (PNG + ICO + apple-touch-icon)
- Uncle mascot icon on install pages
- Privacy, Terms, Support pages added

### v0.3.0 (2025-02-06)
- Updated 300+ → 500+ legendary stocks
- Added Crisis Event / Boss Stage PRO feature card
- Tutorial screenshots + install page image slider
- FAQ section and email signup form

## TODO

### Landing Page
- [ ] Configure Resend API key and audience ID
- [ ] Add testimonials when user reviews available
- [ ] Google Analytics / conversion tracking

### Future
- [ ] Affiliate/Referral program (considering Refgrow + Stripe)
- [ ] Native App Store / Google Play submission
