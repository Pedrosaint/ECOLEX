import { motion } from "framer-motion";
import { X, Check, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

export default function EditStudentModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
              Edit Student
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
                  <span className="text-gray-500 text-sm">No image</span>
                )}
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-4">
                <span className="text-gray-700 font-medium">
                  Upload Passport
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={triggerFileInput}
                  className="inline-flex items-center justify-center rounded-full text-sm font-medium focus-visible:outline-none  border border-gray-300 bg-white hover:bg-gray-100 h-9 px-4 py-2"
                >
                  Choose Media
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-4">
              {/* Save Button */}
              <button className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-[#4B0082] text-white cursor-pointer h-9 px-4 py-2">
                <Check className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Student's Name */}
            <div className="flex flex-col">
              <label
                htmlFor="student-name"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Student's Name
              </label>
              <input
                id="student-name"
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Surname */}
            <div className="flex flex-col">
              <label
                htmlFor="surname"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Surname
              </label>
              <input
                id="surname"
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
                >
                  <option value="">Select Campus</option>
                  <option value="main">Main Campus</option>
                  <option value="north">North Campus</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Other names */}
            <div className="flex flex-col">
              <label
                htmlFor="other-names"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Other names
              </label>
              <input
                id="other-names"
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Reg. No */}
            <div className="flex flex-col">
              <label
                htmlFor="reg-no"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Reg. No
              </label>
              <input
                id="reg-no"
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label
                htmlFor="date-of-birth"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <div className="">
                <input
                  id="date-of-birth"
                  type="date"
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
                />
              </div>
            </div>

            {/* Guardian Name */}
            <div className="flex flex-col">
              <label
                htmlFor="guardian-name"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Guardian Name
              </label>
              <input
                id="guardian-name"
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
              />
            </div>

            {/* Guardian Number */}
            <div className="flex flex-col">
              <label
                htmlFor="guardian-number"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Guardian Number
              </label>
              <input
                id="guardian-number"
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Lifestyle */}
            <div className="flex flex-col">
              <label
                htmlFor="lifestyle"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Lifestyle
              </label>
              <div className="relative">
                <select
                  id="lifestyle"
                  className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
                >
                  <option value="">Select Lifestyle</option>
                  <option value="active">Active</option>
                  <option value="sedentary">Sedentary</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Class */}
            <div className="flex flex-col">
              <label
                htmlFor="class"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Class
              </label>
              <div className="relative">
                <select
                  id="class"
                  className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
                >
                  <option value="">Select Class</option>
                  <option value="grade1">Grade 1</option>
                  <option value="grade2">Grade 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
















// import { motion } from "framer-motion";
// import { X, Check } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";
// import { useEditStudentMutation } from "../api/student.api";

// export default function EditStaffModal({
//   onClose,
//   studentId,
//   initialData,
// }: {
//   onClose: () => void;
//   studentId: number;
//   initialData?: any;
// }) {
//   const [editStudent, { isLoading }] = useEditStudentMutation();

//   const [form, setForm] = useState({
//     name: initialData?.name || "",
//     surname: initialData?.surname || "",
//     otherNames: initialData?.otherNames || "",
//     gender: initialData?.gender || "",
//     campusId: initialData?.campusId || "",
//     classId: initialData?.classId || "",
//     email: initialData?.email || "",
//     session: initialData?.session || "",
//     guardianNumber: initialData?.guardianNumber || "",
//     guardianName: initialData?.guardianName || "",
//     dateOfBirth: initialData?.dateOfBirth || "",
//     lifestyle: initialData?.lifestyle || "",
//     classGroupId: initialData?.classGroupId || "",
//   });

//  const handleChange = (
//    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//  ) => {
//    const { name, value } = e.target;

//    // Convert numeric fields
//    if (["campusId", "classId", "classGroupId"].includes(name)) {
//      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
//    } else {
//      setForm({ ...form, [name]: value });
//    }
//  };


//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         ...form,
//         dateOfBirth: form.dateOfBirth
//           ? new Date(form.dateOfBirth).toISOString()
//           : null,
//         classId: Number(form.classId),
//         classGroupId: Number(form.classGroupId),
//       };

//       await editStudent({
//         id: studentId,
//         payload,
//       }).unwrap();

//       toast.success("Student details updated successfully!");
//       onClose();
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to update student.");
//     }
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
//             <h2 className="text-2xl font-medium text-gray-900">
//               Edit Student Details
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

//           {/* Save Button */}
//           <div className="flex justify-end mt-6">
//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#4B0082] text-white cursor-pointer h-10 px-6 py-2 disabled:opacity-50"
//             >
//               <Check className="h-4 w-4 mr-2" />
//               {isLoading ? "Saving..." : "Save"}
//             </button>
//           </div>

//           {/* Form Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//             {/* Name */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="name"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 First Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Surname */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="surname"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Surname
//               </label>
//               <input
//                 id="surname"
//                 name="surname"
//                 value={form.surname}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Other Names */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="otherNames"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Other Names
//               </label>
//               <input
//                 id="otherNames"
//                 name="otherNames"
//                 value={form.otherNames}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Gender */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="gender"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Gender
//               </label>
//               <select
//                 id="gender"
//                 name="gender"
//                 value={form.gender}
//                 onChange={handleChange}
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>

//             {/* Campus */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="campusId"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Campus
//               </label>
//               <input
//                 id="campusId"
//                 name="campusId"
//                 value={form.campusId}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Class */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="classId"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Class
//               </label>
//               <input
//                 id="classId"
//                 name="classId"
//                 value={form.classId}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Group */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="groupId"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Group
//               </label>
//               <input
//                 id="gclassGroupId"
//                 name="gclassGroupId"
//                 value={form.classGroupId}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 type="email"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Session */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="session"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Session
//               </label>
//               <input
//                 id="session"
//                 name="session"
//                 value={form.session}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Guardian Number */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="guardianNumber"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Guardian Number
//               </label>
//               <input
//                 id="guardianNumber"
//                 name="guardianNumber"
//                 value={form.guardianNumber}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Date of Birth */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="dateOfBirth"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Date of Birth
//               </label>
//               <input
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 value={form.dateOfBirth}
//                 onChange={handleChange}
//                 type="date"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Lifestyle */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="lifestyle"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Lifestyle
//               </label>
//               <input
//                 id="lifestyle"
//                 name="lifestyle"
//                 value={form.lifestyle}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>

//             {/* Class Group ID */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="classGroupId"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Class Group ID
//               </label>
//               <input
//                 id="classGroupId"
//                 name="classGroupId"
//                 value={form.classGroupId}
//                 onChange={handleChange}
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
