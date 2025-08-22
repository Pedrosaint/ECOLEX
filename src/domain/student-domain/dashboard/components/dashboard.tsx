// import StatsCard from "../../../../general/common/stat-card";
// import { motion } from "framer-motion";
// import { StatsCardSkeleton } from "../../../../general/ui/skeleton-loader.ui";
// import { useEffect, useState } from "react";


// interface StatsCardProps {
//   title: string;
//   value: string;
//   isPrimary?: boolean;
//   userRole: string;
// }

// export default function Dashboard() {
//   const [loading, setLoading] = useState(true);
//   const cards: Array<StatsCardProps> = [
//     {
//       title: "Total School Fee For Current Term",
//       value: "5,909",
//       isPrimary: true,
//       userRole: "student",
//     },
//     { title: "Staff", value: "60", userRole: "student" },
//     {
//       title: "Campuses",
//       value: "100",
//       isPrimary: true,
//       userRole: "student",
//     },
//     { title: "Current bill", value: "N60,000",userRole: "student" },
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="">
//       <div className="">
//         {/* Stats Cards */}
//         {loading ? (
//           // Show 4 skeletons
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {[...Array(4)].map((_, i) => (
//               <StatsCardSkeleton key={i} />
//             ))}
//           </div>
//         ) : (
//           <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {cards.map((card, index) => (
//               <motion.div
//                 key={card.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//               >
//                 <StatsCard {...card} />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { StatsCardSkeleton } from "../../../../general/ui/skeleton-loader.ui";
import { motion } from "framer-motion";
import StatsCard from "../../../../general/common/stat-card";

interface StatsCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  flipLayout?: boolean;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userRole] = useState("student"); // This would come from auth context
  
  // Card configurations
  const adminCards: Array<StatsCardProps> = [
    { title: "Total Students", value: "1,200", isPrimary: true },
    { title: "Staff", value: "60" },
    { title: "Campuses", value: "100", isPrimary: true },
    { title: "Revenue", value: "N5,000,000" },
  ];


  const studentCards: Array<StatsCardProps> = [
    {
      title: "Total School Fee For Current Term",
      value: "N60,000",
      isPrimary: true,
      flipLayout: true,
    },
    { title: "Total Students in Your Class", value: "60", flipLayout: true },
    {
      title: "Pending Debt For You To Pay",
      value: "12",
      isPrimary: true,
      flipLayout: true,
    },
    {
      title: "Active Assignments For Your Class",
      value: "0",
      flipLayout: true,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const cardsToShow = userRole === "admin" ? adminCards : studentCards;

  return (
    <div className="">
      <div className="">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <StatsCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {cardsToShow.map((card, index) => (
              <motion.div
                key={`${card.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <StatsCard {...card} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}