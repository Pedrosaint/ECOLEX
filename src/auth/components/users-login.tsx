import { RiGraduationCapFill } from "react-icons/ri";
import { BsBookHalf } from "react-icons/bs";
import { IoKeySharp } from "react-icons/io5";
import Logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";

export default function UsersLogin() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-100 h-screen">
        <div className="pt-4">
          <div className="relative p-2 animate-bounce">
            <img src={Logo} alt=" " />
            <p className="absolute top-5 left-22 text-[#313131] text-3xl font-semibold">
              COLEX
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
              onClick={() => navigate("/auth/auth-layout/admin-login")}
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
                className="text-[#8000BD] underline hover:text-purple-700"
              >
                click here to create an account for your school here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
