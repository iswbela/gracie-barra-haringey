export function ProductCardSkeleton() {
  return (
    <div className="block">
      <div
        className="rounded-2xl skeleton-shimmer"
        style={{ aspectRatio: "2/3" }}
      />
      <div className="mt-3 px-1 space-y-2">
        <div className="h-4 rounded skeleton-shimmer w-3/4" />
        <div className="h-4 rounded skeleton-shimmer w-1/3" />
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-5 w-7 rounded skeleton-shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}
