import { createFileRoute } from "@tanstack/react-router";
import ProductDetail from "../features/products/components/product-detail";
import { getCartQueryOptions } from "@/features/cart/queries/cart.queries";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetail,
  params: {
    parse: (params) => ({ id: Number(params.id) }),
    stringify: (params) => ({ id: String(params.id) }),
  },
  loader: ({ context }) => {
    const { queryClient } = context;

    queryClient.prefetchQuery(getCartQueryOptions());
    queryClient.prefetchQuery(getProductsQueryOptions());
  },
});
