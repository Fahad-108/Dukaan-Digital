import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ShoppingCart,
  HandCoins,
  DollarSign,
  AlertTriangle,
  EyeOff,
  Eye,
  PartyPopper,
  Sparkles,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getdashboardReport } from "../../services/dashboardService";

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState();
  const [salesData, setSalesData] = useState();
  const [lowStock, setLowStock] = useState();
  const [ishide, setishide] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getdashboardReport();
      setSummary(res.data.summary);
      setSalesData(res.data.salesData);
      setLowStock(res.data.lowStock);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <span className="loader"></span>
      <span className="text-blue-600 font-bold text-xl mt-2">Loading...</span>
    </div>
  ) : (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {JSON.parse(sessionStorage.getItem("user")).shopname}
        </h1>

        {/* 👇 Fixed div */}
        <div
          className={`p-2 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center transition-colors ${
            ishide
              ? "bg-red-100 border-red-600"
              : "bg-green-100 border-green-600"
          }`}
          title={ishide ? "Show Values" : "Hide Values"}
        >
          {ishide ? (
            <EyeOff
              className="text-red-600 cursor-pointer"
              size={24}
              onClick={() => setishide(!ishide)}
            />
          ) : (
            <Eye
              className="text-green-600 cursor-pointer"
              size={24}
              onClick={() => setishide(!ishide)}
            />
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-500 text-white hover:scale-105 transform transition-all">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Sales</p>
              <h2 className="text-2xl font-bold">
                {ishide ? "*****" : `₨ ${summary.sales.toLocaleString()}`}
              </h2>
            </div>
            <ShoppingCart size={40} />
          </CardContent>
        </Card>

        <Card className="bg-red-500 text-white hover:scale-105 transform transition-all">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Expenses</p>
              <h2 className="text-2xl font-bold">
                {ishide ? "*****" : `₨ ${summary.expenses.toLocaleString()}`}
              </h2>
            </div>
            <DollarSign size={40} />
          </CardContent>
        </Card>

        <Card className="bg-green-500 text-white hover:scale-105 transform transition-all">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Profit</p>
              <h2 className="text-2xl font-bold">
                {ishide ? "*****" : `₨ ${summary.profit.toLocaleString()}`}
              </h2>
            </div>
            <DollarSign size={40} />
          </CardContent>
        </Card>

        <Card className="bg-yellow-500 text-white hover:scale-105 transform transition-all">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Credit</p>
              <h2 className="text-2xl font-bold">
                {ishide ? "*****" : `₨ ${summary.credit.toLocaleString()}`}
              </h2>
            </div>
            <HandCoins size={40} />
          </CardContent>
        </Card>
      </div>

      {/* Charts + Low Stock Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Expenses Chart */}
        <Card className="hover:shadow-lg transition-all">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Sales vs Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
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

        {/* Low Stock Alerts */}
        <Card className="hover:shadow-lg transition-all">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" /> Low Stock Alerts
            </h2>
            <ul
              className={`space-y-2 ${
                lowStock.length > 0 ? "max-h-[300px] overflow-y-auto no-scrollbar" : ""
              }`}
            >
              {lowStock.length > 0 ? (
                lowStock.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 bg-red-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-red-700 font-medium"
                  >
                    <span className="truncate">{item.item}</span>
                    <span className="font-bold">{item.qty} left</span>
                  </li>
                ))
              ) : (
                <li className="relative p-6 rounded-xl shadow-md bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                  <div className="absolute -top-3 -right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Sparkles size={18} />
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <PartyPopper size={28} />
                    <span className="text-lg font-semibold">
                      All items are fully stocked!
                    </span>
                    <CheckCircle2 size={24} />
                  </div>

                  <p className="text-sm text-white/90 text-center mt-1">
                    Your inventory is in perfect shape
                    <TrendingUp size={16} className="inline" />
                  </p>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
