import type { PropertySummary } from "@/types";

export interface PropertyCardProps {
  property: PropertySummary;
  viewMode?: "grid" | "list";
  index?: number;
  onSelect?: (id: string) => void;
}

export interface PropertyCardImageProps {
  src: string;
  alt: string;
  isNew: boolean;
  isFeatured?: boolean;
  listingType: "sale" | "rent";
  isFavorited: boolean;
  onFavorite: (e: React.MouseEvent) => void;
}