// // In your GenerateToken component file
// import { useState } from "react";
// import { toast } from "sonner";
// import Logo from "../../assets/logo/logo.png";

// const GenerateToken = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGenerateToken = async () => {
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       toast.success("Token generated successfully!");
//       // Here you would typically set the generated token in state
//     } catch (error) {
//       toast.error("Failed to generate token");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className="h-screen  bg-gray-100">
//       <div className="relative p-2">
//         <img src={Logo} alt=" " />
//         <p className="absolute top-5 left-22 text-[#313131] text-3xl font-semibold">COLEX</p>
//       </div>
//       <div className="py-20">
//         <div className="mx-auto max-w-3xl px-20 bg-[#FFFFFF] rounded-xl shadow-md space-y-20">
//           <div className="text-center pt-10">
//             <h1 className="text-2xl font-bold text-[#313131]">System Admin</h1>
//             <p className="text-sm text-gray-600 mb-6">
//               Manage token access easily
//             </p>
//           </div>

        //   <div className="space-y-4 mb-6">
        //     <div className="main mt-5">
        //       <div className="flex items-center relative">
        //         <input
        //           type="email"
        //           name="email"
        //           id="email"
        //           required
        //           placeholder=""
        //         />
        //         <label className="block text-sm font-medium mb-1">
        //           School Email
        //         </label>
        //       </div>
        //     </div>

        //     <div className="main mt-5">
        //       <div className="flex items-center relative">
        //         <input
        //           type="name"
        //           name="name"
        //           id="name"
        //           required
        //           placeholder=""
        //         />
        //         <label className="block text-sm font-medium mb-1">
        //           School Name
        //         </label>
        //       </div>
        //     </div>
        //   </div>

//           <button
//             onClick={handleGenerateToken}
//             disabled={isLoading}
//             className={`w-full bg-[#8000BD] text-white font-medium py-3 px-4 rounded-sm transition duration-200 cursor-pointer mb-35 ${
//               isLoading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Generating..." : "Generate Token"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GenerateToken;




import { useState } from "react";
import { toast } from "sonner";
import Logo from "../../assets/logo/logo.png";
import AuthModal from "../modal/auth-modal";

const GenerateToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleGenerateToken = async () => {
    setIsLoading(true);
    try {
      // Simulate API call and token generation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const generatedToken = "ECLX-4021-ZA76"; 
      setToken(generatedToken);
      toast.success("Token generated successfully!");
    } catch (error) {
      toast.error("Failed to generate token");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setToken(null); // Close the modal
  };

  return (
    <section className="h-screen bg-gray-100 relative">
      {/* Auth Modal */}
      {token && <AuthModal token={token} onClose={handleCloseModal} />}

      <div className="relative p-2">
        <img src={Logo} alt=" " />
        <p className="absolute top-5 left-22 text-[#313131] text-3xl font-semibold">
          COLEX
        </p>
      </div>

      <div className="py-20">
        <div className="mx-auto max-w-3xl px-20 bg-[#FFFFFF] rounded-xl shadow-md space-y-20">
          <div className="text-center pt-10">
            <h1 className="text-3xl font-bold text-[#313131]">System Admin</h1>
            <p className="text-md text-gray-600 mb-6">
              Manage token access easily
            </p>
          </div>

        <div className="space-y-4 mb-6">
            <div className="main mt-5">
              <div className="flex items-center relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder=""
                />
                <label className="block text-sm font-medium mb-1">
                  School Email
                </label>
              </div>
            </div>

            <div className="main mt-5">
              <div className="flex items-center relative">
                <input
                  type="name"
                  name="name"
                  id="name"
                  required
                  placeholder=""
                />
                <label className="block text-sm font-medium mb-1">
                  School Name
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateToken}
            disabled={isLoading}
            className={`w-full bg-[#8000BD] text-white font-medium py-3 px-4 rounded-sm transition duration-200 mb-35 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? "Generating..." : "Generate Token"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GenerateToken;
