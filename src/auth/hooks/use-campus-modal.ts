import { useNavigate } from "react-router-dom";
import { useSetupCampusMutation } from "../api/auth-api";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  loadStepProgress,
  saveStepProgress,
  incrementStep,
} from "../../utils/step-manager";
import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";

type FormValues = {
  campuses: {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
  }[];
};

interface UseCampusModalProps {
  campusCount: number;
  onClose?: () => void;
}

export function useCampusModal({ campusCount, onClose }: UseCampusModalProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const [setupCampus, { isLoading }] = useSetupCampusMutation();

  const { schoolId, schoolName } = useSelector((state: RootState) => state.schoolSetup);
  const localStorageSchoolId = Number(localStorage.getItem("schoolId")) || 0;
  const finalSchoolId = schoolId || localStorageSchoolId;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: { campuses: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "campuses" });

  useEffect(() => {
    if (!finalSchoolId) {
      toast.error("School information not available. Please complete school setup first.");
    }
  }, [finalSchoolId, schoolId, navigate]);

  useEffect(() => {
    if (schoolId && !localStorage.getItem("schoolId")) {
      localStorage.setItem("schoolId", schoolId.toString());
    }
  }, [schoolId]);

  useEffect(() => {
    const savedProgress = loadStepProgress();
    if (savedProgress?.formData?.campuses) {
      reset(savedProgress.formData);
    } else {
      remove();
      for (let i = 0; i < campusCount; i++) {
        append({ name: "", email: "", address: "", phoneNumber: "" });
      }
    }
  }, [remove, append, campusCount, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      const currentProgress = loadStepProgress();
      if (currentProgress) {
        saveStepProgress(currentProgress.step, value, { isOpen: true, campusCount });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, campusCount]);

  const onSubmit = async (data: FormValues) => {
    if (!finalSchoolId) {
      toast.error("School information not available. Please complete school setup first.");
      return;
    }
    try {
      const payload = {
        school_id: finalSchoolId,
        campuses: data.campuses.map((campus) => ({
          name: campus.name,
          email: campus.email,
          address: campus.address,
          phoneNumber: String(campus.phoneNumber),
        })),
      };

      const response = await setupCampus({ credentials: payload, token }).unwrap();
      if (!response.date?.savedCampuses) {
        throw new Error("API response is missing campus data");
      }
      const createdCampusIds = response.date.savedCampuses.map((campus) => campus.id);
      if (createdCampusIds.length === 0) {
        throw new Error("No campus IDs were created");
      }
      localStorage.setItem("campusIds", JSON.stringify(createdCampusIds));

      if (response.step) {
        saveStepProgress(response.step, data, { isOpen: false, campusCount: 0 });
      } else {
        const nextStep = incrementStep();
        saveStepProgress(nextStep, data, { isOpen: false, campusCount: 0 });
      }

      toast.success(response.message);
      navigate("/auth/customize-school-name", { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create campus");
    }
  };

  const handleClose = () => {
    const currentData = watch();
    const currentProgress = loadStepProgress();
    if (currentProgress) {
      saveStepProgress(currentProgress.step, currentData, { isOpen: false, campusCount: 0 });
    }
    onClose?.();
  };

  return {
    finalSchoolId,
    schoolName,
    isLoading,
    fields,
    register,
    handleSubmit,
    errors,
    navigate,
    onSubmit,
    handleClose,
  };
}
