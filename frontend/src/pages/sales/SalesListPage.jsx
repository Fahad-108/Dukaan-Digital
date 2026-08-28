import { useEffect, useState, useRef } from "react";
import { getSales, deleteSale } from "../../services/saleService.js";
import { getPurchases, deletePurchase } from "../../services/purchaseService.js";
import { Eye, ShoppingCart, Trash2, ShoppingBag } from "lucide-react";
import { FaWhatsapp, FaPrint, FaDownload } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/parts/Loader";
import * as htmlToImage from "html-to-image";

const SalesListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const billRef = useRef(null);

  const today = new Date();
  const formatDate = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState(formatDate(new Date(today.getFullYear(), today.getMonth(), 1)));
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
      console.log("Sales data : ", res.data);
      setSales(res.data.reverse());
    } catch (err) {
      if (err.response?.status === 404) {
        setSales([]);
        setPurchases([]);
      } else {
        toast.error(err.response?.data?.msg || "Error fetching data");
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
        toast.error(err.response?.data?.msg || "Error fetching data");
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
    if (type === "sale") {
      fetchSales();
    } else if (type === "purchase") {
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
        if (type === "sale") {
          const res = await deleteSale(selectedSale?._id || item._id);
          if (res.status === 200 || res.status === 201) {
            toast.success("deleted successfully");
          }
          fetchSales();
          setShowDetails(false);
        } else {
          const res = await deletePurchase(selectedSale?._id || item._id);
          if (res.status === 200 || res.status === 201) {
            toast.success("deleted successfully");
          }
          fetchPurchase();
          setShowDetails(false);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || "Error deleting sale");
    }
  };

  // Helper to capture the full bill (including all scrollable items) as Data URL or Blob
  const captureFullBill = async (format = "png") => {
    if (!billRef.current) return null;

    // Expand all scrollable containers inside the bill so ALL items are rendered
    const scrollContainers = billRef.current.querySelectorAll(
      ".overflow-y-auto, .overflow-auto, .overflow-scroll, [class*='max-h-']"
    );
    const savedStyles = [];

    scrollContainers.forEach((el) => {
      savedStyles.push({
        el,
        maxHeight: el.style.maxHeight,
        overflow: el.style.overflow,
        overflowY: el.style.overflowY,
        height: el.style.height,
      });
      el.style.maxHeight = "none";
      el.style.overflow = "visible";
      el.style.overflowY = "visible";
      el.style.height = "auto";
    });

    try {
      if (format === "blob") {
        return await htmlToImage.toBlob(billRef.current, {
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          fontEmbedCSS: "",
          cacheBust: false,
        });
      } else {
        return await htmlToImage.toPng(billRef.current, {
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          fontEmbedCSS: "",
          cacheBust: false,
        });
      }
    } finally {
      // Immediately restore original scroll and height styles
      savedStyles.forEach(({ el, maxHeight, overflow, overflowY, height }) => {
        el.style.maxHeight = maxHeight;
        el.style.overflow = overflow;
        el.style.overflowY = overflowY;
        el.style.height = height;
      });
    }
  };

  // 1. Save Image (Downloads the FULL bill image from top to bottom)
  const handleSaveImage = async () => {
    if (!billRef.current || !selectedSale) return;
    setLoadingAction("save");
    const toastId = toast.loading("Generating full bill image...");
    try {
      const dataUrl = await captureFullBill("png");
      if (!dataUrl) throw new Error("Could not generate image");

      const customerName = (selectedSale.customerName || selectedSale.suppliername || "Bill").replace(/[^a-zA-Z0-9-_]/g, "_");
      const dateStr = new Date(selectedSale.createdAt).toISOString().split("T")[0];
      const filename = `${type === "sale" ? "Sales_Invoice" : "Purchase_Receipt"}_${customerName}_${dateStr}.png`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Full bill image saved successfully!", { id: toastId });
    } catch (error) {
      console.error("Save image failed:", error);
      toast.error("Failed to save image. Please try again.", { id: toastId });
    } finally {
      setLoadingAction(null);
    }
  };

  // 2. Share on WhatsApp (Shares the exact FULL bill image)
  const handleShareWhatsApp = async () => {
    if (!billRef.current || !selectedSale) return;
    setLoadingAction("whatsapp");
    const toastId = toast.loading("Preparing full bill image for WhatsApp...");
    try {
      const blob = await captureFullBill("blob");
      if (!blob) throw new Error("Could not generate image");

      const customerName = (selectedSale.customerName || selectedSale.suppliername || "Bill").replace(/[^a-zA-Z0-9-_]/g, "_");
      const dateStr = new Date(selectedSale.createdAt).toISOString().split("T")[0];
      const filename = `${type === "sale" ? "Sales_Invoice" : "Purchase_Receipt"}_${customerName}_${dateStr}.png`;
      const file = new File([blob], filename, { type: "image/png" });

      // Mobile & Supported Browsers: Native Share with image file directly to WhatsApp
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        toast.dismiss(toastId);
        await navigator.share({
          files: [file],
          title: type === "sale" ? "Sales Invoice" : "Purchase Receipt",
        });
        return;
      }

      // Desktop Fallback: Copy image to clipboard, download file, open WhatsApp Web
      let copied = false;
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          copied = true;
        }
      } catch {
        // Clipboard write optional
      }

      // Trigger image download
      const dataUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(dataUrl), 2000);

      // Open WhatsApp Web
      window.open("https://web.whatsapp.com/", "_blank");

      if (copied) {
        toast.success("Full bill image copied to clipboard & downloaded! Paste (Ctrl+V) in WhatsApp.", { id: toastId, duration: 6000 });
      } else {
        toast.success("Full bill image downloaded! Attach it in WhatsApp.", { id: toastId, duration: 5000 });
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        toast.error("Could not share image directly. Saved to downloads instead.", { id: toastId });
      } else {
        toast.dismiss(toastId);
      }
    } finally {
      setLoadingAction(null);
    }
  };

  // 3. Print (Prints the complete bill)
  const handlePrint = () => {
    window.print();
  };

  const RenderTable = ({ data }) => (
    <div>
      {data.length === 0 ? (
        <p className="text-blue-500">No records found</p>
      ) : (
        <div className="overflow-x-auto shadow-lg">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">{type === "sale" ? "Customer" : "Supplier"}</th>
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
                      className="p-2 text-blue-600 rounded-lg hover:bg-blue-100 cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 text-red-500 rounded-lg hover:bg-red-100 cursor-pointer"
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
      <div className="flex md:justify-between items-center flex-wrap gap-2 justify-center no-print print:hidden">
        <div className="flex items-center justify-center flex-wrap gap-4">
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
          className="px-4 py-1 bg-blue-600 hover:bg-blue-700 transition text-white rounded flex items-center gap-2 cursor-pointer"
          onClick={() => {
            if (type === "sale") navigate("/sales/new");
            if (type === "purchase") navigate("/purchase/new");
          }}
        >
          {type === "sale" ? <ShoppingCart size={16} /> : <ShoppingBag size={16} />}
          {type === "sale" ? "Sale" : "Purchase"}
        </button>
      </div>

      <div className="relative bg-white shadow-md rounded-lg p-4 border border-blue-200 no-print print:hidden">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">{type === "sale" ? "Sales Record" : "Purchase Record"}</h2>

        {loading && <Loader />}
        {!loading && (
          <>
            {type === "sale" && <RenderTable data={sales} />}
            {type === "purchase" && <RenderTable data={purchases} />}
          </>
        )}
      </div>

      {showDetails && selectedSale && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm p-4 font-mono print:p-0 print:bg-white print:static">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-xl max-h-[95vh] overflow-y-auto border border-gray-300 text-gray-800 print:shadow-none print:border-0 print:rounded-none print:p-0 print:max-h-none">

            {/* Bill / Invoice Card to be captured */}
            <div ref={billRef} className="bg-white printable-receipt" style={{ backgroundColor: "#ffffff" }}>
              <div className="text-center pb-4 mb-4 border-b border-dashed border-gray-400 print:border-solid">
                <h2 className="text-2xl font-bold text-blue-700 tracking-wide">
                  {JSON.parse(sessionStorage.getItem("user"))?.shopname || "Dukaan Digital"}
                </h2>
                <p className="text-sm font-semibold text-gray-600 mt-1">
                  {type === "sale" ? "Sales Invoice" : "Purchase Receipt"}
                </p>
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

              <div className="max-h-[30vh] overflow-y-auto print:max-h-none print:overflow-visible">
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
                    {type === "sale" ? (
                      <span className="w-20 text-right">Rs {it.price.toLocaleString()}</span>
                    ) : (
                      <span className="w-20 text-right">Rs {it.purchasePrice.toLocaleString()}</span>
                    )}
                    <span className="w-20 text-right font-semibold">
                      Rs {type === "sale" ? (it.quantity * it.price).toLocaleString() : (it.quantity * it.purchasePrice).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-400 mt-4 pt-4 print:border-solid">
                <div className="flex justify-between items-baseline font-bold text-xl">
                  <span>TOTAL:</span>
                  <span className="text-green-600">
                    Rs {type === "sale" ? selectedSale.totalAmount.toLocaleString() : selectedSale.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-dashed border-gray-400 print:border-solid">
                <p>Thank you for your business!</p>
              </div>
            </div>

            {/* 3 Actions: Save Image, Share on WhatsApp, Print (Excluded from capture and print) */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-4 border-t border-dashed border-gray-300 print:hidden no-print">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveImage}
                  disabled={loadingAction !== null}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-60 text-white text-sm font-semibold py-2 px-3.5 rounded-lg shadow transition cursor-pointer"
                  title="Save full bill as image"
                >
                  <FaDownload className="text-sm" />
                  <span>{loadingAction === "save" ? "Saving..." : "Save Image"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  disabled={loadingAction !== null}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-60 text-white text-sm font-semibold py-2 px-3.5 rounded-lg shadow transition cursor-pointer"
                  title="Share full bill image on WhatsApp"
                >
                  <FaWhatsapp className="text-base" />
                  <span>{loadingAction === "whatsapp" ? "Preparing..." : "Share on WhatsApp"}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  disabled={loadingAction !== null}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 active:scale-95 disabled:opacity-60 text-white text-sm font-semibold py-2 px-3.5 rounded-lg shadow transition cursor-pointer"
                  title="Print full bill"
                >
                  <FaPrint className="text-sm" />
                  <span>Print</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-red-700 transition cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={handleClose}
                  className="bg-gray-200 text-gray-700 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-300 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SalesListPage;