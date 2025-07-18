import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const CustomCalendar = () => {
  const [value] = useState<Date | null>(new Date());

  // const handleDateChange = (val: Date | [Date, Date] | null) => {
  //   if (val instanceof Date) {
  //     setValue(val);
  //   } else if (Array.isArray(val) && val[0] instanceof Date) {
  //     setValue(val[0]); // or handle range logic if you want
  //   } else {
  //     setValue(null);
  //   }
  // };

  return (
    <div className="bg-white rounded-4xl p-4 shadow-md text-center">
      <Calendar
        // onChange={setValue}
        value={value}
        prevLabel={
          <div className="h-8 w-8 ml-2 flex items-center justify-center ">
            <RiArrowLeftSLine size={24} />
          </div>
        }
        nextLabel={
          <div className="h-8 w-8 ml-2 flex items-center justify-center ">
            <RiArrowRightSLine size={24} />
          </div>
        }
        next2AriaLabel="Next Month"
        prev2AriaLabel="Previous Month"
        next2Label={null}
        prev2Label={null}
        className="!border-0"
        formatShortWeekday={(_locale, date) =>
          ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]
        }
        tileClassName={({ date }) => {
          const today = new Date();
          const isToday = date.toDateString() === today.toDateString();
          return isToday ? "!bg-[#F04D23] !text-white rounded-full" : "rounded-full";
        }}
      />
      <div className="flex items-start">
        {" "}
        <button className="mt-3 px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-500">
          Manage Calendar
        </button>
      </div>
    </div>
  );
};

export default CustomCalendar;
