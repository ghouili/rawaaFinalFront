import "./sidebar.css";
import React, { useContext } from "react";
import {
  RiDashboardLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { FaRegChartBar, FaHandsHelping } from "react-icons/fa";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { GeneralContext } from "../../hooks/context/GeneralContext";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import swal from "sweetalert";

const Sidebar = () => {
  const location = useLocation();
  const cookies = new Cookies();
  const menu = useContext(GeneralContext);

  let user = cookies.get("user");

  const logout = async () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to LogOut?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      cookies.remove("user");
      return window.location.reload();
    });
  };
  return (
    <div
      className={`sidebar px-4 h-screen transition-all delay-300 ease-in-out bg-gray-100
       dark:bg-blue-950 ${menu.menuOpen ? "w-64" : "w-24"}`}
    >
      <Link
        to="/"
        className={`flex flex-col  items-center rounded my-2 py-4 dark:text-white dark:hover:bg-blue-100
          hover:bg-blue-900 dark:hover:text-blue-200
          hover:text-blue-100 text-3xl transition-all delay-300 ease-in-out ${
            location.pathname === "/"
              ? "bg-blue-800 dark:hover:bg-blue-900  text-blue-100"
              : "text-blue-900 "
          }`}
      >
        <RiDashboardLine className=" transition-all delay-100 ease-in-out cursor-pointer " />
        <span
          className={` transition-all delay-100 ease-in-out ${
            menu.menuOpen ? "text-lg" : "hidden "
          }`}
        >
          Dashboard{" "}
        </span>
      </Link>

      <Link
        to="/users"
        className={`flex flex-col  items-center rounded my-2 py-4 dark:text-white dark:hover:bg-blue-100
        hover:bg-blue-900 dark:hover:text-blue-200
        hover:text-blue-100 text-3xl transition-all delay-300 ease-in-out ${
          location.pathname === "/users"
            ? "bg-blue-800 dark:dark:bg-blue-900 dark:text-blue-200 text-blue-100"
            : "text-blue-900 "
        }`}
      >
        <BiUser className=" transition-all delay-100 ease-in-out items-center" />
        <span
          className={` transition-all delay-100 ease-in-out cursor-pointer ${
            menu.menuOpen ? "text-lg" : "hidden "
          }`}
        >
          Profiles{" "}
        </span>
      </Link>

      <Link
        to="/company"
        className={`flex flex-col  items-center rounded my-2 py-4 dark:text-white dark:hover:bg-blue-100
        hover:bg-blue-900 dark:hover:text-blue-200
        hover:text-blue-100 text-3xl transition-all delay-300 ease-in-out ${
          location.pathname === "/company"
            ? "bg-blue-800 dark:dark:bg-blue-900 dark:text-blue-200 text-blue-100"
            : "text-blue-900 "
        }`}
      >
        <TbBuildingSkyscraper className=" transition-all delay-100 ease-in-out justify-center items-center" />
        <span
          className={` transition-all delay-100 ease-in-out ${
            menu.menuOpen ? "text-lg" : "hidden "
          }`}
        >
          {" "}
          Entreprise{" "}
        </span>
      </Link>

      <Link
        to="/partners"
        className={`flex flex-col  items-center rounded my-2 py-4 dark:text-white dark:hover:bg-blue-100
        hover:bg-blue-900 dark:hover:text-blue-200
        hover:text-blue-100 text-3xl transition-all delay-300 ease-in-out  ${
          location.pathname === "/partners"
            ? "bg-blue-800 dark:dark:bg-blue-900 dark:text-blue-200 text-blue-100"
            : "text-blue-900 "
        }`}
      >
        <FaHandsHelping className=" transition-all delay-100 ease-in-out justify-center items-center" />
        <span
          className={` transition-all delay-100 ease-in-out ${
            menu.menuOpen ? "text-lg" : "hidden "
          }`}
        >
          Partenaire{" "}
        </span>
      </Link>

      <Link
        to="/statistic"
        className={`flex flex-col  items-center rounded my-2 py-4 dark:text-white dark:hover:bg-blue-100
        hover:bg-blue-900 dark:hover:text-blue-200
        hover:text-blue-100 text-3xl transition-all delay-300 ease-in-out ${
          location.pathname === "/statistic"
            ? "bg-blue-800 dark:dark:bg-blue-900 dark:text-blue-200 text-blue-100"
            : "text-blue-900 "
        }`}
      >
        <FaRegChartBar className=" transition-all delay-100 ease-in-out justify-center items-center" />
        <span
          className={` transition-all delay-100 ease-in-out ${
            menu.menuOpen ? "text-lg" : "hidden "
          }`}
        >
          Statistique{" "}
        </span>
      </Link>

      <div
        className="flex flex-col  items-center rounded my-2 py-4 dark:text-white dark:hover:bg-blue-100
        hover:bg-blue-900 dark:hover:text-blue-200
        hover:text-blue-100 text-3xl transition-all delay-300 ease-in-out text-blue-900 "
        onClick={logout}
      >
        <RiLogoutBoxRLine className=" transition-all delay-100 ease-in-out justify-center items-center" />
        <span
          className={` transition-all delay-100 ease-in-out ${
            menu.menuOpen ? "text-lg" : "hidden "
          }`}
        >
          Déconnexion{" "}
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
