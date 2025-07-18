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
// }

// type FormValues = {
//   campuses: {
//     name: string;
//     email: string;
//     address: string;
//     phoneNumber: string;
//   }[];
// };

// const CampusModal = ({ campusCount, onClose }: CampusModalProps) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token") || "";
//   const [setupCampus, { isLoading }] = useSetupCampusMutation();
//   const school_id = Number(localStorage.getItem("schoolId")) || 0;

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       campuses: [],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "campuses",
//   });

 
//   useEffect(() => {
//     // Clear existing campuses
//     remove();

//     // Add correct number of campuses
//     for (let i = 0; i < campusCount; i++) {
//       append({ name: "", email: "", address: "", phoneNumber: "" });
//     }
//   }, [campusCount]);

//   const onSubmit = async (data: FormValues) => {
//     try {
//       if (!token) throw new Error("No authentication token found");

//       // Ensure school_id is a valid number
//       const numericSchoolId = Number(school_id);
//       if (isNaN(numericSchoolId)) {
//         throw new Error("Invalid school ID format");
//       }

//       // Prepare the payload with proper typing
//       const payload: CampusSetupRequest = {
//         school_id: numericSchoolId, // Ensure it's a number
//         campuses: data.campuses.map((campus) => ({
//           ...campus,
//           phoneNumber: String(campus.phoneNumber), // Ensure phone is string if needed
//         })),
//       };

//       console.log("Submitting payload:", JSON.stringify(payload, null, 2));

//       const response = await setupCampus({
//         credentials: payload,
//         token,
//       }).unwrap();
//       console.log("Response:", response);

//       // Extract campus IDs from response
//       const campusIds = response.date.savedCampus.map(
//         (campus: { id: number }) => campus.id
//       );

//       // Save to localStorage
//       localStorage.setItem("campusIds", JSON.stringify(campusIds));
//       toast.success("Campus setup successful!");
//       navigate("/auth/customize-school-name");
//     } catch (err) {
//       console.error("Submission error:", err);
//       toast.error(
//         err instanceof Error ? err.message : "Failed to setup campuses"
//       );
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm bg-opacity-50">
//       <div className="bg-white rounded-xl p-6 w-full max-w-sm md:max-w-4xl max-h-[90vh] overflow-auto relative">
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h2 className="text-3xl font-semibold text-gray-800">Campus</h2>
//             <p className="text-sm text-gray-500">
//               ({campusCount}) {campusCount === 1 ? "campus" : "campuses"}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-800 border border-gray-100 shadow-lg rounded-full text-2xl p-1 cursor-pointer"
//           >
//             <X />
//           </button>
//         </div>

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
//                     {...register(`campuses.${index}.name`, {
//                       required: "Name is required",
//                     })}
//                     placeholder="Campus Name"
//                     className="w-full border p-2 rounded outline-none"
//                   />
//                   {errors.campuses?.[index]?.name && (
//                     <p className="text-red-500 text-sm">
//                       {errors.campuses[index]?.name?.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <input
//                     {...register(`campuses.${index}.email`, {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^\S+@\S+$/i,
//                         message: "Invalid email format",
//                       },
//                     })}
//                     placeholder="Email"
//                     className="w-full border p-2 rounded outline-none"
//                   />
//                   {errors.campuses?.[index]?.email && (
//                     <p className="text-red-500 text-sm">
//                       {errors.campuses[index]?.email?.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <input
//                     {...register(`campuses.${index}.address`, {
//                       required: "Address is required",
//                     })}
//                     placeholder="Address"
//                     className="w-full border p-2 rounded outline-none"
//                   />
//                   {errors.campuses?.[index]?.address && (
//                     <p className="text-red-500 text-sm">
//                       {errors.campuses[index]?.address?.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <input
//                     {...register(`campuses.${index}.phoneNumber`, {
//                       required: "Phone number is required",
//                       minLength: {
//                         value: 10,
//                         message: "Phone number must be at least 10 digits",
//                       },
//                     })}
//                     placeholder="Phone Number"
//                     className="w-full border p-2 rounded outline-none"
//                   />
//                   {errors.campuses?.[index]?.phoneNumber && (
//                     <p className="text-red-500 text-sm">
//                       {errors.campuses[index]?.phoneNumber?.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

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




import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSetupCampusMutation } from "../api/auth-api";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";

interface CampusModalProps {
  campusCount: number;
  onClose?: () => void;
}

type FormValues = {
  campuses: {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
  }[];
};

const CampusModal = ({ campusCount, onClose }: CampusModalProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const [setupCampus, { isLoading }] = useSetupCampusMutation();
  const school_id = Number(localStorage.getItem("schoolId")) || 0;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
    remove();
    for (let i = 0; i < campusCount; i++) {
      append({ name: "", email: "", address: "", phoneNumber: "" });
    }
  }, [campusCount]);

const onSubmit = async (data: FormValues) => {
  try {
    const payload = {
      school_id,
      campuses: data.campuses.map((campus) => ({
        name: campus.name,
        email: campus.email,
        address: campus.address,
        phoneNumber: String(campus.phoneNumber),
      })),
    };

    const response = await setupCampus({
      credentials: payload,
      token,
    }).unwrap();
    console.log("FULL API RESPONSE:", response); // Debugging

    // SAFE ID EXTRACTION (with verification)
    if (!response.date?.savedCampuses) {
      throw new Error("API response is missing campus data");
    }

    const createdCampusIds = response.date.savedCampuses.map(
      (campus) => campus.id
    );

    if (createdCampusIds.length === 0) {
      throw new Error("No campus IDs were created");
    }

    // STORE IDs
    localStorage.setItem("campusIds", JSON.stringify(createdCampusIds));

    // SUCCESS
    toast.success(response.message);
    navigate("/auth/customize-school-name");
  } catch (err) {
    console.error("Campus creation failed:", err);
    toast.error(err instanceof Error ? err.message : "Failed to create campus");
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