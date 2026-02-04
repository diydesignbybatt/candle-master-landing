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
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── HeroBackground.astro   # SVG candlestick animation
│   └── LanguageSwitcher.astro # i18n language toggle
├── i18n/
│   ├── en.json                # English translations
│   ├── th.json                # Thai translations
│   └── utils.ts               # i18n helper functions
├── layouts/
│   └── Layout.astro           # Shared layout
├── pages/
│   ├── index.astro            # Landing page (English)
│   └── th/
│       └── index.astro        # Landing page (Thai)
├── styles/
│   └── theme.css              # Midnight theme variables
public/
├── favicon.svg                # Candle Master icon (candlesticks)
├── favicon.ico
└── og-image.png               # (TODO: add OG image)
```

## Design System

### Theme: Midnight with Gold/Yellow Accents
- **Primary**: Gold/Yellow (#EAB308, #F59E0B)
- **Background**: Dark (#0A0A0A, #111111)
- **Profit**: Green (#22C55E)
- **Loss**: Red (#EF4444)
- **Font**: Geist Sans (Claude-like)

### Game Concept: Blind Trading
- Random legendary stocks from 1980-2025
- Player doesn't know which stock until game ends
- "History Always Repeats Itself" - learn from real market history

### Pricing (Current)
| Plan | Regular | Launch Price |
|------|---------|--------------|
| Free | $0 | $0 |
| PRO Monthly | $4.99/mo | $3.99/mo |
| PRO Lifetime | $39.99 | $29.99 |

### Free Tier Limits
- 100 Moves per Game
- 10 Legendary Stocks
- Historical Data 1980-2025
- 2 Chart Themes

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

To edit content:
1. Open the JSON file in VS Code
2. Run `npm run dev` to preview changes
3. Edit content directly in the JSON
4. Save and see live updates at http://localhost:4321

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
- [ ] OG image (og-image.png)
- [ ] Sitemap
- [ ] robots.txt

## TODO

- [ ] Configure actual Stripe Payment Links (currently placeholders)
- [ ] Add OG image
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] PWA installation guide page
- [ ] Affiliate program integration
