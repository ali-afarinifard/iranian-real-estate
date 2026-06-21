# Iranian Amlak — Real Estate Platform

A production-grade real estate platform built as a senior frontend portfolio project, demonstrating mastery of modern React/Next.js ecosystem.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 14** (App Router, SSR, SSG, ISR) |
| Language | **TypeScript** (strict mode) |
| State | **Redux Toolkit + RTK Query** (caching, infinite scroll merge, optimistic updates) |
| UI | **Material UI v6** (custom design system, dark mode) |
| Animation | **Framer Motion** (page transitions, micro-interactions) |
| Map | **Leaflet + MarkerCluster** (dynamic import, custom price markers) |
| Mock API | **MSW v2** (Mock Service Worker — simulates real REST API) |
| Validation | **Zod** (schema validation + TypeScript inference) |
| Virtualization | **TanStack Virtual** (virtual list for large datasets) |
| Real-time | **SSE pattern** (Server-Sent Events for price alerts) |
| i18n | **react-i18next** (English + Persian/Farsi) |
| PWA | Web App Manifest + offline-ready patterns |
| Performance | Code splitting, lazy imports, `next/image`, ISR |
| SEO | Dynamic metadata API, structured data ready |

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Main layout group (with Navbar)
│   │   ├── page.tsx              # Home — SSG, hero, featured
│   │   ├── listings/page.tsx     # Listings — SSR, infinite scroll
│   │   ├── map/page.tsx          # Map view — CSR, Leaflet
│   │   ├── property/[slug]/      # Property detail — ISR
│   │   ├── dashboard/page.tsx    # Dashboard — stats, saved
│   │   └── favorites/page.tsx    # Saved properties
│   └── auth/                     # Auth pages (no Navbar)
├── features/                     # Feature-first organization
│   ├── listings/components/      # PropertyCard, PropertyCardSkeleton
│   ├── filters/components/       # FilterPanel (advanced filter drawer)
│   ├── map/components/           # LeafletMap
│   ├── property/                 # Property detail components
│   └── auth/                     # Auth components
├── store/                        # Redux store
│   ├── api/propertiesApi.ts      # RTK Query endpoints
│   ├── slices/index.ts           # filtersSlice, favoritesSlice, authSlice, uiSlice
│   └── index.ts                  # Store config + typed hooks + selectors
├── mock/                         # MSW mock layer
│   ├── data.ts                   # 60 realistic property records
│   ├── handlers.ts               # REST API handlers
│   └── browser.ts                # MSW worker setup
├── hooks/
│   └── usePropertySSE.ts         # Real-time SSE hook
├── lib/
│   ├── constants/                # Cities, property types, sort options
│   ├── utils/                    # formatPrice, formatArea, URL helpers
│   └── validations/schemas.ts    # Zod schemas for all entities
├── styles/
│   ├── theme.ts                  # MUI custom theme (light/dark)
│   └── ThemeProvider.tsx         # Theme + Emotion cache provider
├── types/index.ts                # All TypeScript types
└── i18n/
    ├── config.ts                 # i18next setup
    └── locales/en,fa/            # English + Persian translations
```

---

## ✨ Key Features

### Advanced State Management
- **RTK Query** with intelligent caching, tag invalidation, and infinite scroll merge strategy
- **4 Redux slices**: filters (URL-synced), favorites (optimistic), auth, ui
- Fully **typed selectors** and dispatch hooks

### Mock API Layer (MSW v2)
Demonstrates backend collaboration skills:
- Full REST API simulation (`GET /properties`, `POST /auth/login`, etc.)
- Realistic network delay simulation
- Filter/sort/pagination logic mirroring real backend behavior
- **Zod schemas** define the contract between frontend and backend

### Real-time Updates (SSE)
- `usePropertySSE` hook simulates Server-Sent Events
- Triggers RTK Query cache invalidation on price updates
- Toast notifications via Redux UI slice

### Performance
- **ISR** for property detail pages (revalidate every 60s in production)
- **SSG** for home page
- **TanStack Virtual** for list view — renders only visible items
- **Infinite scroll** via IntersectionObserver
- **Dynamic imports** for Leaflet (browser-only APIs)
- `next/image` with blur placeholder and AVIF/WebP formats
- Code splitting via Next.js App Router

### SEO
- Dynamic `metadata` API per page
- OpenGraph + Twitter card tags
- Canonical URLs ready

---

## 🛠 Getting Started

```bash
# Install dependencies
npm install

# Start development server (MSW auto-activates)
npm run dev

# Type check
npm run type-check

# Lint
npm run lint
```

> **Note on MSW:** The first time you run the dev server, copy the MSW service worker file:
> ```bash
> npx msw init public/ --save
> ```
> This places `public/mockServiceWorker.js` which intercepts all API calls.

---

## 🔗 API Contract

The `src/mock/handlers.ts` file mirrors the exact API contract a backend team would implement.
All endpoints are typed via Zod schemas in `src/lib/validations/schemas.ts`.

In production: change `NEXT_PUBLIC_API_URL` in `.env.local` to your real backend URL and set `NEXT_PUBLIC_USE_MSW=false`.

```env
NEXT_PUBLIC_API_URL=https://api.iranian-amlak.nl
NEXT_PUBLIC_USE_MSW=false
```

---

## 🌍 Internationalization

Currently supports **English** and **Persian (فارسی)**. Toggle via the language button in the Navbar.

Adding a new language:
1. Create `src/i18n/locales/<lang>/common.json`
2. Add to `resources` in `src/i18n/config.ts`

---

## 👤 Author

Built as a senior-level portfolio project demonstrating:
- Production architecture decisions
- Backend collaboration patterns (MSW + Zod contracts)
- Performance-first development
- Scalable feature-first code organization
