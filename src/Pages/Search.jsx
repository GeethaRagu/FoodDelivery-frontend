import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FoodItem from "../Components/FoodItem";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const apiurl = import.meta.env.VITE_API_URLKEY;

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `${apiurl}/api/food/search?query=${query}`
      );
      setResults(response.data);
    } catch (err) {
      toast.error("Failed to fetch search results");
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 justify-center items-center ml-5">
          <input
            type="text"
            placeholder="Search by name or description"
            value={query}
            className=""
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="w-25 h-15 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-2xl text-sm px-5 py-2.5 text-center mb-2 dark:focus:ring-yellow-900 "
          >
            Search
          </button>
        </div>
      </form>

      <hr className="my-2.5 h-0.5 bg-gray-300 border-0 mt-5" />
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Search Results
      </h2>
      {results.length === 0 ? (
        <div> No matching items found.</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-4  sm:grid-cols-2 grid-cols-1 gap-2">
          {results.map((element, index) => {
            return (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative z-1"
              >
                <FoodItem element={element} index={index} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
