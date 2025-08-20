import Dukaan_Digital from '../../assets/Dukaan_Digital.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-600 text-white p-6">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-6 md:mb-0 flex items-center gap-4">
                        <img className="h-12 invert" src={Dukaan_Digital} alt="Dukaan_Digital" />
                        <p className="text-sm font-light">Your Digital Business Solution</p>
                    </div>

                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                        <Link to="/aboutus" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-300">About Us</Link>
                        <Link to="/privacypolicy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-300">Privacy Policy</Link>
                        <Link to="/termsandconditions" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-300">Terms & Conditions</Link>
                        <Link to="/contactus" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-300">Contact Us</Link>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white border-opacity-20 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Dukaan Digital. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer