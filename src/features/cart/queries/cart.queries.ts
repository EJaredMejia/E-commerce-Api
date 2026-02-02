import type { InferQueryFn } from "@/features/tanstack-query/types/tanstack-query.types";
import { queryOptions } from "@tanstack/react-query";
import type { getCartProductsUser } from "../server/cart.server";

interface GetCartQueryOptionsParams {
  queryFn: InferQueryFn<typeof getCartProductsUser>;
  userId: number | undefined;
}
export function getCartQueryOptions({
  queryFn,
  userId,
}: GetCartQueryOptionsParams) {
  return queryOptions({
    queryKey: ["cart", userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      return await queryFn();
    },
  });
}
