import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Pagination from "@mui/material/Pagination";
import Search from "./Search";
import { useTheme } from "../../Contexts/ThemeContext";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 9;
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        if (!Array.isArray(result.data)) {
          throw new Error("API response is not an array");
        }


        const sortedData = result.data.sort((a, b) => {
          return a.price - b.price;
        });

        setData(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  const handlePageChange = (event, page) => setCurrentPage(page);

  return (
    <div
      className={`p-4 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-slate-200 text-gray-900"
      }`}
    >
      <div className="lg:mx-6">
        <Search originalData={data} setalldata={setFilteredData} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUsers.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <Cart product={product} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color={theme === "dark" ? "secondary" : "primary"}
        />
      </div>
    </div>
  );
};

export default ProductsList;
