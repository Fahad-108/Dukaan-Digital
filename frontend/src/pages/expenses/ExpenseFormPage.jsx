import React, { useState } from 'react';
import { addExpense } from '../../services/expenseService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-blue-300"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Add New Expense
        </h2>

        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter expense title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-blue-700 font-medium mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-blue-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter expense description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseFormPage;