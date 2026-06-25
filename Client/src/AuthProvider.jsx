import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, setLoading } from "./app/features/authSlice";

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (token && storedUser) {
                const user = JSON.parse(storedUser);

                dispatch(
                    login({
                        token,
                        user,
                    })
                );
            }
        } catch (error) {
            console.error("Failed to restore auth state:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    return children;
};

export default AuthProvider;