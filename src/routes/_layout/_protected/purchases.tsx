import { PurchasesSkeleton } from "@/features/purchases/components/purchases-skeleton";
import Purchases from "@/features/purchases/components/purchases.components";
import { getPurchasesQueryOptions } from "@/features/purchases/queries/purchases.types";
import { getUserPurchases } from "@/features/purchases/server/purchases.server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_protected/purchases")({
  component: Purchases,
  pendingComponent: PurchasesSkeleton,
  loader: async ({ context }) => {
    const { queryClient } = context;

    queryClient.prefetchQuery(getPurchasesQueryOptions(getUserPurchases));
  },
});
