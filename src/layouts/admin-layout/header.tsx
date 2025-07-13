// import { ArrowLeft, Search, Bell, ChevronDown } from "lucide-react";

// export default function Header() {
//   return (
//     <header className="py-4 px-3 flex items-center justify-between ">
//       <div className="flex items-center space-x-4">
//         <button className="bg-[#FFFFFF] shadow-2xl border-2 border-[#f8f5f5]  rounded-xl p-3">
//           <ArrowLeft className="w-5 h-5 text-gray-600 cursor-pointer" />
//         </button>
//         <div className="flex items-center gap-2 bg-[#EBEAEF] rounded-3xl p-2">
//           <Search className="w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search"
//             className=" focus:outline-none"
//           />
//         </div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
//             <img src="https://www.google.com/s2/favicons?domain=google.com" alt="google logo" />
//         </div>
//         <div className="flex items-center space-x-2 cursor-pointer">
//           <span className="text-sm text-gray-700 font-sans">Admin name</span>
//           <ChevronDown className="w-4 h-4 text-gray-600" />
//         </div>
//         <Bell className="w-6 h-6 text-gray-600 cursor-pointer bg-gray-200 p-1 rounded-full" />
//       </div>
//     </header>
//   );
// }




// import { ArrowLeft, Search, Bell, ChevronDown } from "lucide-react";

// export default function Header() {
//   return (
//     <header className="py-4 px-3 flex items-center justify-between flex-wrap gap-y-3 sm:flex-nowrap sm:gap-0">
//       {/* Left Section */}
//       <div className="flex items-center space-x-2 w-full sm:w-auto">
//         {/* Back Button */}
//         <button className="bg-white shadow-2xl border-2 border-[#f8f5f5] rounded-xl p-2 sm:p-3">
//           <ArrowLeft className="w-5 h-5 text-gray-600 cursor-pointer" />
//         </button>

//         {/* Search Bar */}
//         <div className="flex items-center flex-1 sm:flex-initial gap-2 bg-[#EBEAEF] rounded-3xl p-2">
//           <Search className="w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full bg-transparent focus:outline-none text-sm"
//           />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-3 justify-end w-full sm:w-auto">
//         {/* Avatar */}
//         <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
//           <img
//             src="https://www.google.com/s2/favicons?domain=google.com"
//             alt="google logo"
//           />
//         </div>

//         {/* Admin Name */}
//         <div className="flex items-center space-x-1 cursor-pointer">
//           <span className="text-sm text-gray-700 font-sans">Admin name</span>
//           <ChevronDown className="w-4 h-4 text-gray-600" />
//         </div>

//         {/* Notification Bell */}
//         <Bell className="w-6 h-6 text-gray-600 cursor-pointer bg-gray-200 p-1 rounded-full" />
//       </div>
//     </header>
//   );
// }



import { ArrowLeft, Search, Bell, ChevronDown, Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="py-2 px-3 flex items-center justify-between flex-wrap gap-y-3 sm:flex-nowrap sm:gap-0">
      {/* Left Section */}
      <div className="flex items-center justify-between space-x-2 w-full sm:w-auto">
        {/* Hamburger Menu - Visible only on mobile */}
        <button
          className="bg-white shadow-2xl border-2 border-[#f8f5f5] rounded-xl p-2 sm:hidden mr-2"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5 text-gray-600 cursor-pointer" />
        </button>

        {/* Back Button - Hidden on mobile when hamburger is shown */}
        <button className="bg-white shadow-2xl border-2 border-[#f8f5f5] rounded-xl p-2 sm:p-3 hidden sm:block">
          <ArrowLeft className="w-5 h-5 text-gray-600 cursor-pointer" />
        </button>

        <div className="md:hidden flex items-center space-x-3 cursor-pointer">
          {" "}
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <img
              src="https://www.google.com/s2/favicons?domain=google.com"
              alt="google logo"
            />
          </div>
          {/* Admin Name */}
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="text-sm text-gray-700 font-sans">Admin name</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
          {/* Notification Bell */}
          <Bell
            size={30}
            className="text-gray-600 cursor-pointer bg-gray-200 p-2 rounded-full"
          />
        </div>

        {/* Rest of your header code remains the same */}
        <div className="md:flex items-center flex-1 hidden gap-2 bg-[#EBEAEF] rounded-3xl p-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 justify-end w-full sm:w-auto">
        {/* Avatar */}
        <div className="hidden md:flex items-center space-x-3 cursor-pointer">
          {" "}
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <img
              src="https://www.google.com/s2/favicons?domain=google.com"
              alt="google logo"
            />
          </div>
          {/* Admin Name */}
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="text-sm text-gray-700 font-sans">Admin name</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
          {/* Notification Bell */}
          <Bell
            size={30}
            className="text-gray-600 cursor-pointer bg-gray-200 p-2 rounded-full"
          />
        </div>

        <div className="flex items-center flex-1 md:hidden gap-2 bg-[#EBEAEF] rounded-3xl p-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent focus:outline-none text-sm"
          />
        </div>
      </div>
    </header>
  );
}