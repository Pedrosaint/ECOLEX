import { useState } from "react";
import Logo from "../../assets/logo/logo.png";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CampusModal from "../modal/campus-modal";

const InputCampus = () => {
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="h-screen bg-gray-100 relative">
      {/* Auth Modal */}

      <div className="relative p-2">
        <img src={Logo} alt=" " />
        <p className="absolute top-5 left-22 text-[#313131] text-3xl font-semibold">
          COLEX
        </p>
      </div>

      <div className="py-10">
        <div className="mx-auto max-w-2xl px-20 bg-[#FFFFFF] rounded-xl shadow-md space-y-20">
          <div className="text-center pt-10">
            <button
              onClick={() => navigate("/auth/auth-layout/school-setup")}
              className="flex items-center text-gray-600 gap-1 cursor-pointer"
            >
              <IoIosArrowBack className="" />
              <span className="text-[12px]">Back to school setup</span>
            </button>

            <h1 className="text-3xl font-bold text-[#313131]">Campus</h1>
            <p className="text-md text-gray-600 mb-6">
              Input number of campuses.
            </p>
          </div>

          <input
            type="text"
            className="w-full px-3 py-2 text-gray-600 text-center bg-[#D9D9D9] border border-[#D9D9D9] rounded-sm outline-none"
            placeholder=" "
          />

          <button
            onClick={() => setIsModal(true)}
            className={`w-full bg-[#8000BD] text-white font-medium py-3 px-4 rounded-sm transition duration-200 mb-35 cursor-pointer`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModal && (
          <div className="">
            <CampusModal />
          </div>
      )}
    </section>
  );
};

export default InputCampus;
