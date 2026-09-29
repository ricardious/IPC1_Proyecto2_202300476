import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import { useAuth } from "../context/AuthContext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Avatar from "./Avatar";

function Navbar() {
  const { logout, user } = useAuth();
  const { darkMode, toggle } = useContext(DarkModeContext);

  const name = user?.nombres || user?.name || "User";

  return (
    <nav className="sticky top-0 z-50 border-b border-themify-border bg-themify-bg">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/home"
            className="text-lg font-bold text-blue-800 dark:text-blue-400"
          >
            USocial
          </Link>
          <Link
            to="/home"
            className="hidden rounded-full p-2 hover:bg-themify-bgSoft sm:block"
            title="Home"
          >
            <HomeOutlinedIcon />
          </Link>
          <button
            onClick={toggle}
            className="rounded-full p-2 hover:bg-themify-bgSoft"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </button>
          <Link
            to="/admin"
            className="hidden rounded-full p-2 hover:bg-themify-bgSoft sm:block"
            title="Dashboard"
          >
            <GridViewOutlinedIcon />
          </Link>
          <div className="hidden items-center gap-2 rounded-full bg-themify-bgSoft px-3 py-1.5 md:flex md:w-72">
            <SearchOutlinedIcon className="text-themify-textColorSoft" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-themify-textColorSoft"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/profile"
            className="hidden rounded-full p-2 hover:bg-themify-bgSoft sm:block"
            title="Profile"
          >
            <PersonOutlinedIcon />
          </Link>
          <button
            className="hidden rounded-full p-2 hover:bg-themify-bgSoft sm:block"
            title="Messages"
          >
            <EmailOutlinedIcon />
          </button>
          <button
            className="hidden rounded-full p-2 hover:bg-themify-bgSoft sm:block"
            title="Notifications"
          >
            <NotificationsOutlinedIcon />
          </button>
          <div className="flex items-center gap-2">
            <Avatar name={name} size={32} />
            <span className="hidden text-sm font-medium sm:block">{name}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1 rounded-full bg-themify-bgSoft px-3 py-1.5 text-sm font-medium transition-colors hover:text-red-500"
            title="Logout"
          >
            <LogoutOutlinedIcon fontSize="small" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
