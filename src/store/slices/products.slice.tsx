import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Components/utils/axios";
import { setIsLoading } from "./isLoading.slice";

export interface Product {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  productImgs: {
    id: number;
    imgUrl: string;
  }[];
}
export const productsSlice = createSlice({
  name: "products",
  initialState: [] as Product[],
  reducers: {
    setProducts: (_, action: { payload: Product[] }) => {
      if (action.payload.length > 0) {
        return action.payload;
      }
    },
  },
});

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    return axiosInstance
      .get("/products")
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  }
);

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
