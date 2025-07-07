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
import { Upload, X, ImageIcon } from "lucide-react";

type FormValues = {
  email: string;
  number: string;
  address: string;
  prefix: string;
  logo?: FileList | null;
  stamp?: FileList | null;
};

export default function SchoolSetup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [, setLogoPreview] = useState<string | null>(null);
  const [, setStampPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schoolSetupSchema) as Resolver<FormValues>,
    defaultValues: {
      email: "",
      number: "",
      address: "",
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
    if (formValues?.address && currentStep < 3) setCurrentStep(3);
    if (formValues?.prefix && currentStep < 4) setCurrentStep(4);
    if (formValues?.logo && currentStep < 5) setCurrentStep(5);
    if (formValues?.stamp && currentStep < 6) setCurrentStep(6);
  }, [formValues, currentStep]);

  useEffect(() => {
    // Update current step based on filled fields
    if (!formValues?.number) {
      setCurrentStep(1);
    } else if (!formValues?.address) {
      setCurrentStep(2);
    } else if (!formValues?.prefix) {
      setCurrentStep(3);
    } else if (!formValues?.logo) {
      setCurrentStep(4);
    } else if (!formValues?.stamp) {
      setCurrentStep(5);
    } else {
      setCurrentStep(6);
    }
  }, [formValues]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };


  const handleRemoveLogo = () => {
    setValue("logo", null, { shouldValidate: true });
    setLogoPreview(null);
    const input = document.getElementById("logoUpload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleRemoveStamp = () => {
    setValue("stamp", null, { shouldValidate: true });
    setStampPreview(null);
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
    console.log("Form submission started", data);
    setIsLoading(true);

    try {
      const formData = {
        ...data,
        logo: data.logo?.[0] || null,
        stamp: data.stamp?.[0] || null,
      };

      console.log("Processed data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Navigating...");
      navigate("/auth/input-campus");
    } catch (error) {
      console.error("Submission error:", error);
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
        {/* School Email ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
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

        {/* School Phone Number ++++++++++++++++++++++++++++++++++++++++++++++++*/}
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
              School Phone Number
            </label>
            {errors.number && (
              <p className="text-[#FF8682] text-xs mt-1 flex justify-end">
                {errors.number.message}
              </p>
            )}
          </div>
        </div>

        {/* School Address ++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
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

        {/* Prefix ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
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

        {/* Upload School Logo +++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
        <div className="mb-4">
          <label
            htmlFor="logoUpload"
            className="bg-white rounded-md p-3 text-center border-2 border-gray-300 cursor-pointer block"
          >
            {formValues?.logo?.[0] ? (
              <div className="mb-4">
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center p-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                        <ImageIcon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>

                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {formValues.logo[0].name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(formValues.logo[0].size)}
                      </p>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <label
                    htmlFor="logoUpload"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 cursor-pointer font-medium"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Upload a different file
                  </label>
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
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                setValue("logo", e.target.files, { shouldValidate: true });
                setLogoPreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        {/* Upload School Stamp +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
        <div className="mb-4">
          <label
            htmlFor="stampUpload"
            className="bg-white rounded-md p-3 text-center border-2 border-gray-300 cursor-pointer block"
          >
            {formValues?.stamp?.[0] ? (
              <div className="mb-4">
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center p-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                        <ImageIcon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>

                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {formValues.stamp[0].name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(formValues.stamp[0].size)}
                      </p>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        onClick={handleRemoveStamp}
                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <label
                    htmlFor="stampUpload"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 cursor-pointer font-medium"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Upload a different file
                  </label>
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
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                setValue("stamp", e.target.files, { shouldValidate: true });
                setStampPreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        {/* Create Account Button +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
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
