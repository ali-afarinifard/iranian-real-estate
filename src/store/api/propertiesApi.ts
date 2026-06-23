import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Property,
  PropertySummary,
  MapProperty,
  PaginatedResponse,
  GetPropertiesArgs,
} from "@/types";
import { API_BASE_URL, PER_PAGE } from "@/lib/constants";
import { filtersToQueryString } from "@/lib/utils";

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

    // Map data — lightweight, only MapProperty fields
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

    // Favorites — فقط برای initial sync استفاده میشه
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
    }),

    removeFavorite: builder.mutation<
      { propertyId: string; saved: boolean },
      string
    >({
      query: (propertyId) => ({
        url: `/favorites/${propertyId}`,
        method: "DELETE",
      }),
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
