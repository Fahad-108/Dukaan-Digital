import React, { useState, useEffect } from 'react';
import { addProduct, getProductById, updateProduct } from '../../services/productService';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    itemname: '',
    category: '',
    unit: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
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
        setTimeout(() => {
        navigate('/products');
      }, 1500);
      } else {
        await addProduct(product);
        toast.success('Product added successfully!');
        setProduct({
          itemname: '',
          category: '',
          unit: ''
        });
      }
      
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add product!")
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-blue-300"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          {id ? "Edit Product" : "Add New Product"}
        </h2>

        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">Item Name</label>
          <input
            name="itemname"
            value={product.itemname}
            onChange={handleChange}
            type="text"
            placeholder="Enter item name"
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">Category</label>
          <input
            name="category"
            value={product.category}
            onChange={handleChange}
            type="text"
            placeholder="Enter category"
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

          <div className='mb-4'>
            <label className="block text-blue-700 font-medium mb-1">Unit</label>
            <input
              name="unit"
              value={product.unit}
              onChange={handleChange}
              type="text"
              placeholder="e.g. kg, pcs"
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? (id ? "Updating..." : "Saving...") : (id ? "Update Product" : "Add Product")}
        </button>
      </form>
    </div>
  );
};

export default ProductFormPage;
