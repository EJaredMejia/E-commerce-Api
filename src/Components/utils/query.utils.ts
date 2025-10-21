import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getLocalStorageUser } from "./storage";

export function getTokenHeaders() {
  const user = getLocalStorageUser();

  return {
    headers: { Authorization: `Bearer ${user?.token}` },
  };
}

export function getFetchBaseQuery() {
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  });
}
