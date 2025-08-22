import { CgDanger } from "react-icons/cg";

const ComputeResult = () => {
  return (
    <div className="">
      <div className="bg-[#D9D9D9] p-4 text-sm md:text-lg font-inter font-semibold shadow-sm">
        <h1>Compute Result</h1>
      </div>
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="flex gap-2 text-sm md:text-lg items-center border-b border-gray-200 px-4 py-3">
          <CgDanger size={25} />
          <h1>
            You can only compute result for classes and subjects assigned to you
          </h1>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Academic Session
              </label>
              <div className="relative">
                <select className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none pr-10"></select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Term
              </label>
              <div className="relative">
                <select className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none pr-10"></select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Class
              </label>
              <div className="relative">
                <select className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none pr-10"></select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Group
              </label>
              <div className="relative">
                <select className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none pr-10"></select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Subject
              </label>
              <div className="relative">
                <select className="w-full px-4 py-4 border border-gray-300 rounded text-sm text-gray-400 appearance-none focus:outline-none pr-10"></select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#8000BD] px-6 py-3 w-full max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-transparent text-white font-semibold outline-none placeholder-white"
              >
                FILTER RECORD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputeResult;
