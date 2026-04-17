import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import congratulation from "../../assets/image/congratulation.png";
import { useEffect } from "react";
import { clearStepProgressOnCompletion } from "../../utils/step-manager";

const Congratulation = () => {
  const navigate = useNavigate();

  // Get token
  const token = localStorage.getItem("token");
  const hasLoggedIn = localStorage.getItem("hasLoggedIn");

  useEffect(() => {
    // Confetti for both new and returning admins
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.4, x: 0.7 },
      colors: ["#030e4c", "#4f46e5", "#10b981", "#f59e0b"],
    });
  }, []);

  const handleProceed = () => {
    if (token && hasLoggedIn) {
      // Returning admin -> skip login
      navigate("/admin/dashboard");
    } else {
      // First-time admin -> must login
      clearStepProgressOnCompletion();
      navigate("/auth/auth-layout/admin-login");
    }
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
            <div className="absolute inset-0 overflow-hidden pointer-events-none" />

            <h1 className="text-2xl font-semibold text-gray-900">
              Congratulations!
            </h1>
            <p className="text-gray-700 text-base">
              School Setup Created Successfully
            </p>

            <button
              onClick={handleProceed}
              className="bg-[#8000BD] w-full text-white font-medium py-2 px-4 rounded-sm cursor-pointer"
            >
              {hasLoggedIn ? "Proceed to Dashboard" : "Proceed to Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;









// import confetti from "canvas-confetti";
// import { useNavigate } from "react-router-dom";
// import congratulation from "../../assets/image/congratulation.png";
// import { useEffect } from "react";
// import { clearStepProgressOnCompletion } from "../../utils/step-manager";
// import type { AdminLoginResponse } from "../redux/response";
// import { toast } from "sonner";
// import { useAdminLoginMutation } from "../api/auth-api";

// const Congratulation = () => {
//   const navigate = useNavigate();
//   const [adminLogin] = useAdminLoginMutation();

// useEffect(() => {
//   // Launch confetti animation only
//   confetti({
//     particleCount: 150,
//     spread: 70,
//     origin: { y: 0.4, x: 0.7 },
//     colors: ["#030e4c", "#4f46e5", "#10b981", "#f59e0b"],
//   });
// }, []);

// const handleProceedToLogin = (data: AdminLoginResponse) => {
//   try {
//     const response: AdminLoginResponse = async () => await adminLogin(data.data.admin).unwrap();
//     console.log("Response:", response);

//     if (response.data.admin.hasLoggedIn) {
//       navigate("/admin/dashboard");
//       toast.success("Congratulations! You have successfully logged in");
//     } else {
//         clearStepProgressOnCompletion();
//         console.log("Setup progress cleared - proceeding to login");
//         navigate("/auth/auth-layout/admin-login");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     toast.error("Failed to login");
//   }
// };

//   return (
//     <div className="relative z-20 flex items-center justify-center gap-4 text-center">
//       <div className="p-15 min-h-screen">
//         <div className="flex items-center justify-center gap-4 text-center">
//           <div className="w-1/2 rounded-2xl bg-[#EBE9FE] hidden md:block">
//             <img
//               src={congratulation}
//               alt="Congratulations illustration"
//               className="w-[672px] h-[522px]"
//             />
//           </div>
//           <div className="md:w-1/2 space-y-10 my-40 md:my-0">
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//               {/* Confetti container - confetti is handled by canvas-confetti */}
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
//               onClick={handleProceedToLogin}
//               className="bg-[#8000BD] w-full text-white font-medium py-2 px-4 rounded-sm text-base transition-colors cursor-pointer hover:bg-[#6a00a3] focus:outline-none focus:ring-2 focus:ring-[#8000BD] focus:ring-offset-2"
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
