import StatsCard from "../../../../general/common/stat-card";
import CurrentAcademyInfo from "../components/current-academy-info";
import CustomCalendar from "../components/custom-calender";
import NoticeBoard from "../components/notice-board";
import StudentsChart from "../components/students";
import UpcomingExams from "../components/upcoming-exam";

export default function Overview() {
  return (
    <div className="">
      <div className="">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Students" value="5,909" isPrimary icon="user" />
          <StatsCard title="Staff" value="60" icon="staff" />
          <StatsCard title="Campuses" value="100" icon="campus" isPrimary />
          <StatsCard title="Current bill" value="N60,000" icon="bill" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <div className="w-full">
            <StudentsChart />
          </div>

          <div className="w-full">
            <CurrentAcademyInfo />
          </div>

          <div className="w-full">
            <CustomCalendar />
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <UpcomingExams />
          </div>
          <NoticeBoard />
        </div>
      </div>
    </div>
  );
}
