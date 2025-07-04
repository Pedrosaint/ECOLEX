import { Outlet } from "react-router-dom";
import signUpImage from "../../assets/image/signup-image.png";
import backgroundImage from "../../assets/image/bg-image.png";

const SharedLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 md:py-10 md:px-10 lg:px-10 2xl:px-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex border-5 border-gray-500 rounded-2xl">
        {/* Shared left image */}
        <div className="w-1/2 relative rounded-l-xl overflow-hidden">
          <img
            src={signUpImage}
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-1/2 rounded-r-2xl backdrop-blur-md px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;
