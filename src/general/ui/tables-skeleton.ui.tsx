import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export function TableSkeleton() {
  const location = useLocation();

  const getModuleName = () => {
    const path = location.pathname.split("/")[2];
    if (!path || path === "dashboard") return null;
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const moduleName = getModuleName();
  const shouldShowHeader =
    moduleName && !["Dashboard","classes","campuses","subjects"].includes(moduleName.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Orange Header Skeleton */}

      {shouldShowHeader && (
        <div className="bg-gray-200 px-6 py-3 animate-pulse">
          <div className="flex items-center justify-center h-6">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      )}

      {/* Print Button Skeleton */}
      <div className="flex justify-end mt-10 pr-6">
        <div className="w-32 h-10 bg-gray-200 rounded-sm animate-pulse"></div>
      </div>

      <div className="mt-10 px-6">
        {/* Top Section Skeleton */}
        {shouldShowHeader && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="w-48 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Table Container Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-5"
        >
          <div className="w-48 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header Skeleton */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    {[...Array(12)].map((_, i) => (
                      <th
                        key={i}
                        className="py-3 px-2 border-r border-gray-200"
                      >
                        <div className="w-16 h-4 bg-gray-300 rounded mx-auto animate-pulse"></div>
                      </th>
                    ))}
                    <th className="py-3 px-2">
                      <div className="w-16 h-4 bg-gray-300 rounded mx-auto animate-pulse"></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Table Rows Skeleton */}
                  {[...Array(9)].map((_, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {[...Array(12)].map((_, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="py-3 px-2 border-r border-gray-200"
                        >
                          <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                      ))}
                      <td className="py-3 px-5">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Skeleton */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>

                  <div className="flex items-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gray-200 rounded animate-pulse"
                      ></div>
                    ))}
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
