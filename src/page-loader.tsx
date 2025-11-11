import { motion } from "framer-motion";
// import Logo from "../src/assets/logo/logo.png"

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0d0113]">
      <motion.div
        className="w-12 h-12 border-4 border-t-transparent border-[#8000BD] rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* <motion.div
        className="animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img src={Logo} alt="" />
        <span className="text-5xl">...</span>
      </motion.div> */}
    </div>
  );
};

export default Loader;
