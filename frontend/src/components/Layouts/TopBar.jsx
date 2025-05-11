import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
const TopBar = () => {
  return (
    <div className="bg-rabbit-red text-white">
      <div className="container mx-auto flex justify-between items-center py-2 px-2">
        <div className=" hidden md:flex  items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
            {/*  Here anchor tag and this tag collectively will  include the meta icon from the react -icon library */}
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-4 w-5" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We ship worldwide - Faster and reliable shipping 😊😊😊 </span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel: 9570643133" className="hover:text-gray-300">
            +91 9570643133
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

// here i will create the top bar which basically contains the social media icons , a message at the center and the phone no at the right hand side. It is red in color and will never change upon loading of any of the components.
// here the mx-auto className will basically help us in putting the content at the centre.
