import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCartThunk,
  getCartThunk,
  updateCartThunk,
} from "../store/slices/cart.slice";
import { setIsMessage } from "../store/slices/isLoading.slice";

const ProductsItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(getCartThunk(user.token));
    }
  }, []);

  const shoppingCart = useSelector((state) => state.cart);

  const addProductToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      let isProductAllreadyInCart = false;
      if (shoppingCart.length > 0) {
        shoppingCart.find((productShop) => {
          if (productShop.product.id === product.id) {
            isProductAllreadyInCart = true;
            const newProductCart = {
              productId: product.id,
              newQty: productShop.quantity + 1,
            };
            dispatch(updateCartThunk(user.token, newProductCart));
            return true;
          }
        });
        if (isProductAllreadyInCart === false) {
          const newProductCart = {
            productId: product.id,
            quantity: 1,
          };
          dispatch(addCartThunk(user.token, newProductCart));
        }
      } else {
        const newProductCart = {
          productId: product.id,
          quantity: 1,
        };
        dispatch(addCartThunk(user.token, newProductCart));
      }
      /* dispatch(addCartThunk(user.token)); */
    } else {
      dispatch(
        setIsMessage("You need to be login to add products to the cart")
      );
      navigate("/login");
    }
  };

  const navigateToProductDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <li className="border pt-5 border-gray-300 rounded-xl">
      <div
        onClick={navigateToProductDetail}
        className="cursor-pointer w-full sm:h-50 border-b border-gray-300 pb-5"
      >
        <img
          className={`mx-auto w-40 max-h-[250px] sm:px-2 sm:w-fit sm:h-40 md:h-[12rem] `}
          src={product.productImgs[0].imgUrl}
          alt="product image"
        />
      </div>
      <div className="p-5 h-[10.5rem]">
        <h3 className="font-bold ml-4 tracking-wider mb-4">{product.title}</h3>
        <p className="text-gray-400">Price</p>
        <p className="font-semibold ml-4">$ {product.price}</p>
        <div className="relative top-[-3rem]">
          <i
            onClick={addProductToCart}
            className="cursor-pointer fa-solid block p-4 py-3 text-lg bg-red-500 text-gray-100 rounded-full w-fit ml-auto text-end fa-cart-shopping"
          ></i>
        </div>
      </div>
    </li>
  );
};

export default ProductsItem;
