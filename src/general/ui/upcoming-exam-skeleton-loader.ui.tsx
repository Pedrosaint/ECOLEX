export default function UpcomingExamsSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Table Header Skeleton */}
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-[#FAF7FC] bg-[#FAF7FC] px-4 rounded-t-2xl">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded ml-auto" />
        </div>
        {/* Table Rows Skeleton */}
        <div className="divide-y divide-gray-200 px-4">
          {[...Array(5)].map(
            (
              _,
              index // Render 5 skeleton rows
            ) => (
              <div key={index} className="grid grid-cols-3 gap-4 py-4">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-1/4 bg-gray-200 rounded ml-auto" />
              </div>
            )
          )}
        </div>
        {/* Add New Button Skeleton */}
        <div className="py-2 px-3">
          <div className="h-9 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
