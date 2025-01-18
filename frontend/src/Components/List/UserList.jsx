import React, { useState, useEffect } from "react";
import Search from "./Search";
import Map from "../Map/Map";
import { useTheme } from "../../Contexts/ThemeContext";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Logo from "../../assets/user.png";

const UserList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/profile/");
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const result = await response.json();
        if (!Array.isArray(result.data)) {
          throw new Error("API response is not an array");
        }

        setData(result.data);
        setFilteredData(result.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div
      className={`p-1 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-slate-200 text-gray-900"
      } flex`}
    >
      <div className="w-1/4 bg-blue-400 mx-1 rounded-xl">
        <div className="">
          <Search originalData={data} setalldata={setFilteredData} />
        </div>
        <div className="overflow-y-auto">
          {filteredData.length > 0 ? (
            filteredData.map((user) => (
              <div
                key={user.id}
                className="flex flex-col p-2  border border-gray-500 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={Logo} alt="" className="w-10 h-10" />
                    <div className="flex flex-col mx-2">
                      <h2 className="text-lg font-bold">{user.name}</h2>
                      <p className="text-xs">{user.description}</p>
                    </div>
                  </div>
                  <Link to={`/profile/${user.id}`} className="text-blue-500">
                  <FaEye />

                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 border border-gray-300">
              No profiles found.
            </div>
          )}
        </div>
      </div>
      <div className="w-3/4 mx-1 rounded-xl">
        <Map data={filteredData} />
      </div>
    </div>
  );
};

export default UserList;
