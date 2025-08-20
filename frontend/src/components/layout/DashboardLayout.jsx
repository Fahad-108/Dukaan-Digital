import { useState } from 'react'
import Navbar from '../parts/Navbar'
import Footer from '../parts/Footer'
import Sidebar from '../parts/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-100">
            <Navbar toggleSidebar={toggleSidebar} />

            <div className="flex flex-1 relative overflow-hidden bg-white">
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-500/50 z-40 md:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}

                <div
                    className={`
                        transform transition-transform duration-300 ease-in-out
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        md:translate-x-0
                        fixed md:static inset-y-0 left-0 z-50
                    `}
                >
                    <Sidebar toggleSidebar={toggleSidebar} />
                </div>

                <div className="flex-1 overflow-y-auto rounded-l-2xl">
                    <Outlet />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardLayout