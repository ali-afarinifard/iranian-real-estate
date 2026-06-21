import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store";
import { filtersActions } from "@/store/slices";

export function useSearchDebounce(initialValue?: string, delay = 400) {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState(initialValue ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filtersActions.setFilter({ query: searchInput || undefined }));
      dispatch(filtersActions.applyFilters());
    }, delay);

    return () => clearTimeout(timer);
  }, [searchInput, delay, dispatch]);

  return { searchInput, setSearchInput };
}