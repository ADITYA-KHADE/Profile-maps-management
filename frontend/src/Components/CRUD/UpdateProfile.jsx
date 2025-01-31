import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const UpdateProfile = ({ profileData, setUpdateModal, setReload }) => {
  const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    description: "",
    photo: "",
    address: "",
    coordinates: [0, 0],
  });
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  useEffect(() => {
    if (profileData) {
      setUpdatedProfile(profileData);
      setLongitude(profileData.coordinates[0]?.toString() || "");
      setLatitude(profileData.coordinates[1]?.toString() || "");
    }
  }, [profileData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setUpdateModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setUpdateModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "longitude") {
      setLongitude(value);
      setUpdatedProfile((prev) => ({
        ...prev,
        coordinates: [parseFloat(value) || 0, prev.coordinates[1]],
      }));
    } else if (name === "latitude") {
      setLatitude(value);
      setUpdatedProfile((prev) => ({
        ...prev,
        coordinates: [prev.coordinates[0], parseFloat(value) || 0],
      }));
    } else {
      setUpdatedProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    const { name, description, photo, address, coordinates } = updatedProfile;

    if (
      !name ||
      !description ||
      !photo ||
      !address ||
      coordinates.length !== 2 ||
      coordinates.some(isNaN)
    ) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/profile/${updatedProfile._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      setUpdateModal(false);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.message || "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Update Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedProfile.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={updatedProfile.description}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={updatedProfile.address}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div>
              <label
                htmlFor="longitude"
                className="block text-sm font-medium text-gray-700"
              >
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={longitude}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
                required
              />
            </div>
            <div>
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-gray-700"
              >
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={latitude}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={() => setUpdateModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-blue-300" : "bg-blue-500"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
