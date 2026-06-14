import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Property,
  PropertySummary,
  PaginatedResponse,
  PropertyFilters,
} from "@/types";
import { API_BASE_URL, PER_PAGE } from "@/lib/constants";
import { filtersToQueryString } from "@/lib/utils";

export interface GetPropertiesArgs {
  filters?: PropertyFilters;
  page?: number;
  perPage?: number;
}

export interface MapProperty {
  id: string;
  title: string;
  price: number;
  currency: "EUR" | "USD" | "IRR";
  type: string;
  listingType: string;
  status: string;
  lat: number;
  lng: number;
  primaryImage: { id: string; url: string; alt: string; isPrimary: boolean };
  bedrooms: number;
  area: number;
}

export const propertiesApi = createApi({
  reducerPath: "propertiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: [
    "Property",
    "PropertyList",
    "FeaturedProperties",
    "MapProperties",
    "Favorites",
    "Stats",
  ],
  endpoints: (builder) => ({
    // Paginated, filtered list
    getProperties: builder.query<
      PaginatedResponse<PropertySummary>,
      GetPropertiesArgs
    >({
      query: ({ filters = {}, page = 1, perPage = PER_PAGE }) => {
        const qs = filtersToQueryString(filters);
        return `/properties?page=${page}&perPage=${perPage}${qs ? `&${qs}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Property" as const,
                id,
              })),
              { type: "PropertyList", id: "LIST" },
            ]
          : [{ type: "PropertyList", id: "LIST" }],
      // Merge pages for infinite scroll
      serializeQueryArgs: ({ queryArgs }) => {
        const { filters, perPage } = queryArgs;
        return JSON.stringify({ filters, perPage });
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) return newItems;
        return {
          ...newItems,
          data: [...currentCache.data, ...newItems.data],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    // Featured properties for hero section
    getFeaturedProperties: builder.query<{ data: PropertySummary[] }, void>({
      query: () => "/properties/featured",
      providesTags: [{ type: "FeaturedProperties", id: "FEATURED" }],
    }),

    // Map data — lightweight
    getMapProperties: builder.query<{ data: MapProperty[] }, { city?: string }>(
      {
        query: ({ city }) => `/properties/map${city ? `?city=${city}` : ""}`,
        providesTags: [{ type: "MapProperties", id: "MAP" }],
      },
    ),

    // Single property by slug or id
    getPropertyBySlug: builder.query<Property, string>({
      query: (slug) => `/properties/${slug}`,
      providesTags: (_, __, slug) => [{ type: "Property", id: slug }],
    }),

    // Similar properties
    getSimilarProperties: builder.query<{ data: PropertySummary[] }, string>({
      query: (id) => `/properties/${id}/similar`,
      providesTags: (_, __, id) => [{ type: "Property", id: `similar-${id}` }],
    }),

    // Dashboard stats
    getStats: builder.query<
      {
        totalListings: number;
        forSale: number;
        forRent: number;
        avgPriceSale: number;
        newThisMonth: number;
        cities: string[];
      },
      void
    >({
      query: () => "/stats",
      providesTags: [{ type: "Stats", id: "STATS" }],
    }),

    // Favorites
    getFavorites: builder.query<{ data: PropertySummary[] }, void>({
      query: () => "/favorites",
      providesTags: [{ type: "Favorites", id: "LIST" }],
    }),

    addFavorite: builder.mutation<
      { propertyId: string; saved: boolean },
      string
    >({
      query: (propertyId) => ({
        url: `/favorites/${propertyId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),

    removeFavorite: builder.mutation<
      { propertyId: string; saved: boolean },
      string
    >({
      query: (propertyId) => ({
        url: `/favorites/${propertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetFeaturedPropertiesQuery,
  useGetMapPropertiesQuery,
  useGetPropertyBySlugQuery,
  useGetSimilarPropertiesQuery,
  useGetStatsQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = propertiesApi;
