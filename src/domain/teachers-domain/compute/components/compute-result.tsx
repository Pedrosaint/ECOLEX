import { useState } from "react";
import CaPage from "./ca-page";
import ExamPage from "./exam-page";
import ViewCaPage from "./view-ca-page";
import ViewExamPage from "./view-exam-page";
import SubmitResultsPanel from "./submit-results-panel";

const tabs = ["CA", "Exam", "View CA", "View Exam"];

const ComputeResult = () => {
  const [activeTab, setActiveTab] = useState("CA");

  return (
    <div>
      <div className="bg-[#D9D9D9] p-4 text-sm md:text-lg font-inter font-semibold shadow-sm">
        <h1>Compute Result</h1>
      </div>

      <div className="flex border-b border-gray-200 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === tab
                ? "border-b-2 border-[#8000BD] text-[#8000BD]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "CA" && <CaPage />}
        {activeTab === "Exam" && <ExamPage />}
        {activeTab === "View CA" && <ViewCaPage />}
        {activeTab === "View Exam" && <ViewExamPage />}
      </div>

      <SubmitResultsPanel />
    </div>
  );
};

export default ComputeResult;
