import { X } from "lucide-react";
import { useState } from "react";

interface Assessment {
  title: string;
  maxScore: string;
}

interface ContinuousAssessmentModalProps {
  onClose: () => void;
  onSubmit: (assessments: Assessment[]) => void;
}

const ContinuousAssessmentModal = ({
  onClose,
  onSubmit,
}: ContinuousAssessmentModalProps) => {
  const [assessments, setAssessments] = useState<Assessment[]>([
    { title: "", maxScore: "" },
  ]);

  const handleInputChange = (
    index: number,
    field: keyof Assessment,
    value: string
  ) => {
    const updatedAssessments = [...assessments];
    updatedAssessments[index][field] = value;
    setAssessments(updatedAssessments);
  };

  const handleAddMore = () => {
    setAssessments([...assessments, { title: "", maxScore: "" }]);
  };

  const handleSubmit = () => {
    onSubmit(assessments);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Continuous Assessment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors border border-gray-100 shadow-2xl rounded-full p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
          {assessments.map((assessment, index) => (
            <div key={index} className="space-y-4 border border-gray-100 shadow-lg rounded-2xl p-4">
              {/* CA Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CA Title
                </label>
                <input
                  type="text"
                  value={assessment.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  placeholder={`e.g., ${
                    index === 0 ? "1st" : index === 1 ? "2nd" : `${index + 1}th`
                  } CA`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                />
              </div>

              {/* Max Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Score
                </label>
                <input
                  type="text"
                  value={assessment.maxScore}
                  onChange={(e) =>
                    handleInputChange(index, "maxScore", e.target.value)
                  }
                  placeholder="e.g., 20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <button
            onClick={handleAddMore}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium cursor-pointer"
          >
            Add More
          </button>
        </div>

        {/* Modal Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium cursor-pointer"
          >
            Submit
          </button>
          </div>
          </div>
      </div>
    </div>
  );
};

export default ContinuousAssessmentModal;