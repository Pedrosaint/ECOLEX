// import { useNavigate } from 'react-router-dom';
// import congratulation from '../../assets/image/congratulation.png'

// const Congratulation = () => {
//     const navigate = useNavigate();
//   return (
//     <div className="p-15 min-h-screen">
//       <div className="flex items-center justify-center gap-4 text-center">
//         <div className="w-1/2 rounded-2xl bg-[#EBE9FE]">
//           <img src={congratulation} alt="" className="w-[672px] h-[622px]" />
//         </div>
//         <div className="w-1/2 space-y-10">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900">
//               Congratulations!
//             </h1>
//             <p className="text-gray-700 text-base">
//               School Setup Created Successfully
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/auth/auth-layout/admin-login")}
//             className="bg-[#8000BD] w-full text-white font-medium py-2 px-4 rounded-sm text-base transition-colors cursor-pointer"
//           >
//             Proceed to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Congratulation


import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { useNavigate } from "react-router-dom";
import congratulation from "../../assets/image/congratulation.png";

const Congratulation = () => {
    const navigate = useNavigate();
  const [width, height] = useWindowSize();

  return (
    <div className="relative z-10 flex items-center justify-center gap-4 text-center">
      <div className="p-15 min-h-screen">
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="w-1/2 rounded-2xl bg-[#EBE9FE] hidden md:block">
            <img src={congratulation} alt="" className="w-[672px] h-[522px]" />
          </div>
          <div className="md:w-1/2 space-y-10 my-40 md:my-0">
            <div className="absolute inset-0 overflow-hidden">
              <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={200}
                style={{ position: "absolute" }}
              />
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
              onClick={() => navigate("/auth/auth-layout/admin-login")}
              className="bg-[#8000BD] w-full text-white font-medium py-2 px-4 rounded-sm text-base transition-colors cursor-pointer"
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