import { createFileRoute } from "@tanstack/react-router";
import Purchases from "../features/purchases/components/purchases.components";
import { getPurchasesQueryOptions } from "@/features/purchases/queries/purchases.types";

export const Route = createFileRoute("/purchases")({
  component: Purchases,
  loader: ({ context }) => {
    const { queryClient } = context;

    queryClient.prefetchQuery(getPurchasesQueryOptions());
  },
});
