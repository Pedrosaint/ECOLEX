import { useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import Logo from "../../assets/logo/logo.png";
import AuthModal from "../modal/auth-modal";
import { registerSchema } from "../auth-schema";
import { useGenerateTokenMutation } from "../api/auth-api";
// import { useAppDispatch } from "../../hooks/typed.hooks";
// import { setRegistrationData } from "../redux/auth-slice";

const GenerateToken = () => {
  // const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [generateToken] = useGenerateTokenMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      schoolName: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      console.log("Submitting:", values);
      setIsLoading(true);
      try {
        const response = await generateToken(values).unwrap();
        setToken(response.token);
        // dispatch(
        //   setRegistrationData({
        //     email: values.email,
        //     name: values.schoolName,
        //     token: response.token,
        //   })
        // );
        toast.success(response.message || "Token generated successfully!");
      } catch (error) {
        console.error("API Error:", error); // Log full error details
        toast.error("Failed to generate token");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCloseModal = () => {
    setToken(null);
  };

  return (
    <section className="h-screen bg-gray-100 relative">
      {/* Auth Modal */}
      {token && <AuthModal token={token} onClose={handleCloseModal} />}

      <div className="">
        <div className="">
          <div className="relative p-2 animate-bounce">
            <img src={Logo} alt=" " />
            <p className="absolute top-5 left-22 text-[#313131] text-3xl font-semibold">
              COLEX
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto max-w-sm md:max-w-3xl px-6 md:px-20 bg-[#FFFFFF] rounded-xl shadow-md space-y-20"
        >
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  placeholder=""
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <label className="block text-sm font-medium mb-1">
                  School Email
                </label>
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 flex justify-end text-xs mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="main mt-5">
              <div className="flex items-center relative">
                <input
                  type="text"
                  name="schoolName"
                  id="schoolName"
                  value={formik.values.schoolName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  placeholder=""
                  className={`${
                    formik.touched.schoolName && formik.errors.schoolName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <label className="block text-sm font-medium mb-1">
                  School Name
                </label>
              </div>
              {formik.touched.schoolName && formik.errors.schoolName && (
                <div className="text-red-500 flex justify-end text-xs mt-1">
                  {formik.errors.schoolName}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className={`w-full bg-[#8000BD] text-white font-medium py-3 px-4 rounded-sm transition duration-200 mb-35 ${
              isLoading || !formik.isValid
                ? "opacity-70 cursor-not-allowed"
                : "cursor-pointer hover:bg-[#6a00a3]"
            }`}
          >
            {isLoading ? "Generating..." : "Generate Token"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default GenerateToken;
