import "./navbar.css";
import React, { useContext, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { BsSearch, BsMoonStars, BsBell } from "react-icons/bs";
import { GiExpand } from "react-icons/gi";
import { BiUser } from "react-icons/bi";

import logo from "../../Assets/Images/logo.png";
import { GeneralContext } from "../../hooks/context/GeneralContext";

const Navbar = () => {
  const { menuOpen, setMenuOpen, HandleThemeSwitch } =
    useContext(GeneralContext);
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // function toggleDarkMode() {
  //   setIsDarkMode(!isDarkMode);
  //   if (isDarkMode) {
  //     document.body.classList.remove('dark-mode');
  //   } else {
  //     document.body.classList.add('dark-mode');
  //   }
  //}

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="navbar bg-white dark:bg-blue-950 h-full flex flex-row items-center px-6 py-2 shadow-lg">
      <div className="navbar__leflside  flex w-1/3 flex-row items-center gap-20 ml-20 ">
        <div className="navbar__leflside-menuicon text-2xl cursor-pointer dark:bg-blue-950 text-blue-950 dark:text-white ">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <AiOutlineMenu />
          </button>
        </div>
        <div className="navbar__search flex flex-row items-center rounded bg-gray-100 dark:bg-blue-950 border-gray-100 dark:border-blue-700   text-blue-900  dark:text-white px-1  ">
          <input
            type="search"
            placeholder="Search..."
            className="text-lg rounded h-8 w-64 bg-gray-100 dark:bg-inherit border-gray-100 text-blue-900 dark:text-white px-5  "
          />
          <div className=" navbar__leflside-searchcon cursor-pointer text-lg px-5 hover:text-blue-900 dark:hover:text-blue-100 transition ease-in-out delay-200 text-blue-900 dark:text-blue-100  ">
            <BsSearch />
          </div>
        </div>
      </div>
      <div className="navbar__logo  flex items-center justify-center w-1/3 ">
        <img src={logo} alt="logo" className="h-12 w-auto" />
      </div>
      <div className="navbar__rightside flex w-1/3 text-2xl  gap-10 pr-20 items-center justify-end">
        <div
          className=" cursor-pointer hover:text-blue-900 dark:hover:text-blue-100 transition ease-in-out delay-200 text-blue-900  dark:text-white"
          onClick={HandleThemeSwitch}
        >
          <BsMoonStars />
        </div>
        <div className="navbar__expand cursor-pointer hover:text-blue-900 dark:hover:text-blue-100  transition ease-in-out delay-200 text-blue-900 dark:text-white"
        onClick={handleFullScreen}
        >
          <GiExpand />
        </div>
        <div className="navbar__notif cursor-pointer hover:text-blue-900 dark:hover:text-blue-100  transition ease-in-out delay-200 text-blue-900 dark:text-white">
          <BsBell />
        </div>
        <div className="navbar__user cursor-pointer hover:text-blue-900 dark:hover:text-blue-100  transition ease-in-out delay-200">
          <div className="rounded-full p-1 border border-black dark:border-white hover:border-blue-900 text-blue-900 dark:text-white">
            <BiUser />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
