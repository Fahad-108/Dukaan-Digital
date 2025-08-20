import React, { useEffect, useState } from 'react';
import { getExpense, deleteExpense } from '../../services/expenseService';
import { Trash2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ExpenseListPage = () => {
  const navigate = useNavigate();
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const res = await getExpense();
      if (res.data && res.data.length > 0) {
        setExpenseList(res.data.reverse());
        toast.success("Data refreshed!");
      } else {
        setExpenseList([]);
      }
    } catch (err) {
      toast.error("Failed to refresh expenses");
      console.error("Error fetching expenses", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (expense) => {
    try {
      if (confirm("Are you really want to delete this?")) {
        const res = await deleteExpense(expense._id);
        if (res.status === 200 || res.status === 201) {
          toast.success("Expense deleted successfully!");
        }
        fetchExpenses();
      }
    } catch (err) {
      toast.error("Failed to delete expense");
      console.error("Error deleting expenses", err);
    }
  };

  return (
    <div className="relative p-6 space-y-6 min-h-screen">

      {/* Add Expense button outside card */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => navigate('/expenses/new')}
          className='px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 transition'
        >
          <FileText size={16}/> Add Expense
        </button>
      </div>

      {/* Card with heading inside */}
      <div className="bg-white shadow-md rounded-lg border border-blue-200 p-6 space-y-4">
        
        {/* Header inside card */}
        <h1 className="text-xl font-semibold text-blue-700 mb-4">Expense Records</h1>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-600 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenseList.length > 0 ? (
                  expenseList.map((expense, index) => (
                    <tr key={expense._id} className="border-b hover:bg-blue-50 transition">
                      <td className="px-4 py-3 font-medium text-blue-700">{expense.title}</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">
                        ₨ {expense.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{expense.description}</td>
                      <td className="px-4 py-3 text-blue-700">{new Date(expense.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 flex justify-center gap-2">
                        <button 
                          onClick={() => handleDelete(expense)}
                          className="p-2 text-red-500 rounded-lg hover:bg-red-100 hover:shadow-sm transition cursor-pointer"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-6 text-center text-blue-500">
                      No expense records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default ExpenseListPage;
