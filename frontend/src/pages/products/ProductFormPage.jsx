import { useState, useEffect } from 'react'
import { getProductById, updateProduct } from '../../services/productService.js'
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    itemname: '',
    category: '',
    purchasePrice: '',
    sellingPrice: '',
    quantity: '',
    unit: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        toast.error("Failed to edit product")
        navigate('/products')
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product);
      toast.success("Product updated successfully");
      setTimeout(() => {
        navigate('/products');
      }, 500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add product!")
    }
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-blue-300">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-blue-700 font-medium mb-1">Item Name</label>
            <input
              name="itemname"
              onChange={handleChange}
              value={product.itemname}
              type="text"
              placeholder="Enter item name"
              required
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-blue-700 font-medium mb-1">Category</label>
            <input
              name="category"
              onChange={handleChange}
              value={product.category}
              type="text"
              placeholder="Enter category"
              required
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-700 font-medium mb-1">Purchase Price</label>
              <input
                name="purchasePrice"
                onChange={handleChange}
                value={product.purchasePrice}
                type="number"
                placeholder="0.00"
                required
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-blue-700 font-medium mb-1">Selling Price</label>
              <input
                name="sellingPrice"
                onChange={handleChange}
                value={product.sellingPrice}
                type="number"
                placeholder="0.00"
                required
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-700 font-medium mb-1">Quantity</label>
              <input
                name="quantity"
                onChange={handleChange}
                value={product.quantity}
                type="number"
                placeholder="Enter quantity"
                required
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-blue-700 font-medium mb-1">Unit</label>
              <input
                name="unit"
                onChange={handleChange}
                value={product.unit}
                type="text"
                placeholder="e.g. kg, pcs"
                required
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductFormPage;