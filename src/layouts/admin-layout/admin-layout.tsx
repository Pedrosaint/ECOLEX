import { navLinks } from "../../utils/sidebar-link";
import Sidebar from "../admin-layout/sidebar";
import Header from "../admin-layout/header";
import { Outlet } from "react-router-dom";

// export default function DashboardLayout() {
//   return (
//     <div className="flex h-screen bg-gray-500 ">
//       <Sidebar navLinks={navLinks} />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 py-3 px-3 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar navLinks={navLinks} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
  