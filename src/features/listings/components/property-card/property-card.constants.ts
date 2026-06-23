export const STATUS_COLORS = {
  available: "success",
  pending: "warning",
  sold: "error",
  rented: "error",
} as const;

export const TYPE_LABEL_KEYS: Record<string, string> = {
  apartment: "property.type.apartment",
  villa: "property.type.villa",
  penthouse: "property.type.penthouse",
  office: "property.type.office",
  land: "property.type.land",
};

export const CARD_IMAGE_SIZES = {
  grid: "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw",
  list: "(max-width: 600px) 100vw, 240px",
} as const;