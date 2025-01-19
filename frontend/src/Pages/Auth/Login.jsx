import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../Contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { setAuthUser } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "linear-gradient(86.3deg, rgba(0,119,182,1) 3.6%, rgba(8,24,68,1) 87.6%)",
      }}
    >
      <div className="w-full max-w-sm p-8 space-y-6 bg-white bg-opacity-75 backdrop-blur-md rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="block w-full px-4 py-2 border bg-white bg-opacity-75 text-gray-900 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                autoComplete="current-password"
                className="block w-full px-4 py-2 border bg-white bg-opacity-75 text-gray-900 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer pt-6"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-700" />
                ) : (
                  <FaEye className="text-gray-700" />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="flex gap-2 justify-center items-center mt-0 text-gray-600">
            <p>To access admin panel,</p>
            <button
              type="button" 
              className="p-1 bg-blue-500 rounded-lg text-white"
              onClick={(e) => {
                e.preventDefault();
                setEmail("admin@gmail.com");
                setPassword("123");
              }}
            >
              click here
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
