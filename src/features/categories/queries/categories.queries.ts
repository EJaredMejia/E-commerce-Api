import type { InferQueryFn } from "@/features/tanstack-query/types/tanstack-query.types";
import { queryOptions } from "@tanstack/react-query";
import type { getAllCategories } from "../server/categories.server";

export function getCategoriesQueryOptions(
  queryFn: InferQueryFn<typeof getAllCategories>,
) {
  return queryOptions({
    queryKey: ["categories"],
    queryFn,
  });
}
