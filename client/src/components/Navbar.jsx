import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../context/darkModeContext';
import { AuthContext } from '../context/AuthContext';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useAuth } from '../context/AuthContext';

function Navbar() {

  const { isAuthenticated, logout, user } = useAuth();


  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 h-16 border-b border-themify-border bg-white sticky top-0 bg-themify-bg text-themify-textColor z-50">
      <div className="flex items-center gap-6">
        <Link to="/home" className="text-lg font-bold text-blue-800">
          USocial
        </Link>
        <HomeOutlinedIcon className="w-6 h-6"/>

        <WbSunnyOutlinedIcon  className="w-6 h-6"/>

        <DarkModeOutlinedIcon className="w-6 h-6"/>

        <GridViewOutlinedIcon className="w-6 h-6"/>
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 md:w-96">
          <SearchOutlinedIcon className="w-6 h-6"/>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <PersonOutlinedIcon className="w-6 h-6"/>
        <EmailOutlinedIcon className="w-6 h-6"/>
        <NotificationsOutlinedIcon className="w-6 h-6"/>
        <div className="flex items-center gap-2 font-medium md:flex">
          <img
            src="https://img.icons8.com/nolan/64/react-native.png"
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <span  onClick={() => logout()} className="text-[20px] font-bold text-blue-900">Logout</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
