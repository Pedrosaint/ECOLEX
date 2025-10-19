import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useGetStaffQuery } from "../../staff/api/staff-api";
import LoadingBall from "../components/loading-ball";
import { IoMdRefresh } from "react-icons/io";

export default function ViewStaffModal({
  onClose,
  staffId,
}: {
  onClose: () => void;
  onEdit: () => void;
  staffId: number;
}) {
  // const [selectedImage] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useGetStaffQuery({ id: staffId });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 z-50 p-3 overflow-y-auto"
    >
      <div className="flex justify-center items-center min-h-full">
        <div className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 my-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
            <h2 className="text-2xl font-medium text-gray-900">
              Staff Details
            </h2>
            <button
              className="p-2 cursor-pointer transition-colors"
              onClick={onClose}
            >
              <X
                size={25}
                className="text-gray-500 border border-gray-300 rounded-full p-1 shadow-md"
              />
            </button>
          </div>

          {/* Loading / Error States */}
          {isLoading && <LoadingBall title="Loading staff info..." />}
          {/* {error && (
            <p className="text-red-500">
              Failed to load staff details{" "}
              <button
                onClick={() => refetch()}
                className="ml-2 text-red-500 underline"
              >
                <IoMdRefresh size={20} className="animate-spin" />
              </button>
            </p>
          )} */}
          {error && (
            <div className="text-center mt-4">
              <p className="text-red-500 mb-2">Failed to load staff details</p>
              <button
                onClick={() => refetch()}
                className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <IoMdRefresh size={20} className="animate-spin" />
                Try Again
              </button>
            </div>
          )}

          {/* Profile Section */}
          {data && (
            <>
              {/* <div className="flex justify-between md:items-center gap-6 mb-8">
                <div>
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Staff"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">No Image</span>
                    )}
                  </div>
                  <div className="text-center text-sm mt-2">Passport</div>
                </div>
              </div> */}

              {/* Staff Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Staff's Name
                  </label>
                  <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {data.staff.name}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Reg No
                  </label>
                  <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {data.staff.registrationNumber}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Campus
                  </label>
                  <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {data.staff.campus.name}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Date Employed
                  </label>
                  <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {data.staff.dateEmployed}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Payroll
                  </label>
                  <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {data.staff.payroll}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {data.staff.address}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Next of Kin
                  </label>
                  <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {data.staff.nextOfKin}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Duty
                  </label>
                  <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {data.staff.duty}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Number
                  </label>
                  <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {data.staff.phoneNumber}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
