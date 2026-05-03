import { useState } from "react";
import {
  useGetTeacherClassesQuery,
  useGetTeacherSessionQuery,
  useGetActiveTermQuery,
  useGetTeacherBroadsheetQuery,
} from "../../overview/hooks";
import ViewClassTable from "./view-class-table";

const chevron = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

const selectBase = "w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10";

interface BroadsheetFilter {
  classId: number;
  academicSessionId: number;
  termId: number;
}

const ViewClassResult = () => {
  const [selectedClassId, setSelectedClassId] = useState<number | "">("");
  const [filter, setFilter] = useState<BroadsheetFilter | null>(null);

  const { data: classesData, isLoading: classesLoading } = useGetTeacherClassesQuery();
  const { data: sessionData, isLoading: sessionLoading } = useGetTeacherSessionQuery();
  const { data: activeTermData, isLoading: activeTermLoading } = useGetActiveTermQuery();

  const classes = classesData?.data ?? [];
  const session = sessionData?.data ?? null;
  const activeTerm = activeTermData?.data ?? null;

  const { data: broadsheetData, isLoading: broadsheetLoading, isFetching } = useGetTeacherBroadsheetQuery(
    filter!,
    { skip: !filter }
  );

  const handleDisplay = () => {
    if (!selectedClassId) return;
    if (!session?.id || !activeTerm?.activeTerm?.id) return;
    setFilter({
      classId: Number(selectedClassId),
      academicSessionId: session.id,
      termId: activeTerm.activeTerm.id,
    });
  };

  const canDisplay = !!selectedClassId && !!session?.id && !!activeTerm?.activeTerm?.id;

  return (
    <div>
      <div className="bg-[#D9D9D9] p-4 text-sm md:text-lg font-inter font-semibold shadow-sm">
        <h1>View Class Result</h1>
      </div>
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Session */}
            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Academic Session
              </label>
              <div className="relative">
                <select className={`${selectBase} ${session ? "text-gray-900" : "text-gray-400"}`} disabled={sessionLoading}>
                  <option value="">{sessionLoading ? "Loading..." : "Select Session"}</option>
                  {session && <option value={session.id} selected>{session.name}</option>}
                </select>
                {chevron}
              </div>
            </div>

            {/* Term */}
            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Academic Term
              </label>
              <div className="relative">
                <select className={`${selectBase} ${activeTerm ? "text-gray-900" : "text-gray-400"}`} disabled={activeTermLoading}>
                  <option value="">{activeTermLoading ? "Loading..." : "Select Term"}</option>
                  {activeTerm?.activeTerm && (
                    <option value={activeTerm.activeTerm.id} selected>{activeTerm.activeTerm.name}</option>
                  )}
                </select>
                {chevron}
              </div>
            </div>

            {/* Class */}
            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Class
              </label>
              <div className="relative">
                <select
                  className={`${selectBase} ${selectedClassId ? "text-gray-900" : "text-gray-400"}`}
                  disabled={classesLoading}
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value ? Number(e.target.value) : "")}
                >
                  <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.class?.name ?? c.name}</option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDisplay}
            disabled={!canDisplay || broadsheetLoading || isFetching}
            className={`w-full py-3 font-semibold text-white transition-colors ${
              canDisplay
                ? "bg-[#8000BD] hover:bg-[#6a00a1] cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {broadsheetLoading || isFetching ? "Loading..." : "DISPLAY RESULT"}
          </button>
        </div>
      </div>

      {/* Results — empty state before filter, table after */}
      <ViewClassTable
        broadsheetData={broadsheetData}
        isLoading={broadsheetLoading || isFetching}
        hasFiltered={!!filter}
      />
    </div>
  );
};

export default ViewClassResult;
