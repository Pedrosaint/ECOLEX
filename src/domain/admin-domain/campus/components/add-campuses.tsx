/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAddCampusMutation } from "../api/campus.api";

export default function AddCampuses() {
  const [campus, setCampus] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [addCampus, { isLoading, isSuccess, isError, error }] =
    useAddCampusMutation();

      useEffect(() => {
        if (isSuccess) {
          setShowSuccess(true);
          const timer = setTimeout(() => setShowSuccess(false), 3000);
          return () => clearTimeout(timer);
        }
      }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addCampus({
        name: campus,
        address,
        phoneNumber: number,
        email,
      }).unwrap();

      // clear form if successful
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border border-gray-300 rounded-lg p-6 bg-white shadow-md"
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        {/* Campus Name */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] mb-2">
            Campus Name
          </label>
          <input
            value={campus}
            placeholder="Mercy Model College"
            onChange={(e) => setCampus(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded text-sm focus:outline-none"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] mb-2">
            Address
          </label>
          <input
            value={address}
            placeholder="E.g.,  No 12, Ambrose Allie"
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded text-sm focus:outline-none"
          />
        </div>

        {/* Number */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] mb-2">
            Number
          </label>
          <input
            value={number}
            maxLength={11}
            placeholder="E.g 09044523114"
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded text-sm focus:outline-none"
          />
        </div>

         {/* Class Name Dropdown (custom controlled like Category) */}
        {/* <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] font-poppins mb-2">
            Principal Name
          </label>
          <input
            value={principal}
            placeholder="Mr Jude Wike"
            onChange={(e) => setprincipal(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded bg-white text-sm focus:outline-none"
          />
        </div> */}

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-[#120D1C] mb-2">Email</label>
          <input
            value={email}
            placeholder="E.g mercy@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded text-sm focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            disabled={!isFormComplete || isLoading}
            className={`text-white w-full px-4 py-4 rounded text-lg font-semibold transition-colors duration-200 ${
              isFormComplete && !isLoading
                ? "bg-[#8000BD] cursor-pointer"
                : "bg-[#D9D9D9] cursor-not-allowed"
            }`}
          >
            {isLoading ? "Adding..." : "Add Campus"}
          </button>
        </div>
      </form>

      {/* Success Message */}
      {showSuccess && (
        <AnimatePresence>
          <motion.div
            key="success-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-[#67D424] px-6 py-3 mt-4 rounded"
          >
            <p className="text-white font-semibold text-center">
              Campus was added successfully
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Error Message */}
      {isError && (
        <div className="bg-red-500 px-6 py-3 mt-4 rounded">
          <p className="text-white font-semibold text-center">
            {error && "data" in error
              ? (error as any).data.message
              : "Something went wrong"}
          </p>
        </div>
      )}
    </motion.div>
  );
}
