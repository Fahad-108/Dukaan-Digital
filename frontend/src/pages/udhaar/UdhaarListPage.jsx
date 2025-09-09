import { useEffect, useState } from "react";
import { getUdhaarList, deleteUdhaar } from "../../services/udhaarService";
import { Trash2, Edit2, HandCoins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/parts/Loader";

const UdhaarListPage = () => {
  const navigate = useNavigate();
  const [udhaarList, setUdhaarList] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const getUdhaar = async () => {
    try {
      setLoading(true);
      const res = await getUdhaarList();
        setUdhaarList(res.data);
    } catch (err) {
      toast.error("Failed to refresh Credit record");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUdhaar();
  }, []);

  const handleDelete = async (item) => {
    try {
      if (confirm("Are you sure you want to delete this credit record?")) {
        const res = await deleteUdhaar(item._id);
        if (res.status === 200 || res.status === 201) {
          toast.success("Deleted successfully");
        }
        getUdhaar();
      }
    } catch (err) {
      toast.error("Failed to delete Credit record");
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    navigate(`/udhaar/edit/${item._id}`);
  };

  const filteredData = udhaarList.filter((item) => {
    const matchSearch =
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.contact.includes(search);
    const matchStatus =
      statusFilter === "all" ? true : item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-4 min-h-screen">
      {/* Search + Add Credit Button (always visible) */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <input
            type="text"
            placeholder="Search by name or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

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

      {/* Loader (only visible while loading) */}
        <div className="bg-white shadow-md rounded-lg border border-blue-200 p-6 space-y-4">
          <h1 className="text-xl font-semibold text-blue-700 mb-4">
            Credit Records
          </h1>
          {loading ? (
        <Loader />
      ) : (
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
      )}
      </div>
    </div>
  );
};

export default UdhaarListPage;
