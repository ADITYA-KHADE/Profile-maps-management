import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Search from "./Search";
import UpdateProfile from "../CRUD/UpdateProfile";
import DeleteProfile from "../CRUD/DeleteProfile";
import AddProfile from "../CRUD/AddProfile";
import Logo from "../../assets/user.png";
import { FaAddressCard } from "react-icons/fa";

const AdminList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(5);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/profile/");
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const result = await response.json();
        if (!Array.isArray(result.data)) {
          throw new Error("API response is not an array");
        }

        const sortedProfiles = result.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setProfiles(sortedProfiles);
        setProfileData(sortedProfiles);
        setError(null);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [reload]);

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profileData.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const totalPages = Math.ceil(profiles.length / profilesPerPage);

  const handleUpdate = (profile) => {
    setSelectedProfile(profile);
    setUpdateModal(true);
  };

  const handleAdd = () => {
    setAddModal(true);
  };

  const handleDelete = (profile) => {
    setSelectedProfile(profile);
    setDeleteModal(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-4 font-poppins font-semibold max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md mb-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2 md:mb-0">All Profiles</h1>
          <button
            onClick={handleAdd}
            className="p-2 flex items-center bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition duration-300"
          >
            <FaAddressCard className="mr-2" />
            Add Profile
          </button>
        </div>
      </div>

      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-4 text-gray-700">
          Loading profiles...
        </div>
      ) : (
        <>
          <Search originalData={profiles} setalldata={setProfileData} />
          <div className="overflow-x-auto bg-white shadow-2xl rounded-lg">
            <table className="min-w-full table-auto border-collapse font-poppins">
              <thead>
                <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 uppercase text-sm">
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Photo</th>
                  <th className="px-6 py-4 text-left font-semibold">Address</th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Coordinates
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProfiles.length > 0 ? (
                  currentProfiles.map((profile) => (
                    <tr
                      key={profile._id || profile.id}
                      className="bg-white hover:bg-gray-100 transition border-b"
                    >
                      <td className="px-6 py-4 text-gray-800">
                        {profile.name}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {profile.description}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        <img
                          src={profile.photo ? profile.photo : Logo}
                          alt={profile.name}
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {profile.address}
                      </td>
                      <td className="px-6 py-4 text-gray-800 text-center">
                        {profile.coordinates[0]}, {profile.coordinates[1]}
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                        <Tooltip title="Edit">
                          <button
                            onClick={() => handleUpdate(profile)}
                            className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition duration-300"
                          >
                            <EditIcon />
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <button
                            onClick={() => handleDelete(profile)}
                            className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition duration-300"
                          >
                            <DeleteIcon />
                          </button>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center px-6 py-4 text-gray-600"
                    >
                      No profiles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center w-full py-6">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              aria-label="Profile list pagination"
              className="shadow-lg bg-white p-2 rounded-3xl"
            />
          </div>
        </>
      )}

      {updateModal && (
        <UpdateProfile
          profileData={selectedProfile}
          setUpdateModal={setUpdateModal}
          setReload={setReload}
        />
      )}
      {deleteModal && (
        <DeleteProfile
          profileData={selectedProfile}
          setDeleteModal={setDeleteModal}
          setReload={setReload}
        />
      )}
      {addModal && (
        <AddProfile setAddModal={setAddModal} setReload={setReload} />
      )}
    </div>
  );
};

export default AdminList;
