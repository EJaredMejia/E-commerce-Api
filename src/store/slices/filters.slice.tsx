import { ALL_PRODUCTS } from "@/constants/products.constants";
import { createSlice } from "@reduxjs/toolkit";

export interface FiltersState {
  category: typeof ALL_PRODUCTS | number;
  price: {
    from: number;
    to: number;
  };
}
export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    category: ALL_PRODUCTS,
    price: { from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY },
  } satisfies FiltersState as FiltersState,
  reducers: {
    setCategory: (state, action: { payload: FiltersState["category"] }) => {
      state.category = action.payload;
    },
    setPrice: (state, action: { payload: Partial<FiltersState["price"]> }) => {
      const { from, to } = action.payload;

      if (from) {
        state.price.from = from;
      }

      if (to) {
        state.price.to = to;
      }
    },
  },
});

export const { setCategory, setPrice } = filtersSlice.actions;

export default filtersSlice.reducer;
