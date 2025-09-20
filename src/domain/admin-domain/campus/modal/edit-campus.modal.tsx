import { X } from "lucide-react";
import { useState } from "react";
import { useEditCampusMutation } from "../api/campus.api";

interface EditCampusProps {
  onClose: () => void;
  campus: {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
  };
}

const EditCampus = ({ onClose, campus }: EditCampusProps) => {
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

      // Auto-hide success and close modal
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">EDIT CAMPUS</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-[#8000BD] text-white px-4 py-2 text-sm rounded-md flex items-center disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campus Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Campus Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 text-black focus:outline-none"
                placeholder="E.g., Saints College"
                autoFocus
              />
            </div>

            {/* Principal */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
               Adress
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-black focus:outline-none"
                placeholder="E.g., Mrs Uzoechi"
              />
            </div>

            {/* Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Number
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-black focus:outline-none"
                placeholder="E.g., 09044523114"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-black focus:outline-none"
                placeholder="E.g., admin@gmail.com"
              />
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-[#67D424] text-white px-4 py-2 text-center text-sm font-medium mt-4">
              Campus was updated successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCampus;
