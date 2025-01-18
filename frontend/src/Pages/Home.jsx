import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import ProductsList from "../Components/ProductsList/ProductsList";
import AdminList from "../Components/ProductsList/AdminList";
import AddProduct from "../Components/CRUD/AddProduct";
import { useTheme } from "../Contexts/ThemeContext";
import { useAuthContext } from "../Contexts/AuthContext";

const Home = () => {
  const [activetab, setActivetab] = React.useState("products");
  const { theme } = useTheme();
  const { authUser } = useAuthContext();
  return (
    <>
      <Navbar activetab={activetab} setActivetab={setActivetab} />
      <div
        className={`p-5 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-slate-200 text-gray-900"
        }`}
      >
        {activetab === "products" && authUser && authUser.role === "admin" && (
          <AdminList />
        )}
        {activetab === "products" && authUser && authUser.role === "user" && (
          <ProductsList />
        )}
        {activetab === "addproduct" && <AddProduct />}
      </div>
    </>
  );
};

export default Home;
