import { useState } from "react";
import { useEditCampusMutation } from "../api/campus.api";

interface Campus {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}

export function useEditCampus(campus: Campus, onClose: () => void) {
  const [name, setName] = useState(campus.name);
  const [address, setAddress] = useState(campus.address || "");
  const [number, setNumber] = useState(campus.phoneNumber);
  const [email, setEmail] = useState(campus.email);
  const [showSuccess, setShowSuccess] = useState(false);

  const [editCampus, { isLoading }] = useEditCampusMutation();

  const handleSave = async () => {
    try {
      await editCampus({
        id: campus.id,
        payload: {
          name,
          address,
          phoneNumber: number,
          email,
        },
      }).unwrap();

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return {
    name,
    setName,
    address,
    setAddress,
    number,
    setNumber,
    email,
    setEmail,
    showSuccess,
    isLoading,
    handleSave,
  };
}
