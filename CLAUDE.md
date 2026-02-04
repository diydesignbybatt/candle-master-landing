# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**Candle Master Landing Page** - Marketing/SEO landing page for the Candle Master trading simulator game.

## Tech Stack

- **Framework**: Astro
- **Adapter**: @astrojs/cloudflare
- **Deployment**: Cloudflare Pages
- **Output**: Static

## URLs

| URL | Purpose |
|-----|---------|
| https://candlemaster.app | Production (this site) |
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
├── pages/
│   └── index.astro    # Landing page
public/
├── favicon.svg
├── favicon.ico
└── og-image.png       # (TODO: add OG image)
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
- [ ] OG image (og-image.png)
- [ ] Sitemap
- [ ] robots.txt

## Design Notes

- Dark theme with gradient background
- Purple/pink accent colors
- Mobile responsive
- Links to app.candlemaster.app and web.candlemaster.app
