import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Search from "./Search";
import UpdateProduct from "../CRUD/UpdateProduct";
import DeleteProduct from "../CRUD/DeleteProduct";

const AdminList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/product/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        if (!Array.isArray(result.data)) {
          throw new Error("API response is not an array");
        }


        const sortedProducts = result.data.sort((a, b) => {
          return a.name.localeCompare(b.name); 
    
        });

        setProducts(sortedProducts);
        setProductData(sortedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [reload]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(productData)
    ? productData.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setUpdateModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-4 font-poppins font-semibold max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2 md:mb-0">All Products</h1>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4 text-gray-700">
          Loading products...
        </div>
      ) : (
        <>
          <Search originalData={products} setalldata={setProductData} />
          <div className="overflow-x-auto bg-white shadow-2xl rounded-lg">
            <table className="min-w-full table-auto border-collapse font-poppins">
              <thead>
                <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 uppercase text-sm">
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Stock</th>
                  <th className="px-6 py-4 text-left font-semibold">Price</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product, index) => (
                    <tr
                      key={product.id || index}
                      className="bg-white hover:bg-gray-100 transition border-b"
                    >
                      <td className="px-6 py-4 text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                        <Tooltip title="Edit">
                          <button
                            onClick={() => handleUpdate(product)}
                            className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition duration-300"
                          >
                            <EditIcon />
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <button
                            onClick={() => handleDelete(product)}
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
                      colSpan="5"
                      className="text-center px-6 py-4 text-gray-600"
                    >
                      No products found
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
              className="shadow-lg bg-white p-2 rounded-3xl"
            />
          </div>
        </>
      )}

      {updateModal && (
        <UpdateProduct
          productData={selectedProduct}
          setUpdateModal={setUpdateModal}
          setReload={setReload}
        />
      )}

      {deleteModal && (
        <DeleteProduct
          productData={selectedProduct}
          setDeleteModal={setDeleteModal}
          setReload={setReload}
        />
      )}
    </div>
  );
};

export default AdminList;
