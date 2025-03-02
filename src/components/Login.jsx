import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { loginApi } from "../services/allApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate= useNavigate()
  const [admin, setAdmin] = useState({
    email:"",password:""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (admin.email && admin.password) {
    //   setIsLoading(true); // ✅ Corrected spelling
      try {
        const result = await loginApi(admin);
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setTimeout(() => {
            navigate("/admin-panel");
          }, 1000);
        } else {
          // alert(result?.response?.data?.message || "Login failed");
           toast.error("Login failed")
        //   setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        // setIsLoading(false); // ✅ Ensures loading state is reset on failure
      }
    } else {
      alert("All fields are required");
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
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              onChange={e=>setAdmin({...admin,email:e.target.value})} value={admin.email}
              className="w-full pl-10 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative mb-6">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              onChange={e=>setAdmin({...admin,password:e.target.value})} value={admin.password}
              className="w-full pl-10 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
