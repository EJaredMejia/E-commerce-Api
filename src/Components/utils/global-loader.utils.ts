import { setIsLoading } from "@/store/slices/isLoading.slice";
import type { Dispatch } from "@reduxjs/toolkit";

interface ReduxQueryApi {
  dispatch: Dispatch;
  queryFulfilled: Promise<any>;
}

export async function setGlobalLoaderOnQueryStart<T>(
  _: T,
  api: ReduxQueryApi
): Promise<void> {
  const { dispatch } = api;
  try {
    dispatch(setIsLoading(true));
    await api.queryFulfilled;
  } finally {
    dispatch(setIsLoading(false));
  }
}
