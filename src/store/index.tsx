import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products.slice";
import appSlice from "./slices/isLoading.slice";
import purchasesSlice from "./slices/purchases.slice";
import cartSlice from "./slices/cart.slice";
import {
  useDispatch,
  useSelector,
  useStore,
  type TypedUseSelectorHook,
} from "react-redux";

const store = configureStore({
  reducer: {
    products: productsSlice,
    app: appSlice,
    purchases: purchasesSlice,
    cart: cartSlice,
  },
});

export default store;

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
