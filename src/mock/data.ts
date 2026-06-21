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
    name: "سارا محمدی",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face",
    phone: "۰۲۱-۲۲۳۴۵۶۷۸",
    email: "sara@iraniamlak.ir",
    agency: "ایران ملک - تهران",
    rating: 4.9,
    totalListings: 54,
  },
  {
    id: "agent-2",
    name: "علی رضایی",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    phone: "۰۲۱-۸۸۷۷۶۶۵۵",
    email: "ali@mellakaran.ir",
    agency: "ملک‌کاران - اصفهان",
    rating: 4.7,
    totalListings: 38,
  },
  {
    id: "agent-3",
    name: "نیلوفر احمدی",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    phone: "۰۷۱-۳۲۲۱۴۵۶۷",
    email: "nilufar@shirazملک.ir",
    agency: "دیوار ملک - شیراز",
    rating: 4.8,
    totalListings: 29,
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

const LOCATIONS: Array<{
  district: string;
  city: string;
  lat: number;
  lng: number;
}> = [
  { district: "الهیه", city: "تهران", lat: 35.8058, lng: 51.4274 },
  { district: "نیاوران", city: "تهران", lat: 35.8196, lng: 51.4646 },
  { district: "جردن", city: "تهران", lat: 35.7667, lng: 51.4095 },
  { district: "ولنجک", city: "تهران", lat: 35.8321, lng: 51.4052 },
  { district: "زعفرانیه", city: "تهران", lat: 35.7968, lng: 51.4556 },
  { district: "سعادت‌آباد", city: "تهران", lat: 35.7825, lng: 51.3734 },
  { district: "پاسداران", city: "تهران", lat: 35.7801, lng: 51.4795 },
  { district: "شهرک غرب", city: "تهران", lat: 35.7624, lng: 51.3582 },
  { district: "چهارباغ", city: "اصفهان", lat: 32.6546, lng: 51.668 },
  { district: "جلفا", city: "اصفهان", lat: 32.6434, lng: 51.6652 },
  { district: "قصردشت", city: "شیراز", lat: 29.6312, lng: 52.5318 },
  { district: "صادقیه", city: "تهران", lat: 35.7387, lng: 51.3427 },
];

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
  "property.features.swimmingPool",
  "property.features.parking",
  "property.features.garden",
  "property.features.balcony",
  "property.features.elevator",
  "property.features.airConditioning",
  "property.features.centralHeating",
  "property.features.storage",
  "property.features.gym",
  "property.features.securitySystem",
  "property.features.smartHome",
  "property.features.furnished",
  "property.features.petFriendly",
  "property.features.fireplace",
  "property.features.rooftopAccess",
  "property.features.concierge",
  "property.features.eVCharging",
];

const TITLES: Record<PropertyType, string[]> = {
  apartment: [
    "آپارتمان مدرن با دید کامل شهر",
    "آپارتمان روشن نوساز",
    "آپارتمان خانوادگی بازسازی‌شده",
    "لافت طراحی‌شده با متریال لوکس",
    "آپارتمان آرام با حیاط اختصاصی",
  ],
  villa: [
    "ویلای مستقل خانوادگی",
    "ویلای مدرن با استخر",
    "ویلای کلاسیک با باغچه",
  ],
  office: [
    "فضای اداری اوپن‌پلن",
    "سوئیت تجاری درجه یک",
    "مرکز کار اشتراکی خلاق",
  ],
  land: ["زمین مسکونی آماده ساخت", "موقعیت استثنایی جهت سرمایه‌گذاری"],
  penthouse: [
    "پنت‌هاوس با تراس ۳۶۰ درجه",
    "پنت‌هاوس پانوراما روف‌تاپ",
    "پنت‌هاوس لوکس با تراس خصوصی",
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
  return [...new Set(result)];
}

const STREET_NAMES = [
  "خیابان ولیعصر",
  "خیابان شریعتی",
  "بلوار الهیه",
  "خیابان مطهری",
  "بلوار آفریقا",
  "خیابان فرشته",
  "بلوار میرداماد",
  "خیابان سعدی",
  "خیابان چهارباغ عباسی",
  "بلوار قدس",
  "خیابان زند",
  "بلوار کشاورز",
];

const POSTAL_CODES = [
  "1966714571",
  "1591634151",
  "1946743511",
  "1969613111",
  "1998863111",
  "1946843141",
  "8174848151",
  "7134736411",
  "7194878611",
  "1997845311",
  "1946943651",
  "1459763141",
];

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
  const slug = `${title
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9\-]/gi, "")}-${index + 1}`;

  const propertyImages = images.map((url, i) => ({
    id: `img-${index}-${i}`,
    url,
    alt: `تصویر ${i + 1} از ${title}`,
    isPrimary: i === 0,
  }));

  const streetName = STREET_NAMES[index % STREET_NAMES.length];

  return {
    id: `prop-${String(index + 1).padStart(4, "0")}`,
    title,
    slug,
    description: `این ${type === "apartment" ? "آپارتمان" : type === "villa" ? "ویلا" : type === "penthouse" ? "پنت‌هاوس" : type === "office" ? "دفتر اداری" : "زمین"} زیبا در محله ${locBase.district} با ${area} متر مربع فضای زندگی، دارای نور طبیعی فوق‌العاده، متریال لوکس و امکانات کامل می‌باشد.`,
    type,
    listingType,
    status,
    price: priceBase,
    pricePerSqm: Math.round(priceBase / area),
    currency: "IRR",
    area,
    bedrooms,
    bathrooms,
    parkingSpots: type === "land" ? 0 : index % 3,
    floor: ["apartment", "penthouse"].includes(type) ? index % 12 : undefined,
    totalFloors: ["apartment", "penthouse"].includes(type) ? 12 : undefined,
    yearBuilt: 1370 + (index % 34),
    images: propertyImages,
    location: {
      address: `${streetName}، پلاک ${(index + 1) * 10}`,
      city: locBase.city,
      district: locBase.district,
      lat: locBase.lat + offset[0],
      lng: locBase.lng + offset[1],
      zipCode: POSTAL_CODES[index % POSTAL_CODES.length],
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
