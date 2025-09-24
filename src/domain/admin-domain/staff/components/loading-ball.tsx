
const LoadingBall = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex space-x-1">
            <div className="h-3 w-3 bg-[#4B0082] rounded-full animate-bounce"></div>
            <div
              className="h-3 w-3 bg-[#4B0082] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="h-3 w-3 bg-[#4B0082] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p className="text-gray-600">Loading staff info...</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingBall
