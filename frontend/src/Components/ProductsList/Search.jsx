import React from "react";
import { useTheme } from "../../Contexts/ThemeContext";

const Search = ({ originalData, setalldata }) => {
  const theme = useTheme();
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("ascending");

  const filterAndSortData = (searchValue, sortOrder) => {
    const filtered = originalData.filter((data) =>
      data.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.description.toLowerCase().includes(searchValue.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) =>
      sortOrder === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setalldata(sorted);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    filterAndSortData(searchValue, sort);
  };

  const handleSort = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    filterAndSortData(search, selectedSort);
  };

  return (
    <div
      className={`mb-4 flex flex-col md:flex-row gap-4 items-center p-4  rounded-md ${
        theme !== "dark" ? "bg-slate-400 text-white" : "bg-slate-400 text-black"
      }`}
    >
      <input
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={handleSearch}
        className={`border p-2 rounded-md w-full md:w-1/3 ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-slate-300 text-black"
        }`}
      />
      <select
        value={sort}
        onChange={handleSort}
        className={`border p-2 rounded-md w-36 ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-slate-300 text-black"
        }`}
      >
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>
  );
};

export default Search;
