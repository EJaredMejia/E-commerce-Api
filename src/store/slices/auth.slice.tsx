import { getFetchBaseQuery } from "@/Components/utils/query.utils";
import type { DataResponse } from "@/types/data-response.types";
import { createApi } from "@reduxjs/toolkit/query/react";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "normal";
}
export const authApi = createApi({
  baseQuery: getFetchBaseQuery(),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<
      DataResponse<any>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: `/auth/login`,
        body,
        method: "POST",
      }),
      onQueryStarted: async (_, api) => {
        const { queryFulfilled } = api;

        const { data } = await queryFulfilled;

        localStorage.setItem("user", JSON.stringify(data.data));
      },
    }),
    createUser: builder.mutation<void, CreateUserPayload>({
      query: (body) => ({ url: `/users`, body, method: "POST" }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = authApi;
