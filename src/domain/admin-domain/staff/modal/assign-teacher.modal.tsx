// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { motion } from "framer-motion";
// import { X, Check, ChevronDown } from "lucide-react";
// import { useState } from "react";
// import { useAssignTeacherMutation, useGetStaffsQuery } from "../api/staff-api";
// import { useGetCampusQuery } from "../../campus/api/campus.api";
// import { useGetClassesQuery } from "../../classes/api/class-api";
// import { useGetAllSubjectQuery } from "../../manage-subject/api/subject.api";

// interface AssignItem {
//   id: string;
//   staffId: string;
//   campusId: string;
//   classId: string;
//   subjectId: string;
// }

// export default function AssignStaffModal({ onClose }: { onClose: () => void }) {
//   // 🔹 Fetch dropdown data
//   const { data: staffData } = useGetStaffsQuery();
//   const { data: campusData } = useGetCampusQuery();
//   const { data: classData } = useGetClassesQuery();
//   const { data: subjectData } = useGetAllSubjectQuery();

//   const [assignments, setAssignments] = useState<AssignItem[]>([]);
//   const [form, setForm] = useState({
//     staffId: "",
//     campusId: "",
//     classId: "",
//     subjectId: "",
//   });

//   const [assignTeacher, { isLoading }] = useAssignTeacherMutation();

//   // 🔹 Handle form input change
//   const handleChange = (name: string, value: string) => {
//     setForm({ ...form, [name]: value });
//   };

//   // 🔹 Handle save (assign one teacher to one class/subject)
//   const handleSave = async () => {
//     if (!form.staffId || !form.campusId || !form.classId || !form.subjectId) {
//       alert("Please select all fields before saving.");
//       return;
//     }

//     try {
//       await assignTeacher({
//         staffId: Number(form.staffId),
//         campusId: Number(form.campusId),
//         classId: Number(form.classId),
//         subjectId: Number(form.subjectId),
//       }).unwrap();

//       const newAssignment: AssignItem = {
//         id: crypto.randomUUID(),
//         ...form,
//       };

//       setAssignments([...assignments, newAssignment]);
//       setForm({ staffId: "", campusId: "", classId: "", subjectId: "" });
//     } catch (err) {
//       console.error("Error assigning teacher:", err);
//     }
//   };

//   // 🔹 Remove assignment from UI
//   const handleRemove = (id: string) => {
//     setAssignments(assignments.filter((item) => item.id !== id));
//   };

//   // 🔹 Reusable dropdown
//   const Dropdown = ({
//     label,
//     name,
//     value,
//     options,
//   }: {
//     label: string;
//     name: string;
//     value: string;
//     options: { id: string | number; name: string }[];
//   }) => (
//     <div className="flex flex-col">
//       <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
//       <div className="relative">
//         <div
//           className="flex justify-between items-center h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm cursor-pointer"
//           onClick={() => {
//             const el = document.getElementById(name);
//             el?.classList.toggle("hidden");
//           }}
//         >
//           <span>
//             {value
//               ? options.find((opt) => String(opt.id) === value)?.name
//               : `Select ${label}`}
//           </span>
//           <ChevronDown className="h-4 w-4 text-gray-500" />
//         </div>

//         <div
//           id={name}
//           className="hidden absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto"
//         >
//           {options.map((opt) => (
//             <div
//               key={opt.id}
//               onClick={() => {
//                 handleChange(name, String(opt.id));
//                 document.getElementById(name)?.classList.add("hidden");
//               }}
//               className={`px-3 py-2 text-sm hover:bg-[#4B0082] hover:text-white cursor-pointer ${
//                 value === String(opt.id)
//                   ? "bg-[#F3E8FF] text-[#4B0082] font-medium"
//                   : ""
//               }`}
//             >
//               {opt.name}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

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

//           {/* Dropdown Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Dropdown
//               label="Staff Name"
//               name="staffId"
//               value={form.staffId}
//               options={
//                 staffData?.staff?.map((staff: any) => ({
//                   id: staff.id,
//                   name: staff.name,
//                 })) || []
//               }
//             />
//             <Dropdown
//               label="Campus"
//               name="campusId"
//               value={form.campusId}
//               options={
//                 campusData?.campuses?.map((campus: any) => ({
//                   id: campus.id,
//                   name: campus.name,
//                 })) || []
//               }
//             />
//             <Dropdown
//               label="Class"
//               name="classId"
//               value={form.classId}
//               options={
//                 classData?.classes?.map((cls: any) => ({
//                   id: cls.id,
//                   name: cls.name,
//                 })) || []
//               }
//             />
//             <Dropdown
//               label="Subject"
//               name="subjectId"
//               value={form.subjectId}
//               options={
//                 subjectData?.subjects?.map((sub: any) => ({
//                   id: sub.id,
//                   name: sub.name,
//                 })) || []
//               }
//             />
//           </div>

//           {/* Save Button */}
//           <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
//             <button
//               onClick={handleSave}
//               disabled={isLoading}
//               className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-[#4B0082] text-white cursor-pointer h-10 px-6 py-2 disabled:opacity-60"
//             >
//               <Check className="h-4 w-4 mr-2" />
//               {isLoading ? "Saving..." : "Save"}
//             </button>
//           </div>

//           {/* Saved Assignments */}
//           {assignments.length > 0 && (
//             <div className="mt-8">
//               <h3 className="text-lg font-medium text-gray-900 mb-3">
//                 Assigned Teachers
//               </h3>
//               <ul className="space-y-2">
//                 {assignments.map((item) => (
//                   <li
//                     key={item.id}
//                     className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-2 text-sm"
//                   >
//                     <span>
//                       Staff ID: {item.staffId} | Class ID: {item.classId} |
//                       Subject ID: {item.subjectId}
//                     </span>
//                     <button
//                       onClick={() => handleRemove(item.id)}
//                       className="text-red-500 hover:text-red-700 transition-colors"
//                     >
//                       <X size={16} />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }












/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { X, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  useAssignTeacherMutation,
  useGetStaffsQuery,
} from "../api/staff-api";
import { useGetCampusQuery } from "../../campus/api/campus.api";
import { useGetClassesQuery } from "../../classes/api/class-api";
import { useGetAllSubjectQuery } from "../../manage-subject/api/subject.api";
import { toast } from "sonner";

interface AssignItem {
  id: string;
  staffId: string;
  // campusId: string;
  classId: string;
  subjectId: string;
}

export default function AssignStaffModal({ onClose }: { onClose: () => void }) {
  // 🔹 Fetch dropdown data
  const { data: staffData } = useGetStaffsQuery();
  const { data: campusData } = useGetCampusQuery();
  const { data: classData } = useGetClassesQuery();
  const { data: subjectData } = useGetAllSubjectQuery();

  const [assignments, setAssignments] = useState<AssignItem[]>([]);
  const [form, setForm] = useState({
    staffId: "",
    campusId: "",
    classId: "",
    subjectId: "",
  });

  const filteredClasses = classData?.classes?.filter(
    (cls: any) => !form.campusId || cls.campusId === Number(form.campusId)
  );

  const [selectedSubjects, setSelectedSubjects] = useState<any[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<any[]>([]);

  const [assignTeacher, { isLoading }] = useAssignTeacherMutation();

  // 🔹 Handle form input change
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  // 🔹 Add subjects and classes individually
  const handleAddSubject = () => {
    const selected = subjectData?.subjects?.find(
      (s: any) => String(s.id) === form.subjectId
    );
    if (selected && !selectedSubjects.find((s) => s.id === selected.id)) {
      setSelectedSubjects([...selectedSubjects, selected]);
    }
    setForm({ ...form, subjectId: "" });
  };

  const handleRemoveSubject = (id: string | number) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s.id !== id));
  };

  const handleAddClass = () => {
    const selected = classData?.classes?.find(
      (c: any) => String(c.id) === form.classId
    );
    if (selected && !selectedClasses.find((c) => c.id === selected.id)) {
      setSelectedClasses([...selectedClasses, selected]);
    }
    setForm({ ...form, classId: "" });
  };

  const handleRemoveClass = (id: string | number) => {
    setSelectedClasses(selectedClasses.filter((c) => c.id !== id));
  };

  // 🔹 Handle save (assign one teacher to one or multiple classes/subjects)
const handleSave = async () => {
  if (!form.staffId) {
    toast.warning("Please select Staff and Campus first.");
    return;
  }

  if (selectedSubjects.length === 0 || selectedClasses.length === 0) {
    toast.warning("Please add at least one subject and one class.");
    return;
  }

  try {
    for (const cls of selectedClasses) {
      for (const sub of selectedSubjects) {
        await assignTeacher({
          staffId: Number(form.staffId),
          classId: Number(cls.id),
          subjectId: Number(sub.id),
        }).unwrap();
      }
    }

    const newAssignment: AssignItem = {
      id: crypto.randomUUID(),
      ...form,
    };

    setAssignments([...assignments, newAssignment]);
    setSelectedClasses([]);
    setSelectedSubjects([]);
    setForm({ staffId: "", classId: "", subjectId: "" , campusId: "" });
    onClose();

    toast.success("Teacher assigned successfully!");
  } catch (err) {
    console.error("Error assigning teacher:", err);
    toast.error("An error occurred while assigning teacher.");
  }
};

  // 🔹 Reusable dropdown
  const Dropdown = ({
    label,
    name,
    value,
    options,
  }: {
    label: string;
    name: string;
    value: string;
    options: { id: string | number; name: string }[];
  }) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div
          className="flex justify-between items-center h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm cursor-pointer"
          onClick={() => {
            const el = document.getElementById(name);
            el?.classList.toggle("hidden");
          }}
        >
          <span>
            {value
              ? options.find((opt) => String(opt.id) === value)?.name
              : `Select ${label}`}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>

        <div
          id={name}
          className="hidden absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto"
        >
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                handleChange(name, String(opt.id));
                document.getElementById(name)?.classList.add("hidden");
              }}
              className={`px-3 py-2 text-sm hover:bg-[#4B0082] hover:text-white cursor-pointer ${
                value === String(opt.id)
                  ? "bg-[#F3E8FF] text-[#4B0082] font-medium"
                  : ""
              }`}
            >
              {opt.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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

          {/* Dropdown Grid for Staff and Campus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Dropdown
              label="Staff Name"
              name="staffId"
              value={form.staffId}
              options={
                staffData?.staff?.map((staff: any) => ({
                  id: staff.id,
                  name: staff.name,
                })) || []
              }
            />
            <Dropdown
              label="Campus"
              name="campusId"
              value={form.campusId}
              options={
                campusData?.campuses?.map((campus: any) => ({
                  id: campus.id,
                  name: campus.name,
                })) || []
              }
            />
          </div>

          {/* SUBJECTS SECTION */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Subjects
            </h3>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Dropdown
                  label="Select Subject"
                  name="subjectId"
                  value={form.subjectId}
                  options={
                    subjectData?.subjects?.map((sub: any) => ({
                      id: sub.id,
                      name: sub.name,
                    })) || []
                  }
                />
              </div>
              <button
                onClick={handleAddSubject}
                className="px-4 py-2 bg-[#4B0082] text-white rounded-md hover:bg-[#5a00a8] transition-colors h-10"
              >
                + Add
              </button>
            </div>

            {/* Show added subjects */}
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSubjects.map((sub) => (
                <span
                  key={sub.id}
                  className="flex items-center gap-2 bg-[#F3E8FF] text-[#4B0082] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {sub.name}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveSubject(sub.id)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* CLASSES SECTION */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Classes
            </h3>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Dropdown
                  label="Select Class"
                  name="classId"
                  value={form.classId}
                  options={
                    filteredClasses?.map((cls: any) => ({
                      id: cls.id,
                      name: cls.name,
                    })) || []
                  }
                />
              </div>
              <button
                onClick={handleAddClass}
                className="px-4 py-2 bg-[#4B0082] text-white rounded-md hover:bg-[#5a00a8] transition-colors h-10"
              >
                + Add
              </button>
            </div>

            {/* Show added classes */}
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedClasses.map((cls) => (
                <span
                  key={cls.id}
                  className="flex items-center gap-2 bg-[#F3E8FF] text-[#4B0082] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {cls.name}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveClass(cls.id)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* ASSIGN BUTTON */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-[#4B0082] text-white cursor-pointer h-10 px-6 py-2 disabled:opacity-60"
            >
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Assign"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
