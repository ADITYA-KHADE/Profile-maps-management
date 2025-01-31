import React, { useState, useEffect } from "react";
import Search from "./Search";
import Map from "../Map/Map";
import { useTheme } from "../../Contexts/ThemeContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
      className={` flex flex-col lg:flex-row ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-slate-200 text-gray-900"
      } min-h-screen`}
    >
      <div className="lg:w-1/4 bg-gradient-to-r from-blue-500 to-purple-600 mx-1 rounded-xl flex flex-col p-1">
        <div className="mb-4">
          <Search originalData={data} setalldata={setFilteredData} />
        </div>

        <div className="flex-1 overflow-y-auto max-h-screen lg:max-h-[calc(100vh-120px)] p-2 rounded-xl shadow-lg">
          {filteredData.length > 0 ? (
            filteredData.map((user) => (
              <div
                key={user.id}
                className="flex flex-col p-2 border border-gray-300 rounded-md mb-2 transition-transform transform hover:scale-105 hover:shadow-2xl bg-gray-100"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center ">
                    <img src={user.photo ? user.photo : Logo} alt="" className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col mx-4">
                      <h2 className="text-base font-bold text-black">
                        {user.name}
                      </h2>
                      <p className="text-xs text-gray-600">
                        {user.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMarker(
                         user
                      );
                    }}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    {selectedMarker?._id === user._id ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
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

      <div className="lg:w-3/4 mt-4 lg:mt-0 mx-1 rounded-xl flex flex-col">
        {filteredData.length>0 && (
          <Map
            data={filteredData}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
