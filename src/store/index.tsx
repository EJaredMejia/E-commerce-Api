import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector, useStore } from "react-redux";
import cartSlice from "./slices/cart.slice";
import filtersSlice from "./slices/filters.slice";
import appSlice from "./slices/isLoading.slice";
import { productsApi } from "./slices/products.slice";
import { purchasesApi } from "./slices/purchases.slice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [purchasesApi.reducerPath]: purchasesApi.reducer,
    app: appSlice,
    cart: cartSlice,
    filters: filtersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      purchasesApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
