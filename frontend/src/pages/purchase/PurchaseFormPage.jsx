import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast'; // Assuming you have react-hot-toast installed
import { addPurchase } from '../../services/purchaseService.js';
import { getProducts } from '../../services/productService.js';
import Dukaan_Digital from '../../assets/Dukaan_Digital.svg';
import { useNavigate } from "react-router-dom";
import { FaBoxes, FaDollarSign, FaTag, FaCheckCircle, FaTrashAlt,  FaStore, FaWeightHanging, FaArrowLeft } from 'react-icons/fa';

const PurchaseFormPage = () => {
  const [products, setProducts] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState({
    suppliername: '',
    items: [],
  });
  const [currentItem, setCurrentItem] = useState({
    itemname: '',
    category: '',
    unit: '',
    purchasePrice: 0,
    sellingPrice: 0,
    quantity: 0,
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to load existing products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSupplierChange = (e) => {
    setPurchaseDetails({ ...purchaseDetails, suppliername: e.target.value });
  };

  const handleItemChange = (e) => {
  const { name, value } = e.target;

  // agar input ka naam "itemname" hai
  if (name === "itemname") {
    setCurrentItem({ ...currentItem, itemname: value });

    if (!value.trim()) {
      // input khali ho gaya to reset
      setIsNewProduct(false);
      setFilteredProducts([]);
      setCurrentItem({
        itemname: '',
        category: '',
        unit: '',
        purchasePrice: 0,
        sellingPrice: 0,
        quantity: 0,
      });
      return;
    }

    const filtered = products.filter(p =>
      p.itemname.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);

    const match = products.find(
      p => p.itemname.toLowerCase() === value.toLowerCase()
    );

    if (match) {
      setIsNewProduct(false);
      setCurrentItem({
        itemname: match.itemname,
        category: match.category || '',
        unit: match.unit || '',
        purchasePrice: match.purchasePrice,
        sellingPrice: match.sellingPrice,
        quantity: 0,
      });
    } else {
      setIsNewProduct(true);
      setCurrentItem({
        ...currentItem,
        itemname: value,
      });
    }
  } else {
    // baaki fields (price, qty, category, unit)
    setCurrentItem({ ...currentItem, [name]: value });
  }
};


  const handleProductSelect = (product) => {
    setCurrentItem({
      itemname: product.itemname,
      category: product.category || '',
      unit: product.unit || '',
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      quantity: 0,
    });
    setIsNewProduct(false);
    setFilteredProducts([]);
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    if (
      !currentItem.itemname ||
      currentItem.quantity <= 0 ||
      currentItem.purchasePrice <= 0 ||
      currentItem.sellingPrice <= 0
    ) {
      toast.error('Please fill all product details correctly.');
      return;
    }

    const existingIndex = purchaseDetails.items.findIndex(
      item => item.itemname.toLowerCase() === currentItem.itemname.toLowerCase()
    );

    let newItems = [...purchaseDetails.items];
    if (existingIndex !== -1) {
      newItems[existingIndex] = {
        ...newItems[existingIndex],
        quantity: newItems[existingIndex].quantity + Number(currentItem.quantity),
        purchasePrice: Number(currentItem.purchasePrice),
        sellingPrice: Number(currentItem.sellingPrice),
      };
    } else {
      newItems.push({
        ...currentItem,
        purchasePrice: Number(currentItem.purchasePrice),
        sellingPrice: Number(currentItem.sellingPrice),
        quantity: Number(currentItem.quantity),
      });
    }

    setPurchaseDetails({ ...purchaseDetails, items: newItems });

    setCurrentItem({
      itemname: '',
      category: '',
      unit: '',
      purchasePrice: 0,
      sellingPrice: 0,
      quantity: 0,
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = purchaseDetails.items.filter((_, i) => i !== index);
    setPurchaseDetails({ ...purchaseDetails, items: newItems });
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!purchaseDetails.suppliername || purchaseDetails.items.length === 0) {
      toast.error('Supplier name and at least one item are required.');
      return;
    }

    try {
      setLoading(true);
      const res = await addPurchase(purchaseDetails);
      toast.success(res.data.message);
      setPurchaseDetails({
        suppliername: '',
        items: [],
      });
    } catch (err) {
      toast.error('Failed to record purchase');
      console.error('Error adding purchase:', err);
    }
    finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (isNaN(price) || price === null) {
      return 'Rs. 0';
    }
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="flex justify-center items-center p-6">
      <form
        onSubmit={handlePurchase}
        className="shadow-lg rounded-xl p-6 w-full max-w-md border border-blue-300 transform transition-all duration-300 hover:scale-[1.01]"
      >
        <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 mb-2 bg-gray-100 text-gray-700 rounded-full shadow-sm hover:bg-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <FaArrowLeft className="text-blue-600" />
                  <span className="font-medium">Back</span>
                </button>
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-700 text-center">New Purchase</h1>
        </div>

        <div className="mb-8">
          <label htmlFor="suppliername" className="block text-blue-800 font-semibold mb-2">Supplier Name</label>
          <div className="relative flex items-center">
            <FaStore className="absolute left-4 text-blue-400 z-10" />
            <input
              type="text"
              id="suppliername"
              name="suppliername"
              value={purchaseDetails.suppliername}
              onChange={handleSupplierChange}
              className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        <div className="mb-6 border-t pt-8 border-blue-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Add Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="relative">
              <label htmlFor="itemname" className="block text-blue-800 font-semibold mb-2">Item Name</label>
              <div className="relative flex items-center">
                <FaTag className="absolute left-4 text-blue-400 z-10" />
                <input
                  type="text"
                  id="itemname"
                  name="itemname"
                  value={currentItem.itemname}
                  onChange={handleItemChange}
                  className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                  autoComplete="off"
                />
              </div>
              {filteredProducts.length > 0 && currentItem.itemname && (
                <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-xl">
                  {filteredProducts.map((product) => (
                    <li
                      key={product._id}
                      onClick={() => handleProductSelect(product)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-200 flex items-center space-x-2"
                    >
                      <FaCheckCircle className="text-green-500" />
                      <span className="font-medium text-gray-800">{product.itemname}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label htmlFor="purchasePrice" className="block text-blue-800 font-semibold mb-2">Purchase Price</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-blue-400 z-10 font-bold">₨</span>
                <input
                  type="number"
                  id="purchasePrice"
                  name="purchasePrice"
                  value={currentItem.purchasePrice}
                  onChange={handleItemChange}
                  className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sellingPrice" className="block text-blue-800 font-semibold mb-2">Selling Price</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-blue-400 z-10 font-bold">₨</span>
                <input
                  type="number"
                  id="sellingPrice"
                  name="sellingPrice"
                  value={currentItem.sellingPrice}
                  onChange={handleItemChange}
                  className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-blue-800 font-semibold mb-2">Quantity</label>
              <div className="relative flex items-center">
                <FaBoxes className="absolute left-4 text-blue-400 z-10" />
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={currentItem.quantity}
                  onChange={handleItemChange}
                  className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            {isNewProduct && (
              <>
                <div>
                  <label htmlFor="category" className="block text-blue-800 font-semibold mb-2">Category</label>
                  <div className="relative flex items-center">
                    <FaTag className="absolute left-4 text-blue-400 z-10" />
                    <input
                      type="text"
                      id="category"
                      name="category"
                      placeholder="Enter category"
                      value={currentItem.category}
                      onChange={handleItemChange}
                      className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="unit" className="block text-blue-800 font-semibold mb-2">Unit</label>
                  <div className="relative flex items-center">
                    <FaWeightHanging className="absolute left-4 text-blue-400 z-10" />
                    <input
                      id="unit"
                      name="unit"
                      type='text'
                      placeholder="e.g. kg, pcs"
                      value={currentItem.unit}
                      onChange={handleItemChange}
                      className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleAddItem}
            type="button"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:bg-blue-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
          >
            Add Item
          </button>
        </div>

        {purchaseDetails.items.length > 0 && (
          <div className="mb-8 border-t pt-8 border-blue-200">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-xl font-mono text-sm">
              <div className="flex flex-col items-center text-center">
                <img className='h-15 mb-4' src={Dukaan_Digital} alt="Dukaan_Digital" />
                <h2 className="text-gray-800 mb-1 text-xl font-bold">{JSON.parse(sessionStorage.getItem("user"))?.shopname}</h2>
                <div className="border-t border-dashed w-full border-gray-400 py-2"></div>
              </div>
              <div className="mb-4 text-gray-700">
                <h2 className="text-2xl font-bold text-center text-blue-700 tracking-wide mb-2">Purchase Receipt</h2>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                  <span>Date: {new Date().toLocaleDateString()}</span>
                  <span>Time: {new Date().toLocaleTimeString()}</span>
                </div>
                <div className="border-t border-dashed w-full border-gray-400 py-2"></div>
                <p className="pb-2 tracking-wide text-sm font-semibold text-gray-800">Supplier: <span className="font-normal">{purchaseDetails.suppliername}</span></p>
                <div className="border-t border-dashed w-full border-gray-400 py-2"></div>
              </div>
              {purchaseDetails.items.map((item, index) => (
                <div key={index} className="flex items-start justify-between border-b border-dashed border-gray-300 py-3 last:border-b-0 last:pb-0">
                  <div className="flex-1 pr-4">
                    <p className="font-bold text-gray-800 text-lg mb-1">{item.itemname}</p>
                    <p className="text-xs text-gray-500">
                      P-Price: <span className="text-gray-700 font-medium">{formatPrice(item.purchasePrice)}</span>
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-800 text-lg">x{item.quantity}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatPrice(item.quantity * item.purchasePrice)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="ml-4 text-red-500 hover:text-red-700 transition duration-300 p-2 rounded-full hover:bg-red-100"
                    title="Remove item"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              ))}
              <div className="pt-6">
                <div className="flex justify-between font-semibold text-gray-700">
                  <span>Total Items:</span>
                  <span>{purchaseDetails.items.length}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 mt-2 text-xl border-t-2 border-dashed border-gray-400 pt-2">
                  <span>Grand Total:</span>
                  <span>{formatPrice(purchaseDetails.items.reduce((total, item) => total + (item.quantity * item.purchasePrice), 0))}</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="border-t border-dashed w-full border-gray-400 py-2"></div>
                <p className="text-xs text-gray-500">Thank you for your business!</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:bg-blue-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
            disabled={!purchaseDetails.suppliername || purchaseDetails.items.length === 0 || loading}
          >
            {loading ? "Processing..." : "Purchase"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseFormPage;
