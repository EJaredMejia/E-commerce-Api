import { createFileRoute } from "@tanstack/react-router";
import Home from "../components/home";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import { getCategoriesQueryOptions } from "@/features/categories/queries/categories.queries";
import { getCartQueryOptions } from "@/features/cart/queries/cart.queries";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    const { queryClient } = context;
    queryClient.prefetchQuery(getProductsQueryOptions());
    queryClient.prefetchQuery(getCategoriesQueryOptions());
    queryClient.prefetchQuery(getCartQueryOptions());
  },
});
