import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast'; // Assuming you have react-hot-toast installed
import { addPurchase } from '../../services/purchaseService.js';
import { getProducts } from '../../services/productService.js';
import Dukaan_Digital from '../../assets/Dukaan_Digital.svg'

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

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to load existing products');
      console.error('Error fetching products:', err);
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
      <form onSubmit={handlePurchase} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-blue-300">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">New Purchase</h1>
        
        {/* Supplier Name */}
        <div className="mb-4">
          <label htmlFor="suppliername" className="block text-blue-700 font-medium mb-1">Supplier Name</label>
          <input
            type="text"
            id="suppliername"
            name="suppliername"
            value={purchaseDetails.suppliername}
            onChange={handleSupplierChange}
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Section */}
        <div className="mb-6 border-t pt-4 border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Item Name */}
            <div className="relative">
              <label htmlFor="itemname" className="block text-blue-700 font-medium mb-1">Item Name</label>
              <input
                type="text"
                id="itemname"
                name="itemname"
                value={currentItem.itemname}
                onChange={handleItemChange}
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
              {filteredProducts.length > 0 && currentItem.itemname && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                  {filteredProducts.map((product) => (
                    <li
                      key={product._id}
                      onClick={() => handleProductSelect(product)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {product.itemname}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Always visible inputs */}
            <div>
              <label htmlFor="purchasePrice" className="block text-blue-700 font-medium mb-1">Purchase Price</label>
              <input
                type="number"
                id="purchasePrice"
                name="purchasePrice"
                value={currentItem.purchasePrice}
                onChange={handleItemChange}
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="sellingPrice" className="block text-blue-700 font-medium mb-1">Selling Price</label>
              <input
                type="number"
                id="sellingPrice"
                name="sellingPrice"
                value={currentItem.sellingPrice}
                onChange={handleItemChange}
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-blue-700 font-medium mb-1">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={currentItem.quantity}
                onChange={handleItemChange}
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Extra fields only if new product */}
            {isNewProduct && (
              <>
                <div>
                  <label htmlFor="category" className="block text-blue-700 font-medium mb-1">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Enter category"
                    value={currentItem.category}
                    onChange={handleItemChange}
                    className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="unit" className="block text-blue-700 font-medium mb-1">Unit</label>
                  <input
                    id="unit"
                    name="unit"
                    type='text'
                    placeholder="e.g. kg, pcs"
                    value={currentItem.unit}
                    onChange={handleItemChange}
                    className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleAddItem}
            type="button"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            Add Item
          </button>
        </div>

          {purchaseDetails.items.length > 0 && (
          <div className="mb-8 border-t pt-6 border-gray-200">
            <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-xl font-mono text-sm">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center">
                <img className='h-12 mb-2' src={Dukaan_Digital} alt="Dukaan Digital Logo" />
                <h2 className="text-gray-800 mb-1 text-xl font-semibold">{JSON.parse(sessionStorage.getItem("user")).shopname}</h2>
                <div className="border-t border-dashed w-full border-gray-400 py-2 print:border-solid"></div>
              </div>

              {/* Receipt Details */}
              <div className="mb-4 text-gray-700">
                <h2 className="text-2xl font-bold text-center text-gray-900 tracking-wide mb-2">Purchase Receipt</h2>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                  <span>Date: {new Date().toLocaleDateString()}</span>
                  <span>Time: {new Date().toLocaleTimeString()}</span>
                </div>
                <div className="border-t border-dashed w-full border-gray-400 py-2 print:border-solid"></div>
                <p className="pb-2 tracking-wide text-sm font-semibold text-gray-800">Supplier: <span className="font-normal">{purchaseDetails.suppliername}</span></p>
                <div className="border-t border-dashed w-full border-gray-400 py-2 print:border-solid"></div>
              </div>

              {/* Itemized List */}
              {purchaseDetails.items.map((item, index) => (
                <div key={index} className="flex items-start justify-between border-b border-dashed border-gray-300 py-3 last:border-b-0 last:pb-0">
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-gray-800 text-base mb-1">{item.itemname}</p>
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
                    className="ml-4 text-red-400 hover:text-red-600 transition duration-300 p-2 rounded-full hover:bg-red-100"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {/* Totals Section */}
              <div className="pt-6">
                <div className="flex justify-between font-semibold text-gray-700">
                  <span>Total Items:</span>
                  <span>{purchaseDetails.items.length}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 mt-2 text-lg border-t-2 border-dashed border-gray-400 pt-2">
                  <span>Grand Total:</span>
                  <span>{formatPrice(purchaseDetails.items.reduce((total, item) => total + (item.quantity * item.purchasePrice), 0))}</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="border-t border-dashed w-full border-gray-400 py-2 print:border-solid"></div>
                <p className="text-xs text-gray-500">Thank you for your business!</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!purchaseDetails.suppliername || purchaseDetails.items.length === 0}
          >
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseFormPage;
