import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { useComputeResult } from "../hooks";

const chevron = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

const selectBase = "w-full px-4 py-4 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10";

const ComputeResult = () => {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const {
    classes, classesLoading,
    classGroups, classGroupsLoading,
    session, sessionLoading,
    activeTerm, activeTermLoading,
  } = useComputeResult();

  const filteredGroups = selectedClassId
    ? classGroups.filter((g) => g.classId === selectedClassId)
    : [];

  return (
    <div className="">
      <div className="bg-[#D9D9D9] p-4 text-sm md:text-lg font-inter font-semibold shadow-sm">
        <h1>Compute Result</h1>
      </div>
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="flex gap-2 text-sm md:text-lg items-center border-b border-gray-200 px-4 py-3">
          <CgDanger size={25} />
          <h1>
            You can only compute result for classes and subjects assigned to you
          </h1>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {/* Session */}
            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Academic Session
              </label>
              <div className="relative">
                <select className={`${selectBase} ${session ? "text-gray-900" : "text-gray-400"}`} disabled={sessionLoading}>
                  <option value="">{sessionLoading ? "Loading..." : "Select Session"}</option>
                  {session && (
                    <option value={session.id} selected>{session.name}</option>
                  )}
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
                  value={selectedClassId ?? ""}
                  onChange={(e) => {
                    setSelectedClassId(e.target.value ? Number(e.target.value) : null);
                  }}
                >
                  <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.class?.name ?? c.name}</option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>

            {/* Class Group — disabled until a class is selected */}
            <div>
              <label className="block text-sm font-semibold font-inter text-gray-700 mb-2">
                Select Group
              </label>
              <div className="relative">
                <select
                  className={`${selectBase} ${!selectedClassId ? "text-gray-400 bg-gray-50 cursor-not-allowed" : ""}`}
                  disabled={!selectedClassId || classGroupsLoading}
                >
                  <option value="">
                    {!selectedClassId
                      ? "Select a class first"
                      : classGroupsLoading
                      ? "Loading..."
                      : filteredGroups.length === 0
                      ? "No groups for class"
                      : "Select Group"}
                  </option>
                  {filteredGroups.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                {chevron}
              </div>
            </div>
          </div>

          <div className="bg-[#8000BD] px-6 py-3 w-full max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="bg-transparent text-white font-semibold outline-none placeholder-white"
              >
                FILTER RECORD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputeResult;
