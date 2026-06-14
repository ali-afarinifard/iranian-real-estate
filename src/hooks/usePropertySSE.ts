'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from '@/store';
import { uiActions } from '@/store/slices';
import { propertiesApi } from '@/store/api/propertiesApi';
import type { SSEEvent } from '@/types';

interface UseSSEOptions {
  enabled?: boolean;
  onEvent?: (event: SSEEvent) => void;
}

/**
 * usePropertySSE — connects to a Server-Sent Events endpoint
 * and handles real-time property updates (price changes, new listings, etc.)
 *
 * In production: replace SSE_URL with your actual backend endpoint.
 * Here we simulate SSE events with a local interval for demo purposes.
 */
export function usePropertySSE({ enabled = true, onEvent }: UseSSEOptions = {}) {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectedRef = useRef(false);

  const handleEvent = useCallback((event: SSEEvent) => {
    onEvent?.(event);

    switch (event.type) {
      case 'price_update':
        dispatch(uiActions.addNotification({
          type: 'info',
          title: 'Price Update',
          message: `A property you viewed changed price.`,
          duration: 5000,
        }));
        // Invalidate the specific property cache
        dispatch(
          propertiesApi.util.invalidateTags([{ type: 'Property', id: event.propertyId }])
        );
        break;

      case 'new_listing':
        dispatch(uiActions.addNotification({
          type: 'success',
          title: 'New Listing!',
          message: 'A new property just hit the market.',
          duration: 6000,
        }));
        dispatch(
          propertiesApi.util.invalidateTags([{ type: 'PropertyList', id: 'LIST' }])
        );
        break;

      case 'status_change':
        dispatch(uiActions.addNotification({
          type: 'warning',
          title: 'Status Changed',
          message: 'A property status was updated.',
          duration: 5000,
        }));
        break;

      default:
        break;
    }
  }, [dispatch, onEvent]);

  useEffect(() => {
    if (!enabled) return;

    // In production you would do:
    //   const es = new EventSource('/api/events/properties');
    //   es.onmessage = (e) => handleEvent(JSON.parse(e.data));
    //   es.onerror = () => es.close();
    //   return () => es.close();
    //
    // For demo: simulate SSE with random events every 25–40s
    const SSE_EVENTS: SSEEvent['type'][] = ['price_update', 'new_listing', 'status_change'];
    const PROPERTY_IDS = ['prop-0001', 'prop-0005', 'prop-0012', 'prop-0021'];

    function scheduleNext() {
      const delay = 25000 + Math.random() * 15000; // 25–40 s
      intervalRef.current = setTimeout(() => {
        const type = SSE_EVENTS[Math.floor(Math.random() * SSE_EVENTS.length)];
        const propertyId = PROPERTY_IDS[Math.floor(Math.random() * PROPERTY_IDS.length)];

        handleEvent({
          type,
          propertyId,
          payload: { newPrice: 380000 + Math.round(Math.random() * 100000) },
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
