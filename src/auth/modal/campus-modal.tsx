// import { X } from "lucide-react";

// const CampusModal = () => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
//       <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto relative">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h2 className="text-3xl font-semibold text-gray-800">Campus</h2>
//             <p className="text-sm text-gray-500">Number of campuses inputted</p>
//           </div>
//           <button className="text-gray-800 border border-gray-100 shadow-lg rounded-full text-2xl p-1 cursor-pointer">
//             <X />
//           </button>
//         </div>

//         {/* Form Content */}
//         <div className="grid grid-cols-2 gap-6 mb-8">
//           {/* Left Column */}
//           <div className="space-y-6 pt-10 border border-gray-100 shadow-lg rounded-2xl p-4">
//             <div className="main">
//               <div className="flex items-center relative">
//                 <input
//                   type="name"
//                   name="name"
//                   id="name"
//                   required
//                   placeholder=""
//                 />
//                 <label className="block text-sm font-medium mb-1">
//                   Campus Name
//                 </label>
//               </div>
//             </div>

//             <div className="main">
//               <div className="flex items-center relative">
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   required
//                   placeholder=""
//                 />
//                 <label className="block text-sm font-medium mb-1">
//                   Email Address
//                 </label>
//               </div>
//             </div>

//             <div className="main">
//               <div className="flex items-center relative">
//                 <input type="tel" name="tel" id="tel" required placeholder="" />
//                 <label className="block text-sm font-medium mb-1">
//                   Phone Number
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6 pt-10 border border-gray-100 shadow-lg rounded-2xl p-4">
//             <div className="main">
//               <div className="flex items-center relative">
//                 <input
//                   type="name"
//                   name="name"
//                   id="name"
//                   required
//                   placeholder=""
//                 />
//                 <label className="block text-sm font-medium mb-1">
//                   Campus Name
//                 </label>
//               </div>
//             </div>

//             <div className="main">
//               <div className="flex items-center relative">
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   required
//                   placeholder=""
//                 />
//                 <label className="block text-sm font-medium mb-1">
//                   Email Address
//                 </label>
//               </div>
//             </div>

//             <div className="main">
//               <div className="flex items-center relative">
//                 <input type="tel" name="tel" id="tel" required placeholder="" />
//                 <label className="block text-sm font-medium mb-1">
//                   Phone Number
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Next Button */}
//         <div className="flex justify-center">
//           <button className="w-1/3 py-3.5 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampusModal;






import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CampusModalProps {
  campusCount: number;
  onClose?: () => void;
}

const CampusModal = ({ campusCount, onClose }: CampusModalProps) => {
  const navigate = useNavigate();
  // Create an array with length equal to campusCount
  const campuses = Array.from({ length: campusCount }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">Campus</h2>
            <p className="text-sm text-gray-500">
              ({campusCount}) Number of
              {campusCount === 1 ? "campus" : "campuses"} inputted
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-800 border border-gray-100 shadow-lg rounded-full text-2xl p-1 cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Generate forms based on campusCount */}
          {campuses.map((campusNumber) => (
            <div
              key={campusNumber}
              className="space-y-6 py-4 border border-gray-100 shadow-lg rounded-2xl px-4"
            >
              <h3 className="text-lg font-medium text-gray-700">
                Campus {campusNumber}
              </h3>
              <div className="main">
                <div className="flex items-center relative">
                  <input
                    type="name"
                    name={`name-${campusNumber}`}
                    id={`name-${campusNumber}`}
                    required
                    placeholder=""
                  />
                  <label className="block text-sm font-medium mb-1">
                    Campus Name
                  </label>
                </div>
              </div>

              <div className="main">
                <div className="flex items-center relative">
                  <input
                    type="email"
                    name={`email-${campusNumber}`}
                    id={`email-${campusNumber}`}
                    required
                    placeholder=""
                  />
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="main">
                <div className="flex items-center relative">
                  <input
                    type="tel"
                    name={`tel-${campusNumber}`}
                    id={`tel-${campusNumber}`}
                    required
                    placeholder=""
                  />
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <div
          onClick={() => navigate("/auth/customize-school-name")}
          className="flex justify-center"
        >
          <button className="w-1/3 py-3.5 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampusModal;