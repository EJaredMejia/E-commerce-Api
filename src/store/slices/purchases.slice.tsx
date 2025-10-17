import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Components/utils/axios";
import getConfig from "../../Components/utils/getConfig";
import { setIsLoading } from "./isLoading.slice";
import type { Product } from "./products.slice";

export interface Purchase {
  id: number;
  createdAt: string;
  cart: {
    id: number;
    productInCarts: {
      id: number;
      quantity: number;
      product: Product;
    }[];
  };
}
export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [] as Purchase[],
  reducers: {
    setPurchases: (_, action: { payload: Purchase[] }) => {
      return action.payload;
    },
  },
});

export const getPurchasesThunk = createAsyncThunk(
  "purchases/getPurchases",
  async (token: string, { dispatch }) => {
    dispatch(setIsLoading(true));
    return axiosInstance
      .get("/users/orders", getConfig(token))
      .then((res) => dispatch(setPurchases(res.data.data.orders)))
      .finally(() => dispatch(setIsLoading(false)));
  }
);

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
