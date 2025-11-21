
// import confetti from "canvas-confetti"
// import { useNavigate } from "react-router-dom";
// import congratulation from "../../assets/image/congratulation.png";
// import { useEffect } from "react";

// const Congratulation = () => {
//     const navigate = useNavigate();
//     useEffect(() => {
//       confetti({
//         particleCount: 150,
//         spread: 70,
//         origin: { y: 0.4, x: 0.7 },
//         colors: ["#030e4c", "#4f46e5", "#10b981", "#f59e0b"],
//       });
//     }, []);

//   return (
//     <div className="relative z-20 flex items-center justify-center gap-4 text-center">
//       <div className="p-15 min-h-screen">
//         <div className="flex items-center justify-center gap-4 text-center">
//           <div className="w-1/2 rounded-2xl bg-[#EBE9FE] hidden md:block">
//             <img src={congratulation} alt="" className="w-[672px] h-[522px]" />
//           </div>
//           <div className="md:w-1/2 space-y-10 my-40 md:my-0">
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
//             </div>
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-900">
//                 Congratulations!
//               </h1>
//               <p className="text-gray-700 text-base">
//                 School Setup Created Successfully
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 navigate("/auth/auth-layout/admin-login");
//                 console.log("clicked");
//               }}
//               className="bg-[#8000BD] w-full text-white font-medium py-2 px-4 rounded-sm text-base transition-colors cursor-pointer"
//             >
//               Proceed to Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Congratulation;





import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import congratulation from "../../assets/image/congratulation.png";
import { useEffect } from "react";
import { clearStepProgressOnCompletion } from "../../utils/step-manager"; // Adjust the import path as needed

const Congratulation = () => {
  const navigate = useNavigate();

useEffect(() => {
  // Launch confetti animation only
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.4, x: 0.7 },
    colors: ["#030e4c", "#4f46e5", "#10b981", "#f59e0b"],
  });
}, []);

const handleProceedToLogin = () => {
  // Clear progress only when user explicitly proceeds
  clearStepProgressOnCompletion();
  console.log("Setup progress cleared - proceeding to login");
  navigate("/auth/auth-layout/admin-login");
};

  return (
    <div className="relative z-20 flex items-center justify-center gap-4 text-center">
      <div className="p-15 min-h-screen">
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="w-1/2 rounded-2xl bg-[#EBE9FE] hidden md:block">
            <img
              src={congratulation}
              alt="Congratulations illustration"
              className="w-[672px] h-[522px]"
            />
          </div>
          <div className="md:w-1/2 space-y-10 my-40 md:my-0">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Confetti container - confetti is handled by canvas-confetti */}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Congratulations!
              </h1>
              <p className="text-gray-700 text-base">
                School Setup Created Successfully
              </p>
            </div>
            <button
              onClick={handleProceedToLogin}
              className="bg-[#8000BD] w-full text-white font-medium py-2 px-4 rounded-sm text-base transition-colors cursor-pointer hover:bg-[#6a00a3] focus:outline-none focus:ring-2 focus:ring-[#8000BD] focus:ring-offset-2"
            >
              Proceed to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;