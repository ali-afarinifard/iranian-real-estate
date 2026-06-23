"use client";
import { useSyncFavorites } from "@/hooks/use-sync-favorites";

export function AppInitializer() {
  useSyncFavorites();
  return null;
}