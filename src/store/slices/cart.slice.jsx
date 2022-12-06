import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../Components/utilis/getConfig";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const getCartThunk = (token) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      "https://e-commerce-api-htys.onrender.com/api/v1/cart",
      getConfig(token)
    )
    .then((res) => dispatch(setCart(res.data.data.cart.productInCarts)))
    .catch((err) => dispatch(setCart([])))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addCartThunk = (token, product) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://e-commerce-api-htys.onrender.com/api/v1/cart/add-product",
      product,
      getConfig(token)
    )
    .then((res) => dispatch(getCartThunk(token)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const updateCartThunk = (token, product) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .patch(
      "https://e-commerce-api-htys.onrender.com/api/v1/cart/update-cart",
      product,
      getConfig(token)
    )
    .then((res) => dispatch(getCartThunk(token)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const deleteCartThunk = (token, id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .delete(
      `https://e-commerce-api-htys.onrender.com/api/v1/cart/${parseInt(id)}`,
      getConfig(token)
    )
    .then(() => dispatch(getCartThunk(token)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const purchaseCartThunk = (token, location) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://e-commerce-api-htys.onrender.com/api/v1/cart/purchase",
      location,
      getConfig(token)
    )
    .then(() => {
      dispatch(getCartThunk(token));
      alert("your purchase was Successful")
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
