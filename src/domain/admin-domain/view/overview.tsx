import StatsCard from "../../../general/common/stat-card";
import CustomCalendar from "../components/custom-calender";
import Messages from "../components/messages";
import NoticeBoard from "../components/notice-board";
import StudentsChart from "../components/students";

export default function Overview() {
  return (
    <div className="flex gap-6">
      <div className="w-2/3">
        {/* Stats Cards */}
        <div className="col-span-8 grid grid-cols-3 gap-2">
          <StatsCard
            title="Students"
            value="5,909"
            color="bg-[#8000BD]"
            isPrimary
          />
          <StatsCard title="Teachers" value="60" />
          <StatsCard title="Staff" value="100" color="bg-[#8000BD]" isPrimary />
        </div>

        <div className="flex gap-4 mt-5">
          {/* Students Chart */}
          <div className="">
          <StudentsChart />
          </div>

          {/* Notice Board */}
          <div className="">
           <NoticeBoard />
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="mt-5">
          {/* ... exams content ... */}
        </div>
      </div>

      <div className="w-1/3">
        {/* Calendar */}
        <div className="">
          <CustomCalendar />
        </div>

        {/* Messages */}
        <div className="">
        <Messages />
        </div>
      </div>
    </div>
  );
}
