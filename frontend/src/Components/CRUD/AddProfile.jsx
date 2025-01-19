import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AddProfile = ({ setAddModal, setReload }) => {
  const [addProfile, setAddProfile] = useState({
    name: "",
    description: "",
    photo: "",
    address: "",
    coordinates: [0, 0],
  });

  
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "longitude") {
      setLongitude(value);
      setAddProfile((prev) => ({
        ...prev,
        coordinates: [parseFloat(value) || 0, prev.coordinates[1]],
      }));
    } else if (name === "latitude") {
      setLatitude(value);
      setAddProfile((prev) => ({
        ...prev,
        coordinates: [prev.coordinates[0], parseFloat(value) || 0],
      }));
    } else if(name=="name"){
      setAddProfile((prev) => ({ ...prev, name: value }));
      setAddProfile((prev) => ({
        ...prev,
        photo: `https://avatar.iran.liara.run/username?username=${value}`,
      }));
    }
    else {
      setAddProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAdd = async () => {
    
    const { name, description, photo, address, coordinates } = addProfile;

    if (
      !name ||
      !description ||
      !photo ||
      !address ||
      coordinates.length !== 2 ||
      coordinates.some(isNaN)
    ) {
      toast.error("Please fill out all fields correctly.");
      console.log(addProfile);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/profile/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addProfile),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add profile");
      }

      toast.success("Profile added successfully!");
      setAddModal(false);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error adding profile:", error);
      toast.error(error.message || "Failed to add profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setAddModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Add Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={addProfile.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={addProfile.description}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={addProfile.address}
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
            onClick={() => setAddModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-blue-300" : "bg-blue-500"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
