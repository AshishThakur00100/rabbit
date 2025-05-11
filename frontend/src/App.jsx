import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layouts/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

import {Provider} from 'react-redux';
import store from './redux/store';
import ProtectedRoute from "./components/Common/ProtectedRoute";
const App = () => {
  return (
    <Provider store={store}>
      {/* The Provider component makes the Redux store available to any nested components that need to access the Redux state. */}
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route
            path="order-confirmation"
            element={<OrderConfirmationPage />}
          />

          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="/order/:id/my-orders" element={<MyOrdersPage />} />

          {/* User layout ends here */}
        </Route>
        {/* now here the admin route path starts  */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
          <AdminLayout />
          </ProtectedRoute>} 
          />
        <Route index element={<AdminHomePage />} />
    
        <Route path = "/admin/users" element = {<UserManagement/>}/>
        <Route path = "/admin/products" element = {<ProductManagement/>}/>
        <Route path="admin/products/:id/edit" element = {<EditProductPage/>} />
        <Route path="admin/orders" element = {<OrderManagement/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>

    //  Browser router components enables the client side routing ...
  );
};

export default App;

//  The Route component is responsible for rendering UI based on the current URL path. It allows you to define various routes in your application and what components should be displayed when those routes are accessed.
