import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { loginApi } from "../services/allApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState({ email: "", password: "" });

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (admin.email && admin.password) {
            setLoading(true); // Start loading
            try {
                const result = await loginApi(admin);
                if (result.status === 200) {
                    sessionStorage.setItem("user", JSON.stringify(result.data.user));
                    sessionStorage.setItem("token", result.data.token);
                    setTimeout(() => {
                        navigate("/admin-panel", { replace: true });
                        setLoading(false); // Stop loading after navigation
                    }, 1000);
                } else {
                    toast.error("Login failed");
                    setLoading(false); // Stop loading on failure
                }
            } catch (e) {
                console.error(e);
                setLoading(false); // Stop loading on error
            }
        } else {
            toast.error("All fields are required");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 rounded-2xl shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <div className="relative mb-4">
                        <FaUser className="absolute left-3 top-3 text-gray-500 mt-2" />
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={e => setAdmin({ ...admin, email: e.target.value })}
                            value={admin.email}
                            className="w-full pl-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={loading}
                        />
                    </div>

                    <div className="relative mb-6">
                        <FaLock className="absolute left-3 top-3 text-gray-500 mt-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={e => setAdmin({ ...admin, password: e.target.value })}
                            value={admin.password}
                            className="w-full pl-10 py-3 pe-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition duration-300 flex justify-center items-center"
                        disabled={loading} // Disable button when loading is true
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
