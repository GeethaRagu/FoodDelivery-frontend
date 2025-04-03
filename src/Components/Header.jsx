import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { assets } from "../assets/frontend_assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../Redux/Slice/UserSlice";

const Header = ({ setSignIn }) => {
  const [menu, setMenu] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.fooditem.cartItems);
  const totalQuantity = cartItems.reduce(
    (total, data) => total + (data.quantity || 1),
    0
  );
  const token = localStorage.getItem("Token");

  const handleSignout=()=>{
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/");
  }
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={assets.logo} className="w-25 h-25" />
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
                  onClick={() => setMenu("home")}
                  to="/"
                  className={`block py-2 px-3 text-gray-900 rounded-sm md:bg-transparent md:text-gray-900 md:p-0  md:hover:text-blue-700 dark:text-white md:dark:text-blue-500 ${
                    menu === "home" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {menu === "home" || menu === "menu" ? (
                <li>
                  <a
                    onClick={() => setMenu("menu")}
                    href="#explore_menu"
                    className={`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                      menu === "menu" ? "active" : ""
                    }`}
                  >
                    Menu
                  </a>
                </li>
              ) : (
                <></>
              )}

              <li>
                <Link
                  onClick={() => setMenu("contact-us")}
                  to="/contactus"
                  className={`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                    menu === "contact-us" ? "active" : ""
                  }`}
                >
                  Contact Us
                </Link>
              </li>
              <li className="block py-2 px-3 rounded-sm md:border-0 md:p-0">
                <img src={assets.search_icon} alt="Search" />
              </li>
              <li className="block py-2 px-3 rounded-sm md:border-0 md:p-0 relative">
                <Link to="/cart" onClick={() => setMenu("cart")}>
                  <img src={assets.basket_icon} alt="Add to Cart" />
                </Link>
                {cartItems.length > 0 ? (
                  <p className="md:absolute md:-top-2 md:-right-3 text-red-700">
                    {totalQuantity}
                  </p>
                ) : (
                  <></>
                )}
              </li>
              <li className="block py-2 px-3 rounded-sm md:border-0 md:p-0">
                {!token ? (
                  <button
                    className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                    onClick={() => {
                      setSignIn(true);
                    }}
                  >
                    SignIn
                  </button>
                ) : (
                  <div className="navbar-profile">
                    <img src={assets.profile_icon} />
                    <ul className="navbar-profile-dropdown">
                      <li>
                        <img src={assets.bag_icon} className="w-5"/>
                        <p>Orders</p>
                      </li>
                      <hr />
                      <li onClick={()=>handleSignout()}>
                        <img src={assets.logout_icon} className="w-5"/>
                        <p>LogOut</p>
                      </li>
                    </ul>
                  </div>
                )}
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
