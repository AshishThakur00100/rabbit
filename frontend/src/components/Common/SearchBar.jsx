import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { fetchProductsByFilters, setFilters } from "../../redux/slices/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = (e) => 
  {
    e.preventDefault();
    dispatch(setFilters({search: searchTerm}));
    dispatch(fetchProductsByFilters({search: searchTerm}));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  }
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {
        // Here i have created the form tag for search icon values

        isOpen ? (
          <form onSubmit={handleSearch} 
          className="relative flex items-center justify-center w-full">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                 //here i have used the value attribute and due to which i am unable to enter my own input into the input column . for putting my own input , i am using the onchangehandler
                 
                onChange={((e) => setSearchTerm(e.target.value))}
                className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              />
              {/* Now here i am adding the search icon i.e. when i click upon the search icon button then it will show me an input type and along with the search icon . here the button contains the necessary class so that the search icon should be placed at the right of the searching bar ... */}

              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <HiMagnifyingGlass className="h-6 w-6"/>
              </button>
            </div>
            {/* Now I am going to create the cross button which will basically close the searching bar upon clicking on it.  */}
            <button type="button" onClick={handleSearchToggle} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
            <HiMiniXMark className="h-6 w-6"/>
            </button>


          </form>
        ) : (
          <button onClick={handleSearchToggle}>
            <HiMagnifyingGlass className="h-6 w-6" />
           
          </button>
        )
      }
    </div>
  );
};

export default SearchBar;
