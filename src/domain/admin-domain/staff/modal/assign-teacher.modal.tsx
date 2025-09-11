// import { motion } from "framer-motion";
// import { X, Check, ChevronDown } from "lucide-react";
// import { useState, useRef } from "react";

// export default function AssignStaffModal({
//   onClose,
// }: {
//   onClose: () => void;
// }) {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         if (event.target?.result) {
//           setSelectedImage(event.target.result as string);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.2 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-md bg-opacity-50 z-50 p-3 overflow-y-auto"
//     >
//       <div className="flex justify-center items-center min-h-full">
//         <div className="relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 my-8">
//           {/* Header */}
//           <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
//             <h2 className="text-2xl font-medium font-inter text-gray-900">
//               Assign Teacher to a Class
//             </h2>
//             <button
//               className="p-2 cursor-pointer transition-colors"
//               onClick={onClose}
//             >
//               <X
//                 size={25}
//                 className="text-gray-500 border border-gray-300 rounded-full p-1 shadow-md"
//               />
//             </button>
//           </div>

//           {/* Profile Upload Section */}
//           <div className="flex gap-6 mb-8">
//             <div className="">
//               <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                 {selectedImage ? (
//                   <img
//                     src={selectedImage}
//                     alt="Passport"
//                     className="w-full h-full object-cover border-2 border-gray-300"
//                   />
//                 ) : (
//                   <span className="text-gray-500 text-sm">No image</span>
//                 )}
//               </div>
//               <div className="flex flex-col items-start mt-3">
//                 <span className="text-gray-700 font-medium mb-2">
//                   Upload Passport
//                 </span>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageUpload}
//                   accept="image/*"
//                   className="hidden"
//                 />
//                 <button
//                   onClick={triggerFileInput}
//                   className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 h-9 px-4 py-2"
//                 >
//                   Choose Media
//                 </button>
//               </div>
//             </div>
//             {/* Save Button */}
//             <button className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-[#4B0082] text-white cursor-pointer h-9 px-4 py-2">
//               <Check className="h-4 w-4 mr-2" />
//               Save
//             </button>
//           </div>

//           {/* Form Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//             {/* Student's Name */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Staff's Name
//               </label>
//               <input
//                 id="student-name"
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
//               />
//             </div>

//             {/* Campus */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="campus"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Campus
//               </label>
//               <div className="relative">
//                 <select
//                   id="campus"
//                   className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pr-8"
//                 >
//                   <option value="">Select Campus</option>
//                   <option value="main">Main Campus</option>
//                   <option value="north">North Campus</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Date */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Date Employed
//               </label>
//               <input
//                 id="date"
//                 type="date"
//                 className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
//               />
//             </div>

//             {/* Payroll */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="other-names"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Payroll
//               </label>
//               <input
//                 id="other-names"
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
//               />
//             </div>

//             {/* Class */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="campus"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Class
//               </label>
//               <div className="relative">
//                 <select
//                   id="campus"
//                   className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
//                 >
//                   <option value="">Select Class</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Subject */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Subject
//               </label>
//               <input
//                 id="subject"
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
//               />
//             </div>

//             {/* Address */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Address
//               </label>
//               <div className="">
//                 <input
//                   id="address"
//                   type="text"
//                   className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Number */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Number
//               </label>
//               <input
//                 id="number"
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
//               />
//             </div>

//             {/* Duty */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Duty
//               </label>
//               <div className="relative">
//                 <select className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pr-8"></select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }




import { motion } from "framer-motion";
import { X, Check, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

export default function AssignStaffModal({ onClose }: { onClose: () => void }) {
  const [subjects, setSubjects] = useState([{ subject: "" }]);
  const [classes, setClasses] = useState([""]);

  const addSubject = () => {
    setSubjects([...subjects, { subject: "" }]);
  };

  const removeSubject = (index: number) => {
    if (subjects.length > 1) {
      const newSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(newSubjects);
    }
  };

  const addClass = () => {
    setClasses([...classes, ""]);
  };

  const removeClass = (index: number) => {
    if (classes.length > 1) {
      const newClasses = classes.filter((_, i) => i !== index);
      setClasses(newClasses);
    }
  };

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
              Assign Teacher to a Class
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

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Staff's Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Staff's Name
              </label>
              <input
                type="text"
                defaultValue="James Eunice"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
              />
            </div>

            {/* Campus */}
            <div className="flex flex-col">
              <label
                htmlFor="campus"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Campus
              </label>
              <div className="relative">
                <select
                  id="campus"
                  className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pr-8"
                >
                  <option value="campus1">Campus 1</option>
                  <option value="campus2">Campus 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Subjects Section - Full width */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Subjects
              </h3>

              <div className="space-y-4">
                {subjects.map((item, index) => (
                  <div key={index} className="flex items-end gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Subject {index + 1}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mathematics"
                        value={item.subject}
                        onChange={(e) => {
                          const newSubjects = [...subjects];
                          newSubjects[index].subject = e.target.value;
                          setSubjects(newSubjects);
                        }}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
                      />
                    </div>

                    {subjects.length > 1 && (
                      <button
                        onClick={() => removeSubject(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors mb-1"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={addSubject}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2 mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Subject
                </button>
              </div>
            </div>

            {/* Classes Section - Full width */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Classes
              </h3>

              <div className="space-y-4">
                {classes.map((classItem, index) => (
                  <div key={index} className="flex items-end gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Class {index + 1}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. JSS 1A"
                        value={classItem}
                        onChange={(e) => {
                          const newClasses = [...classes];
                          newClasses[index] = e.target.value;
                          setClasses(newClasses);
                        }}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
                      />
                    </div>

                    {classes.length > 1 && (
                      <button
                        onClick={() => removeClass(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors mb-1"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={addClass}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none border border-gray-300 bg-white hover:bg-gray-100 h-10 px-4 py-2 mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Class
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-[#4B0082] text-white cursor-pointer h-10 px-6 py-2">
              <Check className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}