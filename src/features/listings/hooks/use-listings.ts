import { useState, useEffect, useCallback } from "react";
import { useAppSelector, selectFilters } from "@/store";
import { useGetPropertiesQuery } from "@/store/api/propertiesApi";
import { PER_PAGE } from "@/lib/constants";

export function useListings() {
  const filters = useAppSelector(selectFilters);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetPropertiesQuery({
    filters,
    page,
    perPage: PER_PAGE,
  });

  const properties = data?.data ?? [];
  const hasMore = data ? page < data.meta.totalPages : false;
  const total = data?.meta.total ?? 0;

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return {
    filters,
    properties,
    hasMore,
    total,
    isLoading,
    isFetching,
    isError,
    loadMore,
  };
}
