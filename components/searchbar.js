import React from 'react';

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by title or date"
      value={searchQuery}
      onChange={handleSearch}
      className="w-full p-2 mb-4 border border-gray-300 rounded"
    />
  );
};

export default SearchBar;
