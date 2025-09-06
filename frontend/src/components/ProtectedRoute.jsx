import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
    const isAuth = Boolean(sessionStorage.getItem("token"));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userRole = user?.role || null;

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    // Agar role match nahi karta to hata do
    //   if (role && userRole !== role) {
    //     // agar admin ki route access kar raha hai but wo manager nikla
    //     // ya manager ki route access kar raha hai but wo admin nikla
    //     return <Navigate to={`/${userRole}`} replace />;
    //   }
    if (role && userRole !== role) {
        if (userRole === "admin") {
            return <Navigate to="/admin" replace />;
        }
        if (userRole === "manager") {
            return <Navigate to="/manager" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;