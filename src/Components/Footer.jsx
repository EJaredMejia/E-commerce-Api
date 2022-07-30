import React from "react";

const Footer = () => {
  return (
    <footer className="adjust-footer z-50 bg-gradient-to-t p-10 from-gray-600 to-gray-700 text-white flex gap-8 flex-col justify-center items-center">
      <p>Made by Jared Mejia 2022</p>
      <div className="flex gap-5">
        <a target="_blank" href="https://github.com/jaredmejia24/E-commerce-Api">
          <i className="fa-brands fa-2xl fa-github bg-gray-800 cursor-pointer px-3 py-7 rounded-full"></i>
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/jared-mejia-41b58a23a/">
          <i className="fa-brands fa-2xl fa-linkedin-in bg-gray-800 cursor-pointer px-4 p-7 rounded-full"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
