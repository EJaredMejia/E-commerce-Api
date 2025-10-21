import { setGlobalLoaderOnQueryStart } from "@/Components/utils/global-loader.utils";
import type { DataResponse } from "@/types/data-response.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  getFetchBaseQuery,
  getTokenHeaders,
} from "../../Components/utils/query.utils";
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

export const purchasesApi = createApi({
  reducerPath: "purchasesApi",
  baseQuery: getFetchBaseQuery(),
  tagTypes: ["Purchases"],
  endpoints: (builder) => ({
    getPurchases: builder.query<DataResponse<{ orders: Purchase[] }>, void>({
      query: () => ({
        url: "/users/orders",
        ...getTokenHeaders(),
      }),
      onQueryStarted: setGlobalLoaderOnQueryStart,
      providesTags: ["Purchases"],
    }),
  }),
});

export const { useGetPurchasesQuery } = purchasesApi;
