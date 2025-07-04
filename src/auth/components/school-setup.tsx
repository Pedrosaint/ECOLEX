import { useEffect, useState } from "react";
import { Stepper } from "../components/stepper";
import { IoIosArrowBack } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import { schoolSetupSchema } from "../auth-schema";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch, type Resolver, type SubmitHandler } from "react-hook-form";
import Upload from "../../assets/image/upload.png";


type FormValues = {
  email: string;
  number: string;
  token: string;
  prefix: string;
  logo?: FileList | null;
  stamp?: FileList | null;
};

export default function SchoolSetup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormValues>({
    resolver: yupResolver(schoolSetupSchema) as Resolver<FormValues>,
    defaultValues: {
      email: "",
      number: "",
      token: "",
      prefix: "",
      logo: null,
      stamp: null,
    },
  });

    // Watch all form fields
    const formValues = useWatch({ control });
  const registeredEmail = "admin@school.com";

  useEffect(() => {
    setValue("email", registeredEmail);
  }, [registeredEmail, setValue]);

  useEffect(() => {
    if (formValues?.number && currentStep < 2) setCurrentStep(2);
    if (formValues?.token && currentStep < 3) setCurrentStep(3);
    if (formValues?.prefix && currentStep < 4) setCurrentStep(4);
    if (formValues?.logo && currentStep < 5) setCurrentStep(5);
    if (formValues?.stamp && currentStep < 6) setCurrentStep(6);
  }, [formValues, currentStep]);

  const steps = [
    { id: 1, label: "Email" },
    { id: 2, label: "Number" },
    { id: 3, label: "Address" },
    { id: 4, label: "Prefix" },
    { id: 5, label: "Logo" },
    { id: 6, label: "" },
  ];

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      // Convert FileList to File objects
      const formData = {
        ...data,
        logo: data.logo?.[0] || null,
        stamp: data.stamp?.[0] || null,
      };

      console.log("Form data submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="rounded-r-2xl backdrop-blur-md px-2">
      {/* Stepper */}
      <div className="mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/auth/auth-layout/super-admin")}
        className="flex items-center text-white mb-2 gap-1 cursor-pointer"
      >
        <IoIosArrowBack className="" />
        <span className="text-[12px]">Back to super admin</span>
      </button>

      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-white">School Setup</h1>
        <p className="text-gray-300 text-[12px]">
          {"Let's get you all set up so you can access the school account."}
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* School Email */}
        <div className="">
          <div className="input-group relative my-4">
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              disabled
              required
              className={`w-full px-3 py-2 text-gray-500 border rounded-sm focus:outline-none focus:ring-1  peer ${
                errors.email
                  ? "border-[#FF8682] focus:ring-[#FF8682]"
                  : "border-gray-300 focus:ring-gray-200"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-2 text-white text-sm transition-all 
            peer-placeholder-shown:text-base 
            peer-placeholder-shown:text-gray-300 
            peer-placeholder-shown:top-2 
            peer-focus:top-[-12px] 
            peer-focus:text-sm 
            peer-focus:text-gray-100 
            peer-not-placeholder-shown:top-[-11px]
                peer-not-placeholder-shown:bg-black/100
                peer-not-placeholder-shown:px-2
            peer-focus:bg-black/90 
            peer-focus:px-2
            peer-focus:backdrop-blur-4xl"
            >
              {errors.email ? (
                <span className="text-[#FF8682]">School Email</span>
              ) : (
                <span className="text-gray-400">School Email</span>
              )}
            </label>
            {errors.email && (
              <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* School Phone Number */}
        <div className="">
          <div className="input-group relative my-4">
            <input
              {...register("number")}
              type="text"
              name="number"
              id="number"
              required
              className={`w-full px-3 py-2 text-white border rounded-sm focus:outline-none focus:ring-1  peer ${
                errors.email
                  ? "border-[#FF8682] focus:ring-[#FF8682]"
                  : "border-gray-300 focus:ring-gray-200"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="number"
              className="absolute left-3 top-2 text-white text-sm transition-all 
                      peer-placeholder-shown:text-base 
                      peer-placeholder-shown:text-gray-300 
                      peer-placeholder-shown:top-2 
                      peer-focus:top-[-12px] 
                      peer-focus:text-sm 
                      peer-focus:text-gray-100 
                        peer-not-placeholder-shown:top-[-11px]
                         peer-not-placeholder-shown:bg-black/100
                         peer-not-placeholder-shown:px-2
                      peer-focus:bg-black/90 
                      peer-focus:px-2
                      peer-focus:backdrop-blur-4xl"
            >
              {errors.number ? (
                <span className="text-[#FF8682]">School Phone Number</span>
              ) : (
                <span className="text-gray-400">School Phone Number</span>
              )}
            </label>
            {errors.number && (
              <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
                {errors.number.message}
              </p>
            )}
          </div>
        </div>

        {/* School Address */}
        <div className="">
          <div className="input-group relative">
            <input
              {...register("token")}
              type="text"
              name="token"
              id="token"
              required
              className="w-full px-3 py-2 text-white border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-200 peer"
              placeholder=" "
            />
            <label
              htmlFor="token"
              className="absolute left-3 top-2 text-white text-sm transition-all 
                peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-300 
                peer-placeholder-shown:top-2 
                peer-focus:top-[-12px] 
                peer-focus:text-sm 
                peer-focus:text-gray-100
                peer-not-placeholder-shown:top-[-11px] 
                    peer-not-placeholder-shown:bg-black/100
                    peer-not-placeholder-shown:px-2
                peer-focus:bg-black/90 
                peer-focus:px-2
                peer-focus:backdrop-blur-4xl"
            >
              School Address
            </label>
            {errors.token && (
              <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
                {errors.token.message}
              </p>
            )}
          </div>
        </div>

        {/* Prefix */}
        <div className="">
          <div className="input-group relative">
            <input
              {...register("prefix")}
              type="text"
              name="prefix"
              id="prefix"
              required
              className="w-full px-3 py-2 text-white border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-200 peer"
              placeholder=" "
            />
            <label
              htmlFor="prefix"
              className="absolute left-3 top-2 text-white text-sm transition-all 
                      peer-placeholder-shown:text-base 
                      peer-placeholder-shown:text-gray-300 
                      peer-placeholder-shown:top-2 
                      peer-focus:top-[-12px] 
                      peer-focus:text-sm 
                      peer-focus:text-gray-100
                        peer-not-placeholder-shown:top-[-11px] 
                         peer-not-placeholder-shown:bg-black/100
                         peer-not-placeholder-shown:px-2
                      peer-focus:bg-black/90 
                      peer-focus:px-2
                      peer-focus:backdrop-blur-4xl"
            >
              Prefix (school name initials)
            </label>
            {errors.prefix && (
              <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
                {errors.prefix.message}
              </p>
            )}
          </div>
        </div>

        {/* Upload School Logo */}
        <div className="">
          <label
            htmlFor="logoUpload"
            className="bg-white rounded-md p-3 text-center border-2 border-gray-300 cursor-pointer block"
          >
            <div className="flex justify-center">
              <img src={Upload} alt="Upload icon" />
            </div>
            <p className="text-[#545454]">Upload your school logo here</p>
            <p className="text-[#BBC0C8] text-xs">
              (Only *.jpeg, *.webp and *.png images will be accepted)
            </p>
            {/* hidden file input */}
            <input
              {...register("logo")}
              type="file"
              id="logoUpload"
              accept=".jpeg,.webp,.png"
              className="hidden"
              onChange={(e) => {
                setValue("logo", e.target.files);
              }}
            />
          </label>
        </div>

        {/* Upload School Stamp */}
        <div className="">
          <label
            htmlFor="stampUpload"
            className="bg-white rounded-md p-3 text-center border-2 border-gray-300 cursor-pointer block"
          >
            <div className="flex justify-center">
              <img src={Upload} alt="Upload icon" />
            </div>
            <p className="text-[#545454]">Upload your school stamp here</p>
            <p className="text-[#BBC0C8] text-xs">
              (Only *.jpeg, *.webp and *.png images will be accepted)
            </p>
            {/* hidden file input */}
            <input
              {...register("stamp")}
              type="file"
              id="stampUpload"
              accept=".jpeg,.webp,.png"
              className="hidden"
              onChange={(e) => {
                setValue("stamp", e.target.files);
              }}
            />
          </label>
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#8000BD] text-white rounded-sm font-medium py-3 px-4 transition-colors ${
            isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-300 text-[13px] -mt-5 mb-4">
          Already have an account?{" "}
          <button className="text-[#C48ADF] cursor-pointer">Login</button>
        </p>
      </form>
    </div>
  );
}





// import { useEffect, useState } from "react";
// import { Stepper } from "../components/stepper";
// import { IoIosArrowBack } from "react-icons/io";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { schoolSetupSchema } from "../auth-schema";
// import { useNavigate } from "react-router-dom";
// import { useForm, useWatch } from "react-hook-form";
// import Upload from "../../assets/image/upload.png";

// export default function SchoolSetup() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1); // Start at step 1 (email)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     control,
//   } = useForm({
//     resolver: yupResolver(schoolSetupSchema),
//   });

//   // Watch all form fields
//   const formValues = useWatch({ control });
//   const registeredEmail = "admin@school.com";

//   useEffect(() => {
//     setValue("email", registeredEmail);
//   }, [registeredEmail, setValue]);

//   // Auto-advance stepper based on completed fields
//   useEffect(() => {
//     if (formValues?.email && currentStep < 2) setCurrentStep(2);
//     if (formValues?.number && currentStep < 3) setCurrentStep(3);
//     if (formValues?.token && currentStep < 4) setCurrentStep(4);
//     if (formValues?.prefix && currentStep < 5) setCurrentStep(5);
//     if (formValues?.logo && currentStep < 6) setCurrentStep(6);
//   }, [formValues, currentStep]);

//   const steps = [
//     { id: 1, label: "Email" },
//     { id: 2, label: "Number" },
//     { id: 3, label: "Address" },
//     { id: 4, label: "Prefix" },
//     { id: 5, label: "Logo" },
//     { id: 6, label: "Stamp" },
//   ];

//   interface SchoolsetupFormData {
//     number: string;
//     email: string;
//     token: string;
//     prefix: string;
//     logo?: File | null;
//     stamp?: File | null;
//   }

//   const onSubmit = async (data: SchoolsetupFormData) => {
//     setIsLoading(true);
//     try {
//       console.log("Form data submitted:", data);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       navigate("");
//     } catch (error) {
//       console.error("Submission error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle file uploads
//   const handleFileChange =
//     (fieldName: "logo" | "stamp") =>
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files?.[0]) {
//         setValue(fieldName, e.target.files[0]);
//       }
//     };

//   return (
//     <div className="rounded-r-2xl backdrop-blur-md px-2">
//       {/* Stepper */}
//       <div className="mt-5">
//         <Stepper steps={steps} currentStep={currentStep} />
//       </div>

//       {/* Back Button */}
//       <button
//         onClick={() => navigate("/auth/auth-layout/super-admin")}
//         className="flex items-center text-white mb-2 gap-1 cursor-pointer"
//       >
//         <IoIosArrowBack className="" />
//         <span className="text-[12px]">Back to super admin</span>
//       </button>

//       {/* Header */}
//       <div className="mb-2">
//         <h1 className="text-3xl font-bold text-white">School Setup</h1>
//         <p className="text-gray-300 text-[12px]">
//           {"Let's get you all set up so you can access the school account."}
//         </p>
//       </div>

//       {/* Form */}
//       <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
//         {/* School Email (pre-filled and disabled) */}
//         <div className="input-group relative my-4">
//           <input
//             {...register("email")}
//             type="email"
//             disabled
//             className="w-full px-3 py-2 text-gray-500 border border-gray-300 rounded-sm"
//           />
//           <label className="absolute left-3 top-2 text-gray-400 text-sm">
//             School Email
//           </label>
//         </div>

//         {/* School Phone Number */}
//         <div className="input-group relative my-4">
//           <input
//             {...register("number")}
//             type="number"
//             className={`w-full px-3 py-2 text-white border rounded-sm focus:outline-none focus:ring-1 peer ${
//               errors.number
//                 ? "border-[#FF8682] focus:ring-[#FF8682]"
//                 : "border-gray-300 focus:ring-gray-200"
//             }`}
//             placeholder=" "
//             onBlur={() => formValues.number && setCurrentStep(3)}
//           />
//           {/* ... rest of the label and error display */}
//         </div>

//         {/* School Address */}
//         <div className="input-group relative">
//           <input
//             {...register("token")}
//             type="text"
//             className={`w-full px-3 py-2 text-white border rounded-sm focus:outline-none focus:ring-1 peer ${
//               errors.token
//                 ? "border-[#FF8682] focus:ring-[#FF8682]"
//                 : "border-gray-300 focus:ring-gray-200"
//             }`}
//             placeholder=" "
//             onBlur={() => formValues.token && setCurrentStep(4)}
//           />
//           {/* ... rest of the label and error display */}
//         </div>

//         {/* Prefix */}
//         <div className="input-group relative">
//           <input
//             {...register("prefix")}
//             type="text"
//             className={`w-full px-3 py-2 text-white border rounded-sm focus:outline-none focus:ring-1 peer ${
//               errors.prefix
//                 ? "border-[#FF8682] focus:ring-[#FF8682]"
//                 : "border-gray-300 focus:ring-gray-200"
//             }`}
//             placeholder=" "
//             onBlur={() => formValues.prefix && setCurrentStep(5)}
//           />
//           {/* ... rest of the label and error display */}
//         </div>

//         {/* Upload School Logo */}
//         <div>
//           <label htmlFor="logoUpload" className="...">
//             <div className="flex justify-center">
//               <img src={Upload} alt="Upload icon" />
//             </div>
//             <input
//               {...register("logo")}
//               type="file"
//               id="logoUpload"
//               accept=".jpeg,.webp,.png"
//               className="hidden"
//               onChange={handleFileChange("logo")}
//             />
//           </label>
//         </div>

//         {/* Upload School Stamp */}
//         <div>
//           <label htmlFor="stampUpload" className="...">
//             <div className="flex justify-center">
//               <img src={Upload} alt="Upload icon" />
//             </div>
//             <input
//               {...register("stamp")}
//               type="file"
//               id="stampUpload"
//               accept=".jpeg,.webp,.png"
//               className="hidden"
//               onChange={handleFileChange("stamp")}
//             />
//           </label>
//         </div>

//         {/* Create Account Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full bg-[#8000BD] text-white rounded-sm font-medium py-3 px-4 ${
//             isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
//           }`}
//         >
//           {isLoading ? "Creating Account..." : "Create Account"}
//         </button>

//         {/* Login Link */}
//         <p className="text-center text-gray-300 text-[13px] -mt-5 mb-4">
//           Already have an account?{" "}
//           <button className="text-[#C48ADF] cursor-pointer">Login</button>
//         </p>
//       </form>
//     </div>
//   );
// }