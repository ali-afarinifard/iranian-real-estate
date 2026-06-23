"use client";

import React, { useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector, selectIsFavorited } from "@/store";
import { favoritesActions, uiActions } from "@/store/slices";
import { PropertyCardGrid } from "./property-card-grid";
import { PropertyCardList } from "./property-card-list";
import type { PropertyCardProps } from "./property-card.types";

export const PropertyCard = memo(function PropertyCard({
  property,
  viewMode = "grid",
  index = 0,
  onSelect,
  isFavorited: isFavoritedProp,
}: PropertyCardProps & { isFavorited?: boolean }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isFavoritedFromStore = useAppSelector(selectIsFavorited(property.id));

  const isFavorited = isFavoritedProp ?? isFavoritedFromStore;

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(favoritesActions.toggleFavorite(property.id));
      dispatch(
        uiActions.addNotification({
          type: isFavorited ? "info" : "success",
          title: isFavorited
            ? t("property.removedFromFavorites")
            : t("property.savedToFavorites"),
          duration: 2500,
        }),
      );
    },
    [dispatch, property.id, isFavorited, t],
  );

  const sharedProps = {
    property,
    index,
    onSelect,
    isFavorited,
    onFavorite: handleFavorite,
  };

  if (viewMode === "list") {
    return <PropertyCardList {...sharedProps} />;
  }

  return <PropertyCardGrid {...sharedProps} />;
});
