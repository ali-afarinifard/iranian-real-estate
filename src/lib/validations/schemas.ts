import { z } from "zod";

// Property Schemas

export const PropertyTypeSchema = z.enum([
  "apartment",
  "villa",
  "office",
  "land",
  "penthouse",
]);
export const ListingTypeSchema = z.enum(["sale", "rent"]);
export const PropertyStatusSchema = z.enum([
  "available",
  "sold",
  "rented",
  "pending",
]);

export const PropertyImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string(),
  isPrimary: z.boolean(),
});

export const PropertyLocationSchema = z.object({
  address: z.string().min(5),
  city: z.string().min(2),
  district: z.string().min(2),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  zipCode: z.string().optional(),
});

export const PropertyAgentSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  avatar: z.string().url(),
  phone: z.string(),
  email: z.string().email(),
  agency: z.string(),
  rating: z.number().min(0).max(5),
  totalListings: z.number().int().min(0),
});

export const PropertySchema = z.object({
  id: z.string(),
  title: z.string().min(5).max(200),
  slug: z.string(),
  description: z.string().min(20),
  type: PropertyTypeSchema,
  listingType: ListingTypeSchema,
  status: PropertyStatusSchema,
  price: z.number().positive(),
  pricePerSqm: z.number().positive().optional(),
  currency: z.enum(["EUR", "USD", "IRR"]),
  area: z.number().positive(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  parkingSpots: z.number().int().min(0),
  floor: z.number().int().optional(),
  totalFloors: z.number().int().positive().optional(),
  yearBuilt: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),
  images: z.array(PropertyImageSchema).min(1),
  location: PropertyLocationSchema,
  agent: PropertyAgentSchema,
  features: z.array(z.string()),
  isFeatured: z.boolean(),
  isNew: z.boolean(),
  viewCount: z.number().int().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const PropertySummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: PropertyTypeSchema,
  listingType: ListingTypeSchema,
  status: PropertyStatusSchema,
  price: z.number().positive(),
  currency: z.enum(["EUR", "USD", "IRR"]),
  area: z.number().positive(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  primaryImage: PropertyImageSchema,
  location: z.object({
    city: z.string(),
    district: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
  isFeatured: z.boolean(),
  isNew: z.boolean(),
  createdAt: z.string().datetime(),
});

export const PaginatedPropertiesSchema = z.object({
  data: z.array(PropertySummarySchema),
  meta: z.object({
    page: z.number().int().positive(),
    perPage: z.number().int().positive(),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
  }),
});

// Filter Schemas

export const PropertyFiltersSchema = z.object({
  query: z.string().optional(),
  type: z.array(PropertyTypeSchema).optional(),
  listingType: ListingTypeSchema.optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
  areaMin: z.number().positive().optional(),
  areaMax: z.number().positive().optional(),
  bedrooms: z.array(z.number().int().min(0)).optional(),
  bathrooms: z.array(z.number().int().min(0)).optional(),
  features: z.array(z.string()).optional(),
  sortBy: z
    .enum([
      "price_asc",
      "price_desc",
      "area_asc",
      "area_desc",
      "newest",
      "popular",
    ])
    .optional(),
});

// Auth Schemas

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof LoginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type PropertyFiltersData = z.infer<typeof PropertyFiltersSchema>;
