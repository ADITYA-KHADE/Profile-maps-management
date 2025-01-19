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
  const [selectedMarker, setSelectedMarker] = useState(null);

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
      className={`p-1 flex ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-slate-200 text-gray-900"
      }`}
    >
     
      <div className="w-1/4 bg-blue-400 mx-1 rounded-xl flex flex-col">
        <div className="p-2">
          <Search originalData={data} setalldata={setFilteredData} />
        </div>
       
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)] p-2">
          {filteredData.length > 0 ? (
            filteredData.map((user) => (
              <div
                key={user.id}
                className="flex flex-col p-2 border border-gray-500 rounded-md mb-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={Logo} alt="" className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col mx-2">
                      <h2 className="text-lg font-bold">{user.name}</h2>
                      <p className="text-xs">{user.description}</p>
                    </div>
                  </div>
                  <button onClick={()=>{
                    setSelectedMarker(user);
                  }} className="text-blue-500">
                    <FaEye />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 border border-gray-300 rounded-md">
              No profiles found.
            </div>
          )}
        </div>
      </div>
    
      <div className="w-3/4 mx-1 rounded-xl">
        <Map data={filteredData} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
      </div>
    </div>
  );
};

export default UserList;
