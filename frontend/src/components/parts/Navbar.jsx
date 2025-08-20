import Dukaan_Digital from '../../assets/Dukaan_Digital.svg';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    return (
        <nav className="bg-blue-600 text-white w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="md:hidden">
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-400 hover:text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-shrink-0 p-2 pl-8">
                        <img className="h-18 p-2 invert" src={Dukaan_Digital} alt="Dukaan_Digital" />
                    </div>
                    <div className="md:flex items-center space-x-8">
                        <button
                            onClick={() => { sessionStorage.clear(); navigate('/login') }}
                            className='px-2 py-1 flex gap-2 items-center font-bold cursor-pointer bg-white hover:bg-blue-600 hover:text-white rounded-lg text-blue-500'
                        >
                            <LogOut size={18} /><span className='hidden md:flex'> Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;