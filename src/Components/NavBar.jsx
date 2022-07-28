import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white z-50 fixed grid grid-cols-2 w-screen p-5 lg:items-center lg:py-0 lg:border-b lg:border-gray-300 ">
      <Link to="/">
        <h1 className="text-red-500 font-bold text-xl tracking-wider lg:text-3xl sm:text-2xl">
          e-commerce
        </h1>
      </Link>
      <div className="justify-self-end flex gap-8 lg:gap-0">
        <Link to="/login">
          <i className="fa-solid text-red-500 sm:text-2xl text-xl fa-user lg:border-l lg:px-16 lg:py-5 lg:border-gray-300 lg:text-3xl"></i>
        </Link>
        <Link to="/purchases">
          <i className="fa-solid text-red-500 sm:text-2xl text-xl fa-box-archive lg:border-l lg:px-16 lg:py-5 lg:border-gray-300 lg:text-3xl"></i>
        </Link>
        <i className="fa-solid text-red-500 sm:text-2xl text-xl fa-cart-shopping lg:border-l lg:px-16 lg:py-5 lg:border-gray-300 lg:text-3xl"></i>
      </div>
    </nav>
  );
};

export default NavBar;
