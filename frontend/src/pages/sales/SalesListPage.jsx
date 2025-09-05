import { useEffect, useState } from "react";
import { getSales, deleteSale } from "../../services/saleService.js";
import { getPurchases, deletePurchase } from "../../services/purchaseService.js";
import { Eye, ShoppingCart, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/parts/Loader";

const SalesListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(formatDate(new Date(new Date().setMonth(new Date().getMonth(), 1))));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const [type, setType] = useState();

  const fetchSales = async () => {
    try {
      setLoading(true);
      const body = {
        startDate,
        endDate,
      };
      const res = await getSales(body);
      if (!res.data || res.data.length === 0) {
        setSales([]);
        return;
      }
      console.log("Sales data : ", res.data)
      setSales(res.data.reverse());
    } catch (err) {
      if (err.response?.status === 404) {
        setSales([]);
        setPurchases([]);
      } else {
        toast.error(err.response?.data?.msg || "Error fetching data")
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchase = async () => {
    try {
      setLoading(true);
      const body = {
        startDate,
        endDate,
      };
      const res = await getPurchases(body);
      if (!res.data || res.data.length === 0) {
        setPurchases([]);
        return;
      }
      setPurchases(res.data.reverse());
    } catch (err) {
      if (err.response?.status === 404) {
        setSales([]);
        setPurchases([]);
      } else {
        toast.error(err.response?.data?.msg || "Error fetching data")
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  if (location.pathname === "/sales") {
    setType("sale");
    setStartDate(formatDate(firstDayOfMonth));
    setEndDate(formatDate(today));
    fetchSales();
  } else if (location.pathname === "/purchase") {
    setType("purchase");
    setStartDate(formatDate(firstDayOfMonth));
    setEndDate(formatDate(today));
    fetchPurchase();
  }
}, [location]);


  useEffect(() => {
    if (type == "sale") {
      fetchSales();
    } else if (type == "purchase") {
      fetchPurchase();
    }
  }, [startDate, endDate]);

  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setSelectedSale(null);
  };

  const handleDelete = async (item) => {
    try {
      if (confirm("Are you really want to delete this?")) {
        if (type == "sale") {
          const res = await deleteSale(selectedSale?._id || item._id);
          if (res.status == 200 || res.status == 201) {
            toast.success("deleted successfully")
          }
          fetchSales();
          setShowDetails(false);
        } else {
          const res = await deletePurchase(selectedSale?._id || item._id);
          if (res.status == 200 || res.status == 201) {
            toast.success("deleted successfully")
          }
          fetchPurchase();
          setShowDetails(false);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || "Error deleting sale")
    }
  }

  // const handleFilter = (e) => {
  //   const newFilterType = e.target.value;
  //   setFilterType(newFilterType);
  //   fetchSales(newFilterType);
  // }

  const RenderTable = ({ data }) => (
    <div>
      {data.length === 0 ? (
        <p className="text-blue-500">No records found</p>
      ) : (
        <div className="overflow-x-auto shadow-lg">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">{type == "sale" ? "Customer" : "Supplier"}</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-blue-800">
                    {item.customerName ? item.customerName : item.suppliername}
                  </td>
                  <td className="px-4 py-3 text-blue-700">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    Rs {item.totalAmount ? item.totalAmount : item.total}
                  </td>
                  <td className="py-2 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="p-2 text-blue-600 rounded-lg hover:bg-blue-100"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 text-red-500 rounded-lg hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );


  return (
    <div className="relative p-6 space-y-6 min-h-screen bg-white">
      <div className="flex md:justify-between items-center flex-wrap gap-2 justify-center">
        <div className="flex items-center justify-center flex-wrap gap-4">
          {/* <div className="flex items-center flex-wrap gap-1">
            <label className="font-semibold text-blue-700">Type:</label>
            <select
              value={filterType}
              onChange={(e) => handleFilter(e)}
              className="border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="sale">Sale</option>
              <option value="purchase">Purchase</option>
            </select>
          </div> */}
          <div className="flex items-center flex-wrap gap-1">
            <label className="font-semibold text-blue-700">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center flex-wrap gap-1">
            <label className="font-semibold text-blue-700">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <button
          className="px-4 py-1 bg-blue-600 hover:bg-blue-700 transition text-white rounded flex items-center gap-2"
          onClick={() => {
            type === "sale" && navigate("/sales/new")
            type === "purchase" && navigate("/purchase/new")
          }}
        >
          {
            type == "sale" ? <ShoppingCart size={16} /> : <ShoppingBag size={16} />
          }
          {
            type == "sale" ? "Sale" : "Purchase"
          }
        </button>
      </div>

      

      <div className="relative bg-white shadow-md rounded-lg p-4 border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">{type === "sale" ? "Sales Record" : "Purchase Record"}</h2>

        {loading &&
          <Loader />
        }
        {!loading && (
          <>
            {type === "sale" && (
              <RenderTable data={sales} />
            )}
            {type === "purchase" && (
              <RenderTable data={purchases} />
            )}
          </>
        )}
      </div>

      {showDetails && selectedSale && (
        <div className="absolute top-0 inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm p-4 font-mono print:p-0">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-xl  overflow-y-auto border border-gray-300 text-gray-800 print:shadow-none print:border-0 print:rounded-none">

            <div className="text-center pb-4 mb-4 border-b border-dashed border-gray-400 print:border-solid">
              <h2 className="text-2xl font-bold text-blue-700 tracking-wide">
                {JSON.parse(sessionStorage.getItem("user")).shopname}
              </h2>
              <p className="text-sm font-semibold text-gray-600 mt-1">
                {type === "sale" ? "Sales Invoice" : "Purchase Receipt"}
              </p>
              {/* <p className="text-xs text-gray-500 mt-2">
                    Invoice #: {selectedSale._id.slice(-6).toUpperCase()}
                </p> */}
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold">
                {type === "sale" ? "Customer:" : "Supplier:"}
                <span className="font-normal ml-2">{type === "sale" ? selectedSale.customerName : selectedSale.suppliername || "Walk-in"}</span>
              </p>
              <p className="text-sm font-semibold mt-1">
                Date:
                <span className="font-normal ml-2">{new Date(selectedSale.createdAt).toLocaleDateString()}</span>
              </p>
            </div>

            <div className="max-h-[30vh] overflow-y-auto">
              <div className="flex justify-between font-bold text-xs border-b border-dashed border-gray-400 p-2 sticky top-0 bg-blue-600 text-white print:border-solid">
                <span className="flex-1">Item</span>
                <span className="w-16 text-right">Qty</span>
                <span className="w-20 text-right">Price</span>
                <span className="w-20 text-right">Total</span>
              </div>

              {selectedSale.items.map((it) => (
                <div key={it._id} className="flex justify-between text-sm border-b border-dashed border-gray-200 p-2 print:border-solid">
                  <span className="flex-1 text-blue-800 font-medium">{it.itemname || it.productName}</span>
                  <span className="w-16 text-right">{it.quantity} {it.unit || ""}</span>
                  {type == "sale" &&
                    <span className="w-20 text-right">Rs {it.price.toLocaleString()}</span> ||
                    <span className="w-20 text-right">Rs {it.purchasePrice.toLocaleString()}</span>
                  }
                  <span className="w-20 text-right font-semibold">
                    Rs {type == "sale" ? (it.quantity * it.price).toLocaleString() : (it.quantity * it.purchasePrice).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-400 mt-4 pt-4 print:border-solid">
              <div className="flex justify-between items-baseline font-bold text-xl">
                <span>TOTAL:</span>
                <span className="text-green-600">
                  Rs {type == "sale" ? selectedSale.totalAmount.toLocaleString() : selectedSale.total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-dashed border-gray-400 print:border-solid">
              <p>Thank you for your business!</p>
            </div>

            <div className="flex justify-end gap-3 mt-8 print:hidden">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={handleClose}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );

};

export default SalesListPage;