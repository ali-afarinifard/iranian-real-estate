import {
  Property,
  PropertySummary,
  PropertyType,
  ListingType,
  PropertyStatus,
} from "@/types";

const AGENT_POOL = [
  {
    id: "agent-1",
    name: "Sophie van der Berg",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face",
    phone: "+31 20 123 4567",
    email: "sophie@nestify.nl",
    agency: "Nestify Realty Amsterdam",
    rating: 4.9,
    totalListings: 47,
  },
  {
    id: "agent-2",
    name: "Lars Eriksen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    phone: "+31 20 234 5678",
    email: "lars@nestify.nl",
    agency: "Nestify Realty Rotterdam",
    rating: 4.7,
    totalListings: 31,
  },
  {
    id: "agent-3",
    name: "Amara Osei",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    phone: "+31 20 345 6789",
    email: "amara@nestify.nl",
    agency: "Nestify Realty Utrecht",
    rating: 4.8,
    totalListings: 23,
  },
];

const PROPERTY_IMAGES: Record<string, string[]> = {
  apartment: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  ],
  villa: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  ],
  office: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  ],
  land: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
  ],
  penthouse: [
    "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
  ],
};

// ── Stable, fixed locations (no randomness — deterministic per index) ─────────
const LOCATIONS: Array<{
  district: string;
  city: string;
  lat: number;
  lng: number;
}> = [
  { district: "Jordaan", city: "Amsterdam", lat: 52.3738, lng: 4.8836 },
  { district: "De Pijp", city: "Amsterdam", lat: 52.354, lng: 4.8953 },
  { district: "Oud-West", city: "Amsterdam", lat: 52.3639, lng: 4.8736 },
  { district: "Centrum", city: "Amsterdam", lat: 52.3731, lng: 4.8922 },
  { district: "Amsterdam-Noord", city: "Amsterdam", lat: 52.3982, lng: 4.907 },
  { district: "Watergraafsmeer", city: "Amsterdam", lat: 52.353, lng: 4.9369 },
  { district: "Buitenveldert", city: "Amsterdam", lat: 52.3361, lng: 4.8686 },
  { district: "IJburg", city: "Amsterdam", lat: 52.3524, lng: 5.0052 },
  { district: "Kralingen", city: "Rotterdam", lat: 51.9202, lng: 4.5006 },
  { district: "Hillegersberg", city: "Rotterdam", lat: 51.9482, lng: 4.4764 },
  { district: "Centrum", city: "Rotterdam", lat: 51.9225, lng: 4.4792 },
  { district: "Delfshaven", city: "Rotterdam", lat: 51.9156, lng: 4.4626 },
];

// Small deterministic offsets per index so markers don't overlap exactly
const OFFSETS = [
  [0.0, 0.0],
  [0.003, 0.004],
  [-0.002, 0.005],
  [0.005, -0.003],
  [-0.004, -0.002],
  [0.006, 0.001],
  [-0.001, 0.006],
  [0.004, -0.005],
  [-0.005, 0.003],
  [0.002, -0.006],
  [0.007, 0.002],
  [-0.003, 0.007],
];

const TYPES: PropertyType[] = [
  "apartment",
  "apartment",
  "apartment",
  "villa",
  "penthouse",
  "office",
  "land",
];
const LISTING_TYPES: ListingType[] = ["sale", "sale", "rent"];
const STATUSES: PropertyStatus[] = [
  "available",
  "available",
  "available",
  "pending",
  "sold",
  "rented",
];

const FEATURES_POOL = [
  "Swimming Pool",
  "Parking",
  "Garden",
  "Balcony",
  "Elevator",
  "Air Conditioning",
  "Central Heating",
  "Storage",
  "Gym",
  "Security System",
  "Smart Home",
  "Furnished",
  "Pet Friendly",
  "Fireplace",
  "Rooftop Access",
  "Concierge",
  "EV Charging",
];

const TITLES: Record<PropertyType, string[]> = {
  apartment: [
    "Modern Canal View Apartment",
    "Bright Studio",
    "Renovated Family Apartment",
    "Designer Loft with Exposed Brick",
    "Quiet Courtyard Apartment",
  ],
  villa: [
    "Detached Family Villa",
    "Contemporary Villa with Pool",
    "Classic Dutch Villa",
  ],
  office: [
    "Open-Plan Office Space",
    "Premium Business Suite",
    "Creative Co-working Hub",
  ],
  land: ["Buildable Land Parcel", "Prime Development Opportunity"],
  penthouse: [
    "Sky-High Penthouse Suite",
    "Panoramic Rooftop Penthouse",
    "Luxury Penthouse with Terrace",
  ],
};

// Seeded helpers (deterministic, index-based)
function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length];
}

function pickFeatures(index: number, count: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(FEATURES_POOL[(index + i * 3) % FEATURES_POOL.length]);
  }
  return [...new Set(result)]; // dedupe
}

function generateProperty(index: number): Property {
  const type = pick(TYPES, index);
  const listingType = pick(LISTING_TYPES, index);
  const status = pick(STATUSES, index);
  const locBase = pick(LOCATIONS, index);
  const offset = OFFSETS[index % OFFSETS.length];
  const agent = AGENT_POOL[index % AGENT_POOL.length];
  const images = PROPERTY_IMAGES[type] ?? PROPERTY_IMAGES.apartment;

  const bedrooms = type === "office" || type === "land" ? 0 : (index % 4) + 1;
  const bathrooms =
    type === "office" || type === "land"
      ? 0
      : Math.min(bedrooms, (index % 2) + 1);
  const area =
    type === "land" ? 200 + (index % 10) * 180 : 45 + (index % 20) * 18;

  const priceBase =
    listingType === "sale"
      ? (type === "penthouse"
          ? 8_000_000_000
          : type === "villa"
            ? 5_000_000_000
            : 2_000_000_000) +
        (index % 15) * 500_000_000
      : 12_000_000 + (index % 10) * 4_000_000;

  const createdDaysAgo = (index * 7) % 180;
  const createdAt = new Date(
    Date.now() - createdDaysAgo * 86_400_000,
  ).toISOString();

  const titleList = TITLES[type] ?? TITLES.apartment;
  const title = titleList[index % titleList.length];
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`;

  const propertyImages = images.map((url, i) => ({
    id: `img-${index}-${i}`,
    url,
    alt: `${type} interior ${i + 1}`,
    isPrimary: i === 0,
  }));

  return {
    id: `prop-${String(index + 1).padStart(4, "0")}`,
    title,
    slug,
    description: `This stunning ${type} in ${locBase.district} offers ${area}m² of modern living space with exceptional natural light and high-end finishes throughout.`,
    type,
    listingType,
    status,
    price: priceBase,
    pricePerSqm: Math.round(priceBase / area),
    currency: "EUR",
    area,
    bedrooms,
    bathrooms,
    parkingSpots: type === "land" ? 0 : index % 3,
    floor: ["apartment", "penthouse"].includes(type) ? index % 12 : undefined,
    totalFloors: ["apartment", "penthouse"].includes(type) ? 12 : undefined,
    yearBuilt: 1950 + (index % 74),
    images: propertyImages,
    location: {
      address: `${(index + 1) * 10} ${locBase.district}straat`,
      city: locBase.city,
      district: locBase.district,
      lat: locBase.lat + offset[0],
      lng: locBase.lng + offset[1],
      zipCode: `${1000 + (index % 999)} AB`,
    },
    agent,
    features: pickFeatures(index, 4 + (index % 5)),
    isFeatured: index < 6,
    isNew: createdDaysAgo <= 14,
    viewCount: 50 + index * 37,
    createdAt,
    updatedAt: createdAt,
  };
}

// Generate 60 stable properties
export const MOCK_PROPERTIES: Property[] = Array.from({ length: 60 }, (_, i) =>
  generateProperty(i),
);

export const MOCK_PROPERTY_SUMMARIES: PropertySummary[] = MOCK_PROPERTIES.map(
  (p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    type: p.type,
    listingType: p.listingType,
    status: p.status,
    price: p.price,
    currency: p.currency,
    area: p.area,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    primaryImage: p.images.find((img) => img.isPrimary) ?? p.images[0],
    location: {
      city: p.location.city,
      district: p.location.district,
      lat: p.location.lat,
      lng: p.location.lng,
    },
    isFeatured: p.isFeatured,
    isNew: p.isNew,
    createdAt: p.createdAt,
  }),
);
