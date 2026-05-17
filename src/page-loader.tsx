import { motion } from "framer-motion";
import Logo from "./assets/logo/logo.png";
import { getSchoolBranding } from "./utils/school-branding";

const Loader = () => {
  const { schoolName, schoolLogo } = getSchoolBranding();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0d0113] gap-4">
      <motion.div
        className="animate-pulse"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={schoolLogo ?? Logo}
          alt={schoolName ?? "Ecolex"}
          className="w-20 h-20 object-contain"
        />
      </motion.div>
      {schoolName && (
        <motion.p
          className="text-[#f0eeee] text-2xl font-semibold tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {schoolName}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
