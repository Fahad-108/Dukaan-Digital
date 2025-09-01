import Navbar from '../parts/Navbar'
import Footer from '../parts/Footer'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
            <Navbar />

                <div className="flex-1 overflow-y-auto rounded-l-2xl">
                    <Outlet />
                </div>

            <Footer />
        </div>
  )
}

export default AdminLayout
