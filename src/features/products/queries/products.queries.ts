import type { InferQueryFn } from "@/features/tanstack-query/types/tanstack-query.types";
import { queryOptions } from "@tanstack/react-query";
import type { getAllProducts } from "../server/products.server";

export function getProductsQueryOptions<
  T extends InferQueryFn<typeof getAllProducts>,
>(queryFn: T) {
  return queryOptions({
    queryKey: ["products"],
    queryFn,
  });
}
