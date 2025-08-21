import { useNavigate, useLocation } from "react-router-dom";
import {
    User,
    Package,
    ShoppingCart,
    BarChart2,
    HandCoins,
    ReceiptIcon,
    LayoutDashboard,
    ShoppingBag,
} from "lucide-react";

const Sidebar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            label: "Dashboard",
            path: "/",
            icon: <LayoutDashboard size={20} />,
        },
        {
            label: "Products",
            path: "/products",
            icon: <Package size={20} />,
        },
        {
            label: "Sales",
            path: "/sales",
            icon: <ShoppingCart size={20} />,
        },
        {
            label: "Purchase",
            path: "/purchase",
            icon: <ShoppingBag size={20} />,
        },
        {
            label: "Expenses",
            path: "/expenses",
            icon: <ReceiptIcon size={20} />,
        },
        {
            label: "Credit",
            path: "/udhaar",
            icon: <HandCoins size={20} />,
        },
        {
            label: "Reports",
            path: "/reports",
            icon: <BarChart2 size={20} />,
        },
    ];

    const isActive = (path) => {
        if (path == '/') {
            return location.pathname === path;
        }
        return location.pathname.includes(path);
    };

    return (
        <aside className="group md:w-20 md:hover:w-64 w-64 min-h-full bg-blue-600 text-white flex flex-col p-4 shadow-lg transition-all duration-500">
            <nav className="flex-1">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            <button
                                onClick={() => { navigate(item.path); toggleSidebar() }}
                                className={`flex items-center gap-3 md:group-hover:pr-3 md:pr-0 p-3 w-full text-left rounded-md transition-colors duration-300 
                                ${isActive(item.path)
                                        ? "bg-white text-blue-600"
                                        : "hover:bg-blue-400"
                                    }`}
                            >
                                {item.icon}
                                <span className=" md:group-hover:inline-block md:w-0 w-40 md:group-hover:w-40 overflow-hidden whitespace-nowrap transition-[width] duration-300">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-auto border-y border-gray-300 py-2">
                <button
                    onClick={() => navigate("/profile")}
                    className={`flex items-center gap-3 group-hover:pr-3 pr-0 p-3 w-full text-left rounded-md transition-colors duration-200
                          ${isActive("/profile")
                            ? "bg-white text-blue-500"
                            : "hover:bg-blue-400"
                        }`}
                >
                    <User size={20} />
                    <span className="md:group-hover:inline-block md:w-0 w-40 md:group-hover:w-40 overflow-hidden whitespace-nowrap transition-[width] duration-300">Profile</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;