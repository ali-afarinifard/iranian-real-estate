import { useEffect } from "react";
import { useGetFavoritesQuery } from "@/store/api/propertiesApi";
import { useAppDispatch } from "@/store";
import { favoritesActions } from "@/store/slices";

export function useSyncFavorites() {
  const dispatch = useAppDispatch();
  const { data } = useGetFavoritesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(favoritesActions.setFavorites(data.data.map((p) => p.id)));
    }
  }, [data, dispatch]);
}
