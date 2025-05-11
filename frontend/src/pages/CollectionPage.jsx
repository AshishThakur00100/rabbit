import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";


const CollectionPage = () => {
  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {products , loading , error} = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
useEffect(() => {
  dispatch(fetchProductsByFilters({collection , ...queryParams}));
}, [dispatch , collection , searchParams]);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (e) => {
    // here i will close the sidebar if mouse has been clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };
  useEffect(() => {
    // now here i am adding the event listener for clicking
    document.addEventListener("mousedown", handleClickOutside);
    // now here i am cleaning the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // now here by applying this return statement , i am able to close the filter option tab in mobile version by clicking anywhere outside . 
    };
  } , []);
 
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Now i am going to make a filter button in case of a mobile version of my website  */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* now here the sidebar filter button will be present  */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">all collection</h2>
        {/* now here i am going to create the sort options i.e. sort according to price low to high , high to low and popularity  */}
        <SortOptions />
        {/* Now here i will have the product grid  */}
        <ProductGrid products={products} loading={loading} error = {error}/>
      </div>
    </div>
  );
};

export default CollectionPage;
