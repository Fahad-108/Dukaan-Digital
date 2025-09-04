import React, { useState } from 'react';
import { addExpense } from '../../services/expenseService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaDollarSign, FaFileAlt, FaTag } from 'react-icons/fa';

const ExpenseFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData)
      const res = await addExpense(formData);
      if (res.status === 200 || res.status === 201) {
        toast.success('Expense added successfully!');
        setFormData({
          title: '',
          description: '',
          amount: ''
        });
        setTimeout(() => {
          navigate('/expenses')
        }, 200);
      } else {
        toast.error('Failed to add expense!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg rounded-xl p-6 w-full max-w-md border border-blue-300 transform transition-all duration-300 hover:scale-[1.01]"
      > 
        <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">
          Add New Expense
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Fill out the details below to add a new expense.
        </p>

        <div className="mb-4">
          <label className="block text-blue-800 font-semibold mb-2">
            Title
          </label>
          <div className="relative flex items-center">
            <FaTag className="absolute left-4 text-blue-400 z-10" />
            <input
              type="text"
              name="title"
              placeholder="Enter expense title"
              value={formData.title}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-blue-800 font-semibold mb-2">
            Amount
          </label>
          <div className="relative flex items-center">
            <FaDollarSign className="absolute left-4 text-blue-400 z-10" />
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-blue-800 font-semibold mb-2">
            Description
          </label>
          <div className="relative flex items-center">
            <FaFileAlt className="absolute left-4 top-4 text-blue-400 z-10" />
            <textarea
              name="description"
              placeholder="Enter expense description"
              value={formData.description}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-900 placeholder:text-gray-400"
              rows="4"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:bg-blue-400 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseFormPage;
