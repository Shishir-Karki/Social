import React from 'react';
import { AiOutlineHome, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Header = () => {
 

  

  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-600-300 shadow-md">
        <div className="text-2xl font-bold">buzz</div>
        
        <div className="flex space-x-6 text-2xl">
          <Link to='/home'>
          <AiOutlineHome className="cursor-pointer" /></Link>
          <FiSend className="cursor-pointer" />
          <Link to='/notifications'>
          <AiOutlineHeart className="cursor-pointer" />
          </Link>
          <Link to="/profile">
          <AiOutlineUser className="cursor-pointer"/>
          </Link>
         
        </div>
      </nav>
    </div>
  );
};

export default Header;