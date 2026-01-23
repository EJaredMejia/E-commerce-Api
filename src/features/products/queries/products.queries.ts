import api from "@/services/api";
import { queryOptions } from "@tanstack/react-query";
import type { ProductsResponse } from "../types/products.types";
import type { Product } from "../types/products.types";

export function getProductsQueryOptions() {
  return queryOptions({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get<ProductsResponse>("/products");
      return res.data.data.products;
    },
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
