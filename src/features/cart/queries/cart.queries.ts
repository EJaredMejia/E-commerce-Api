import { queryOptions } from "@tanstack/react-query";
import type { CartResponse } from "../types/cart.types";
import { AxiosError } from "axios";
import api from "@/services/api";

export function getCartQueryOptions() {
  return queryOptions({
    queryKey: ["cart"],
    queryFn: async () => {
      try {
        const res = await api.get<CartResponse>("/cart");
        return res.data.data.cart.productInCarts;
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status === 401 || status === 403 || status === 404) {
            return [];
          }

          throw error;
        }
      }
    },
  });
}
