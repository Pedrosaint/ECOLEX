/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAddCampusMutation } from "../api/campus.api";

export function useAddCampuses() {
  const [campus, setCampus] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [addCampus, { isLoading, isSuccess, isError, error }] =
    useAddCampusMutation();

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addCampus({
        name: campus,
        address,
        phoneNumber: number,
        email,
      }).unwrap();

      setCampus("");
      setAddress("");
      setNumber("");
      setEmail("");
    } catch (err) {
      console.error("Error adding campus:", err);
    }
  };

  const isFormComplete =
    campus.trim() !== "" &&
    address.trim() !== "" &&
    number.trim() !== "" &&
    email.trim() !== "";

  return {
    campus,
    setCampus,
    address,
    setAddress,
    number,
    setNumber,
    email,
    setEmail,
    showSuccess,
    showError,
    isLoading,
    isFormComplete,
    error,
    handleSubmit,
  };
}
