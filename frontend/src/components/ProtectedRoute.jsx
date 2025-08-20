import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const isAuth = Boolean(sessionStorage.getItem("token"))

    if (!isAuth) {
        return <Navigate to={"/login"} replace />
    }
    return (
        <div>
            {/* ProtectedRoute */}
            <Outlet />
        </div>
    )
}


export default ProtectedRoute