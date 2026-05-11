# AccessPatch

Accessibility scanner and fix tracker for small business websites, with plain-English reports and remediation boards.

## Positioning

**Turn accessibility problems into a clear fix list.**

AccessPatch helps teams identify likely accessibility issues, track remediation, and export client-friendly reports.

> AccessPatch does **not** guarantee ADA compliance, WCAG conformance, lawsuit prevention, or full accessibility. Automated checks are limited and manual review is still required.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- localStorage demo data repository
- Supabase-ready schema and env placeholders

## Routes

- `/`
- `/demo`
- `/scan`
- `/sites`
- `/sites/new`
- `/sites/[id]`
- `/sites/[id]/scans`
- `/sites/[id]/issues`
- `/sites/[id]/report`
- `/pricing`
- `/settings`

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run check`

## Local setup

```bash
npm install
npm run dev
```

Copy environment placeholders when needed:

```bash
cp .env.local.example .env.local
```

## Demo workflow

1. Open `/demo` for seeded Harbor & Pine Bakery data.
2. Run a simulated scan.
3. Update statuses/notes on `/sites/[id]/issues`.
4. View scan history at `/sites/[id]/scans`.
5. Export printable report at `/sites/[id]/report`.
