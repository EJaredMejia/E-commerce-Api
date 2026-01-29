import { ProductDetailSkeleton } from "@/features/products/components/product-detail-skeleton";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import { getAllProducts } from "@/features/products/server/products.server";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import ProductDetail from "../features/products/components/product-detail";

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

    queryClient.prefetchQuery(getProductsQueryOptions(getAllProducts));
  },
});
