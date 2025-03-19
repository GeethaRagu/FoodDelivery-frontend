import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { assets } from "../assets/frontend_assets/assets";

const Header = () => {
    const [menu,setMenu] = useState("home");
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap dark:text-white">
              <span className="text-4xl font-bold text-amber-600">G</span><span className="text-3xl font-semibold text-amber-300">oodies</span>
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                   onClick={()=>setMenu("home")}
                  to="/"
                  className={`block py-2 px-3 text-gray-900 rounded-sm md:bg-transparent md:text-gray-900 md:p-0  md:hover:text-blue-700 dark:text-white md:dark:text-blue-500 ${menu==="home"?"active":""}`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                 onClick={()=>setMenu("menu")}
                  to="/menu"
                  className={`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${menu==="menu"?"active":""}`}
                >
                  Menu
                </Link>
              </li>
              <li >
                <Link
                  onClick={()=>setMenu("contact-us")}
                  to="/contactus"
                  className={`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${menu==="contact-us"?"active":""}`}
                >
                  Contact Us
                </Link>
              </li>
              <li className="block py-2 px-3 rounded-sm md:border-0 md:p-0">
                <img src={assets.search_icon} alt="Search" />
              </li>
              <li className="block py-2 px-3 rounded-sm md:border-0 md:p-0">
                
              <Link to="/cart"><img src={assets.basket_icon} alt="Add to Cart" /></Link>  
                
                
              </li>
              <li className="block py-2 px-3 rounded-sm md:border-0 md:p-0">
               <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">SignIn</button>
              </li>
              <li className="block py-2 px-3 rounded-sm md:border-0 md:p-0">
              <FaMoon />
              <FaSun />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
