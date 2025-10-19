import { HiOutlineArrowSmRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";

interface NavLinkItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export default function Sidebar({
  navLinks,
  onClick,
  onLogoutClick,
}: {
  navLinks: NavLinkItem[];
  onClick?: () => void;
  onLogoutClick?: () => void;
}) {


  return (
    <>
      <div className="w-64 bg-[#8000BD] text-white flex flex-col justify-between rounded-3xl my-5 mx-2 h-[95%]">
        <div>
          {/* Logo */}
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white text-purple-600 px-2 py-1 rounded text-sm font-semibold">
                logo
              </div>
              <span className="text-sm">school name</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 font-sans">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/dashboard"}
                onClick={() => {
                  if (window.innerWidth < 768 && onClick) {
                    onClick();
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded ${
                    isActive
                      ? "text-[#8000BD] bg-gray-50 rounded-4xl"
                      : "hover:text-[#dfcfe6]"
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Log Out */}
        <div className="p-4">
          <button
            onClick={onLogoutClick}
            className="w-full bg-white bg-opacity-20 rounded-2xl px-3 py-2 flex items-center justify-between hover:bg-opacity-30 transition-colors cursor-pointer"
          >
            <span className="text-sm text-[#8000BD] font-sans font-semibold">
              Log Out
            </span>
            <div className="rounded-full border-2 border-[#8000BD] text-white flex items-center justify-center">
              <HiOutlineArrowSmRight className="w-4 h-4 text-[#8000BD]" />
            </div>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
    </>
  );
}
