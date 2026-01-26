import { createFileRoute } from "@tanstack/react-router";
import ProductDetail from "../features/products/components/product-detail";
import { getCartQueryOptions } from "@/features/cart/queries/cart.queries";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import { Suspense } from "react";
import { ProductDetailSkeleton } from "@/features/products/components/product-detail-skeleton";

export const Route = createFileRoute("/product/$id")({
  component: () => (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail />
    </Suspense>
  ),
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
