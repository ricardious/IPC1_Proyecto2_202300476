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

function Navbar2() {
  const { isAuthenticated, logout, user } = useAuth(); // Supongamos que 'useAuth' es un hook personalizado que proporciona estos valores

  return (
    <nav className="bg-zinc-700 flex justify-between py-5 px-10 rounded-lg">
      <div className="flex items-center gap-6">
        <Link to={isAuthenticated ? "/home" : "/"} className="text-lg font-bold text-white">
          USocial
        </Link>
        <HomeOutlinedIcon className="w-6 h-6 text-white" />
        <WbSunnyOutlinedIcon className="w-6 h-6 text-white" />
        <DarkModeOutlinedIcon className="w-6 h-6 text-white" />
        <GridViewOutlinedIcon className="w-6 h-6 text-white" />
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 md:w-96">
          <SearchOutlinedIcon className="w-6 h-6" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 text-white">
        {isAuthenticated ? (
          <>
            <PersonOutlinedIcon className="w-6 h-6" />
            <EmailOutlinedIcon className="w-6 h-6" />
            <NotificationsOutlinedIcon className="w-6 h-6" />
            <span>Welcome {user.username}</span>
            <Link to="/add-task" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Task
            </Link>
            <button onClick={() => logout()} className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar2;