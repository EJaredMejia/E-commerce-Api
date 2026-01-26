import { createFileRoute } from "@tanstack/react-router";
import Purchases from "@/features/purchases/components/purchases.components";
import { getPurchasesQueryOptions } from "@/features/purchases/queries/purchases.types";
import { Suspense } from "react";
import { PurchasesSkeleton } from "@/features/purchases/components/purchases-skeleton";

export const Route = createFileRoute("/_protected/purchases")({
  component: () => (
    <Suspense fallback={<PurchasesSkeleton />}>
      <Purchases />
    </Suspense>
  ),
  loader: ({ context }) => {
    const { queryClient } = context;

    queryClient.prefetchQuery(getPurchasesQueryOptions());
  },
});
