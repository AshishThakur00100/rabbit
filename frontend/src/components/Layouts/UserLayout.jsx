import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Router } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const UserLayout = () => {
  return (
   <>
   <Header />
   <main>
  <Outlet />

   </main>
   <Footer />
   
   
   
   </>
  )
}

export default UserLayout;



// Here the userlayout will contain the content which like header , main content , footer . Here the header and the footer will not change upon moving to any of the sub components . 
// The function of the outlet is to render the child component based upon the current provided link . I will do a detail study upon the outlet utility function later.