import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useState } from "react";


export default function ViewStudentFormModal({
  onClose,
  onEdit,
}: {
  onClose: () => void;
  onEdit: () => void;
}) {
  const [selectedImage] = useState<string | null>(null);
 
const students = [
  {
    id: 1,
    name: "John",
    surName: "Smith",
    campus: "Main Campus",
    dateOfBirth: "2005-05-15",
    regNo: "STU001",
    guadianName: "John Smith",
    class: "JSS1",
    otherNames: "John",
    gender: "Male",
    lifeStyle: "Boarder",
    guadianNumber: "09012345678",
  },
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
            <h2 className="text-2xl font-medium font-inter text-gray-900">
              Student’s Detail
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

          {/* Profile Upload Section */}
          <div className="flex justify-between md:items-center gap-6 mb-8">
            <div>
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Passport"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-500 text-sm">No image</div>
                )}
              </div>
              <div className="flex justify-center">
                <h1>Passport</h1>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-4">
              {/* Save Button */}
              <button
                onClick={onEdit}
                className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-gray-200 text-black cursor-pointer h-9 px-4 py-2"
              >
                <Check className="h-4 w-4 mr-2" />
                Edit
              </button>
            </div>
          </div>

          {/* Form Grid */}
          <div className="gap-y-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 space-y-5"
              >
                <div className="">
                  <label className="font-medium text-gray-600">Reg. No</label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.regNo}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">
                    Studen Name
                  </label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.name}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">Surname</label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.surName}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">Campus</label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.campus}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">
                    Other names
                  </label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.otherNames}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">
                    Date of Birth
                  </label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.dateOfBirth
                      ? new Date(student.dateOfBirth).toLocaleDateString()
                      : "No date"}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">Gender</label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.gender}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">Class</label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.class}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">
                    Guardian Name
                  </label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.guadianName}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">
                    Guardian Number
                  </label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.guadianNumber}
                  </div>
                </div>

                <div className="">
                  <label className="font-medium text-gray-600">Lifestyle</label>
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                    {student.lifeStyle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
