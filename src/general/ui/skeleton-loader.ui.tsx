export function StatsCardSkeleton() {
  return (
    <div className="rounded-3xl py-5 px-3 relative font-sans bg-gray-200 animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
      </div>
      <div className="h-6 w-20 bg-gray-300 rounded"></div>
    </div>
  );
}
