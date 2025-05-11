import React, { useState } from "react";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import Hero from "../components/Layouts/Hero";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/featuredCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // fetch product for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      })
    );
    // fetch the best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* now i will here add the best seller section  */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
  {bestSellerProduct ? ( 
       <ProductDetails productId="6812f109f23a8766a7cb0a89" /> 
      ) : (
        <p className="text-center">Loading Best Seller Products...</p>
      )}

      {/* now here i am going to add the top wear for women section here  */}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
