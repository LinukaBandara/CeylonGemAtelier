export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-[var(--color-parchment)] animate-pulse rounded-sm ${className}`}
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="pt-28 md:pt-36 pb-24 px-6 max-w-[1440px] mx-auto">
      <Skeleton className="h-4 w-32 mb-8" />
      <Skeleton className="h-12 w-2/3 max-w-lg mb-4" />
      <Skeleton className="h-4 w-1/2 max-w-md mb-16" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton className="aspect-[4/5] mb-4" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
