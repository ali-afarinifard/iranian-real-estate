import { http, HttpResponse, delay } from "msw";
import { MOCK_PROPERTIES, MOCK_PROPERTY_SUMMARIES } from "./data";
import { PropertyFilters, PropertySummary } from "@/types";
import { localizedIncludes } from "@/lib/localize";
import { MSW_DELAY, PER_PAGE } from "@/lib/constants";

// ─── In-memory favorites store
const favoritedIds = new Set<string>(
  MOCK_PROPERTY_SUMMARIES.slice(0, 5).map((p) => p.id),
);

// ─── Filter helper

function applyFilters(
  properties: PropertySummary[],
  filters: PropertyFilters,
): PropertySummary[] {
  return properties.filter((p) => {
    if (filters.listingType && p.listingType !== filters.listingType)
      return false;
    if (filters.type?.length && !filters.type.includes(p.type)) return false;

    // city/district are LocalizedString now — compare against the Persian (`fa`)
    // value, which is the canonical/stable key regardless of UI language.
    if (
      filters.city &&
      p.location.city.fa.toLowerCase() !== filters.city.toLowerCase()
    )
      return false;
    if (
      filters.district &&
      p.location.district.fa.toLowerCase() !== filters.district.toLowerCase()
    )
      return false;

    if (filters.priceMin && p.price < filters.priceMin) return false;
    if (filters.priceMax && p.price > filters.priceMax) return false;
    if (filters.areaMin && p.area < filters.areaMin) return false;
    if (filters.areaMax && p.area > filters.areaMax) return false;
    if (filters.bedrooms?.length && !filters.bedrooms.includes(p.bedrooms))
      return false;

    if (filters.query) {
      const q = filters.query;
      // Search title, district, and city — all fa/en values — so filters
      // work regardless of UI language.
      const matchesTitle = localizedIncludes(p.title, q);
      const matchesDistrict = localizedIncludes(p.location.district, q);
      const matchesCity = localizedIncludes(p.location.city, q);
      if (!matchesTitle && !matchesDistrict && !matchesCity) return false;
    }

    return true;
  });
}

// ─── Sort helper

function applySort(
  properties: PropertySummary[],
  sortBy?: string,
): PropertySummary[] {
  const sorted = [...properties];
  switch (sortBy) {
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "area_asc":
      return sorted.sort((a, b) => a.area - b.area);
    case "area_desc":
      return sorted.sort((a, b) => b.area - a.area);
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "popular":
      return sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    default:
      return sorted;
  }
}

// ─── Handlers

export const handlers = [
  // GET /api/properties — paginated, filtered list
  http.get("/api/properties", async ({ request }) => {
    await delay(MSW_DELAY);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const perPage = Number(url.searchParams.get("perPage") ?? String(PER_PAGE));

    const filters: PropertyFilters = {
      query: url.searchParams.get("query") ?? undefined,
      listingType:
        (url.searchParams.get(
          "listingType",
        ) as PropertyFilters["listingType"]) ?? undefined,
      city: url.searchParams.get("city") ?? undefined,
      district: url.searchParams.get("district") ?? undefined,
      type:
        (url.searchParams.get("type")?.split(",") as PropertyFilters["type"]) ??
        undefined,
      priceMin: url.searchParams.get("priceMin")
        ? Number(url.searchParams.get("priceMin"))
        : undefined,
      priceMax: url.searchParams.get("priceMax")
        ? Number(url.searchParams.get("priceMax"))
        : undefined,
      areaMin: url.searchParams.get("areaMin")
        ? Number(url.searchParams.get("areaMin"))
        : undefined,
      areaMax: url.searchParams.get("areaMax")
        ? Number(url.searchParams.get("areaMax"))
        : undefined,
      bedrooms:
        url.searchParams.get("bedrooms")?.split(",").map(Number) ?? undefined,
      sortBy:
        (url.searchParams.get("sortBy") as PropertyFilters["sortBy"]) ??
        undefined,
    };

    let filtered = applyFilters(MOCK_PROPERTY_SUMMARIES, filters);
    filtered = applySort(filtered, filters.sortBy);

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const data = filtered.slice(start, start + perPage);

    return HttpResponse.json({
      data,
      meta: { page, perPage, total, totalPages },
    });
  }),

  // GET /api/properties/featured
  http.get("/api/properties/featured", async () => {
    await delay(MSW_DELAY);
    const featured = MOCK_PROPERTY_SUMMARIES.filter((p) => p.isFeatured).slice(
      0,
      6,
    );
    return HttpResponse.json({ data: featured });
  }),

  // GET /api/properties/map
  http.get("/api/properties/map", async ({ request }) => {
    await delay(MSW_DELAY / 2);
    const url = new URL(request.url);
    const city = url.searchParams.get("city") ?? undefined;

    let data = MOCK_PROPERTY_SUMMARIES;
    if (city)
      data = data.filter(
        (p) => p.location.city.fa.toLowerCase() === city.toLowerCase(),
      );

    const mapData = data.map((p) => ({
      id: p.id,
      title: p.title, // LocalizedString — client picks fa/en
      price: p.price,
      currency: p.currency,
      type: p.type,
      listingType: p.listingType,
      status: p.status,
      lat: p.location.lat,
      lng: p.location.lng,
      primaryImage: p.primaryImage,
      bedrooms: p.bedrooms,
      area: p.area,
    }));

    return HttpResponse.json({ data: mapData });
  }),

  // GET /api/properties/:slug — full detail
  http.get("/api/properties/:slug", async ({ params }) => {
    await delay(MSW_DELAY);
    const { slug } = params;
    const property = MOCK_PROPERTIES.find(
      (p) => p.slug === slug || p.id === slug,
    );

    if (!property) {
      return HttpResponse.json(
        { message: "Property not found", code: "NOT_FOUND", status: 404 },
        { status: 404 },
      );
    }

    return HttpResponse.json(property);
  }),

  // GET /api/properties/:id/similar
  http.get("/api/properties/:id/similar", async ({ params }) => {
    await delay(MSW_DELAY);
    const { id } = params;
    const property = MOCK_PROPERTIES.find((p) => p.id === id);
    if (!property) return HttpResponse.json({ data: [] });

    const similar = MOCK_PROPERTY_SUMMARIES.filter(
      (p) =>
        p.id !== id &&
        p.type === property.type &&
        p.listingType === property.listingType,
    ).slice(0, 4);

    return HttpResponse.json({ data: similar });
  }),

  // POST /api/favorites/:propertyId
  http.post("/api/favorites/:propertyId", async ({ params }) => {
    await delay(MSW_DELAY / 2);
    const { propertyId } = params as { propertyId: string };
    favoritedIds.add(propertyId);
    return HttpResponse.json({ propertyId, saved: true });
  }),

  // DELETE /api/favorites/:propertyId
  http.delete("/api/favorites/:propertyId", async ({ params }) => {
    await delay(MSW_DELAY / 2);
    const { propertyId } = params as { propertyId: string };
    favoritedIds.delete(propertyId);
    return HttpResponse.json({ propertyId, saved: false });
  }),

  // GET /api/favorites
  http.get("/api/favorites", async () => {
    await delay(MSW_DELAY);
    const saved = MOCK_PROPERTY_SUMMARIES.filter((p) => favoritedIds.has(p.id));
    return HttpResponse.json({ data: saved });
  }),

  // POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    await delay(MSW_DELAY);
    const body = (await request.json()) as {
      email: string;
      password: string;
    };
    if (!body.email || !body.password) {
      return HttpResponse.json(
        {
          message: "Invalid credentials",
          code: "INVALID_CREDENTIALS",
          status: 401,
        },
        { status: 401 },
      );
    }
    return HttpResponse.json({
      user: {
        id: "user-001",
        name: "علی",
        email: body.email,
        role: "buyer",
        savedProperties: [],
        createdAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: "mock-access-token-xyz",
        refreshToken: "mock-refresh-token-abc",
        expiresAt: Date.now() + 3_600_000,
      },
    });
  }),

  // POST /api/auth/register
  http.post("/api/auth/register", async ({ request }) => {
    await delay(MSW_DELAY * 1.5);
    const body = (await request.json()) as { name: string; email: string };
    return HttpResponse.json({
      user: {
        id: "user-002",
        name: body.name,
        email: body.email,
        role: "buyer",
        savedProperties: [],
        createdAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: "mock-access-token-new",
        refreshToken: "mock-refresh-token-new",
        expiresAt: Date.now() + 3_600_000,
      },
    });
  }),

  // GET /api/stats — dashboard
  http.get("/api/stats", async () => {
    await delay(MSW_DELAY);
    const forSaleProps = MOCK_PROPERTIES.filter(
      (p) => p.listingType === "sale",
    );
    return HttpResponse.json({
      totalListings: MOCK_PROPERTIES.length,
      forSale: forSaleProps.length,
      forRent: MOCK_PROPERTIES.filter((p) => p.listingType === "rent").length,
      avgPriceSale: Math.round(
        forSaleProps.reduce((s, p) => s + p.price, 0) / forSaleProps.length,
      ),
      newThisMonth: MOCK_PROPERTIES.filter((p) => p.isNew).length,
      cities: ["تهران", "اصفهان", "شیراز"],
    });
  }),
];
