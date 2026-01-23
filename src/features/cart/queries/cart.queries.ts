import { queryOptions } from "@tanstack/react-query";
import type { CartResponse } from "../types/cart.types";
import { AxiosError } from "axios";
import api from "@/services/api";

export function getCartQueryOptions() {
  return queryOptions({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get<CartResponse>("/cart");
      return res.data.data.cart.productInCarts;
    },
    retry(failureCount, error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          return false;
        }
      }

      if (failureCount < 3) {
        return true;
      }
      return false;
    },
  });
}
