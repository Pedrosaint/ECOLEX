// import {  useState } from "react";
// import Logo from "../../assets/logo/logo.png";
// import { IoIosArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import CampusModal from "../modal/campus-modal";

// const InputCampus = () => {
//   const [isModal, setIsModal] = useState(false);
//   const [campusCount, setCampusCount] = useState(0);
//   const navigate = useNavigate();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(e.target.value);
//     setCampusCount(isNaN(value) ? 0 : value);
//   };

//   // const { school_id } = useAppSelector((state) => state.school);
  

//   return (
//     <section className="h-screen bg-gray-100 relative">
//       {/* Auth Modal */}

//       <div className="relative p-2 animate-bounce pt-6">
//         <img src={Logo} alt=" " />
//         <p className="absolute top-5 left-22 text-[#313131] text-3xl font-semibold">
//           COLEX
//         </p>
//       </div>

//       <div className="py-10 px-5 md:px-0">
//         <div className="md:mx-auto md:max-w-2xl md:px-20 px-10 bg-[#FFFFFF] rounded-xl shadow-md space-y-20">
//           <div className="text-center pt-10">
//             <button
//               onClick={() => navigate("/auth/auth-layout/school-setup")}
//               className="flex items-center text-gray-600 gap-1 cursor-pointer"
//             >
//               <IoIosArrowBack className="" />
//               <span className="text-[12px]">Back to school setup</span>
//             </button>

//             <h1 className="text-3xl font-bold text-[#313131] pt-2">Campus</h1>
//             <p className="text-md text-gray-600 mb-6">
//               Input number of campuses.
//             </p>
//           </div>

//           <input
//             type="number"
//             min="1"
//             className="w-full px-3 py-2 text-gray-600 text-center border border-[#D9D9D9] rounded-sm outline-none"
//             placeholder="Input number of campuses"
//             onChange={handleInputChange}
//           />

//           <button
//             onClick={() => campusCount > 0 && setIsModal(true)}
//             className={`w-full bg-[#8000BD] text-white font-medium py-3 px-4 rounded-sm transition duration-200 mb-35 cursor-pointer ${
//               campusCount <= 0 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={campusCount <= 0}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModal && (
//         <div className="">
//           <CampusModal
//             campusCount={campusCount}
//             onClose={() => setIsModal(false)}
//           />
//         </div>
//       )}
//     </section>
//   );
// };

// export default InputCampus;




// import { useState, useEffect } from "react";
// import Logo from "../../assets/logo/logo.png";
// import { IoIosArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import CampusModal from "../modal/campus-modal";
// import {
//   getModalState,
//   saveModalState,
//   loadStepProgress,
// } from "../../utils/step-manager";

// const InputCampus = () => {
//   const [isModal, setIsModal] = useState(false);
//   const [campusCount, setCampusCount] = useState(0);
//   const navigate = useNavigate();

//   // Check for saved modal state on component mount
//   useEffect(() => {
//     const savedModalState = getModalState();
//     const savedProgress = loadStepProgress();

//     if (savedModalState?.isOpen && savedProgress?.formData) {
//       // Auto-open modal with saved data
//       setIsModal(true);
//       setCampusCount(savedModalState.campusCount);
//     }
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(e.target.value);
//     const newCount = isNaN(value) ? 0 : value;
//     setCampusCount(newCount);

//     // Save campus count when it changes
//     if (newCount > 0) {
//       saveModalState(isModal, newCount);
//     }
//   };

//   const handleOpenModal = () => {
//     if (campusCount > 0) {
//       setIsModal(true);
//       // Save modal state when opening
//       saveModalState(true, campusCount);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModal(false);
//     // Save modal state when closing
//     saveModalState(false, campusCount);
//   };

//   const handleBackNavigation = () => {
//     // Clear modal state when going back
//     saveModalState(false, 0);
//     navigate("/auth/auth-layout/school-setup");
//   };

//   return (
//     <section className="h-screen bg-gray-100 relative">
//       {/* Auth Modal */}

      // <div className="relative p-2 animate-bounce pt-6">
      //   <img src={Logo} alt=" " />
      //   <p className="absolute top-5 left-22 text-[#313131] text-3xl font-semibold">
      //     COLEX
      //   </p>
      // </div>

      // <div className="py-10 px-5 md:px-0">
      //   <div className="md:mx-auto md:max-w-2xl md:px-20 px-10 bg-[#FFFFFF] rounded-xl shadow-md space-y-20">
      //     <div className="text-center pt-10">
      //       <button
      //         onClick={handleBackNavigation}
      //         className="flex items-center text-gray-600 gap-1 cursor-pointer"
      //       >
      //         <IoIosArrowBack className="" />
      //         <span className="text-[12px]">Back to school setup</span>
      //       </button>

      //       <h1 className="text-3xl font-bold text-[#313131] pt-2">Campus</h1>
      //       <p className="text-md text-gray-600 mb-6">
      //         Input number of campuses.
      //       </p>
      //     </div>

//           <input
//             type="number"
//             min="1"
//             value={campusCount || ""}
//             className="w-full px-3 py-2 text-gray-600 text-center border border-[#D9D9D9] rounded-sm outline-none"
//             placeholder="Input number of campuses"
//             onChange={handleInputChange}
//           />

//           <button
//             onClick={handleOpenModal}
//             className={`w-full bg-[#8000BD] text-white font-medium py-3 px-4 rounded-sm transition duration-200 mb-35 cursor-pointer ${
//               campusCount <= 0 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={campusCount <= 0}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModal && (
//         <div className="">
//           <CampusModal campusCount={campusCount} onClose={handleCloseModal} />
//         </div>
//       )}
//     </section>
//   );
// };

// export default InputCampus;







import { useState, useEffect } from "react";
import Logo from "../../assets/logo/logo.png";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CampusModal from "../modal/campus-modal";
import {
  getModalState,
  loadStepProgress,
  saveStepProgress,
  initializeStepProgress,
} from "../../utils/step-manager";

const InputCampus = () => {
  const [isModal, setIsModal] = useState(false);
  const [campusCount, setCampusCount] = useState(0);
  const navigate = useNavigate();

  // Initialize step progress and check for saved state on component mount
  useEffect(() => {
    const savedModalState = getModalState();
    const currentProgress = loadStepProgress();

    // Initialize step progress if it doesn't exist
    if (!currentProgress) {
      initializeStepProgress();
    } else if (currentProgress.step.current < 1) {
      // Ensure step is at least 1
      const updatedStep = {
        ...currentProgress.step,
        current: 1,
        previous: 1,
      };
      saveStepProgress(
        updatedStep,
        currentProgress.formData,
        currentProgress.modalState,
        currentProgress.schoolCustomization
      );
    }

    // Restore modal state if it was open
    if (savedModalState?.isOpen) {
      setIsModal(true);
      setCampusCount(savedModalState.campusCount || 0);
    } else if (currentProgress?.formData?.campuses) {
      // If we have saved campus data but modal isn't open, restore campus count
      const campuses = currentProgress.formData.campuses;
      if (Array.isArray(campuses) && campuses.length > 0) {
        setCampusCount(campuses.length);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newCount = isNaN(value) ? 0 : value;
    setCampusCount(newCount);

    // Save campus count using saveStepProgress
    const currentProgress = loadStepProgress();
    if (currentProgress) {
      saveStepProgress(
        currentProgress.step,
        currentProgress.formData,
        { isOpen: isModal, campusCount: newCount },
        currentProgress.schoolCustomization
      );
    }
  };

  const handleOpenModal = () => {
    if (campusCount > 0) {
      setIsModal(true);
      // Save modal state using saveStepProgress
      const currentProgress = loadStepProgress();
      if (currentProgress) {
        saveStepProgress(
          currentProgress.step,
          currentProgress.formData,
          { isOpen: true, campusCount },
          currentProgress.schoolCustomization
        );
      }
    }
  };

  const handleCloseModal = () => {
    setIsModal(false);
    // Save modal state using saveStepProgress
    const currentProgress = loadStepProgress();
    if (currentProgress) {
      saveStepProgress(
        currentProgress.step,
        currentProgress.formData,
        { isOpen: false, campusCount: 0 },
        currentProgress.schoolCustomization
      );
    }
  };

  const handleBackNavigation = () => {
    // Clear modal state using saveStepProgress
    const currentProgress = loadStepProgress();
    if (currentProgress) {
      saveStepProgress(
        currentProgress.step,
        currentProgress.formData,
        { isOpen: false, campusCount: 0 },
        currentProgress.schoolCustomization
      );
    }
    navigate("/auth/auth-layout/school-setup");
  };

  return (
    <section className="h-screen bg-gray-100 relative">
      <div className="relative p-2 animate-bounce pt-6">
        <img src={Logo} alt=" " />
        <p className="absolute top-5 left-22 text-[#313131] text-3xl font-semibold">
          COLEX
        </p>
      </div>

      <div className="py-10 px-5 md:px-0">
        <div className="md:mx-auto md:max-w-2xl md:px-20 px-10 bg-[#FFFFFF] rounded-xl shadow-md space-y-20">
          <div className="text-center pt-10">
            <button
              onClick={handleBackNavigation}
              className="flex items-center text-gray-600 gap-1 cursor-pointer"
            >
              <IoIosArrowBack className="" />
              <span className="text-[12px]">Back to school setup</span>
            </button>

            <h1 className="text-3xl font-bold text-[#313131] pt-2">Campus</h1>
            <p className="text-md text-gray-600 mb-6">
              Input number of campuses.
            </p>
          </div>

          <input
            type="number"
            min="1"
            value={campusCount || ""}
            className="w-full px-3 py-2 text-gray-600 text-center border border-[#D9D9D9] rounded-sm outline-none"
            placeholder="Input number of campuses"
            onChange={handleInputChange}
          />

          <button
            onClick={handleOpenModal}
            className={`w-full bg-[#8000BD] text-white font-medium py-3 px-4 rounded-sm transition duration-200 mb-35 cursor-pointer ${
              campusCount <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={campusCount <= 0}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModal && (
        <CampusModal campusCount={campusCount} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default InputCampus;