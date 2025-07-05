import { X } from "lucide-react";

const CampusModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">Campus</h2>
            <p className="text-sm text-gray-500">Number of campuses inputted</p>
          </div>
          <button className="text-gray-800 border border-gray-100 shadow-lg rounded-full text-2xl p-1 cursor-pointer">
            <X />
          </button>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-4 border border-gray-100 shadow-lg rounded-lg p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Campus name
              </label>
              <input
                type="text"
                placeholder="Mercy model college"
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Mercymodelcollege@gmail.com"
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Mercymodelcollege@gmail.com"
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 border border-gray-100 shadow-lg rounded-lg p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Campus name
              </label>
              <input
                type="text"
                placeholder="Mercy model college"
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Mercymodelcollege@gmail.com"
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Mercymodelcollege@gmail.com"
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm outline-none"
              />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          <button className="w-1/3 py-3.5 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampusModal;
