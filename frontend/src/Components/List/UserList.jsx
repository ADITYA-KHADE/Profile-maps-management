import React, { useState, useEffect } from "react";
import Search from "./Search";
import Map from "../Map/Map";
import { useTheme } from "../../Contexts/ThemeContext";
import { Link } from "react-router-dom";

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
      className={`p-4 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-slate-200 text-gray-900"
      }`}
    >
      <div className="">
        <div className="lg:mx-6">
          <Search originalData={data} setalldata={setFilteredData} />
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Link
                        to={`/profile/${user._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center border border-gray-300 px-4 py-2"
                  >
                    No profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="">
        <Map data={filteredData} />
      </div>
    </div>
  );
};

export default UserList;
