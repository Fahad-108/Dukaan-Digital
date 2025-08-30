import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ShoppingCart, HandCoins, DollarSign, Receipt, MessageCircleWarning, Eye, EyeOff, Sparkles, PartyPopper, CheckCircle2, TrendingUp } from "lucide-react";
import { getdashboardReport } from "../../services/dashboardService";

const Card = ({ children, className = "" }) => (
    <div className={`rounded-2xl shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6  ${className}`}>{children}</div>
);

const Dashboard = () => {
    const [ishide, setishide] = useState(true);
    const [loading, setloading] = useState(true);
    const [summary, setsummary] = useState()
    const [salesData, setsalesData] = useState()
    const [lowStock, setLowStock] = useState()

    const fetchData = async () => {
        try {
            const res = await getdashboardReport();
            setsummary(res.data.summary);
            setsalesData(res.data.salesData);
            setLowStock(res.data.lowStock);
            setloading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            {loading ? (
                <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
                    <span class="loader"></span>
                    <span className="text-blue-600 font-bold text-xl mt-2">Loading...</span>
                </div>) :
                <div className="p-6 bg-gray-50 min-h-screen">
                    <div className="flex justify-between items-center gap-2">
                        <h1 className="text-3xl p-2 px-4 mb-4 font-bold text-gray-800">
          {JSON.parse(sessionStorage.getItem("user")).shopname}
        </h1>
                        <div className={`p-2 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center  transition-colors ${ishide ? "bg-red-100 border-red-600" : "bg-green-100 border-green-600"}`} title={ishide ? "Show Values" : "Hide Values"}>
                            {ishide ? (
                                <EyeOff className="text-red-600 cursor-pointer" size={24} onClick={() => setishide(!ishide)} />
                            ) : (
                                <Eye className="text-green-600 cursor-pointer" size={24} onClick={() => setishide(!ishide)} />
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="bg-blue-500 text-white">
                            <CardContent className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm">Sales</p>
                                    <h2 className="text-2xl font-bold">
                                        {ishide ? "*****" : `₨ ${summary.sales.toLocaleString()}`}
                                    </h2>
                                </div>
                                <ShoppingCart size={40} />
                            </CardContent>
                        </Card>

                        <Card className="bg-green-500 text-white">
                            <CardContent className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm">Profit</p>
                                    <h2 className="text-2xl font-bold">
                                        {ishide ? "*****" : `₨ ${summary.profit.toLocaleString()}`}
                                    </h2>
                                </div>
                                <DollarSign size={40} />
                            </CardContent>
                        </Card>

                        <Card className="bg-red-500 text-white">
                            <CardContent className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm">Expenses</p>
                                    <h2 className="text-2xl font-bold">
                                        {ishide ? "*****" : `₨ ${summary.expenses.toLocaleString()}`}
                                    </h2>
                                </div>
                                <Receipt size={40} />
                            </CardContent>
                        </Card>

                        <Card className="bg-yellow-500 text-white">
                            <CardContent className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm">Credit</p>
                                    <h2 className="text-2xl font-bold">
                                        {ishide ? "*****" : `₨ ${summary.credit.toLocaleString()}`}
                                    </h2>
                                </div>
                                <HandCoins size={40} />
                            </CardContent>
                        </Card>
                    </div>

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

                        <Card className="rounded-xl">
                            <CardContent >
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <MessageCircleWarning className="text-red-600" size={18} /> Low Stock Alerts
                                </h2>
                                {lowStock.length === 0 &&
                                    <li className="relative p-6 rounded-xl shadow-md bg-green-600 text-white">
                                        <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm rounded-full p-2">
                                            <Sparkles size={18} />
                                        </div>

                                        <div className="flex items-center justify-center gap-3">
                                            <PartyPopper size={28} />
                                            <span className="text-lg font-semibold">All items are fully stocked!</span>
                                            <CheckCircle2 size={24} />
                                        </div>

                                        <p className="text-sm text-white/90 text-center mt-1">
                                            Your inventory is in perfect shape
                                            <TrendingUp size={16} className="inline" />
                                        </p>
                                    </li>
                                }
                                <ul className="space-y-2">
                                    {lowStock.map((item, index) => (
                                        <li
                                            key={index}
                                            className="not-even:bg-red-100 p-0.5 rounded flex justify-between text-red-600 font-medium"
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
            }
        </div>
    );
};

export default Dashboard;