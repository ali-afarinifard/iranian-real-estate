import {
  IProperty,
  IPropertySummary,
  PropertyType,
  ListingType,
  PropertyStatus,
  ILocalizedString,
} from "@/types";

// ─── Agents

const AGENT_POOL = [
  {
    id: "agent-1",
    name: { fa: "سارا محمدی", en: "Sara Mohammadi" },
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face",
    phone: "۰۲۱-۲۲۳۴۵۶۷۸",
    email: "sara@iraniamlak.ir",
    agency: { fa: "ایران ملک - تهران", en: "Iran Amlak - Tehran" },
    rating: 4.9,
    totalListings: 54,
  },
  {
    id: "agent-2",
    name: { fa: "علی رضایی", en: "Ali Rezaei" },
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    phone: "۰۲۱-۸۸۷۷۶۶۵۵",
    email: "ali@mellakaran.ir",
    agency: { fa: "ملک‌کاران - اصفهان", en: "Mellakaran - Isfahan" },
    rating: 4.7,
    totalListings: 38,
  },
  {
    id: "agent-3",
    name: { fa: "نیلوفر احمدی", en: "Nilufar Ahmadi" },
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    phone: "۰۷۱-۳۲۲۱۴۵۶۷",
    email: "nilufar@divarmelk.ir",
    agency: { fa: "دیوار ملک - شیراز", en: "Divar Melk - Shiraz" },
    rating: 4.8,
    totalListings: 29,
  },
];

// ─── Images

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

// ─── Locations 
// Bilingual now — district/city are LocalizedString so the UI can show
// the English name when the active language is "en".

interface ILocationEntry {
  district: ILocalizedString;
  city: ILocalizedString;
  lat: number;
  lng: number;
}

const LOCATIONS: ILocationEntry[] = [
  {
    district: { fa: "الهیه", en: "Elahieh" },
    city: { fa: "تهران", en: "Tehran" },
    lat: 35.8058,
    lng: 51.4274,
  },
  {
    district: { fa: "نیاوران", en: "Niavaran" },
    city: { fa: "تهران", en: "Tehran" },
    lat: 35.8196,
    lng: 51.4646,
  },
  {
    district: { fa: "جردن", en: "Jordan" },
    city: { fa: "تهران", en: "Tehran" },
    lat: 35.7667,
    lng: 51.4095,
  },
  {
    district: { fa: "ولنجک", en: "Velenjak" },
    city: { fa: "تهران", en: "Tehran" },
    lat: 35.8321,
    lng: 51.4052,
  },
  {
    district: { fa: "زعفرانیه", en: "Zafaranieh" },
    city: { fa: "تهران", en: "Tehran" },
    lat: 35.7968,
    lng: 51.4556,
  },
  {
    district: { fa: "سعادت‌آباد", en: "Saadat Abad" },
    city: { fa: "تهران", en: "Tehran" },
    lat: 35.7825,
    lng: 51.3734,
  },
  {
    district: { fa: "پاسداران", en: "Pasdaran" },
    city: { fa: "تهران", en: "Tehran" },
    lat: 35.7801,
    lng: 51.4795,
  },
  {
    district: { fa: "شهرک غرب", en: "Shahrak-e Gharb" },
    city: { fa: "تهران", en: "Tehran" },
    lat: 35.7624,
    lng: 51.3582,
  },
  {
    district: { fa: "چهارباغ", en: "Chaharbagh" },
    city: { fa: "اصفهان", en: "Isfahan" },
    lat: 32.6546,
    lng: 51.668,
  },
  {
    district: { fa: "جلفا", en: "Jolfa" },
    city: { fa: "اصفهان", en: "Isfahan" },
    lat: 32.6434,
    lng: 51.6652,
  },
  {
    district: { fa: "قصردشت", en: "Ghasrodasht" },
    city: { fa: "شیراز", en: "Shiraz" },
    lat: 29.6312,
    lng: 52.5318,
  },
  {
    district: { fa: "صادقیه", en: "Sadeghieh" },
    city: { fa: "تهران", en: "Tehran" },
    lat: 35.7387,
    lng: 51.3427,
  },
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

// ─── Enum pools

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

// ─── Bilingual titles

interface ITitleEntry {
  fa: string;
  en: string;
  slug: string;
}

const TITLES: Record<PropertyType, ITitleEntry[]> = {
  apartment: [
    {
      fa: "آپارتمان مدرن با دید کامل شهر",
      en: "Modern Apartment with Full City View",
      slug: "modern-apartment-full-city-view",
    },
    {
      fa: "آپارتمان روشن نوساز",
      en: "Bright Newly Built Apartment",
      slug: "bright-newly-built-apartment",
    },
    {
      fa: "آپارتمان خانوادگی بازسازی‌شده",
      en: "Renovated Family Apartment",
      slug: "renovated-family-apartment",
    },
    {
      fa: "لافت طراحی‌شده با متریال لوکس",
      en: "Designer Loft with Luxury Finishes",
      slug: "designer-loft-luxury-finishes",
    },
    {
      fa: "آپارتمان آرام با حیاط اختصاصی",
      en: "Quiet Apartment with Private Courtyard",
      slug: "quiet-apartment-private-courtyard",
    },
  ],
  villa: [
    {
      fa: "ویلای مستقل خانوادگی",
      en: "Detached Family Villa",
      slug: "detached-family-villa",
    },
    {
      fa: "ویلای مدرن با استخر",
      en: "Modern Villa with Swimming Pool",
      slug: "modern-villa-swimming-pool",
    },
    {
      fa: "ویلای کلاسیک با باغچه",
      en: "Classic Villa with Garden",
      slug: "classic-villa-garden",
    },
  ],
  office: [
    {
      fa: "فضای اداری اوپن‌پلن",
      en: "Open-Plan Office Space",
      slug: "open-plan-office-space",
    },
    {
      fa: "سوئیت تجاری درجه یک",
      en: "Premium Business Suite",
      slug: "premium-business-suite",
    },
    {
      fa: "مرکز کار اشتراکی خلاق",
      en: "Creative Co-working Hub",
      slug: "creative-coworking-hub",
    },
  ],
  land: [
    {
      fa: "زمین مسکونی آماده ساخت",
      en: "Residential Land Ready to Build",
      slug: "residential-land-ready-build",
    },
    {
      fa: "موقعیت استثنایی جهت سرمایه‌گذاری",
      en: "Prime Investment Development Land",
      slug: "prime-investment-development-land",
    },
  ],
  penthouse: [
    {
      fa: "پنت‌هاوس با تراس ۳۶۰ درجه",
      en: "Penthouse with 360° Rooftop Terrace",
      slug: "penthouse-360-rooftop-terrace",
    },
    {
      fa: "پنت‌هاوس پانوراما روف‌تاپ",
      en: "Panoramic Rooftop Penthouse",
      slug: "panoramic-rooftop-penthouse",
    },
    {
      fa: "پنت‌هاوس لوکس با تراس خصوصی",
      en: "Luxury Penthouse with Private Terrace",
      slug: "luxury-penthouse-private-terrace",
    },
  ],
};

// ─── Bilingual descriptions

function buildDescription(
  type: PropertyType,
  district: ILocalizedString,
  area: number,
): ILocalizedString {
  const typeMapFa: Record<PropertyType, string> = {
    apartment: "آپارتمان",
    villa: "ویلا",
    penthouse: "پنت‌هاوس",
    office: "دفتر اداری",
    land: "زمین",
  };
  const typeMapEn: Record<PropertyType, string> = {
    apartment: "apartment",
    villa: "villa",
    penthouse: "penthouse",
    office: "office space",
    land: "land parcel",
  };

  return {
    fa: `این ${typeMapFa[type]} زیبا در محله ${district.fa} با ${area} متر مربع فضای زندگی، دارای نور طبیعی فوق‌العاده، متریال لوکس و امکانات کامل می‌باشد.`,
    en: `This stunning ${typeMapEn[type]} in ${district.en ?? district.fa} offers ${area} m² of modern living space with exceptional natural light, high-end finishes, and full amenities throughout.`,
  };
}

// ─── Address data 

interface IStreetEntry {
  fa: string;
  en: string;
}

const STREET_NAMES: IStreetEntry[] = [
  { fa: "خیابان ولیعصر", en: "Valiasr St." },
  { fa: "خیابان شریعتی", en: "Shariati St." },
  { fa: "بلوار الهیه", en: "Elahieh Blvd." },
  { fa: "خیابان مطهری", en: "Motahari St." },
  { fa: "بلوار آفریقا", en: "Africa Blvd." },
  { fa: "خیابان فرشته", en: "Fereshteh St." },
  { fa: "بلوار میرداماد", en: "Mirdamad Blvd." },
  { fa: "خیابان سعدی", en: "Saadi St." },
  { fa: "خیابان چهارباغ عباسی", en: "Chaharbagh Abbasi St." },
  { fa: "بلوار قدس", en: "Ghods Blvd." },
  { fa: "خیابان زند", en: "Zand St." },
  { fa: "بلوار کشاورز", en: "Keshavarz Blvd." },
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

// ─── Helpers

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

function buildAddress(streetIndex: number, plot: number): ILocalizedString {
  const street = STREET_NAMES[streetIndex % STREET_NAMES.length];
  return {
    fa: `${street.fa}، پلاک ${plot}`,
    en: `${street.en}, No. ${plot}`,
  };
}

// ─── Generator 

function generateProperty(index: number): IProperty {
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

  // Price in Tomans — realistic Iranian market ranges
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

  const titleEntry = pick(TITLES[type] ?? TITLES.apartment, index);

  // Slug: ASCII only, index-suffixed for uniqueness — mirrors what a real backend generates
  const slug = `${titleEntry.slug}-${index + 1}`;

  const title: ILocalizedString = { fa: titleEntry.fa, en: titleEntry.en };
  const description = buildDescription(type, locBase.district, area);

  const propertyImages = images.map((url, i) => ({
    id: `img-${index}-${i}`,
    url,
    alt: titleEntry.en, // Always English for HTML alt (accessibility + SEO)
    isPrimary: i === 0,
  }));

  return {
    id: `prop-${String(index + 1).padStart(4, "0")}`,
    title,
    slug,
    description,
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
    yearBuilt: 1370 + (index % 34), // Jalali year — backend stores & returns as-is
    images: propertyImages,
    location: {
      address: buildAddress(index % STREET_NAMES.length, (index + 1) * 10),
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

// ─── Exports

export const MOCK_PROPERTIES: IProperty[] = Array.from({ length: 60 }, (_, i) =>
  generateProperty(i),
);

export const MOCK_PROPERTY_SUMMARIES: IPropertySummary[] = MOCK_PROPERTIES.map(
  (p) => ({
    id: p.id,
    title: p.title, // LocalizedString
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
