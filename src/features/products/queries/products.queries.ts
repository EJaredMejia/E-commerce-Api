import api from "@/services/api";
import { queryOptions } from "@tanstack/react-query";
import type { Product } from "../types/products.types";
import type { getAllProducts } from "../server/products.server";
import type { InferQueryFn } from "@/features/tanstack-query/types/tanstack-query.types";

export function getProductsQueryOptions<
  T extends InferQueryFn<typeof getAllProducts>,
>(queryFn: T) {
  return queryOptions({
    queryKey: ["products"],
    queryFn,
  });
}

export function getProductByIdQueryOptions(id: number) {
  return queryOptions({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await api.get<{ data: { product: Product } }>(
        `/products/${id}`,
      );
      return res.data.data.product;
    },
  });
}
