import { useState } from "react";
import { RiGraduationCapFill } from "react-icons/ri";
import { BsBookHalf } from "react-icons/bs";
import { IoKeySharp } from "react-icons/io5";
import Logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import { getSchoolBranding } from "../../utils/school-branding";

export default function UsersLogin() {
  const navigate = useNavigate();
  const [showDemoWarning, setShowDemoWarning] = useState(false);
  const { schoolName, schoolLogo } = getSchoolBranding();

  const handleAdminClick = () => {
    const accountCreated = localStorage.getItem("adminAccountCreated") === "true";
    navigate(accountCreated ? "/auth/auth-layout/admin-login" : "/auth/auth-layout/super-admin");
  };

  return (
    <>
      <div className="bg-gray-100 h-screen">
        <div className="pt-4">
          <div className="flex items-center gap-2 p-2">
            <img src={schoolLogo ?? Logo} alt={schoolName ?? "Ecolex"} className={schoolLogo ? "w-12 h-12 object-contain" : ""} />
            <p className="text-[#313131] text-3xl font-semibold">
              {schoolName ?? "COLEX"}
            </p>
          </div>
        </div>
        <div className=" flex items-center justify-center p-8 md:py-40 md:px-8">
          <div className="w-full max-w-5xl">
            <h1 className="text-2xl font-semibold text-[#8000BD] mb-5">
              I am...
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
              <div 
              onClick={() => navigate("/auth/auth-layout/student-login")}
              className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center hover:shadow-md transition-all cursor-pointer overflow-hidden group">
                {/* Diagonal overlay - now using group-hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute -left-10 -top-10 w-40 h-40 bg-gray-200 opacity-0 
                   group-hover:opacity-100 transition-opacity duration-300 
                   transform rotate-45 origin-bottom-right"
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <RiGraduationCapFill className="w-12 h-12 text-[#8000BD]" />
                  </div>
                  <h2 className="text-lg font-medium text-gray-900 group-hover:text-[#8000bd]">
                    A Student
                  </h2>
                </div>
              </div>

              <div 
              onClick={() => navigate("/auth/auth-layout/teachers-login")}
              className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center hover:shadow-md transition-all cursor-pointer overflow-hidden group">
                {/* Diagonal overlay - now using group-hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute -left-10 -top-10 w-40 h-40 bg-gray-200 opacity-0 
                   group-hover:opacity-100 transition-opacity duration-300 
                   transform rotate-45 origin-bottom-right"
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <BsBookHalf className="w-12 h-12 text-[#8000BD]" />
                  </div>
                  <h2 className="text-lg font-medium text-gray-900 group-hover:text-[#8000bd]">
                    A Teacher
                  </h2>
                </div>
              </div>

              <div 
              onClick={handleAdminClick}
              className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center hover:shadow-md transition-all cursor-pointer overflow-hidden group">
                {/* Diagonal overlay - now using group-hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute -left-10 -top-10 w-40 h-40 bg-gray-200 opacity-0 
                   group-hover:opacity-100 transition-opacity duration-300 
                   transform rotate-45 origin-bottom-right"
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <IoKeySharp className="w-12 h-12 text-[#8000BD]" />
                  </div>
                  <h2 className="text-lg font-medium text-gray-900 group-hover:text-[#8000bd]">
                    An Admin
                  </h2>
                </div>
              </div>
            </div>

            <p className="tex[#8000BD]">
              Not using Ecolex?{" "}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setShowDemoWarning(true); }}
                className="text-[#8000BD] underline hover:text-purple-700"
              >
                click here to create an account for your school here
              </a>
            </p>
          </div>
        </div>
      </div>

      {showDemoWarning && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Demo Mode</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              This feature is for <span className="font-semibold text-amber-600">testing and demo purposes only</span>. Any data you enter here will not be used when this application goes live. Please proceed with that in mind.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDemoWarning(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowDemoWarning(false); navigate("/auth/generate-token"); }}
                className="px-5 py-2.5 rounded-lg bg-[#8000BD] text-white text-sm font-medium hover:bg-[#6a00a0] transition-colors cursor-pointer"
              >
                I Understand, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
