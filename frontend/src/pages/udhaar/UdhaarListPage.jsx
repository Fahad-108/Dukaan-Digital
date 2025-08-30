import { useEffect, useState } from "react";
import { getUdhaarList, deleteUdhaar } from "../../services/udhaarService";
import { Trash2, Edit2, HandCoins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UdhaarListPage = () => {
  const navigate = useNavigate();
  const [udhaarList, setUdhaarList] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false)

  const getUdhaar = async () => {
    try {
      setLoading(true);
      const res = await getUdhaarList();
      if (res.data && res.data.length > 0) {
        setUdhaarList(res.data);
        toast.success("Data Refreshed");
      } else {
        setUdhaarList([]);
      }
    } catch (err) {
      toast.error("Failed to refresh Credit record");
      console.error(err);
    }
    finally {
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
    <div className="p-6 min-h-screen bg-white">
      <div className="flex justify-between gap-1 mb-4 w-full">
        <div className="flex flex-wrap w-[calc(100%-8.75rem)] gap-4">
          <input
            type="text"
            placeholder="Search by name or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 md:w-lg min-w-10 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="mb-2">
          <button
            onClick={() => navigate("/udhaar/new")}
            className="bg-blue-600 w-35 flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <HandCoins size={23} />
            Add Credit
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg border border-blue-200 p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-700">Credit Records</h1>

        {loading &&
          <div className="flex justify-center items-center py-6">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }

        {/* Table */}
        {!loading &&
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-blue-200">
              <thead className="bg-blue-600 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Customer Name</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Reason</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created At</th>
                  <th className="px-4 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-blue-100 hover:bg-blue-50 transition"
                    >
                      <td className="px-4 py-2">{item.customerName}</td>
                      <td className="px-4 py-2">{item.contact}</td>
                      <td className="px-4 py-2 font-semibold text-blue-800">
                        Rs {item.amount}
                      </td>
                      <td className="px-4 py-2">
                        {item.reason || "No reason provided"}
                      </td>
                      <td
                        className={`px-4 py-2 font-medium ${item.status === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                          }`}
                      >
                        {item.status}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 flex justify-between items-center">
                        <button onClick={() => handleEdit(item)} className="text-blue-600"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item)} className="text-red-500"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No Credit records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default UdhaarListPage;
