"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/uiStore";

export function RecentlyViewedTracker({ productId }: { productId: number }) {
  const addRecentlyViewed = useUiStore((s) => s.addRecentlyViewed);

  useEffect(() => {
    addRecentlyViewed(productId);
  }, [productId, addRecentlyViewed]);

  return null;
}
