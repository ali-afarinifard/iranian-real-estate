import type { IPropertySummary } from "@/types";

export interface IPropertyCardProps {
  property: IPropertySummary;
  viewMode?: "grid" | "list";
  index?: number;
  onSelect?: (id: string) => void;
  isFavorited?: boolean;
}

export interface IPropertyCardImageProps {
  src: string;
  alt: string;
  isNew: boolean;
  isFeatured?: boolean;
  listingType: "sale" | "rent";
  isFavorited: boolean;
  onFavorite: (e: React.MouseEvent) => void;
}