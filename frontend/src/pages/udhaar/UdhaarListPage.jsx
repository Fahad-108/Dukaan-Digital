import React, { useEffect, useState } from "react";
import { getCredits, deleteCredit } from "../../services/creditService";
import { Edit2, Trash2, FileText } from "lucide-react";
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
      const res = await getCredits();
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
        const res = await deleteCredit(credit._id);
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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by customer name or contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm w-full md:w-1/3 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>

        {/* Add Credit Button */}
        <button
          onClick={() => navigate("/credits/new")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 shadow transition"
        >
          <FileText size={16} /> Add Credit
        </button>
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
