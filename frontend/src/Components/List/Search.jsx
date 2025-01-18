import React from "react";
import { useTheme } from "../../Contexts/ThemeContext";
import Filter from "../Fliter/Fliter"; 
import { FaSort } from "react-icons/fa";

const Search = ({ originalData, setalldata }) => {
  const theme = useTheme();
  const [search, setSearch] = React.useState("");
  const [openFilter, setOpenFilter] = React.useState(false);
  const [selectedjobs, setSelectedjobs] = React.useState([]);

  const allroles = Array.from(new Set(originalData.map((item) => item.description)));

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filteredData = originalData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.address.toLowerCase().includes(searchValue.toLowerCase())
    );

    setalldata(filteredData);
  };

  const toggleFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  return (
    <div
      className={`mb-4 flex flex-col md:flex-row gap-4 items-center p-4 rounded-md ${
        theme !== "dark" ? "bg-slate-400 text-white" : "bg-slate-400 text-black"
      }`}
    >
      <input
        type="search"
        placeholder="Search by name and location"
        value={search}
        onChange={handleSearch}
        className={`border p-2 rounded-md w-full md:w-3/4 ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-slate-300 text-black"
        }`}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-md flex items-center"
        onClick={toggleFilter}
      >
        Filter <FaSort className="ml-2" />
      </button>

      {openFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Filter
            allroles={allroles}
            selectedjobs={selectedjobs}
            setSelectedjobs={setSelectedjobs}
            originalData={originalData}
            setalldata={setalldata}
            closeFilter={toggleFilter}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
