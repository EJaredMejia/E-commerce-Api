import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector, useStore } from "react-redux";
import filtersSlice from "./slices/filters.slice";
import appSlice from "./slices/isLoading.slice";
import { productsApi } from "./slices/products.slice";
import { purchasesApi } from "./slices/purchases.slice";
import { categoriesApi } from "./slices/categories.slice";
import { authApi } from "./slices/auth.slice";
import { cartApi } from "./slices/cart.slice";

const appReducer = combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
  [purchasesApi.reducerPath]: purchasesApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  app: appSlice,
  filters: filtersSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      purchasesApi.middleware,
      categoriesApi.middleware,
      authApi.middleware,
      cartApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
