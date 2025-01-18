import React, { useEffect } from "react";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./Contexts/AuthContext";
import Info from "./Components/Info/Info";
import "./App.css";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!authUser?._id) return;

      try {
        const response = await fetch('/api/auth/getToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: authUser._id }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch data');
        }
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (authUser) {
      fetchData();
    }
  }, [authUser?._id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/profile/:id"
          element={authUser ? <Info /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
