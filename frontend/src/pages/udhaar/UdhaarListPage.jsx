import React, { useEffect, useState } from "react";
import { getUdhaarList, deleteUdhaar } from "../../services/udhaarService";
import { Edit2, Trash2, FileText, HandCoins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreditListPage = () => {
  const navigate = useNavigate();
  const [creditList, setCreditList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchCredits = async () => {
    try {
      setLoading(true);
      const res = await getUdhaarList();
      if (res.data && res.data.length > 0) {
        setCreditList(res.data.reverse());
        toast.success("Data refreshed!");
      } else {
        setCreditList([]);
      }
    } catch (err) {
      toast.error("Failed to refresh credits");
      console.error("Error fetching credits", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const handleDelete = async (credit) => {
    try {
      if (confirm("Are you sure you want to delete this?")) {
        const res = await deleteUdhaar(credit._id);
        if (res.status === 200 || res.status === 201) {
          toast.success("Credit deleted successfully!");
        }
        fetchCredits();
      }
    } catch (err) {
      toast.error("Failed to delete credit");
      console.error("Error deleting credit", err);
    }
  };

  const handleEdit = (credit) => {
    navigate(`/credits/edit/${credit._id}`);
  };

  // Filtering
  const filteredData = creditList.filter((item) => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.contact.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || item.status.toLowerCase() === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative p-6 space-y-6 min-h-screen">
      {/* Top Bar: Search + Filter + Add Credit */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        
        {/* Left: Search + Status */}
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <input
            type="text"
            placeholder="Search by name or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Right: Add Credit Button */}
        <div>
          <button
            onClick={() => navigate("/udhaar/new")}
            className="bg-blue-600 flex gap-2 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            <HandCoins size={23} />
            Add Credit
          </button>
        </div>
      </div>

      {/* Loader OR Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-600 font-medium">
            Loading Credit Records...
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg border border-blue-200 p-6 space-y-4">
          <h1 className="text-xl font-semibold text-blue-700 mb-4">
            Credit Records
          </h1>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-600 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Customer Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-blue-50 transition"
                    >
                      <td className="px-4 py-3 font-medium text-blue-700">
                        {item.customerName}
                      </td>
                      <td className="px-4 py-3">{item.contact}</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">
                        Rs {item.amount}
                      </td>
                      <td className="px-4 py-3">
                        {item.reason || "No reason provided"}
                      </td>
                      <td
                        className={`px-4 py-3 uppercase font-semibold ${
                          item.status === "paid"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.status}
                      </td>
                      <td className="px-4 py-3 text-blue-700">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 rounded-lg hover:bg-blue-100 hover:shadow-sm transition cursor-pointer"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 text-red-500 rounded-lg hover:bg-red-100 hover:shadow-sm transition cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-6 text-center text-blue-500"
                    >
                      No Credit records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditListPage;
