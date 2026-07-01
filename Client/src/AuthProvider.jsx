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
                // Decode token to check expiration
                const payloadBase64 = token.split(".")[1];
                let isExpired = false;
                if (payloadBase64) {
                    try {
                        const decodedJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
                        const decoded = JSON.parse(decodedJson);
                        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                            isExpired = true;
                        }
                    } catch (e) {
                        isExpired = true;
                    }
                } else {
                    isExpired = true;
                }

                if (isExpired) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                } else {
                    const user = JSON.parse(storedUser);
                    dispatch(
                        login({
                            token,
                            user,
                        })
                    );
                }
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