// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSetupCampusMutation } from "../api/auth-api";
// import { useState } from "react";
// import { toast } from "sonner";
// import type { CampusSetupRequest } from "../redux/request";

// interface CampusModalProps {
//   campusCount: number;
//   onClose?: () => void;
//   schoolId: number;
// }

// const CampusModal = ({ campusCount, onClose, schoolId}: CampusModalProps) => {
//   const navigate = useNavigate();
//   const [setupCampus] = useSetupCampusMutation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   // Create an array with length equal to campusCount
//   const campuses = Array.from({ length: campusCount }, (_, i) => i + 1);
//   const token = localStorage.getItem("token") || "";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Validate token exists
//       if (!token) {
//         throw new Error("Authentication token not found");
//       }

//       // Collect data from all campus forms
//       const campusesData = campuses.map((campusNumber) => {
//         return {
//           name:
//             (
//               document.getElementById(
//                 `name-${campusNumber}`
//               ) as HTMLInputElement
//             )?.value || "",
//           email:
//             (
//               document.getElementById(
//                 `email-${campusNumber}`
//               ) as HTMLInputElement
//             )?.value || "",
//           address:
//             (
//               document.getElementById(
//                 `address-${campusNumber}`
//               ) as HTMLInputElement
//             )?.value || "",
//           phoneNumber:
//             (document.getElementById(`tel-${campusNumber}`) as HTMLInputElement)
//               ?.value || "",
//         };
//       });

//       // Prepare the request payload
//       const payload: CampusSetupRequest = {
//         school_id: schoolId,
//         campuses: campusesData,
//       };

//       // Call the API
//       const response = await setupCampus({
//         credentials: payload,
//         token: token,
//       }).unwrap();

//       console.log("Campus setup successful:", response);
//       toast.success("Campus setup successful!");
//       navigate("/auth/customize-school-name");
//     } catch (err) {
//       const error = err as Error;
//       toast.error("Failed to setup campus!");
//       console.error("Failed to setup campus:", err);
//       setError(error.message || "Failed to setup campus.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
//       <div className="bg-white rounded-xl p-6 w-full max-w-sm md:max-w-4xl max-h-[90vh] overflow-auto relative">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h2 className="text-3xl font-semibold text-gray-800">Campus</h2>
//             <p className="text-sm text-gray-500">
//               ({campusCount}) Number of{" "}
//               {campusCount === 1 ? "campus" : "campuses"} inputted
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-800 border border-gray-100 shadow-lg rounded-full text-2xl p-1 cursor-pointer"
//           >
//             <X />
//           </button>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Form Content */}
//         <form className="" onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             {/* Generate forms based on campusCount */}
//             {campuses.map((campusNumber) => (
//               <div
//                 key={campusNumber}
//                 className="space-y-6 py-4 border border-gray-100 shadow-lg rounded-2xl px-4"
//               >
//                 <h3 className="text-lg font-medium text-gray-700">
//                   Campus {campusNumber}
//                 </h3>
//                 <div className="main">
//                   <div className="flex items-center relative">
//                     <input
//                       type="name"
//                       name={`name-${campusNumber}`}
//                       id={`name-${campusNumber}`}
//                       required
//                       placeholder=""
//                     />
//                     <label className="block text-sm font-medium mb-1">
//                       Campus Name
//                     </label>
//                   </div>
//                 </div>

//                 <div className="main">
//                   <div className="flex items-center relative">
//                     <input
//                       type="email"
//                       name={`email-${campusNumber}`}
//                       id={`email-${campusNumber}`}
//                       required
//                       placeholder=""
//                     />
//                     <label className="block text-sm font-medium mb-1">
//                       Campus Email
//                     </label>
//                   </div>
//                 </div>

//                 <div className="main">
//                   <div className="flex items-center relative">
//                     <input
//                       type="text"
//                       name={`text-${campusNumber}`}
//                       id={`text-${campusNumber}`}
//                       required
//                       placeholder=""
//                     />
//                     <label className="block text-sm font-medium mb-1">
//                       Address
//                     </label>
//                   </div>
//                 </div>

//                 <div className="main">
//                   <div className="flex items-center relative">
//                     <input
//                       type="tel"
//                       name={`tel-${campusNumber}`}
//                       id={`tel-${campusNumber}`}
//                       required
//                       placeholder=""
//                     />
//                     <label className="block text-sm font-medium mb-1">
//                       Phone Number
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Next Button */}
//           <div
//             onClick={() => navigate("/auth/customize-school-name")}
//             className="flex justify-center"
//           >
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`md:w-1/3 w-1/2 py-3.5 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer ${
//                 isLoading ? "opacity-70 cursor-not-allowed" : ""
//               }`}
//             >
//               {isLoading ? "Processing..." : "Next"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CampusModal;






import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSetupCampusMutation } from "../api/auth-api";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { use, useEffect } from "react";
import type { CampusSetupRequest } from "../redux/request";

interface CampusModalProps {
  campusCount: number;
  onClose?: () => void;
  school_id: number;
}

type FormValues = {
  campuses: {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
  }[];
};

const CampusModal = ({ campusCount, onClose, school_id }: CampusModalProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const [setupCampus, { isLoading }] = useSetupCampusMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      campuses: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "campuses",
  });

 
  useEffect(() => {
    // Clear existing campuses
    remove();

    // Add correct number of campuses
    for (let i = 0; i < campusCount; i++) {
      append({ name: "", email: "", address: "", phoneNumber: "" });
    }
  }, [campusCount]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (!token) throw new Error("No authentication token found");

      // Ensure school_id is a valid number
      const numericSchoolId = Number(school_id);
      if (isNaN(numericSchoolId)) {
        throw new Error("Invalid school ID format");
      }

      // Prepare the payload with proper typing
      const payload: CampusSetupRequest = {
        school_id: numericSchoolId, // Ensure it's a number
        campuses: data.campuses.map((campus) => ({
          ...campus,
          phoneNumber: String(campus.phoneNumber), // Ensure phone is string if needed
        })),
      };

      console.log("Submitting payload:", JSON.stringify(payload, null, 2));

      const response = await setupCampus({
        credentials: payload,
        token,
      }).unwrap();

      toast.success("Campus setup successful!");
      navigate("/auth/customize-school-name");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to setup campuses"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm md:max-w-4xl max-h-[90vh] overflow-auto relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">Campus</h2>
            <p className="text-sm text-gray-500">
              ({campusCount}) {campusCount === 1 ? "campus" : "campuses"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-800 border border-gray-100 shadow-lg rounded-full text-2xl p-1 cursor-pointer"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-6 py-4 border border-gray-100 shadow-lg rounded-2xl px-4"
              >
                <h3 className="text-lg font-medium text-gray-700">
                  Campus {index + 1}
                </h3>

                <div>
                  <input
                    {...register(`campuses.${index}.name`, {
                      required: "Name is required",
                    })}
                    placeholder="Campus Name"
                    className="w-full border p-2 rounded outline-none"
                  />
                  {errors.campuses?.[index]?.name && (
                    <p className="text-red-500 text-sm">
                      {errors.campuses[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register(`campuses.${index}.email`, {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                    placeholder="Email"
                    className="w-full border p-2 rounded outline-none"
                  />
                  {errors.campuses?.[index]?.email && (
                    <p className="text-red-500 text-sm">
                      {errors.campuses[index]?.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register(`campuses.${index}.address`, {
                      required: "Address is required",
                    })}
                    placeholder="Address"
                    className="w-full border p-2 rounded outline-none"
                  />
                  {errors.campuses?.[index]?.address && (
                    <p className="text-red-500 text-sm">
                      {errors.campuses[index]?.address?.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register(`campuses.${index}.phoneNumber`, {
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 digits",
                      },
                    })}
                    placeholder="Phone Number"
                    className="w-full border p-2 rounded outline-none"
                  />
                  {errors.campuses?.[index]?.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.campuses[index]?.phoneNumber?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`md:w-1/3 w-1/2 py-3.5 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Processing..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampusModal;




// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSetupCampusMutation } from "../api/auth-api";
// import { useForm, useFieldArray } from "react-hook-form";
// import { toast } from "sonner";
// import { useEffect } from "react";
// import type { CampusSetupRequest } from "../redux/request";

// interface CampusModalProps {
//   campusCount: number;
//   onClose?: () => void;
//   schoolId: number;
// }

// type FormValues = {
//   campuses: {
//     name: string;
//     email: string;
//     address: string;
//     phoneNumber: string;
//   }[];
// };

// const CampusModal = ({ campusCount, onClose, schoolId }: CampusModalProps) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token") || "";
//   const [setupCampus, { isLoading }] = useSetupCampusMutation();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//   } = useForm<FormValues>({
//     defaultValues: {
//       campuses: [],
//     },
//   });

//   const { fields, append } = useFieldArray({
//     control,
//     name: "campuses",
//   });

//   // Automatically add campus fields on mount
//   useEffect(() => {
//     for (let i = 0; i < campusCount; i++) {
//       append({ name: "", email: "", address: "", phoneNumber: "" });
//     }
//   }, [campusCount, append]);

//   const onSubmit = async (data: FormValues) => {
//     try {
//       if (!token) throw new Error("No token found");

//       const payload: CampusSetupRequest = {
//         school_id: schoolId,
//         campuses: data.campuses,
//       };

//       await setupCampus({ credentials: payload, token }).unwrap();

//       toast.success("Campus setup successful!");
//       reset();
//       navigate("/auth/customize-school-name");
//     } catch (err: any) {
//       toast.error("Failed to setup campus");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
//       <div className="bg-white rounded-xl p-6 w-full max-w-sm md:max-w-4xl max-h-[90vh] overflow-auto relative">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h2 className="text-3xl font-semibold text-gray-800">Campus</h2>
//             <p className="text-sm text-gray-500">
//               ({campusCount}) {campusCount === 1 ? "campus" : "campuses"}{" "}
//               inputted
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-800 border border-gray-100 shadow-lg rounded-full text-2xl p-1 cursor-pointer"
//           >
//             <X />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             {fields.map((field, index) => (
//               <div
//                 key={field.id}
//                 className="space-y-6 py-4 border border-gray-100 shadow-lg rounded-2xl px-4"
//               >
//                 <h3 className="text-lg font-medium text-gray-700">
//                   Campus {index + 1}
//                 </h3>

//                 <div>
//                   <input
//                     {...register(`campuses.${index}.name`, { required: true })}
//                     placeholder="Campus Name"
//                     className="w-full border p-2 rounded outline-none"
//                   />
//                   {errors.campuses?.[index]?.name && (
//                     <p className="text-red-500 text-sm">Name is required</p>
//                   )}
//                 </div>

//                 <div>
//                   <input
//                     {...register(`campuses.${index}.email`, {
//                       required: true,
//                       pattern: /^\S+@\S+$/i,
//                     })}
//                     placeholder="Email"
//                     className="w-full border p-2 rounded outline-none"
//                   />
//                   {errors.campuses?.[index]?.email && (
//                     <p className="text-red-500 text-sm">Valid email required</p>
//                   )}
//                 </div>

//                 <div>
//                   <input
//                     {...register(`campuses.${index}.address`, {
//                       required: true,
//                     })}
//                     placeholder="Address"
//                     className="w-full border p-2 rounded outline-none"
//                   />
//                   {errors.campuses?.[index]?.address && (
//                     <p className="text-red-500 text-sm">Address is required</p>
//                   )}
//                 </div>

//                 <div>
//                   <input
//                     {...register(`campuses.${index}.phoneNumber`, {
//                       required: true,
//                       minLength: 10,
//                     })}
//                     placeholder="Phone Number"
//                     className="w-full border p-2 rounded outline-none"
//                   />
//                   {errors.campuses?.[index]?.phoneNumber && (
//                     <p className="text-red-500 text-sm">
//                       Phone number required
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Submit */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`md:w-1/3 w-1/2 py-3.5 bg-[#8000BD] text-white font-medium rounded-sm text-base transition-colors cursor-pointer ${
//                 isLoading ? "opacity-70 cursor-not-allowed" : ""
//               }`}
//             >
//               {isLoading ? "Processing..." : "Next"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CampusModal;
