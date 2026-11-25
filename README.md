# Kumara Galan Pramana — Portfolio

A dark monochrome portfolio for an Information Systems graduate interested in Data Analytics, Machine Learning, and Software Development. Project descriptions and technologies are maintained in centralized TypeScript data, with statically generated detail pages for each listed project.

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS v4
- Lucide React

## Getting Started

Install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Project Detail Pages

Project content is managed in `src/data/projects.ts`. Each project slug is used to generate a static route at `/projects/[slug]`. Optional detail fields, images, and public links are only shown when present in the data.

## SEO and Production URL

Set `SITE_URL` to the actual production origin in the Vercel project environment before building for deployment. It must be an absolute origin without a path, query, or credentials. The value is intentionally not set in this repository because the production domain has not been provided.

When `SITE_URL` is unset, canonical URLs and the sitemap's absolute URLs are omitted; the sitemap contains no entries and `robots.txt` does not advertise a sitemap. Once configured, the sitemap includes the homepage and projects marked `public`; private projects are excluded and marked `noindex`.

No portfolio-branded favicon or social preview image is currently available. The existing Next.js starter favicon should be replaced with an approved brand asset. When a real social preview image is provided, place it at `public/images/social-preview.png` at 1200 × 630 pixels and add it to the metadata configuration. No placeholder image or domain is used.

## Project Structure

```text
src/
├── app/
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── projects/[slug]/
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── site.ts
├── components/
│   ├── projects/
│   ├── sections/
│   └── ui/
└── data/
    ├── contact.ts
    ├── education.ts
    ├── projects.ts
    └── skills.ts
```

## Deployment

The project can be deployed to Vercel using the standard Next.js deployment flow. Run `npm run build` locally before deployment.
