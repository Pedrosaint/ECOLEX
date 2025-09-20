/* eslint-disable @typescript-eslint/no-explicit-any */
// import { motion } from "framer-motion";
// import { X, Check, ChevronDown } from "lucide-react";
// import { useState, useRef } from "react";

// export default function EditStaffModal({
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
//             <h2 className="text-2xl font-medium text-gray-900">
//             Edit Staff Details
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
//           <div className="flex justify-between md:items-center gap-6 mb-8">
//             <div>
//               <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                 {selectedImage ? (
//                   <img
//                     src={selectedImage}
//                     alt="Passport"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-gray-500 text-sm">No image</span>
//                 )}
//               </div>
//               <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-4">
//                 <span className="text-gray-700 font-medium">
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
//                   className="inline-flex items-center justify-center rounded-full text-sm font-medium focus-visible:outline-none  border border-gray-300 bg-white hover:bg-gray-100 h-9 px-4 py-2"
//                 >
//                   Choose Media
//                 </button>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-4">
//               {/* Save Button */}
//               <button className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none bg-[#4B0082] text-white cursor-pointer h-9 px-4 py-2">
//                 <Check className="h-4 w-4 mr-2" />
//                 Save
//               </button>
//             </div>
//           </div>

//           {/* Form Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//             {/* Student's Name */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="staff-name"
//                 className="text-sm font-medium text-gray-700 mb-1"
//               >
//                 Staff's Name
//               </label>
//               <input
//                 id="staff-name"
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
//                   className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
//                 >
//                   <option value="">Select Campus</option>
//                   <option value="main">Main Campus</option>
//                   <option value="north">North Campus</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Date Employed */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Date Employed
//               </label>
//               <input
//                 type="date"
//                 className=" h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               />
//             </div>

//             {/* Payroll */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Payroll
//               </label>
//               <input
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               />
//             </div>

//             {/* Class */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Class
//               </label>
//               <div className="relative">
//                 <select className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"></select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Subject */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Subject
//               </label>
//               <div className="">
//                 <input
//                   type="text"
//                   className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none"
//               />
//             </div>

//             {/*  Number */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Number
//               </label>
//               <input
//                 type="text"
//                 className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               />
//             </div>

//             {/* Duty */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-700 mb-1">
//                 Duty
//               </label>
//               <div className="relative">
//                 <select className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"></select>
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
import { X, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useEditStaffMutation } from "../../staff/api/staff-api";
import { toast } from "sonner";
import { useGetCampusQuery } from "../../campus/api/campus.api";

export default function EditStaffModal({
  onClose,
  staffId,
  initialData,
}: {
  onClose: () => void;
  staffId: number;
  initialData?: any;
}) {
  const [campusDropdown, setCampusDropdown] = useState(false);
  const [campusSearch, setCampusSearch] = useState("");
  const [editStaff, { isLoading }] = useEditStaffMutation();

  const [form, setForm] = useState({
    name: initialData?.name || "",
    dateEmployed: initialData?.dateEmployed || "",
    payroll: initialData?.payroll || "",
    address: initialData?.address || "",
    duty: initialData?.duty || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
    nextOfKin: initialData?.nextOfKin || "",
    campusId: initialData?.campusId || "",
  });
   const { data } = useGetCampusQuery();
  const campuses = data?.campuses || [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filteredCampuses = campuses.filter((c) =>
    c.name.toLowerCase().includes(campusSearch.toLowerCase())
  );

 const handleSubmit = async () => {
   try {
     const payload = {
       ...form,
       dateEmployed: form.dateEmployed
         ? new Date(form.dateEmployed).toISOString()
         : null,
       payroll: Number(form.payroll),
       campusId: Number(form.campusId),
     };

     await editStaff({
       id: staffId,
       payload,
     }).unwrap();

     toast.success("Staff details updated successfully!");
     onClose();
   } catch (error: any) {
     toast.error(error?.data?.message || "Failed to update staff.");
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
            <h2 className="text-2xl font-medium text-gray-900">
              Edit Staff Details
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

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#4B0082] text-white cursor-pointer h-10 px-6 py-2 disabled:opacity-50"
            >
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Staff's Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Staff's Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Date Employed */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Date Employed
              </label>
              <input
                name="dateEmployed"
                value={form.dateEmployed}
                onChange={handleChange}
                type="date"
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Payroll */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Payroll
              </label>
              <input
                name="payroll"
                value={form.payroll}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Next of Kin */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Next of Kin
              </label>
              <input
                name="nextOfKin"
                value={form.nextOfKin}
                onChange={handleChange}
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            {/* Campus ID */}
            <div className="flex flex-col relative">
              <label className="text-sm font-medium mb-1">Campus</label>

              {/* Trigger */}
              <button
                type="button"
                onClick={() => setCampusDropdown((prev) => !prev)}
                className="h-10 w-full rounded-md border px-3 py-2 text-sm text-left outline-none border-gray-400 flex justify-between items-center"
              >
                {form.campusId
                  ? campuses.find((c) => c.id === Number(form.campusId))?.name
                  : "Select a campus"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    campusDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown List */}
              {campusDropdown && (
                <div className="absolute z-10 mt-17 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                  {/* Search box */}
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search campus..."
                      value={campusSearch}
                      onChange={(e) => setCampusSearch(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 outline-none rounded text-sm"
                    />
                  </div>

                  {/* List */}
                  <ul>
                    {filteredCampuses.length > 0 ? (
                      filteredCampuses.map((campus) => (
                        <li
                          key={campus.id}
                          onClick={() => {
                            setForm((prev) => ({
                              ...prev,
                              campusId: String(campus.id),
                            }));
                            setCampusDropdown(false);
                            setCampusSearch("");
                          }}
                          className="px-3 py-2 hover:bg-[#6a00a1] cursor-pointer hover:text-white"
                        >
                          {campus.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-gray-500 italic">
                        No campus found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Duty */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Duty
              </label>
              <div className="relative">
                <select
                  name="duty"
                  value={form.duty}
                  onChange={handleChange}
                  className="flex h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm pr-8"
                >
                  <option value="">Select Duty</option>
                  <option value="teaching">Teacher</option>
                  <option value="admin">Security</option>
                  <option value="support">Cleaner</option>
                  <option value="hr">HR</option>
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
