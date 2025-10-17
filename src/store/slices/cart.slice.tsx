import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Components/utils/axios";
import getConfig from "../../Components/utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export interface Cart {
  id: number;
  product: {
    title: string;
    id: number;
    price: number;
  };
  quantity: number;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: [] as Cart[],
  reducers: {
    setCart: (_, action: { payload: Cart[] }) => {
      return action.payload;
    },
  },
});

export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (token: string, { dispatch }) => {
    dispatch(setIsLoading(true));
    return axiosInstance
      .get("/cart", getConfig(token))
      .then((res) => dispatch(setCart(res.data.data.cart.productInCarts)))
      .catch(() => dispatch(setCart([])))
      .finally(() => dispatch(setIsLoading(false)));
  }
);

interface ParamsAddCardThunk {
  token: string;
  product: { productId: number; quantity: number };
}
export const addCartThunk = createAsyncThunk(
  "cart/addCart",
  async ({ token, product }: ParamsAddCardThunk, { dispatch }) => {
    dispatch(setIsLoading(true));
    return axiosInstance
      .post("/cart/add-product", product, getConfig(token))
      .then(() => dispatch(getCartThunk(token)))
      .finally(() => dispatch(setIsLoading(false)));
  }
);

type UpdateCartThunk = {
  token: string;
  product: {
    productId: number;
    newQty: number;
  };
};

export const updateCartThunk = createAsyncThunk(
  "cart/updateCart",
  async ({ product, token }: UpdateCartThunk, { dispatch }) => {
    dispatch(setIsLoading(true));
    return axiosInstance
      .patch("/cart/update-cart", product, getConfig(token))
      .then(() => dispatch(getCartThunk(token)))
      .finally(() => dispatch(setIsLoading(false)));
  }
);

interface DeleteCarThunk {
  token: string;
  id: number;
}
export const deleteCartThunk = createAsyncThunk(
  "cart/deleteCart",
  async ({ id, token }: DeleteCarThunk, { dispatch }) => {
    dispatch(setIsLoading(true));
    return axiosInstance
      .delete(`/cart/${id}`, getConfig(token))
      .then(() => dispatch(getCartThunk(token)))
      .finally(() => dispatch(setIsLoading(false)));
  }
);

interface PurchaseCartThunk {
  token: string;
  data: {
    street: string;
    colony: string;
    zipCode: string;
    city: string;
    references: string;
  };
}
export const purchaseCartThunk = createAsyncThunk(
  "cart/purchaseCart",
  async ({ token, data }: PurchaseCartThunk, { dispatch }) => {
    dispatch(setIsLoading(true));
    return axiosInstance
      .post("/cart/purchase", data, getConfig(token))
      .then(() => {
        dispatch(getCartThunk(token));
        alert("your purchase was Successful");
      })
      .finally(() => dispatch(setIsLoading(false)));
  }
);

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
