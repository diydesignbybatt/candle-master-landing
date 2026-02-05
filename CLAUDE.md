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
| `candle-master-landing` | This repo - Landing Page | `E:\CANDLE MASTER\PROJECT\candle-master-landing` |
| `candle-master` | Mobile App (React + Vite) | `E:\CANDLE MASTER\PROJECT\Candle Master` |
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
2. **Features** - 4 cards (Blind Trading, Legendary Stocks, Academy, Risk-Free)
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
- 300+ Legendary Stocks worldwide
- All Chart Themes
- Candle Academy
- Position Calculator
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

- [ ] Configure actual Stripe Payment Links (currently placeholders)
- [ ] Configure Resend API key and audience ID
- [ ] Update tutorial images (currently placeholder quality)
- [x] PWA installation guide page
- [ ] Add actual tutorial images to install page mockup
- [ ] Affiliate program integration (planned for later)
- [ ] Add testimonials when user reviews available
- [ ] Google Analytics / conversion tracking
