import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import UserList from "../Components/List/UserList";
import AdminList from "../Components/List/AdminList";
// import AddProduct from "../Components/CRUD/AddProduct";
import { useTheme } from "../Contexts/ThemeContext";
import { useAuthContext } from "../Contexts/AuthContext";

const Home = () => {
  const [activetab, setActivetab] = React.useState("allProfiles");
  const { theme } = useTheme();
  const { authUser } = useAuthContext();
  return (
    <>
      <Navbar activetab={activetab} setActivetab={setActivetab} />
      <div
        className={`p-2 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-slate-200 text-gray-900"
        }`}
      >
        {activetab === "manageProfiles" && authUser && authUser.role === "admin" && (
          <AdminList />
        )}
        {activetab === "allProfiles" && <UserList/>}
      </div>
    </>
  );
};

export default Home;
