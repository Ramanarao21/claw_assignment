import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'
import { FiLogOut } from "react-icons/fi";
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const eToken = sessionStorage.getItem("eToken")
    if(!eToken){
      navigate("/login")
    }
  },[])

  const handleLogout = () => {
    sessionStorage.removeItem("eToken")
    navigate("/login")
  }


  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">E Manager</Link>
        <div className="flex items-center text-sm">
          <Link to="/add-event" className="text-gray-300 hover:text-white mx-4">Add Event</Link>
          
            <FiLogOut onClick={handleLogout} className='cursor-pointer text-gray-300 hover:text-white m-2 text-lg mx-2' />
       
         
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
