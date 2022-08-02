import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCartThunk} from "../store/slices/cart.slice";

const CartSideBar = ({ isCartVisible }) => {
  const dispatch = useDispatch();

  const shoppingCart = useSelector(state=>state.cart)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(getCartThunk(user.token));
    }
  }, [isCartVisible]);

  console.log(shoppingCart);

  return (
    <div
      className={`w-[20rem] z-50 block fixed right-0 ${
        isCartVisible ? "show-filters" : "hide-filters"
      } shadow-xl bg-white h-screen top-[4rem] lg:top-[4.8rem]`}
    >
      <h3 className="text-gray-700 font-bold px-6 py-5 text-lg">
        Shopping cart
      </h3>
      <ul className="overflow-y-scroll mr-1 change-height">
        {shoppingCart.map(cart=>(
          <li className="border-b-2 border-gray-300 py-1 px-5 ">
            <p className="mb-2">{cart.title}</p>
            <p className="mb-2">$ {cart.price}</p>
            <p className="mb-2">Quantity: {cart.productsInCart.quantity}</p>
          </li>
        ))}
        {shoppingCart.map(cart=>(
          <li className="border-b-2 border-gray-300 py-1 px-5">
            <p className="mb-2">{cart.title}</p>
            <p className="mb-2">$ {cart.price}</p>
            <p className="mb-2">Quantity: {cart.productsInCart.quantity}</p>
          </li>
        ))}
        {shoppingCart.map(cart=>(
          <li className="border-b-2 border-gray-300 py-1 px-5">
            <p className="mb-2">{cart.title}</p>
            <p className="mb-2">$ {cart.price}</p>
            <p className="mb-2">Quantity: {cart.productsInCart.quantity}</p>
          </li>
        ))}
        {shoppingCart.map(cart=>(
          <li className="border-b-2 border-gray-300 py-1 px-5">
            <p className="mb-2">{cart.title}</p>
            <p className="mb-2">$ {cart.price}</p>
            <p className="mb-2">Quantity: {cart.productsInCart.quantity}</p>
          </li>
        ))}
        {shoppingCart.map(cart=>(
          <li className="border-b-2 border-gray-300 py-1 px-5">
            <p className="mb-2">{cart.title}</p>
            <p className="mb-2">$ {cart.price}</p>
            <p className="mb-2">Quantity: {cart.productsInCart.quantity}</p>
          </li>
        ))}
        {shoppingCart.map(cart=>(
          <li className="border-b-2 border-gray-300 py-1 px-5">
            <p className="mb-2">{cart.title}</p>
            <p className="mb-2">$ {cart.price}</p>
            <p className="mb-2">Quantity: {cart.productsInCart.quantity}</p>
          </li>
        ))}
      </ul>
      <div className="absolute w-[18rem] bottom-[5rem] flex flex-col justify-end">
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
