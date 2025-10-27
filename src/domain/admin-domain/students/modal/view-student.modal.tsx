import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useGetStudentQuery } from "../api/student.api";
import LoadingBall from "../../staff/components/loading-ball";


interface ViewStudentFormModalProps {
  onClose: () => void;
  onEdit: () => void;
  studentId: number;
}

export default function ViewStudentFormModal({
  onClose,
  onEdit,
  studentId,
}: ViewStudentFormModalProps) {
  // const [selectedImage] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetStudentQuery({ id: studentId });


    if (isLoading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex justify-center items-center"
        >
          <LoadingBall title="Loading student details..." />
        </motion.div>
      );
    }


  // Handle error state
  if (isError || !data?.data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex justify-center items-center"
      >
        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="text-red-500">Failed to load student details.</p>
          <button
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    );
  }

  const student = data.data;

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

          {/* Profile Section */}
          <div className="flexjustify-end md:items-center gap-6 mb-8">
            {/* <div>
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
            </div> */}

            <div className="flex flex-col justify-end md:flex-row  md:items-center gap-2 mt-4">
              <button
                onClick={onEdit}
                className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-gray-200 text-black cursor-pointer h-9 px-4 py-2"
              >
                <Check className="h-4 w-4 mr-2" />
                Edit
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <Detail label="Reg. No" value={student.registrationNumber} />
            <Detail label="Student Name" value={student.name} />
            <Detail label="Surname" value={student.surname} />
            <Detail label="Campus" value={student.campus.name} />
            <Detail label="Other Names" value={student.otherNames} />
            <Detail label="Email" value={student.email} />
            <Detail
              label="Date of Birth"
              value={
                student.dateOfBirth
                  ? new Date(student.dateOfBirth).toLocaleDateString()
                  : "No date"
              }
            />
            <Detail label="Gender" value={student.gender} />
            <Detail label="Class" value={student.class?.name} />
            <Detail label="Class Group" value={student.classGroup?.name} />
            <Detail label="Guardian Name" value={student.guardianName} />
            <Detail label="Guardian Number" value={student.guardianNumber} />
            <Detail label="Lifestyle" value={student.lifestyle} />
            <Detail label="Session" value={student.session} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ✅ Small reusable component for each detail field
function Detail({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div>
      <label className="font-medium text-gray-600">{label}</label>
      <div className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
        {value ?? "N/A"}
      </div>
    </div>
  );
}
