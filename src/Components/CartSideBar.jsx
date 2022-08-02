import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartThunk,
  getCartThunk,
  updateCartThunk,
} from "../store/slices/cart.slice";

const CartSideBar = ({ isCartVisible }) => {
  const dispatch = useDispatch();
  let totalVar = 0;
  const [total, setTotal] = useState(0);

  const shoppingCart = useSelector((state) => state.cart);
  shoppingCart.forEach((product) => {
    totalVar += product.price * product.productsInCart.quantity;
  });
  useEffect(() => {
    setTotal(totalVar);
  }, [totalVar]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(getCartThunk(user.token));
    }
  }, [isCartVisible]);

  const minusQuantity = (cart) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (cart.productsInCart.quantity === 1) {
      deleteCart(cart.id);
    } else {
      const newProductCart = {
        id: cart.id,
        newQuantity: cart.productsInCart.quantity - 1,
      };
      dispatch(updateCartThunk(user.token, newProductCart));
    }
  };

  const plusQuantity = (cart) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const newProductCart = {
      id: cart.id,
      newQuantity: cart.productsInCart.quantity + 1,
    };
    dispatch(updateCartThunk(user.token, newProductCart));
  };

  const deleteCart = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(deleteCartThunk(user.token, id));
  };

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
            <div className="mb-2 flex gap-5 items-center">
              <p>Quantity: </p>
              <div className="text-base border border-gray-300 items-center w-[6rem] justify-items-center order-4 grid grid-cols-3">
                <p
                  onClick={() => minusQuantity(cart)}
                  className="cursor-pointer w-full h-full  flex justify-center items-center active:bg-teal-300"
                >
                  <i className="fa-solid fa-minus"></i>
                </p>
                <p className="border-r  border-l w-full text-center border-gray-300">
                  {cart.productsInCart.quantity}
                </p>
                <p
                  onClick={() => plusQuantity(cart)}
                  className="cursor-pointer w-full h-full flex justify-center items-center active:bg-teal-300"
                >
                  <i className="fa-solid fa-plus"></i>
                </p>
              </div>
              <button onClick={() => deleteCart(cart.id)} className="order-5">
                <i class="fa-solid fa-trash-can text-red-500"></i>
              </button>
            </div>
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
