import { motion } from "framer-motion";
import { useSubmitResults } from "../hooks";

const chevron = (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>
);

const selectBase =
  "w-full px-4 py-3 border border-gray-300 rounded text-sm appearance-none focus:outline-none pr-10";

export default function SubmitResultsPanel() {
  const {
    classId, setClassId, classGroupId, setClassGroupId,
    subjectId, setSubjectId,
    classes, classesLoading, filteredGroups, classGroupsLoading,
    subjects, subjectsLoading,
    submitted, isSubmitting, handleSubmit, handleReset, canSubmit,
  } = useSubmitResults();

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden"
      >
        <div className="border-l-4 border-green-500 p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-gray-800 font-semibold text-sm">Results submitted successfully</h4>
            <p className="text-gray-500 text-xs mt-1">
              Scores are now locked and pending admin review.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                {submitted.status}
              </span>
              <span className="text-gray-400 text-xs">
                {new Date(submitted.submittedAt).toLocaleString()}
              </span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0"
          >
            Submit another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="border-l-4 border-amber-500 px-5 py-4 bg-amber-50">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
          <div>
            <h3 className="text-gray-800 font-semibold text-sm">Submit Final Results for Admin Review</h3>
            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
              Only submit after entering <strong>all CA and exam scores</strong> for the selected subject.
              Once submitted, scores are <strong>locked</strong> and cannot be changed without admin approval.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Class */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Class</label>
            <div className="relative">
              <select
                className={`${selectBase} ${classId ? "text-gray-900" : "text-gray-400"}`}
                disabled={classesLoading}
                value={classId ?? ""}
                onChange={(e) => setClassId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">{classesLoading ? "Loading..." : "Select Class"}</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.class?.name ?? c.name}
                  </option>
                ))}
              </select>
              {chevron}
            </div>
          </div>

          {/* Group */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Group</label>
            <div className="relative">
              <select
                className={`${selectBase} ${
                  !classId
                    ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                    : classGroupId
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
                disabled={!classId || classGroupsLoading}
                value={classGroupId ?? ""}
                onChange={(e) => setClassGroupId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">
                  {!classId
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

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Subject</label>
            <div className="relative">
              <select
                className={`${selectBase} ${
                  !classGroupId
                    ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                    : subjectId
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
                disabled={!classGroupId || subjectsLoading}
                value={subjectId ?? ""}
                onChange={(e) => setSubjectId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">
                  {!classGroupId
                    ? "Select a group first"
                    : subjectsLoading
                    ? "Loading..."
                    : subjects.length === 0
                    ? "No subjects found"
                    : "Select Subject"}
                </option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              {chevron}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            disabled={!canSubmit || isSubmitting}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {isSubmitting ? "Submitting..." : "Submit Results for Review"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
