"use client";
import React, { useState } from "react";

const NavBar = ({ onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (choice) => {
    onSelect(choice);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-4 px-6 shadow-md z-50 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Jatri</h2>
      <div className="relative">
        <button
          onClick={handleDropdownToggle}
          className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-100 transition duration-200"
        >
          Select Route Type
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md z-50 border border-gray-200">
            <button
              onClick={() => handleSelect("yourToCustom")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              Your location to custom location
            </button>
            <button
              onClick={() => handleSelect("customToCustom")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              Custom to Custom
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
