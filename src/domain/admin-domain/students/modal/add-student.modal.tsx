/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { X, Check, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCreateStudentMutation } from "../api/student.api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { useGetClassesQuery } from "../../classes/api/class-api";

interface DropdownOption {
  value: string;
  label: string;
}

export default function AddStudentFormModal({
  onClose,
}: {
  onClose: () => void;
}) {
  // Dropdown state management
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isCampusOpen, setIsCampusOpen] = useState(false);

  const campusRef = useRef<HTMLDivElement>(null);
  const classRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    otherNames: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    guardianName: "",
    guardianNumber: "",
    campusId: "",
    classId: "",
    lifestyle: "",
    session: "",
  });

  // 🔹 API hooks
  const { data: campusData } = useGetCampusQuery();
  const { data: classData } = useGetClassesQuery();
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  // 🔹 Filter classes based on selected campus
  const filteredClasses = classData?.classes?.filter(
    (cls: any) =>
      !formData.campusId || cls.campusId === Number(formData.campusId)
  );

  // 🔹 Dropdown options
  const campusOptions: DropdownOption[] = [
    { value: "", label: "Select Campus" },
    ...(campusData?.campuses?.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  const classOptions: DropdownOption[] = [
    { value: "", label: "Select Class" },
    ...(filteredClasses?.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })) || []),
  ];

  // 🔹 Helpers
  const getSelectedLabel = (
    value: string,
    options: DropdownOption[]
  ): string => {
    if (!options || options.length === 0) return "";
    const found = options.find((option) => option.value === value);
    return found ? found.label : options[0].label;
  };

  // 🔹 Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Submit form
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        classId: Number(formData.classId),
        campusId: Number(formData.campusId),
      };

      await createStudent(payload).unwrap();
      toast.success("Student created successfully!");
      onClose();

      setFormData({
        surname: "",
        name: "",
        otherNames: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        guardianName: "",
        guardianNumber: "",
        campusId: "",
        classId: "",
        lifestyle: "",
        session: "",
      });
    } catch (error) {
      toast.error("Failed to create student!");
      console.error("Error creating student:", error);
    }
  };

  // Reusable dropdown component
  const Dropdown = ({
    label,
    isOpen,
    setIsOpen,
    options,
    selectedValue,
    onSelect,
    disabled,
  }: {
    label: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    options: DropdownOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
    disabled?: boolean;
  }) => (
    <div className="flex flex-col">
      <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between disabled:opacity-50"
        >
          {getSelectedLabel(selectedValue, options)}
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
                  selectedValue === option.value
                    ? "bg-gray-100 font-medium"
                    : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ==========================================================
  // ======================== UI ==============================
  // ==========================================================

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 p-3 overflow-y-auto"
    >
      <div className="flex justify-center items-center min-h-full">
        <div className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 my-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
            <h2 className="text-2xl font-medium text-gray-900">
              Register New Student
            </h2>
            <button className="p-2" onClick={onClose}>
              <X
                size={25}
                className="text-gray-500 border border-gray-300 rounded-full p-1 shadow-md"
              />
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-h-[60vh] overflow-y-auto pr-2">
            {/* Text Inputs */}
            {[
              { id: "surname", label: "Surname", type: "text" },
              { id: "name", label: "First Name", type: "text" },
              { id: "otherNames", label: "Other Names", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "guardianName", label: "Guardian Name", type: "text" },
              { id: "guardianNumber", label: "Guardian Number", type: "tel" },
            ].map(({ id, label, type }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  id={id}
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  type={type}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {/* Gender */}
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm font-medium mb-1">
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>              
                </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label htmlFor="dateOfBirth" className="text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                type="date"
                className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
              />
            </div>

            {/* Campus Dropdown */}
            <div ref={campusRef}>
              <Dropdown
                label="Campus"
                isOpen={isCampusOpen}
                setIsOpen={setIsCampusOpen}
                options={campusOptions}
                selectedValue={formData.campusId}
                onSelect={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    campusId: value,
                    classId: "", // reset class when campus changes
                  }))
                }
              />
            </div>

            {/* Class Dropdown */}
            <div ref={classRef}>
              <Dropdown
                label="Class"
                isOpen={isClassOpen}
                setIsOpen={setIsClassOpen}
                options={classOptions}
                selectedValue={formData.classId}
                onSelect={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    classId: value,
                  }))
                }
                disabled={!formData.campusId}
              />
            </div>

            {/* Lifestyle */}
            <div className="flex flex-col">
              <label htmlFor="lifestyle" className="text-sm font-medium mb-1">
                Lifestyle
              </label>
              <select
                id="lifestyle"
                value={formData.lifestyle}
                onChange={handleChange}
                className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
              >
                <option value="">Select Lifestyle</option>
                <option value="day">Day Student</option>
                <option value="boarding">Boarding Student</option>
              </select>
            </div>

            {/* Session */}
            <div className="flex flex-col">
              <label htmlFor="session" className="text-sm font-medium mb-1">
                Session
              </label>
              <select
                id="session"
                value={formData.session}
                onChange={handleChange}
                className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
              >
                <option value="">Select Session</option>
                {["2023/2024", "2024/2025", "2025/2026", "2026/2027"].map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="inline-flex items-center justify-center cursor-pointer rounded-md text-sm font-medium bg-[#4B0082] text-white h-10 px-6 py-2 disabled:opacity-50 hover:bg-[#3a0066] transition-colors"
            >
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Student"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


























// import { motion } from "framer-motion";
// import { X, Check, ChevronDown } from "lucide-react";
// import { useRef, useState } from "react";
// import { toast } from "sonner";
// import { useCreateStudentMutation } from "../api/student.api";
// import { useGetCampusQuery } from "../../campus/api/campus.api";
// import { useGetClassesQuery } from "../../classes/api/class-api";

// interface DropdownOption {
//   value: string;
//   label: string;
// }

// export default function AddStudentFormModal({
//   onClose,
// }: {
//   onClose: () => void;
// }) {
//   const [isClassOpen, setIsClassOpen] = useState(false);
//   const [isCampusOpen, setIsCampusOpen] = useState(false);

//   const classRef = useRef<HTMLDivElement>(null);
//   const campusRef = useRef<HTMLDivElement>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     campusId: "",
//     classId: "",
//     surname: "",
//     otherNames: "",
//     gender: "",
//     dateOfBirth: "",
//     guardianName: "",
//     guardianNumber: "",
//     lifestyle: "",
//     session: "",
//   });

//   const { data: classData } = useGetClassesQuery();
//   const [createStudent, { isLoading }] = useCreateStudentMutation();
//   const { data: campusData } = useGetCampusQuery();

//   const campusOptions: DropdownOption[] = [
//     { value: "", label: "Select Campus" },
//     ...(campusData?.campuses?.map((c: any) => ({
//       value: String(c.id),
//       label: c.name,
//     })) || []),
//   ];

//    const classOptions: DropdownOption[] = [
//      { value: "", label: "Select Class" },
//      ...(classData?.classes?.map((c: any) => ({
//        value: String(c.id),
//        label: c.name,
//      })) || []),
//    ];

//    const getSelectedLabel = (
//      value: string,
//      options: DropdownOption[]
//    ): string => {
//      if (!options || options.length === 0) return "";
//      const found = options.find((option) => option.value === value);
//      return found ? found.label : options[0].label;
//    };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   // Handle Save (API call)
//   const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         classId: Number(formData.classId),
//         campusId: Number(formData.campusId),
//       };

//       const response = await createStudent(payload).unwrap();
//       toast.success("Student created successfully!");
//       console.log("Student created:", response);

//       setFormData({
//         name: "",
//         email: "",
//         classId: "",
//         campusId: "",
//         surname: "",
//         otherNames: "",
//         gender: "",
//         dateOfBirth: "",
//         guardianName: "",
//         guardianNumber: "",
//         lifestyle: "",
//         session: "",
//       });

//       onClose();
//     } catch (error) {
//       toast.error("Failed to create student!");
//       console.error(" Failed to create student:", error);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.2 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 p-3 overflow-y-auto"
//     >
//       <div className="flex justify-center items-center min-h-full">
//         <div className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 my-8">
//           {/* Header */}
//           <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
//             <h2 className="text-2xl font-medium text-gray-900">
//               Register New Student
//             </h2>
//             <button className="p-2 cursor-pointer" onClick={onClose}>
//               <X
//                 size={25}
//                 className="text-gray-500 border border-gray-300 rounded-full p-1 shadow-md"
//               />
//             </button>
//           </div>

//           {/* Save Button */}
//           <div className="flex justify-end mt-8">
//             <button
//               onClick={handleSave}
//               disabled={isLoading}
//               className="inline-flex items-center justify-center cursor-pointer rounded-md text-sm font-medium bg-[#4B0082] text-white h-10 px-6 py-2 disabled:opacity-50 hover:bg-[#3a0066] transition-colors"
//             >
//               <Check className="h-4 w-4 mr-2" />
//               {isLoading ? "Saving..." : "Save Student"}
//             </button>
//           </div>

//           {/* Form */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-h-[60vh] overflow-y-auto pr-2">
//             {/* Surname */}
//             <div className="flex flex-col">
//               <label htmlFor="surname" className="text-sm font-medium mb-1">
//                 Surname
//               </label>
//               <input
//                 id="surname"
//                 value={formData.surname}
//                 onChange={handleChange}
//                 type="text"
//                 className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
//                 placeholder="Enter surname"
//               />
//             </div>

//             {/* First Name */}
//             <div className="flex flex-col">
//               <label htmlFor="name" className="text-sm font-medium mb-1">
//                 First Name
//               </label>
//               <input
//                 id="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 type="text"
//                 className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
//                 placeholder="Enter first name"
//               />
//             </div>

//             {/* Other names */}
//             <div className="flex flex-col">
//               <label htmlFor="otherNames" className="text-sm font-medium mb-1">
//                 Other names
//               </label>
//               <input
//                 id="otherNames"
//                 value={formData.otherNames}
//                 onChange={handleChange}
//                 type="text"
//                 className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
//                 placeholder="Enter other names"
//               />
//             </div>

//             {/* Gender */}
//             <div className="flex flex-col">
//               <label htmlFor="gender" className="text-sm font-medium mb-1">
//                 Gender
//               </label>
//               <div className="relative">
//                 <select
//                   id="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#4B0082] pr-8"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Date of Birth */}
//             <div className="flex flex-col">
//               <label htmlFor="dateOfBirth" className="text-sm font-medium mb-1">
//                 Date of Birth
//               </label>
//               <input
//                 id="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 type="date"
//                 className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
//               />
//             </div>

//             {/* Email */}
//             <div className="flex flex-col">
//               <label htmlFor="email" className="text-sm font-medium mb-1">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 type="email"
//                 className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
//                 placeholder="Enter email address"
//               />
//             </div>

//             {/* Guardian Name */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="guardianName"
//                 className="text-sm font-medium mb-1"
//               >
//                 Guardian Name
//               </label>
//               <input
//                 id="guardianName"
//                 value={formData.guardianName}
//                 onChange={handleChange}
//                 type="text"
//                 className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
//                 placeholder="Enter guardian's name"
//               />
//             </div>

//             {/* Guardian Number */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="guardianNumber"
//                 className="text-sm font-medium mb-1"
//               >
//                 Guardian Number
//               </label>
//               <input
//                 id="guardianNumber"
//                 value={formData.guardianNumber}
//                 onChange={handleChange}
//                 type="tel"
//                 maxLength={11}
//                 className="h-10 w-full rounded-md border px-3 py-2 text-sm outline-none border-gray-300 focus:border-[#4B0082]"
//                 placeholder="Enter guardian's phone number"
//               />
//             </div>

//             {/* Campus */}
//             <div className="flex flex-col" ref={campusRef}>
//               <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//                 Campus
//               </label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setIsCampusOpen(!isCampusOpen)}
//                   disabled={isLoading}
//                   className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm text-left focus:outline-none flex items-center justify-between disabled:opacity-50"
//                 >
//                   {getSelectedLabel(formData.campusId, campusOptions)}

//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       isCampusOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {isCampusOpen && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//                     {campusOptions.map((option) => (
//                       <div
//                         key={option.value}
//                         onClick={() => {
//                           setFormData((prev) => ({
//                             ...prev,
//                             campusId: option.value,
//                           }));
//                           setIsCampusOpen(false);
//                         }}
//                         className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
//                           formData.campusId === option.value
//                             ? "bg-gray-100 font-medium"
//                             : ""
//                         }`}
//                       >
//                         {option.label}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* <div className="flex flex-col">
//               <label htmlFor="campusId" className="text-sm font-medium mb-1">
//                 Group
//               </label>
//               <div className="relative">
//                 <select
//                   id="campusId"
//                   value={formData.groupId}
//                   onChange={handleChange}
//                   className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#4B0082] pr-8"
//                 >
//                   <option value="">Select Group</option>
//                   <option value="1"> A</option>
//                   <option value="2">B</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div> */}

//             {/* Class */}
//             <div className="flex flex-col" ref={classRef}>
//               <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
//                 Class
//               </label>
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setIsClassOpen(!isClassOpen)}
//                   disabled={isLoading}
//                   className="w-full px-3 py-3 border border-gray-300 rounded bg-white text-sm flex items-center justify-between disabled:opacity-50"
//                 >
//                   {getSelectedLabel(formData.classId, classOptions)}

//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       isClassOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//                 {isClassOpen && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//                     {classOptions.map((option) => (
//                       <div
//                         key={option.value}
//                         onClick={() => {
//                           setFormData((prev) => ({
//                             ...prev,
//                             classId: option.value,
//                           }));
//                           setIsClassOpen(false);
//                         }}
//                         className={`px-3 py-2 cursor-pointer hover:bg-[#6a00a1] hover:text-white ${
//                           formData.classId === option.value
//                             ? "bg-gray-100 font-medium"
//                             : ""
//                         }`}
//                       >
//                         {option.label}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Lifestyle */}
//             <div className="flex flex-col">
//               <label htmlFor="lifestyle" className="text-sm font-medium mb-1">
//                 Lifestyle
//               </label>
//               <div className="relative">
//                 <select
//                   id="lifestyle"
//                   value={formData.lifestyle}
//                   onChange={handleChange}
//                   className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#4B0082] pr-8"
//                 >
//                   <option value="">Select Lifestyle</option>
//                   <option value="day">Day Student</option>
//                   <option value="boarding">Boarding Student</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Session */}
//             <div className="flex flex-col">
//               <label htmlFor="session" className="text-sm font-medium mb-1">
//                 Session
//               </label>
//               <div className="relative">
//                 <select
//                   id="session"
//                   value={formData.session}
//                   onChange={handleChange}
//                   className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#4B0082] pr-8"
//                 >
//                   <option value="">Select Session</option>
//                   <option value="2023/2024">2023/2024</option>
//                   <option value="2024/2025">2024/2025</option>
//                   <option value="2025/2026">2025/2026</option>
//                   <option value="2025/2026">2026/2027</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
