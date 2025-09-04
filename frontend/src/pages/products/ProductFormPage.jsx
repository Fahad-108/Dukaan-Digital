import React, { useState, useEffect } from 'react';
import { addProduct, getProductById, updateProduct } from '../../services/productService';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { FaTag, FaBoxes, FaDollarSign, FaWeightHanging } from 'react-icons/fa';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await getProductById(id);
          setProduct(res.data);
          toast.success('Product fetched successfully!');
        } catch (err) {
          toast.error('Failed to fetch product!');
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await updateProduct(id, product);
        toast.success('Product updated successfully!');
      } else {
        await addProduct(product);
        toast.success('Product added successfully!');
        setProduct({
          itemname: '',
          category: '',
          purchasePrice: '',
          sellingPrice: '',
          quantity: '',
          unit: ''
        });
      }
      setTimeout(() => {
        navigate('/products');
      }, 200);
    } catch (err) {
      toast.error('Error saving product!');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg rounded-xl p-6 w-full max-w-md border border-blue-300 transform transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">
            {id ? "Edit Product" : "Add New Product"}
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-blue-800 font-semibold mb-2">Item Name</label>
          <div className="relative flex items-center">
            <FaTag className="absolute left-4 text-blue-400 z-10" />
            <input
              name="itemname"
              value={product.itemname}
              onChange={handleChange}
              type="text"
              placeholder="Enter item name"
              className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-blue-800 font-semibold mb-2">Category</label>
          <div className="relative flex items-center">
            <FaBoxes className="absolute left-4 text-blue-400 z-10" />
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              type="text"
              placeholder="Enter category"
              className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Purchase Price</label>
            <div className="relative flex items-center">
              <FaDollarSign className="absolute left-4 text-blue-400 z-10" />
              <input
                name="purchasePrice"
                value={product.purchasePrice}
                onChange={handleChange}
                type="number"
                placeholder="0.00"
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-blue-800 font-semibold mb-2">Selling Price</label>
            <div className="relative flex items-center">
              <FaDollarSign className="absolute left-4 text-blue-400 z-10" />
              <input
                name="sellingPrice"
                value={product.sellingPrice}
                onChange={handleChange}
                type="number"
                placeholder="0.00"
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Quantity</label>
            <div className="relative flex items-center">
              <FaWeightHanging className="absolute left-4 text-blue-400 z-10" />
              <input
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                type="number"
                placeholder="Enter quantity"
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-blue-800 font-semibold mb-2">Unit</label>
            <div className="relative flex items-center">
              <FaWeightHanging className="absolute left-4 text-blue-400 z-10" />
              <input
                name="unit"
                value={product.unit}
                onChange={handleChange}
                type="text"
                placeholder="e.g. kg, pcs"
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 placeholder:text-gray-400"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:bg-blue-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
        >
          {loading ? (id ? "Updating..." : "Saving...") : (id ? "Update Product" : "Add Product")}
        </button>
      </form>
    </div>
  );
};

export default ProductFormPage;