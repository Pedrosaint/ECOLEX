import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";

const CustomCalendar = () => {
  const [value] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
        <div className="bg-white rounded-4xl p-4 shadow-md text-center h-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[220px] mb-8">
              <ClipLoader color="#8B5CF6" loading={isLoading} size={50} />
            </div>
          ) : (
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
            className="!border-0 !w-full"
            formatShortWeekday={(_locale, date) =>
              ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]
            }
            tileClassName={({ date }) => {
              const today = new Date();
              const isToday = date.toDateString() === today.toDateString();
              return isToday
                ? "!bg-[#F04D23] !text-white rounded-full"
                : "rounded-full";
            }}
          />
          )}
        </div>
  );
};

export default CustomCalendar;
