import { setGlobalLoaderOnQueryStart } from "@/Components/utils/global-loader.utils";
import { getFetchBaseQuery } from "@/Components/utils/query.utils";
import type { DataResponse } from "@/types/data-response.types";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface Category {
  id: number;
  name: string;
}
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: getFetchBaseQuery(),
  tagTypes: ["Categories"],
  endpoints: (build) => ({
    getCategories: build.query<DataResponse<{ categories: Category[] }>, void>({
      onQueryStarted: setGlobalLoaderOnQueryStart,
      query: () => "/products/categories",
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
