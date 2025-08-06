const newsItems = [
  "All Teachers are to converge at the principal's office after the Assembly",
  "Mid-Term break begins next week Wednesday",
  "SS3 students should submit their WAEC registration forms before Friday",
  "The school will hold its inter-house sports next month",
  "Parents are reminded to pay outstanding school fees before the PTA meeting",
];

const LatestNewFeed = () => {
  return (
    <div className="w-full">
      <div className="bg-[#D9D9D9] p-5 h-full">
        <h1 className="text-2xl font-medium text-gray-900">Latest News Feed</h1>

        <div className="mt-2 space-y-2">
          {newsItems.map((news, index) => (
            <div
              key={index}
              className="bg-white border-b border-[#D1D1D1] p-2 rounded shadow-sm"
            >
              <ul className="flex gap-2 items-center list-disc pl-5 space-y-2">
                <li className="text-sm font-medium text-gray-700">
                  {news}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNewFeed;
