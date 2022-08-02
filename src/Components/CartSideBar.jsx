import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../store/slices/cart.slice";

const CartSideBar = ({ isCartVisible }) => {
  const dispatch = useDispatch();
  let totalVar = 0;
  const [total, setTotal] = useState(0);

  const shoppingCart = useSelector((state) => state.cart);
  shoppingCart.forEach((product) => {
    totalVar += product.price * product.productsInCart.quantity;
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(getCartThunk(user.token));
    }
    setTotal(totalVar);
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
      <ul className="mr-1 change-height">
        {shoppingCart.map((cart) => (
          <li className="border-b-2 border-gray-300 py-1 px-5 ">
            <p className="mb-2">{cart.title}</p>
            <p className="mb-2">
              $ {cart.price * cart.productsInCart.quantity}
            </p>
            <div className="mb-2 flex">
              <button className="text-3xl">-</button>
              <p>Quantity: {cart.productsInCart.quantity}</p>
              <button className="text-3xl">+</button>
            </div>
            <button>delete</button>
          </li>
        ))}
      </ul>
      <div className="absolute w-[18rem] bottom-[5rem] flex flex-col justify-end">
        <div className="border-t-2 border-gray-300 p-6">
          <div className="flex justify-between">
            <p className="text-gray-500">Total: </p>
            <p className="font-bold">$ {total}</p>
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
