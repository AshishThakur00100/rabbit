import React from 'react'
import TopBar from '../Layouts/TopBar';
import Navbar from './Navbar';
const Header = () => {
  return (
   <header className='border-b border-gray-200'>
    <TopBar />
<Navbar></Navbar>



    </header>
  )
}

export default Header;

// Insider the header , i will create the top bar which will contain the following things :-- topbar , navbar and the cart drawer.