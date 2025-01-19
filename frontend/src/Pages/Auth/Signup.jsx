import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../Contexts/AuthContext";

const Signup = () => {
  const { setAuthUser } = useAuthContext();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
          confirmpassword: inputs.confirmpassword,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status === 201) {
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
      className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-8  "
      style={{
        backgroundImage:
          "linear-gradient(86.3deg, rgba(0,119,182,1) 3.6%, rgba(8,24,68,1) 87.6%)",
      }}
    >
      <div className="w-full max-w-sm p-8 space-y-6 bg-white bg-opacity-75 backdrop-blur-md rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign up</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                placeholder="Enter your name"
                required
                className="block w-full px-4 py-2 border bg-white bg-opacity-75 text-gray-900 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                placeholder="Enter your email"
                required
                className="block w-full px-4 py-2 border bg-white bg-opacity-75 text-gray-900 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                placeholder="Enter your password"
                required
                className="block w-full px-4 py-2 border bg-white bg-opacity-75 text-gray-900 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                value={inputs.confirmpassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmpassword: e.target.value })
                }
                placeholder="Confirm your password"
                required
                className="block w-full px-4 py-2 border bg-white bg-opacity-75 text-gray-900 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
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
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;