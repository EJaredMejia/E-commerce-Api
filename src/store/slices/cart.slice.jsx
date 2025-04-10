import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Components/utilis/axios";
import getConfig from "../../Components/utilis/getConfig";
import { setIsLoading } from "./isLoading.slice";

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
  return axiosInstance
    .get("/cart", getConfig(token))
    .then((res) => dispatch(setCart(res.data.data.cart.productInCarts)))
    .catch((err) => dispatch(setCart([])))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addCartThunk = (token, product) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axiosInstance
    .post("/cart/add-product", product, getConfig(token))
    .then((res) => dispatch(getCartThunk(token)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const updateCartThunk = (token, product) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axiosInstance
    .patch("/cart/update-cart", product, getConfig(token))
    .then((res) => dispatch(getCartThunk(token)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const deleteCartThunk = (token, id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axiosInstance
    .delete(`/cart/${parseInt(id)}`, getConfig(token))
    .then(() => dispatch(getCartThunk(token)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const purchaseCartThunk = (token, location) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axiosInstance
    .post("/cart/purchase", location, getConfig(token))
    .then(() => {
      dispatch(getCartThunk(token));
      alert("your purchase was Successful");
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
