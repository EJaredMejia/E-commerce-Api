import { getFetchBaseQuery } from "@/Components/utils/query.utils";
import { setGlobalLoaderOnQueryStart } from "@/Components/utils/global-loader.utils";
import type { DataResponse } from "@/types/data-response.types";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  description: string;
  productImgs: {
    id: number;
    imgUrl: string;
  }[];
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: getFetchBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<DataResponse<{ products: Product[] }>, void>({
      query: () => "/products",
      onQueryStarted: setGlobalLoaderOnQueryStart,
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
