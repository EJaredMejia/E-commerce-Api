import { queryOptions } from "@tanstack/react-query";
import type { CategoriesResponse } from "../types/categories.types";
import { api } from "@/services/api";

export function getCategoriesQueryOptions() {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get<CategoriesResponse>("/products/categories");
      return res.data.categories;
    },
  });
}
