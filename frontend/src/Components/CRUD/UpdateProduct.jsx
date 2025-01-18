import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const UpdateProduct = ({ productData, setUpdateModal,setReload }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    category: "",
    stock: 0,
    price: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productData) {
      setUpdatedProduct(productData);
    }
  }, [productData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
  
    if (!updatedProduct.name || !updatedProduct.category || updatedProduct.stock < 0 || updatedProduct.price < 0) {
      alert("Please fill out all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/product/${updatedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update product");
      }

      toast.success("Product updated successfully!");
      setUpdateModal(false);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.message || "Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setUpdateModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Update Product</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={updatedProduct.category}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={updatedProduct.stock}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={updatedProduct.price}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 bg-slate-100 text-gray-800"
              required
            />
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

export default UpdateProduct;
