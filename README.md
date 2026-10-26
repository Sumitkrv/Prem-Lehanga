# Prem Lehanga Studio website concept

An independent, no-index website preview for Prem Lehanga Studio. The user supplied one studio photo, five video clips, and a logo reference. The logo is rendered locally as a scalable SVG treatment, and the supplied fashion imagery is stored locally. The media's relationship to the Instagram profile has not been independently verified. Collection labels and product names remain illustrative. No directory contact information is used.

## Run locally

Requirements: Node.js 20.19+ and npm.

```sh
npm install
npm run dev
```

Vite prints the local preview URL (normally `http://localhost:5173`).

## Build

```sh
npm run build
npm run preview
```

The static build is written to `dist/`.

## Browser checks

The Playwright smoke suite covers all routes and refreshes, collection filters and search, wishlist persistence, private viewing form behavior, lookbook keyboard controls, browser history, the mobile menu, and horizontal overflow at the requested viewport widths.

```sh
npx playwright install chromium
npm run test:e2e
```

## Deploy to Vercel or Netlify

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: the project root
- SPA route fallback is configured in `vercel.json` and `public/_redirects`.

The preview intentionally sends `noindex, nofollow` and blocks crawling in `public/robots.txt`. Before an approved public launch, replace or remove these preview restrictions and confirm the final metadata with the studio.

## Brand assets and contact configuration

Review `ASSET-SOURCES.md` for the research record and original asset manifest. Add approved original assets under `public/assets/`, then update `src/data/collections.js`, `src/data/products.js`, `src/data/lookbook.js`, and the relevant `ImageCanvas` usages. The Instagram profile is the only configured contact route. An official WhatsApp number, studio location, opening hours, and booking workflow are not verified.

The viewing form prepares a message in the browser. It does not send or persist it and does not confirm an appointment.

The five local video clips use native controls, `preload="none"`, and poster frames; they do not autoplay. Only one video in a gallery plays at a time.
