import React, { useState } from "react";
import { getReport } from "../../services/reportService.js";
import { DollarSign, TrendingUp, CreditCard, FileText, Scale, Package, ShoppingCart, ShoppingBag, Receipt, ClipboardList, HandCoins } from "lucide-react";
import ReportReceipt from "./ReportReceipt.jsx";
import toast from "react-hot-toast";

const Reporthomepage = () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  const [date, setDate] = useState(today);
  const [month, setMonth] = useState(currentMonth);
  const [selectedType, setSelectedType] = useState("date");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
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
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Reports
        </h2>

        {/* Type Selection */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setSelectedType("date")}
            className={`px-4 py-2 rounded-lg font-medium ${selectedType === "date"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-700"
              }`}
          >
            By Date
          </button>
          <button
            onClick={() => setSelectedType("month")}
            className={`px-4 py-2 rounded-lg font-medium ${selectedType === "month"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-700"
              }`}
          >
            By Month
          </button>
        </div>

        {/* Date/Month Picker */}
        {selectedType === "date" ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Select Month
            </label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? "Loading..." : "Get Report"}
        </button>

        {message && (
          <p className="text-center mt-3 text-red-500 font-medium">
            {message}
          </p>
        )}
      </div>

      {/* Report Display */}
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