import { useEffect, useState } from "react";
import { Stepper } from "../components/stepper";
import { IoIosArrowBack } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import { schoolSetupSchema } from "../auth-schema";
import { useNavigate } from "react-router-dom";
import {
  useForm,
  useWatch,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import upload from "../../assets/image/upload.png";
import { X } from "lucide-react";
import { useSchoolSetupMutation } from "../api/auth-api";
import { toast } from "sonner";
import { type FormValues } from "../models/types";

const saveFormData = (data: FormValues) => {
  localStorage.setItem("schoolSetupFormData", JSON.stringify(data));
};

const loadFormData = (): Partial<FormValues> | null => {
  const savedData = localStorage.getItem("schoolSetupFormData");
  return savedData ? JSON.parse(savedData) : null;
};

const clearFormData = () => {
  localStorage.removeItem("schoolSetupFormData");
};

export default function SchoolSetup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [stampPreview, setStampPreview] = useState<string | null>(null);
  const [SchoolSetup] = useSchoolSetupMutation();
  const registeredName = localStorage.getItem("registeredName") || "";
  const registeredEmail = localStorage.getItem("registeredEmail") || "";
  const [, setLogoFile] = useState<File | null>(null);
  const [, setStampFile] = useState<File | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setLogoFile(file);
      setValue("logoUrl", e.target.files, { shouldValidate: true });
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleStampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setStampFile(file);
      setValue("stampUrl", e.target.files, { shouldValidate: true });
      const previewUrl = URL.createObjectURL(file);
      setStampPreview(previewUrl);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schoolSetupSchema) as Resolver<FormValues>,
    defaultValues: {
      email: registeredEmail || "",
      name: registeredName || "",
      phoneNumber: "",
      address: "",
      prefix: "",
      logoUrl: "",
      stampUrl: "",
    },
  });

  // Watch all form fields
  const formValues = useWatch({ control });

  // Load saved data on component mount
  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      reset({
        ...savedData,
        email: registeredEmail || savedData.email || "",
        name: registeredName || savedData.name || "",
      });
    }
  }, [registeredEmail, registeredName, reset]);

  // Save form data whenever it changes
  useEffect(() => {
    const subscription = watch((value) => {
      saveFormData(value as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Ensure fields stay synced
  useEffect(() => {
    setValue("name", registeredName);
    setValue("email", registeredEmail);
  }, [registeredName, registeredEmail, setValue]);

  useEffect(() => {
    if (formValues?.phoneNumber && currentStep < 2) setCurrentStep(2);
    if (formValues?.address && currentStep < 3) setCurrentStep(3);
    // if (formValues?.prefix && currentStep < 4) setCurrentStep(4);
    if (formValues?.logoUrl && currentStep < 5) setCurrentStep(5);
    if (formValues?.stampUrl && currentStep < 6) setCurrentStep(6);
  }, [formValues, currentStep]);

  useEffect(() => {
    // Update current step based on filled fields
    if (!formValues?.phoneNumber) {
      setCurrentStep(1);
    } else if (!formValues?.address) {
      setCurrentStep(2);
    } else if (!formValues?.prefix) {
      setCurrentStep(3);
    } else if (!formValues?.logoUrl) {
      setCurrentStep(4);
    } else if (!formValues?.stampUrl) {
      setCurrentStep(5);
    } else {
      setCurrentStep(6);
    }
  }, [formValues]);

  const handleRemoveLogo = () => {
    setValue("logoUrl", "", { shouldValidate: true });
    setLogoPreview(null);
    setLogoFile(null);
    const input = document.getElementById("logoUpload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleRemoveStamp = () => {
    setValue("stampUrl", "", { shouldValidate: true });
    setStampPreview(null);
    setStampFile(null);
    const input = document.getElementById("stampUpload") as HTMLInputElement;
    if (input) input.value = "";
  };

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
      const token = localStorage.getItem("token") || "";
      const formData = new FormData();

      // Append all fields
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);

      if (data.prefix) {
        formData.append("prefix", data.prefix);
      }

      // Append files if they exist
      if (data.logoUrl?.[0]) {
        formData.append("logoUrl", data.logoUrl[0]);
      }
      if (data.stampUrl?.[0]) {
        formData.append("stampUrl", data.stampUrl[0]);
      }

      // Send as multipart/form-data
      const response = await SchoolSetup({
        formData,
        token,
      }).unwrap();
      console.log("Response:", response);
      clearFormData();
      
      localStorage.setItem("schoolId", response.school.id.toString());
      toast.success("School setup successful");
      navigate("/auth/input-campus", { replace: true });
    } catch (error) {
      toast.error("Failed to submit form");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:rounded-r-2xl backdrop-blur-md px-2 pb-1 md:pb-0 pt-1 md:pt-0 rounded-xl">
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
      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.error("Validation errors:", errors)
        )}
        noValidate
      >
        {/* School Name */}
        <div className="">
          <div className="input-group relative my-4">
            <input
              {...register("name")}
              type="name"
              name="name"
              id="name"
              disabled
              required
              className={`w-full px-3 py-2 text-gray-400 border rounded-sm focus:outline-none focus:ring-1  peer ${
                errors.name
                  ? "border-[#FF8682] focus:ring-[#FF8682]"
                  : "border-gray-300 focus:ring-gray-200"
              }`}
              placeholder=" "
            />
            <label
              htmlFor="name"
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
              {errors.name ? (
                <span className="text-[#FF8682]">School Name</span>
              ) : (
                <span className="text-gray-400">School Name</span>
              )}
            </label>
            {errors.name && (
              <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

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
              className={`w-full px-3 py-2 text-gray-400 border rounded-sm focus:outline-none focus:ring-1  peer ${
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
              {...register("phoneNumber")}
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              required
              className={`w-full px-3 py-2 text-white border rounded-sm focus:outline-none focus:ring-1  peer ${
                errors.email
                  ? "border-[#FF8682] focus:ring-[#FF8682]"
                  : "border-gray-300 focus:ring-gray-200"
              }`}
              placeholder=" "
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /\D/g,
                  ""
                );
              }}
              maxLength={11}
            />
            <label
              htmlFor="phoneNumber"
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
              School Phone Number
            </label>
            {errors.phoneNumber && (
              <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* School Address */}
        <div className="">
          <div className="input-group relative">
            <input
              {...register("address")}
              type="text"
              name="address"
              id="address"
              required
              className="w-full px-3 py-2 text-white border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-200 peer"
              placeholder=" "
            />
            <label
              htmlFor="address"
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
            {errors.address && (
              <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
                {errors.address.message}
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
        <div className="mb-4">
          <label
            htmlFor="logoUpload"
            className="bg-white rounded-md p-3 text-center border-2 border-gray-300 cursor-pointer block"
          >
            {logoPreview ? (
              <div className="flex flex-col items-center bg-gray-400">
                {/* Image Preview with X Icon */}
                <div className="">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-50 h-50 object-cover"
                  />
                </div>
                <div className="self-end p-1">
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="flex items-center bg-red-500 text-white rounded gap-1 p-1 hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="h-4 w-4" /> <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <img src={upload} alt="Upload icon" />
                </div>
                <p className="text-[#545454]">Upload your school logo here</p>
                <p className="text-[#BBC0C8] text-xs">
                  (Only *.jpeg, *.webp and *.png images will be accepted)
                </p>
              </>
            )}
          </label>
          <input
            type="file"
            id="logoUpload"
            accept=".jpeg,.jpg,.png,.webp"
            className="hidden"
            onChange={handleLogoChange}
          />
          {errors.logoUrl && (
            <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
              {errors.logoUrl.message}
            </p>
          )}
        </div>

        {/* Upload School Stamp */}
        <div className="mb-4">
          <label
            htmlFor="stampUpload"
            className="bg-white rounded-md p-3 text-center border-2 border-gray-300 cursor-pointer block"
          >
            {stampPreview ? (
              <div className="flex flex-col items-center bg-gray-400">
                {/* Image Preview with X Icon */}
                <div className="">
                  <img
                    src={stampPreview}
                    alt="Stamp preview"
                    className="w-50 h-50 object-cover rounded-lg"
                  />
                  {/* <button
                    type="button"
                    onClick={handleRemoveStamp}
                    className="absolute top-5 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="h-4 w-4" />
                  </button> */}
                </div>
                <div className="self-end p-1">
                  <button
                    type="button"
                    onClick={handleRemoveStamp}
                    className="flex items-center bg-red-500 text-white rounded gap-1 p-1 hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="h-4 w-4" /> <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <img src={upload} alt="Upload icon" />
                </div>
                <p className="text-[#545454]">Upload your school stamp here</p>
                <p className="text-[#BBC0C8] text-xs">
                  (Only *.jpeg, *.webp and *.png images will be accepted)
                </p>
              </>
            )}
          </label>
          <input
            type="file"
            id="stampUpload"
            accept=".jpeg,.jpg,.png,.webp"
            className="hidden"
            onChange={handleStampChange}
          />

          {errors.stampUrl && (
            <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
              {errors.stampUrl.message}
            </p>
          )}
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#8000BD] text-white rounded-sm font-medium py-3 px-4 mb-3 transition-colors ${
            isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading ? "PROCEEDING..." : "PROCEED"}
        </button>
      </form>
    </div>
  );
}