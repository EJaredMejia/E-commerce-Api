import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t p-10 from-gray-600 to-gray-700 text-white flex gap-8 flex-col justify-center items-center">
      <p>Made by Jared Mejia 2022</p>
      <div className="flex gap-5">
        <a href="">
          <i class="fa-brands fa-2xl fa-github bg-gray-800 cursor-pointer px-3 py-7 rounded-full"></i>
        </a>
        <a href="">
          <i class="fa-brands fa-2xl fa-linkedin-in bg-gray-800 cursor-pointer px-4 p-7 rounded-full"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
