## 📌 Overview

Iranian Amlak is a full-featured real estate listing platform for the Iranian property market, supporting both English and Persian (فارسی) with full RTL layout. The project is architected as if it were a real production system — with a mock API layer that a backend team could drop-in replace.

**Key goals this project demonstrates:**
- Enterprise-level state management with RTK Query (caching, infinite scroll, optimistic updates)
- Real-time data simulation via Server-Sent Events pattern
- Scalable feature-first folder structure
- Type-safe contracts between frontend and (mocked) backend using Zod schemas

---

## Feature Highlights

### Interactive Map View
Full Leaflet.js integration with MarkerCluster, custom price-tag markers, dark/light tile switching, hover cards, and a side panel for selected properties. Leaflet is loaded via dynamic import to prevent SSR crashes (browser-only APIs).

### Infinite Scroll + Virtual List
The list view uses **TanStack Virtual** — only the visible rows are rendered in the DOM regardless of dataset size. Infinite scroll is driven by **IntersectionObserver** via a reusable `useLoadMore` hook.

### Real-time Price Alerts (SSE)
`usePropertySSE` simulates a Server-Sent Events connection, triggering RTK Query cache invalidation and toast notifications when prices change. In production, replace the simulated interval with a real `EventSource`.

### Advanced Filter System
A multi-layered filter panel with city select, price range, area range, bedroom count, property type, listing type, and feature toggles. Filter state is managed via a dedicated Redux slice with a `current` / `applied` two-stage pattern — users can tweak filters without immediately triggering a refetch.

### Optimistic Favorites
Saving/removing a property from favorites updates the UI instantly (optimistic update) while the mutation runs in the background, with automatic rollback on failure.

### Bilingual (EN / FA) with RTL
All user-facing content is stored as `ILocalizedString { fa: string; en?: string }`. A `useLocalize()` hook picks the right value at render time. The full layout flips to RTL when Persian is active, using MUI's built-in RTL support with a custom Emotion cache.

### Auth + Zod Validation
Login form uses a `useReducer`-driven local state machine (not a form library), with Zod schema validation (`LoginSchema`) and typed errors — keeping the dependency tree lean while demonstrating schema-first design.

---

## Architecture

### Folder Structure — Feature-First

```
src/
├── app/                   # Next.js App Router pages (thin wrappers)
│   ├── (main)/            # Authenticated route group
│   │   ├── listings/
│   │   ├── map/
│   │   ├── favorites/
│   │   ├── dashboard/
│   │   └── property/[slug]/
│   └── auth/login/
├── features/              # Feature modules (co-located components, hooks, types)
│   ├── auth/
│   ├── listings/
│   ├── map/
│   ├── filters/
│   ├── favorites/
│   ├── dashboard/
│   ├── home/
│   └── property-detail/
├── store/                 # Redux store, slices, RTK Query API
│   ├── api/propertiesApi.ts
│   └── slices/            # filters · favorites · auth · ui
├── hooks/                 # Shared hooks
├── i18n/                  # i18next config + EN/FA locale JSON
├── lib/                   # Constants, utilities, Zod schemas
├── mock/                  # MSW handlers + mock data
├── styles/                # MUI theme + ThemeProvider
└── types/                 # Global TypeScript interfaces
```

Pages in `app/` are intentionally thin — they set metadata, handle SSR/SSG data fetching, and delegate all rendering to the feature module. Business logic never leaks into `page.tsx`.

### State Architecture

```
Redux Store
├── propertiesApi   ← RTK Query (server state, caching, mutations)
├── filters         ← { current, applied, isDirty }  (URL-synced)
├── favorites       ← { ids[] }  (optimistic)
├── auth            ← { user, isAuthenticated }
└── ui              ← { viewMode, colorMode, language, notifications, drawerOpen }
```

`current` vs `applied` in the filters slice means the filter panel can be opened, changed, and cancelled without triggering a network request — `applyFilters()` is the commit action.

### RTK Query — Infinite Scroll Merge Strategy

```ts
// propertiesApi.ts
serializeQueryArgs: ({ queryArgs }) => JSON.stringify({ filters, perPage }),
merge: (currentCache, newItems, { arg }) => {
  if (arg.page === 1) return newItems;           // filter change → reset
  return { ...newItems, data: [...currentCache.data, ...newItems.data] };
},
forceRefetch: ({ currentArg, previousArg }) =>
  currentArg?.page !== previousArg?.page,
```

A single query endpoint handles both initial load and "load more", with cache keyed only on filters (not page number) so that changing a filter correctly resets to page 1.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 14** — App Router | SSR, SSG, ISR, code splitting |
| Language | **TypeScript 5.6** — strict mode | End-to-end type safety |
| State | **Redux Toolkit + RTK Query** | Unified server & client state |
| UI | **Material UI v6** | Design system, dark mode, RTL |
| Animation | **Framer Motion** | Page transitions, micro-interactions |
| Map | **Leaflet + MarkerCluster** | Interactive property map |
| Mock API | **MSW v2** | Realistic REST simulation in-browser |
| Validation | **Zod** | Schema-first, TypeScript inference |
| Virtualization | **TanStack Virtual** | Large list performance |
| i18n | **react-i18next** | EN + FA/RTL support |
| Fonts | **Vazirmatn** | Persian-first variable font |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Start dev server — MSW activates automatically in the browser
npm run dev
```

> **MSW setup (first run only):**  
> If `public/mockServiceWorker.js` is missing, run:
> ```bash
> npx msw init public/ --save
> ```

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Production build
npm run build && npm run start
```

---

## Environment Variables

```env
# .env.example

# Base URL for all API requests
# In development, MSW intercepts these before they hit the network
NEXT_PUBLIC_API_URL=/api

# Toggle MSW mock layer
# true  → development / demo mode (no real backend needed)
# false → production mode (requires NEXT_PUBLIC_API_URL to point to real backend)
NEXT_PUBLIC_USE_MSW=true
```

---

## Mock API Contract

`src/mock/handlers.ts` defines a complete REST API that a backend team can implement directly:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/properties` | Paginated + filtered listing |
| `GET` | `/properties/featured` | Hero section properties |
| `GET` | `/properties/map` | Lightweight map data |
| `GET` | `/properties/:slug` | Full property detail |
| `GET` | `/properties/:id/similar` | Similar properties |
| `GET` | `/stats` | Dashboard statistics |
| `GET` | `/favorites` | User's saved properties |
| `POST` | `/favorites/:id` | Save a property |
| `DELETE` | `/favorites/:id` | Remove a property |
| `POST` | `/auth/login` | Authenticate user |

All request and response shapes are enforced by **Zod schemas** in `src/lib/validations/schemas.ts`, which serve as the single source of truth for the frontend–backend contract.

---

## Internationalization

Currently supports **English** and **Persian (فارسی)**. Toggle via the language button in the Navbar; the layout switches direction (LTR ↔ RTL) instantly.

Bilingual content in the API follows the `ILocalizedString` pattern:
```ts
interface ILocalizedString {
  fa: string;   // Always present
  en?: string;  // Optional English translation
}
```
The `useLocalize()` hook resolves the correct string based on the active language, with Persian as the fallback.

**Adding a new language:**
1. Create `src/i18n/locales/<lang>/common.json`
2. Register it in `src/i18n/config.ts`

---

## Security Headers

Configured in `next.config.js` for all routes:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

---

## About This Project

Built as a **senior-level portfolio project** to demonstrate:

- Production-ready architecture decisions (feature-first, co-located concerns)
- Backend collaboration patterns via typed Zod contracts + MSW
- Performance engineering (virtual lists, ISR, dynamic imports, `next/image`)
- Real-world UX patterns (optimistic UI, infinite scroll, SSE)
- Bilingual/RTL support as a first-class concern, not an afterthought

---

<div align="center">

Made with ❤️ for the Iranian real estate market

</div>
