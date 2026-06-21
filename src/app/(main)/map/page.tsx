import type { Metadata } from "next";
import { MapClient } from "@/features/map/components/map-page";

export const metadata: Metadata = {
  title: "Property Map",
  description: "Explore properties on an interactive map.",
};

export default function MapPage() {
  return <MapClient />;
}
