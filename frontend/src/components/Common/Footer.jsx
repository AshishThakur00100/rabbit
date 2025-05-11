import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4"> NewsLetter </h3>
          <p className="text-gray-500 mb-4">
            {" "}
            Be the first to hear about the new products , exclusive events and an online offers ...
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">Sign Up and get 10% off upon your first order.</p>
          {/* Now here i will add the newsletter form for the footer which will contain email address  */}
          <form className="flex">

            <input type="email" placeholder="Enter your emai" className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all" required/>
              <button type="submit" className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-green-800 transition-all">Subscribe</button>
          </form>

        </div>

        {/* Now here i am adding the shop link at the footer position */}
        <div>

           <h3 className="text-lg text-gray-800 mb-4"> Shop</h3>
           <ul className="space-y-2 text-gray-600">
            <li to="#" className="hover:text-gray-500 transition-colors">
               Men's Top Wear 
            </li>
            <li to="#" className="hover:text-gray-500 transition-colors">
               Women's Top Wear 
            </li>
            <li to="#" className="hover:text-gray-500 transition-colors">
              Men's Bottom Wear 
            </li>
            <li to="#" className="hover:text-gray-500 transition-colors">
               Women's Bottom Wear 
            </li>

           </ul>

        </div>

        {/* Now here i am writing the code for the support link which is similar to the shop link  */}

        <div>

<h3 className="text-lg text-gray-800 mb-4"> Support </h3>
<ul className="space-y-2 text-gray-600">
 <li to="#" className="hover:text-gray-500 transition-colors">
    Contact Us  
 </li>
 <li to="#" className="hover:text-gray-500 transition-colors">
   About Us
 </li>
 <li to="#" className="hover:text-gray-500 transition-colors">
  FAQs 
 </li>
 <li to="#" className="hover:text-gray-500 transition-colors">
   Features  
 </li>

</ul>

</div>
{/* The last thing in my website will be the follow us section  */}
<div>
  <h3 className="text-lg text-gray-800 mb-4 ">Follow Us</h3>
  <div className="flex items-center space-x-4 mb-6">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-800">
    <TbBrandMeta className="h-5 w-5"/>
    </a>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-800">
    <IoLogoInstagram className="h-5 w-5"/>
    </a>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-800">
    <RiTwitterXLine className="h-4 w-4"/>
    </a>
  </div>
  <p className="text-gray-800">Call Us</p>
  <p ><FiPhoneCall className="inline-block mr-2" /> +91 9570643133</p>
</div>
      </div>
      {/* Now here i will write the copyright text at the footer bottom  */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center"> @2025 , CompileTab . All Rights Reserved  </p>
      </div>
    </footer>
  );
};

export default Footer;
