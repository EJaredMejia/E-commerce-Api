import { queryOptions } from "@tanstack/react-query";
import type { PurchasesResponse } from "../types/purchases.types";
import { api } from "@/services/api";

export function getPurchasesQueryOptions() {
  return queryOptions({
    queryKey: ["purchases"],
    queryFn: async () => {
      const res = await api.get<PurchasesResponse>("/users/orders");
      return res.data.data.orders;
    },
  });
}
