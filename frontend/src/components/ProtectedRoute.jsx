import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const isAuth = Boolean(sessionStorage.getItem("token"));
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userRole = user?.role || null;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Agar role match nahi karta to apne role ke dashboard par bhej do
  if (role && userRole !== role) {
    if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (userRole === "manager") {
      return <Navigate to="/manager" replace />; // manager ka dashboard root "/" par hai
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
