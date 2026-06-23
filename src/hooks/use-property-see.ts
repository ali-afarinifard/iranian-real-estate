"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store";
import { uiActions } from "@/store/slices";
import { propertiesApi } from "@/store/api/propertiesApi";
import type { ISSEEvent } from "@/types";

interface IUseSSEOptions {
  enabled?: boolean;
  onEvent?: (event: ISSEEvent) => void;
}

/**
 * usePropertySSE — connects to a Server-Sent Events endpoint
 * and handles real-time property updates (price changes, new listings, etc.)
 *
 * Notifications are fully localized via i18n — switching language mid-session
 * will immediately affect the next notification that fires.
 *
 * In production: replace the simulated interval with a real EventSource.
 */
export function usePropertySSE({
  enabled = true,
  onEvent,
}: IUseSSEOptions = {}) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectedRef = useRef(false);

  const handleEvent = useCallback(
    (event: ISSEEvent) => {
      onEvent?.(event);

      switch (event.type) {
        case "price_update":
          dispatch(
            uiActions.addNotification({
              type: "info",
              title: t("sse.priceUpdate.title"),
              message: t("sse.priceUpdate.message"),
              duration: 5000,
            }),
          );
          dispatch(
            propertiesApi.util.invalidateTags([
              { type: "Property", id: event.propertyId },
            ]),
          );
          break;

        case "new_listing":
          dispatch(
            uiActions.addNotification({
              type: "success",
              title: t("sse.newListing.title"),
              message: t("sse.newListing.message"),
              duration: 6000,
            }),
          );
          dispatch(
            propertiesApi.util.invalidateTags([
              { type: "PropertyList", id: "LIST" },
            ]),
          );
          break;

        case "status_change":
          dispatch(
            uiActions.addNotification({
              type: "warning",
              title: t("sse.statusChange.title"),
              message: t("sse.statusChange.message"),
              duration: 5000,
            }),
          );
          break;

        default:
          break;
      }
    },
    [dispatch, onEvent, t],
  );

  useEffect(() => {
    if (!enabled) return;

    // In production you would do:
    //   const es = new EventSource('/api/events/properties');
    //   es.onmessage = (e) => handleEvent(JSON.parse(e.data));
    //   es.onerror = () => es.close();
    //   return () => es.close();
    //
    // For demo: simulate SSE with random events every 25–40s
    const SSE_EVENTS: ISSEEvent["type"][] = [
      "price_update",
      "new_listing",
      "status_change",
    ];
    const PROPERTY_IDS = ["prop-0001", "prop-0005", "prop-0012", "prop-0021"];

    function scheduleNext() {
      const delay = 25000 + Math.random() * 15000; // 25–40s
      intervalRef.current = setTimeout(() => {
        const type = SSE_EVENTS[Math.floor(Math.random() * SSE_EVENTS.length)];
        const propertyId =
          PROPERTY_IDS[Math.floor(Math.random() * PROPERTY_IDS.length)];

        handleEvent({
          type,
          propertyId,
          payload: {
            newPrice: 380_000_000 + Math.round(Math.random() * 100_000_000),
          },
          timestamp: new Date().toISOString(),
        });

        scheduleNext();
      }, delay);
    }

    scheduleNext();
    isConnectedRef.current = true;

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      isConnectedRef.current = false;
    };
  }, [enabled, handleEvent]);

  return { isConnected: isConnectedRef.current };
}
