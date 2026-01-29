import type { InferQueryFn } from "@/features/tanstack-query/types/tanstack-query.types";
import { queryOptions } from "@tanstack/react-query";
import type { getUserPurchases } from "../server/purchases.server";

export function getPurchasesQueryOptions(
  queryFn: InferQueryFn<typeof getUserPurchases>,
) {
  return queryOptions({
    queryKey: ["purchases"],
    queryFn,
  });
}
