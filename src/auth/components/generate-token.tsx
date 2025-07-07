import { useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import Logo from "../../assets/logo/logo.png";
import AuthModal from "../modal/auth-modal";
import { registerSchema } from "../auth-schema";

const GenerateToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call and token generation using form values
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Submitted values:", values);
        const generatedToken = "ECLX-4021-ZA76";
        setToken(generatedToken);
        toast.success("Token generated successfully!");
      } catch (error) {
        toast.error("Failed to generate token");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCloseModal = () => {
    setToken(null); // Close the modal
  };

  return (
    <section className="h-screen bg-gray-100 relative">
      {/* Auth Modal */}
      {token && <AuthModal token={token} onClose={handleCloseModal} />}

      <div className="relative p-2 animate-bounce pt-6">
        <img src={Logo} alt=" " />
        <p className="absolute top-5 left-22 text-[#313131] text-3xl font-semibold">
          COLEX
        </p>
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
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  placeholder=""
                  className={`${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <label className="block text-sm font-medium mb-1">
                  School Name
                </label>
              </div>
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 flex justify-end text-xs mt-1">
                  {formik.errors.name}
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
