import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schoolSetupSchema } from "../auth-schema";
import { useNavigate } from "react-router-dom";
import {
  useForm,
  useWatch,
  type Resolver,
} from "react-hook-form";
import { useSchoolSetupMutation } from "../api/auth-api";
import { toast } from "sonner";
import { type FormValues } from "../models/types";
import { useAppSelector } from "../../hooks/typed.hooks";

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

const steps = [
  { id: 1, label: "Email" },
  { id: 2, label: "Number" },
  { id: 3, label: "Address" },
  { id: 4, label: "Prefix" },
  { id: 5, label: "Logo" },
  { id: 6, label: "" },
];

export function useSchoolSetup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [stampPreview, setStampPreview] = useState<string | null>(null);
  const [SchoolSetup] = useSchoolSetupMutation();
  const { registeredEmail, registeredName } = useAppSelector((state) => state.authRegistration);
  const [, setLogoFile] = useState<File | null>(null);
  const [, setStampFile] = useState<File | null>(null);

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

  const formValues = useWatch({ control });

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

  useEffect(() => {
    const subscription = watch((value) => {
      saveFormData(value as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setValue("name", registeredName);
    setValue("email", registeredEmail);
  }, [registeredName, registeredEmail, setValue]);

  useEffect(() => {
    if (formValues?.phoneNumber && currentStep < 2) setCurrentStep(2);
    if (formValues?.address && currentStep < 3) setCurrentStep(3);
    if (formValues?.logoUrl && currentStep < 5) setCurrentStep(5);
    if (formValues?.stampUrl && currentStep < 6) setCurrentStep(6);
  }, [formValues, currentStep]);

  useEffect(() => {
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

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);
      if (data.prefix) {
        formData.append("prefix", data.prefix);
      }
      if (data.logoUrl?.[0]) {
        formData.append("logoUrl", data.logoUrl[0]);
      }
      if (data.stampUrl?.[0]) {
        formData.append("stampUrl", data.stampUrl[0]);
      }
      const response = await SchoolSetup({ formData, token }).unwrap();
      clearFormData();
      localStorage.setItem("schoolId", response.school.id.toString());
      toast.success("School setup successful");
      navigate("/auth/input-campus", { replace: true });
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Failed to submit form");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    currentStep,
    steps,
    logoPreview,
    stampPreview,
    register,
    handleSubmit,
    errors,
    setValue,
    handleLogoChange,
    handleStampChange,
    handleRemoveLogo,
    handleRemoveStamp,
    onSubmit,
    navigate,
  };
}
