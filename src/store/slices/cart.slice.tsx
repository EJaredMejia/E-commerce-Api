import { setGlobalLoaderOnQueryStart } from "@/Components/utils/global-loader.utils";
import type { DataResponse } from "@/types/data-response.types";
import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  getFetchBaseQuery,
  getTokenHeaders,
} from "../../Components/utils/query.utils";
import { setIsLoading } from "./isLoading.slice";
import type {
  DeleteCart,
  ParamsAddCart,
  PurchaseCart,
  UpdateCart,
} from "@/types/cart.types";

export interface Cart {
  id: number;
  product: {
    title: string;
    id: number;
    price: number;
  };
  quantity: number;
}

type ResponseCart = DataResponse<{ cart: { productInCarts: Cart[] } }>;

async function onQueryStartCart<T>(
  _: T,
  api: {
    dispatch: ThunkDispatch<any, any, UnknownAction>;
    queryFulfilled: Promise<any>;
  }
) {
  try {
    api.dispatch(setIsLoading(true));
    await api.queryFulfilled;

    const refetches = api
      .dispatch(
        cartApi.endpoints.getCart.initiate(undefined, {
          forceRefetch: true,
          subscribe: false,
        })
      )
      .unwrap();

    await refetches;
  } finally {
    api.dispatch(setIsLoading(false));
  }
}
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: getFetchBaseQuery(),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<ResponseCart, void>({
      query: () => ({ url: "/cart", ...getTokenHeaders() }),
      providesTags: ["Cart"],
      onQueryStarted: setGlobalLoaderOnQueryStart,
    }),
    addCartProduct: builder.mutation<void, ParamsAddCart>({
      query: (body) => ({
        url: "/cart/add-product",
        body,
        method: "POST",
        ...getTokenHeaders(),
      }),
      onQueryStarted: onQueryStartCart,
    }),
    updateCart: builder.mutation<void, UpdateCart>({
      query: (body) => ({
        url: "/cart/update-cart",
        body,
        method: "PATCH",
        ...getTokenHeaders(),
      }),
      onQueryStarted: onQueryStartCart,
    }),
    deleteCart: builder.mutation<void, DeleteCart>({
      query: (body) => ({
        url: `/cart/${body.id}`,
        method: "DELETE",
        ...getTokenHeaders(),
      }),
      onQueryStarted: onQueryStartCart,
    }),
    purchaseCart: builder.mutation<void, PurchaseCart>({
      query: (body) => ({
        url: `/cart/purchase`,
        body,
        method: "POST",
        ...getTokenHeaders(),
      }),
      onQueryStarted: async (_, api) => {
        setGlobalLoaderOnQueryStart(_, api);

        await api.queryFulfilled;
        alert("your purchase was Successful");
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddCartProductMutation,
  useDeleteCartMutation,
  useGetCartQuery,
  usePurchaseCartMutation,
  useUpdateCartMutation,
} = cartApi;
