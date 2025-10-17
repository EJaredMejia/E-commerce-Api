import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteCartThunk,
  getCartThunk,
  updateCartThunk,
  type Cart,
} from "../store/slices/cart.slice";
import CheckoutModal from "./CheckoutModal";
import { getLocalStorageUser } from "./utils/storage";

interface CartSideBarProps {
  isCartVisible: boolean;
  setIsCartVisible: (value: boolean) => void;
}
const CartSideBar = ({ isCartVisible, setIsCartVisible }: CartSideBarProps) => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const shoppingCart = useAppSelector((state) => state.cart);

  const total = shoppingCart.reduce((acc, product) => {
    return acc + product.product.price * product.quantity;
  }, 0);

  useEffect(() => {
    const user = getLocalStorageUser();
    if (user && isCartVisible) {
      dispatch(getCartThunk(user.token));
    }
  }, [isCartVisible]);

  const minusQuantity = (cart: Cart) => {
    const user = getLocalStorageUser();
    if (cart.quantity === 1) {
      deleteCart(cart.product.id);
    } else {
      const newProductCart = {
        productId: cart.product.id,
        newQty: cart.quantity - 1,
      };
      dispatch(
        updateCartThunk({
          product: newProductCart,
          token: user.token,
        })
      );
    }
  };

  const plusQuantity = (cart: Cart) => {
    const user = getLocalStorageUser();
    const newProductCart = {
      productId: cart.product.id,
      newQty: cart.quantity + 1,
    };
    dispatch(
      updateCartThunk({
        product: newProductCart,
        token: user.token,
      })
    );
  };

  const deleteCart = (id: number) => {
    const user = getLocalStorageUser();
    dispatch(deleteCartThunk({ id, token: user.token }));
  };

  const checkoutClick = () => {
    if (shoppingCart.length > 0) {
      setIsCheckoutModalOpen(true);
      setIsCartVisible(false);
    } else {
      alert("The shopping cart is empty");
    }
  };

  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
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
          <li
            onClick={() => navigate(`/product/${cart.product.id}`)}
            key={cart.id}
            className="cursor-pointer hover:bg-slate-100 active:bg-slate-200 border-b-2 border-gray-300 py-1 px-5 "
          >
            <div>
              <p className="mb-2">{cart.product.title}</p>
              <p className="mb-2">$ {cart.product.price * cart.quantity}</p>
            </div>
            <div className="mb-2 flex gap-5 items-center">
              <p>Quantity: </p>
              <div className="text-base border border-gray-300 items-center w-[6rem] justify-items-center order-4 grid grid-cols-3">
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    minusQuantity(cart);
                  }}
                  className="cursor-pointer w-full h-full  flex justify-center items-center active:bg-teal-300"
                >
                  <i className="fa-solid fa-minus"></i>
                </p>
                <p className="border-r  border-l w-full text-center border-gray-300">
                  {cart.quantity}
                </p>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    plusQuantity(cart);
                  }}
                  className="cursor-pointer w-full h-full flex justify-center items-center active:bg-teal-300"
                >
                  <i className="fa-solid fa-plus"></i>
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCart(cart.product.id);
                }}
                className="order-5"
              >
                <i className="fa-solid fa-trash-can hover:text-red-700 active:text-red-800 text-xl text-red-500"></i>
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
          <button
            onClick={checkoutClick}
            className="bg-red-500 text-white text-center p-2 w-full mt-8"
          >
            Checkout
          </button>
        </div>
      </div>
      <CheckoutModal
        isCheckoutModalOpen={isCheckoutModalOpen}
        closeCheckoutModal={closeCheckoutModal}
      />
    </div>
  );
};

export default CartSideBar;
