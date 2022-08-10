import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      if (action.payload.length > 0) {
        return action.payload;
      }
    },
  },
});

export const getProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filtersCategoryThunk = (category) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${category}`
    )
    .then((res) => {
      dispatch(setProducts(res.data.data.products));
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filtersNameThunk = (searchValue) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${searchValue}`
    )
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};
export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
