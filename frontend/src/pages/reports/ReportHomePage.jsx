import React, { useState } from "react";
import { getReport } from "../../services/reportService.js";
import ReportReceipt from "./ReportReceipt.jsx";
import toast from "react-hot-toast";
import { BarChart3 } from "lucide-react";

const Reporthomepage = () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  const [date, setDate] = useState(today);
  const [month, setMonth] = useState(currentMonth);
  const [selectedType, setSelectedType] = useState("date");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setReport(null);

    try {
      let body = {};
      if (selectedType === "date") {
        body = { date };
      } else {
        body = { month };
      }
      const res = await getReport(body);
      console.log(res)
      if (res && res.data) {
        setReport(res.data);
        toast.success("Report generated")
      } else {
        toast.error("Failed to generate report")
      }
    } catch (err) {
      console.error(err);
      if (err.status == 404) {
        toast.error("No record found")
      } else {
        toast.error("Failed to generate report")
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      <div className="relative bg-white shadow-2xl rounded-tr-[5rem] rounded-bl-3xl p-0 w-full max-w-lg overflow-hidden flex transform transition-all duration-500 hover:shadow-3xl">
        <div className="w-1/3 bg-blue-600 rounded-bl-3xl flex items-center justify-center p-4">
          <BarChart3      className="h-20 w-20 text-white" />
        </div>

        <div className="w-2/3 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Generate Report
          </h2>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => { setSelectedType("date"); setReport() }}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${selectedType === "date"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 border border-gray-300 hover:bg-gray-100"
                }`}
            >
              By Date
            </button>
            <button
              onClick={() => { setSelectedType("month"); setReport() }}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${selectedType === "month"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 border border-gray-300 hover:bg-gray-100"
                }`}
            >
              By Month
            </button>
          </div>
          {selectedType === "date" ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-t-lg focus:outline-none focus:border-blue-500 transition duration-300"
              />
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Month
              </label>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-t-lg focus:outline-none focus:border-blue-500 transition duration-300"
              />
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Report...
              </span>
            ) : (
              "Get Report"
            )}
          </button>
        </div>
      </div>
      {report && (
        <ReportReceipt
          report={report}
          period={selectedType === "date" ? date : month}
        />
      )}
    </div>
  );
};

export default Reporthomepage;