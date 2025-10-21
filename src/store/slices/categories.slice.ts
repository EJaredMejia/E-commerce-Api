import { setGlobalLoaderOnQueryStart } from "@/Components/utils/global-loader.utils";
import { getFetchBaseQuery } from "@/Components/utils/query.utils";
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
    getCategories: build.query<{ categories: Category[] }, void>({
      onQueryStarted: setGlobalLoaderOnQueryStart,
      query: () => "/products/categories",
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
