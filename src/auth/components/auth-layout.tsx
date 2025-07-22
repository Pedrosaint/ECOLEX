import { Outlet } from "react-router-dom";
import signUpImage from "../../assets/image/signup-image.png";
import backgroundImage from "../../assets/image/bg-image.png";
import Logo from "../../assets/logo/logo.png";
import { useInView } from "react-intersection-observer";

const SharedLayout = () => {
   const { ref, inView } = useInView({
     triggerOnce: true,
     threshold: 0.1,
   });
  return (
    <div
      ref={ ref }
      className="min-h-screen flex flex-col justify-center py-12 px-5 md:py-10 md:px-10 lg:px-10 2xl:px-100"
      style={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundImage: inView ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="">
        <div className="relative p-2 animate-bounce">
          <img src={Logo} alt=" " loading="lazy" />
          <p className="absolute top-5 left-22 text-[#f0eeee] text-3xl font-semibold">
            COLEX
          </p>
        </div>
      </div>
      <div className="md:flex border-5 border-gray-500 rounded-2xl">
        {/* Shared left image */}
        <div className="w-1/2 relative rounded-l-xl overflow-hidden hidden md:block">
          <img
            src={signUpImage}
            alt="Background"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="md:w-1/2 md:rounded-r-2xl backdrop-blur-md md:px-6 rounded-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;
