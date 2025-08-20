import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productService.js";
import { createSale } from "../../services/saleService.js";
import { Edit2, Trash2, PackagePlus, ShoppingCart, Eye, PlusSquare } from "lucide-react";
import toast from "react-hot-toast";

const ProductListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [saleQuantities, setSaleQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [TotalBill, setTotalBill] = useState(0);
  const [prprice, setprprice] = useState(false);
  const [isSale, setisSale] = useState(false);
  const [isPurchase, setisPurchase] = useState(false);

  const filteredProduct = products.filter((item) =>
    item.itemname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaleChange = (p, value) => {
    if (isSale && p.quantity < value) {
      toast.error('Stock shortage');
    } else {
      setSaleQuantities((prev) => ({
        ...prev,
        [p._id]: value
      }));
    }
  };

  const handleCartAdd = (product) => {
    const quantity = Number(saleQuantities[product._id] || 0);
    if (quantity <= 0) {
      toast.error('Please enter quantity');
      return;
    }

    const cartItem = {
      id: product._id,
      productname: product.itemname,
      price: isPurchase ? product.purchasePrice : product.sellingPrice,
      quantity,
      unit: product.unit
    };

    setTotalBill(
      TotalBill + ((isPurchase ? product.purchasePrice : product.sellingPrice) * quantity)
    );

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, cartItem];
      }
    });

    setSaleQuantities((prev) => ({
      ...prev,
      [product._id]: ""
    }));
    toast.success("Added to cart");
  };

  const ShowCart = () => {
    setShowSaleModal(true);
  };

  const confirmSaleOrPurchase = async () => {
    if (!customerName.trim()) {
      // alert(Please enter ${isPurchase ? "supplier" : "customer"} name);
      toast.error(`Please enter ${isPurchase ? "supplier" : "customer"} name`);
      return;
    }

    const payload = {
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      type: isPurchase ? "purchase" : "sale",
      customerName: customerName.trim()
    };

    try {
      const res = await createSale(payload);
      console.log(`${isPurchase ? "Purchase" : "Sale"} Created:`, res.data);
      toast.success(`${isPurchase ? "Purchase" : "Sale"} Created`)
      setCart([]);
      setSaleQuantities({});
      setCustomerName("");
      setShowSaleModal(false);
      setTotalBill(0);
      loadProducts();
    } catch (err) {
      toast.error(`Failed to create ${isPurchase ? "Purchase" : "Sale"}`)
      console.error("Error creating record:", err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
      toast.success("Products refreshed!")
    } catch (err) {
      toast.error("Failed to refresh products")
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (e) => {
    try {
      if (confirm(`Are you sure you want to delete "${e.itemname}"?`)) {
        await deleteProduct(e._id);
        toast.success('Product deleted successfully!');
        loadProducts();
      }
    } catch (err) {
      toast.error("Failed to delete product!")
      console.log(err);
    }
  };

  useEffect(() => {
    if (location.pathname === "/products") {
      setisSale(false);
      setisPurchase(false);
    } else if (location.pathname === "/sales/new") {
      setisSale(true);
      setisPurchase(false);
    } else if (location.pathname === "/sales/purchase") {
      setisSale(false);
      setisPurchase(true);
    }
    loadProducts();
  }, []);

  return (
    <div className="relative p-6 bg-white min-h-screen">
      {showSaleModal && (
        <div className="absolute inset-0 flex items-start justify-center bg-black/60 z-50 backdrop-blur-sm p-4 print:p-0">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg font-mono text-gray-800 print:shadow-none print:border-0 print:rounded-none print:p-0">
            <div className="text-center pb-4 mb-4 border-b border-dashed border-gray-400 print:border-solid print:mb-2">
              <h2 className="text-2xl font-bold text-blue-700 tracking-wide">
                {JSON.parse(sessionStorage.getItem("user")).shopname}
              </h2>
              <p className="text-sm font-semibold text-gray-600 mt-1">
                {isPurchase ? "Purchase Receipt" : "Sales Invoice"}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="mb-6 flex flex-col sm:flex-row items-baseline">
              <p className="text-sm font-semibold text-gray-700 mr-2">
                {isPurchase ? "Supplier:" : "Customer:"}
              </p>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={`Enter ${isPurchase ? "supplier" : "customer"} name`}
                className="flex-1 px-3 py-1 border-b border-gray-300 bg-transparent outline-none text-sm focus:border-blue-500 transition"
              />
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No items added to the cart.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto pr-2">
                <div className="flex justify-between font-bold text-sm border-b border-dashed border-gray-400 py-2 sticky top-0 bg-white print:border-solid">
                  <span className="flex-1">Item</span>
                  <span className="w-16 text-right">Qty</span>
                  <span className="w-20 text-right">Price</span>
                  <span className="w-20 text-right">Total</span>
                </div>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-2 border-b border-dashed border-gray-200 print:border-solid">
                    <span className="flex-1 text-blue-800 font-medium truncate">
                      {item.productname}
                    </span>
                    <span className="w-16 text-right">{item.quantity} {item.unit}</span>
                    <span className="w-20 text-right">₨ {item.price.toLocaleString()}</span>
                    <span className="w-20 text-right font-semibold">
                      ₨ {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="border-t border-dashed border-gray-400 my-4 print:border-solid"></div>
            <div className="flex justify-between items-baseline font-bold text-xl pt-2">
              <span>TOTAL:</span>
              <span className="text-red-600">
                ₨ {TotalBill.toLocaleString()}
              </span>
            </div>
            <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-dashed border-gray-400 print:border-solid">
              <p>Thank you for your business!</p>
            </div>
            <div className="flex justify-end gap-3 mt-8 print:hidden">
              <button
                onClick={() => setShowSaleModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSaleOrPurchase}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm {isPurchase ? "Purchase" : "Sale"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-blue-300 rounded focus:outline-none"
        />
        {cart.length > 0 && (
          <button
            onClick={ShowCart}
            className="bg-blue-600 flex items-center gap-2 text-white px-4 py-2 rounded"
          >

            {isPurchase ? (
              <span className="flex items-center gap-2">
                <PlusSquare size={20} /> Purchase
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingCart size={20} /> Sale
              </span>
            )}

          </button>
        )}
      </div>


      <div className="relative bg-white shadow-md rounded-lg p-4 border border-blue-200">
        <div className="flex justify-between items-center mb-4">

          <h1 className="text-xl font-semibold text-blue-700">Products</h1>
          <div className="flex gap-2">
          </div>
        </div>



        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                {[
                  "Item Name",
                  "Category",
                  "Purchase Price",
                  "Selling Price",
                  "Quantity",
                  "Unit",
                  ...(isSale || isPurchase ? [isPurchase ? "Purchase" : "Sale"] : []),
                  "Created At",
                  ...(isSale || isPurchase ? [] : ["Actions"]),
                ].map((header, i) => (
                  <th key={i} className="px-4 py-3">
                    {header.toLowerCase() === "purchase price" ? (
                      <div className="flex gap-1 items-center">
                        {header}
                        <Eye
                          className="text-white cursor-pointer"
                          onClick={() => setprprice(!prprice)}
                          size={16}
                        />
                      </div>
                    ) : (
                      header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProduct.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center text-blue-500 py-4">
                    No records found
                  </td>
                </tr>
              ) : (
                filteredProduct.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-blue-50 transition">
                    <td className="px-4 py-3 font-medium text-blue-800">{p.itemname}</td>
                    <td className="px-4 py-3">{p.category}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">
                      {prprice ? `₨ ${p.purchasePrice}` : "•••"}
                    </td>
                    <td className="px-4 py-3 text-green-600 font-semibold">₨ {p.sellingPrice}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold">{p.quantity}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold">{p.unit}</td>
                    {(isSale || isPurchase) && (
                      <td className="px-6 py-4 text-sm flex items-center gap-1">
                        <input
                          type="number"
                          min="1"
                          value={saleQuantities[p._id] || ""}
                          onChange={(e) => handleSaleChange(p, e.target.value)}
                          className="w-16 px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        {
                          isPurchase ?
                            <PlusSquare
                              onClick={() => handleCartAdd(p)}
                              className="text-blue-600 cursor-pointer"
                              size={18}
                            /> :
                            <ShoppingCart
                              onClick={() => handleCartAdd(p)}
                              className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
                              size={18}
                            />

                        }
                      </td>
                    )}
                    <td className="px-4 py-3 text-blue-700">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    {!isSale && !isPurchase && (
                      <td className="py-2 flex justify-center items-center gap-2">
                        <button
                          onClick={() => navigate("/products/edit/" + p._id)}
                          className="p-2 text-blue-600 rounded-lg hover:bg-blue-100"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-2 text-red-500 rounded-lg hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;