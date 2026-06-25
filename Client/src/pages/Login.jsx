import React from "react";
import { Mail, User2Icon, LockIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../configs/api.js";
import { login, setLoading } from "../app/features/authSlice.js";
import {toast} from "sonner";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const query = new URLSearchParams(window.location.search);
    const urlState = query.get("state");

    const [state, setState] = React.useState(urlState || "login");
    const [btnLoading, setBtnLoading] = React.useState(false);

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setBtnLoading(true);
            dispatch(setLoading(true));

            const endpoint =
                state === "login"
                    ? "/users/login"
                    : "/users/register";

            const payload =
                state === "login"
                    ? {
                          email: formData.email,
                          password: formData.password,
                      }
                    : formData;

            const { data } = await api.post(endpoint, payload);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success(data.message);

            dispatch(
                login({
                    token: data.token,
                    user: data.user,
                })
            );

            navigate("/app");
        } catch (error) {
            toast(
                error.response?.data?.message ||
                    "Something went wrong."
            );
        } finally {
            setBtnLoading(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="sm:w-[380px] w-full border border-gray-300 rounded-2xl bg-white px-8 py-8"
            >
                <h1 className="text-3xl font-semibold text-center">
                    {state === "login" ? "Login" : "Create Account"}
                </h1>

                <p className="text-gray-500 text-center mt-2">
                    {state === "login"
                        ? "Welcome back!"
                        : "Create an account to continue"}
                </p>

                {state === "register" && (
                    <div className="flex items-center mt-6 border border-gray-300 rounded-full h-12 px-4 gap-3">
                        <User2Icon size={18} color="#6B7280" />

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full outline-none"
                            required
                        />
                    </div>
                )}

                <div className="flex items-center mt-4 border border-gray-300 rounded-full h-12 px-4 gap-3">
                    <Mail size={18} color="#6B7280" />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full outline-none"
                        required
                    />
                </div>

                <div className="flex items-center mt-4 border border-gray-300 rounded-full h-12 px-4 gap-3">
                    <LockIcon size={18} color="#6B7280" />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full outline-none"
                        required
                    />
                </div>

                {state === "login" && (
                    <div className="mt-4 text-left">
                        <button
                            type="button"
                            className="text-green-500 text-sm"
                        >
                            Forgot Password?
                        </button>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={btnLoading}
                    className="mt-6 w-full h-11 rounded-full bg-[#A6FF5D] hover:bg-[#90e64d] transition disabled:opacity-50"
                >
                    {btnLoading
                        ? "Please wait..."
                        : state === "login"
                        ? "Login"
                        : "Sign Up"}
                </button>

                <p className="text-center mt-6 text-sm text-gray-500">
                    {state === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <button
                        type="button"
                        onClick={() =>
                            setState((prev) =>
                                prev === "login"
                                    ? "register"
                                    : "login"
                            )
                        }
                        className="ml-2 text-green-600 hover:underline font-medium"
                    >
                        {state === "login"
                            ? "Sign Up"
                            : "Login"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;