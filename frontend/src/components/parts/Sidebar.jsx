import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    User,
    Package,
    ShoppingCart,
    BarChart2,
    HandCoins,
    FileText,
    LayoutDashboard,
    PackagePlus,
    ShoppingBag,
} from "lucide-react";

const Sidebar = ({toggleSidebar}) => {
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
            label: "Expenses",
            path: "/expenses",
            icon: <FileText size={20} />,
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
        {
            label: 'Purchase',
            path: '/purchase',
            icon: <ShoppingBag size={20} />
        }
    ];

    const isActive = (path) => {
        if(path == '/'){
            return location.pathname === path;
        }
        return location.pathname.includes(path);
    };

    return (
        <aside className="w-64 min-h-full bg-blue-600 text-white flex flex-col p-4 shadow-lg">
            <nav className="flex-1">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            <button
                                onClick={() => {navigate(item.path); toggleSidebar()}}
                                className={`flex items-center gap-3 p-3 w-full text-left rounded-md transition-colors duration-200 
                                ${isActive(item.path)
                                        ? "bg-white text-blue-600"
                                        : "hover:bg-blue-400"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-auto border-y border-gray-300 py-2">
                <button
                    onClick={() => navigate("/profile")}
                    className={`flex items-center gap-3 p-3 w-full text-left rounded-md transition-colors duration-200
                          ${isActive("/profile")
                            ? "bg-white text-blue-500"
                            : "hover:bg-blue-400"
                        }`}
                >
                    <User size={20} />
                    <span>Profile</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;