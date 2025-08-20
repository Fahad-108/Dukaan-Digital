import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ShoppingCart, HandCoins, DollarSign, AlertTriangle } from "lucide-react";

// Simple Card Component (Custom Tailwind)
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Dashboard = () => {
  // Dummy Data
  const summary = {
    sales: 120000,
    expenses: 80000,
    profit: 40000,
    udhaar: 15000,
  };

  const salesData = [
    { month: "Jan", sales: 30000, expenses: 20000 },
    { month: "Feb", sales: 25000, expenses: 18000 },
    { month: "Mar", sales: 40000, expenses: 30000 },
  ];

  const categoryData = [
    { name: "Grocery", value: 40000 },
    { name: "Dairy", value: 30000 },
    { name: "Bakery", value: 20000 },
    { name: "Frozen", value: 10000 },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

  const lowStock = [
    { item: "Milk Bread", qty: 2 },
    { item: "Butter", qty: 1 },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {JSON.parse(sessionStorage.getItem("user")).shopname}
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-500 text-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm">Total Sales</p>
              <h2 className="text-2xl font-bold">₨ {summary.sales}</h2>
            </div>
            <ShoppingCart size={40} />
          </CardContent>
        </Card>

        <Card className="bg-red-500 text-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm">Expenses</p>
              <h2 className="text-2xl font-bold">₨ {summary.expenses}</h2>
            </div>
            <DollarSign size={40} />
          </CardContent>
        </Card>

        <Card className="bg-green-500 text-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm">Net Profit</p>
              <h2 className="text-2xl font-bold">₨ {summary.profit}</h2>
            </div>
            <DollarSign size={40} />
          </CardContent>
        </Card>

        <Card className="bg-yellow-500 text-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm">Udhaar</p>
              <h2 className="text-2xl font-bold">₨ {summary.udhaar}</h2>
            </div>
            <HandCoins size={40} />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Sales vs Expenses</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4F46E5" />
                <Bar dataKey="expenses" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Category-wise Sales</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Rice (5kg)</span>
                <span className="text-green-600">₨ 1,750</span>
              </li>
              <li className="flex justify-between">
                <span>Cooking Oil (2L)</span>
                <span className="text-green-600">₨ 800</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" /> Low Stock Alerts
            </h2>
            <ul className="space-y-2">
              {lowStock.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between text-red-600 font-medium"
                >
                  <span>{item.item}</span>
                  <span>{item.qty} left</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
