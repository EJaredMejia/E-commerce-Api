import React from "react";

const CartSideBar = ({ isCartVisible }) => {
  return (
    <div
      className={`w-[20rem] z-50 block fixed right-0 ${
        isCartVisible ? "show-filters" : "hide-filters"
      } shadow-xl bg-white h-screen top-[4rem] lg:top-[4.8rem]`}
    >
      <h3 className="text-gray-700 font-bold px-6 py-5 text-lg">
        Shopping cart
      </h3>
      
      <div className="absolute w-[18rem] top-[-7rem] h-full flex flex-col justify-end">
        <div className="border-t-2 border-gray-300 p-6">
          <div className="flex justify-between">
            <p className="text-gray-500">Total: </p>
            <p className="font-bold">$ 0</p>
          </div>
          <button className="bg-red-500 text-white text-center p-2 w-full mt-8">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;
