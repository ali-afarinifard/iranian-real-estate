"use client"
import { useEffect, useRef } from "react";

interface UseLoadMoreOptions {
  onLoadMore: () => void;
  enabled: boolean;
  root?: React.RefObject<HTMLElement>;
}

export function useLoadMore({ onLoadMore, enabled, root }: UseLoadMoreOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const rootEl = root?.current ?? null;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && enabledRef.current) {
          onLoadMore();
        }
      },
      { root: rootEl, threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore, root]);

  return sentinelRef;
}