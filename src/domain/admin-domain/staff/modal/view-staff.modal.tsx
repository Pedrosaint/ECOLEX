import { motion } from "framer-motion";
import { X, } from "lucide-react";
import { useState } from "react";

export default function ViewStaffModal({
  onClose,
}: {
  onClose: () => void;
  onEdit: () => void;
}) {
  const [selectedImage] = useState<string | null>(null);

  const staffData = [
    { label: "Staff's Name", value: "Mrs. Linda Osei" },
    { label: "Campus", value: "Main Campus" },
    { label: "Date Employed", value: "2014-06-01" },
    { label: "Payroll", value: "#90,000" },
    { label: "Class", value: "Ss1" },
    { label: "Subject", value: "English" },
    { label: "Address", value: "N0 5 adama street, fct." },
    { label: "Number", value: "09044523114" },
    { label: "Duty", value: "Cleaners" },

   
  ];

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

          {/* Profile Section */}
          <div className="flex justify-between md:items-center gap-6 mb-8">
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

            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-4">
              {/* <button
                onClick={onEdit}
                className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-gray-200 text-black cursor-pointer h-9 px-4 py-2"
              >
                <Check className="h-4 w-4 mr-2" />
                Edit
              </button> */}
            </div>
          </div>

          {/* Staff Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {staffData.map((staff, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {staff.label}
                </label>
                <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                  {staff.label.includes("Date")
                    ? new Date(staff.value).toLocaleDateString()
                    : staff.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
