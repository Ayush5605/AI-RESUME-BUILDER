import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Layout = () => {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Layout;