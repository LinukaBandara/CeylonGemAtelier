# Ceylon Gem Atelier — Public Website

The customer-facing website for Ceylon Gem Atelier, built as a premium digital experience for browsing Ceylon gemstones, collections, journal content, comparisons, and enquiries.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Development

From this directory:

```bash
npm install
npm run dev
```

The development site runs at `http://localhost:3000` by default.

## Production build

```bash
npm run build
npm run start
```

## Structure

- `src/app/` — pages and route layouts
- `src/components/` — reusable interface components
- `src/data/` — gemstone and editorial data
- `public/` — static assets

The public website is intentionally kept separate from the authenticated management dashboard in the repository root.
