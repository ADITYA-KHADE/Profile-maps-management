import React, { useState } from "react";
import { toast } from "react-hot-toast";

const DeleteProfile = ({ profileData, setDeleteModal, setReload }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const { _id, name } = profileData;

    setLoading(true);
    try {
      const response = await fetch(`/api/profile/${_id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete profile");
      }

      toast.success(`Profile "${name}" deleted successfully!`);
      setDeleteModal(false);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setDeleteModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-red-500">
          Delete Profile
        </h2>
        <p className="text-gray-700">
          Are you sure you want to delete the profile{" "}
          <span className="font-semibold">{profileData?.name}</span>?
        </p>
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={() => setDeleteModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-red-300" : "bg-red-500"
            }`}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
