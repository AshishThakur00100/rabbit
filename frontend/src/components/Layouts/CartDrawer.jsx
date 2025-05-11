import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[21rem] h-full bg-white shadow-lg transform transition duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button for the cart drawer  */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* now basically i am working here upon the cart content so that it could have a scrollable area . which means that if the item increases , then it will show the whole item by scrolling  */}

      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your Cart is Empty </p>
        )}
        {/* here i will add the component for my cart content  */}
      </div>

      {/* Here i am writing the code for the  checkout button for the cart which will be present at the bottom */}

      <div className="p-4 bg-white sticky bottom-0">
      {cart && cart?.products?.length > 0 && (
        <>
         <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping , taxes and discount codes will be calculated at the checkout{" "}
        </p>
        </>
      )}
       
      </div>
    </div>
  );
};

export default CartDrawer;

// For opening and closing the cart drawer from right to left , i am here using the use state hook
