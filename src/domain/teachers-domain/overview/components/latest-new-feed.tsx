import { Rocket } from "lucide-react";

const LatestNewFeed = () => {
  return (
    <div className="w-full">
      <div className="bg-[#D9D9D9] p-5">
        <h1 className="text-2xl font-medium text-gray-900">Latest News Feed</h1>
      </div>
      <div className="bg-white border border-gray-200 p-10 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]">
        <Rocket className="w-12 h-12 text-[#8000BD] opacity-40" />
        <p className="text-gray-600 font-semibold text-lg">Coming Soon</p>
        <p className="text-sm text-gray-400">The news feed feature is on its way. Check back soon!</p>
      </div>
    </div>
  );
};

export default LatestNewFeed;
